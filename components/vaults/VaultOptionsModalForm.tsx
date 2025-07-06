import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { Vault, Category } from "../../api/api.types";
import { useAuthStore } from "../../stores/AuthStore";
import {
  createCategory,
  deleteCategory,
  listCategories,
  updateCategory,
} from "../../api/category";
import { createVault, updateVault } from "../../api/vault";
import z from "zod";

interface Props {
  vault?: Vault;
  onClose: () => void;
  onSave: () => void;
  visible: boolean;
}

type CategoryEditable = Category & {
  isNew: boolean;
  isEdited: boolean;
  deleted: boolean;
};

const VaultOptionsModalForm: React.FC<Props> = ({
  vault,
  onClose,
  onSave,
  visible,
}) => {
  const [name, setTitle] = useState(vault?.name);
  const [code, setCode] = useState("");
  const [showAccessCode, setShowPassword] = useState(false);
  const [categoryList, setCategoryList] = useState<CategoryEditable[]>([]);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [editingName, setEditingName] = useState("");

  const userId = useAuthStore().user?.id;

  const vaultSchema = z.object({
    name: z.string().nonempty("Nome é obrigatorio"),
    code: z.string().nonempty("Código é obrigatorio"),
  });

  const [errors, setErrors] = useState<{ name?: string; code?: string }>({});

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await listCategories({
          page: 1,
          userId: userId!,
          pageSize: 10,
        });

        const categoriesFromApi = fetchedCategories?.data ?? [];
        setCategoryList(
          categoriesFromApi.map((c) => {
            return { ...c, isNew: false, isEdited: false, deleted: false };
          })
        );
      } catch (e) {
        console.error("fetchedCategories failed", e);
      }
    }

    fetchCategories();
  }, [vault]);

  useEffect(() => {
    console.log(vault);
    setTitle(vault?.name);
  }, [vault]);

  const handleDeleteCategory = (id: string) => {
    const c = categoryList.find((c) => c.id === id);
    if (c != undefined) {
      c.deleted = true;
      setCategoryList([c, ...categoryList]);
    }
  };

  const handleAddCategory = () => {
    const name = `New Category ${categoryList.length + 1}`;
    setCategoryList((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name,
        userId: userId!,
        isNew: true,
        isEdited: false,
        deleted: false,
      },
    ]);
  };

  const handleSave = async () => {
    if (vault === undefined) {
    const result = vaultSchema.safeParse({ name, code });

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        name: formatted.name?._errors?.[0],
        code: formatted.code?._errors?.[0],
      });

      return;
    }
    }


    if (vault === undefined) {
      const c = await createVault({
        accessCode: code,
        name: name,
        description: "new vault",
        userID: userId,
      });

      if (!c.success) {
        Alert.alert("Erro", c.errors[0]);
        return;
      }
    } else {
      await updateVault({
        accessCode: code,
        name: name,
        description: "",
        vaultId: vault.id,
      });
    }

    console.log("----------------")
    console.log(categoryList)
    const newCategories = categoryList
      .filter((c) => c.isNew)
      .map(async (c) => {
        await createCategory({ name: c.name, userId: userId! });
      });
    const updatedCategories = categoryList
      .filter((c) => c.isEdited)
      .map(async (c) => {
        await updateCategory({ categoryId: c.id, name: c.name });
      });
    const deletedCategories = categoryList
      .filter((c) => c.deleted)
      .forEach(async (c) => {
        console.log("teste")
        const resp = await deleteCategory({ id: c.id });
        console.log(resp);
      });

    onSave();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="bg-[#202222] flex-1 gap-4 p-6 border-t border-[#00C382]">
        <View className="flex-row gap-4 mb6">
          <TouchableOpacity
            onPress={onClose}
            className="flex-row items-center gap-1"
          >
            <Feather name="x" size={18} color="#fff" />
            <Text className="text-white">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSave}
            className="flex-row items-center gap-1"
          >
            <Feather name="check" size={18} color="#00C382" />
            <Text className="text-[#00C382]">Save</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-white text-2xl">
            {vault?.name ?? "Novo cofre"}
          </Text>
          <TouchableOpacity>
            <Feather name="trash-2" size={16} color="red" />
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-white">Title</Text>
          <TextInput
            value={name}
            onChangeText={setTitle}
            className="text-white border-b border-[#666] py-1 mt-1"
          />
          {errors.name && (
            <Text className="text-red-400 self-end">{errors.name}</Text>
          )}
        </View>

        <View className="mb-4">
          <Text className="text-white">Access code</Text>
          <View className="flex-row items-center border-b border-[#666]">
            <TextInput
              value={code}
              onChangeText={setCode}
              secureTextEntry={!showAccessCode}
              className="flex-1 text-white py-1"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showAccessCode)}>
              <Feather
                name={showAccessCode ? "eye-off" : "eye"}
                size={18}
                color="#00C382"
              />
            </TouchableOpacity>
          </View>
          {errors.code && (
            <Text className="text-red-400 self-end">{errors.code}</Text>
          )}
        </View>

        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-white">Categories</Text>
          <TouchableOpacity onPress={handleAddCategory}>
            <Feather name="plus-circle" size={18} color="#00C382" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={categoryList.filter(c => !c.deleted)}
          keyExtractor={(item) => item.id}
          style={{ maxHeight: 200 }}
          renderItem={({ item }) => {
            const isEditing = editingCategoryId === item.id;
            return (
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center gap-2">
                  <MaterialCommunityIcons
                    name="sitemap-outline"
                    size={16}
                    color="#00C382"
                  />
                  {isEditing ? (
                    <TextInput
                      value={editingName}
                      autoFocus
                      onChangeText={setEditingName}
                      onBlur={() => {
                        setCategoryList((prev) =>
                          prev.map((c) =>
                            c.id === item.id ? { ...c, name: editingName } : c
                          )
                        );
                        setEditingCategoryId(null);
                      }}
                      className="text-white border-b border-[#666] py-1 px-1 min-w-[100px]"
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setEditingCategoryId(item.id);
                        setEditingName(item.name);
                      }}
                    >
                      <Text className="text-white">{item.name}</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity onPress={() => handleDeleteCategory(item.id)}>
                  <Feather name="trash-2" size={16} color="red" />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </Modal>
  );
};

export default VaultOptionsModalForm;
