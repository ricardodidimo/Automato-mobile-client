import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CredentialItem from "../components/CredentialItem";
import VaultItemFormModal from "../components/credentials/VaultItemFormModal";
import CategoryCarousel from "../components/credentials/CategoryCarousel";
import { listCategories } from "../api/category";
import { listCredentials } from "../api/credentials";
import { Credential, Category } from "../api/api.types";
import { useAuthStore } from "../stores/AuthStore";
import { router } from "expo-router";

const VaultDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [credentialsView, setCredentialsView] =
    useState<Credential[]>(credentials);
  const [categories, setCategories] = useState<Category[]>([]);

  const userId = useAuthStore((state) => state.user?.id);
  const vault = useAuthStore.getState().vault;
  const code = useAuthStore.getState().accessCode;

  async function fetchCredentials() {
    try {
      const fetchedCredentials = await listCredentials({
        page: 1,
        accessCode: code!,
        vaultId: vault!.id,
        pageSize: 100,
      });

      const credentialsFromApi =
        fetchedCredentials?.data.filter((c) => c.vaultId === vault?.id) ?? [];
      setCredentials(credentialsFromApi);
      setCredentialsView(credentialsFromApi);
    } catch (e) {
      console.error("fetchedCredentials failed", e);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const fetchedCategories = await listCategories({
          page: 1,
          userId: userId!,
          pageSize: 10,
        });

        const categoriesFromApi = fetchedCategories?.data ?? [];
        const allCategories: Category[] = [
          { id: "0", name: "All", userId: "000" },
          ...categoriesFromApi,
        ];
        setCategories(allCategories);
      } catch (e) {
        console.error("fetchedCategories failed", e);
      }
    }

    fetchCategories();
    fetchCredentials();
  }, []);

  const onCategorySelect = (categoryId: string) => {
    if (categoryId === "0") {
      setCredentialsView(credentials);
      return;
    }

    setCredentialsView(credentials.filter((v) => v.categoryId === categoryId));
  };

  const onSearch = (search: string) => {
    setCredentialsView(credentials.filter((v) => v.name.includes(search)));
    setSearch(search);
  };

  const [showModal, setShowModal] = useState(false);

  return (
    <View className="flex-1 bg-[#1E1E1E] px-4 py-12 gap-9">
      <View className="flex gap-2">
        <View className="flex-row gap-2">
          <Text className="text-[#ffffff] text-base" style={styles.h1}>
            {vault?.name}
          </Text>
        </View>

        <View className="flex-row w-full items-center gap-4">
          <TouchableOpacity
            className="flex-row items-center gap-1"
            onPress={() => router.replace("/vaults")}
          >
            <MaterialCommunityIcons
              name="key-alert"
              size={20}
              color="#00C382"
            />
            <Text className="text-[white] text-sm">Close vault</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center gap-1"
            onPress={() => setShowModal(true)}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              color="#00C382"
            />
            <Text className="text-[white] text-sm">Create</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <View className="flex-row items-center bg-[#303535] rounded-md px-4 w-full">
          <MaterialCommunityIcons
            name="circle-outline"
            size={24}
            color="white"
          />
          <TextInput
            placeholder="type here"
            placeholderTextColor="#666"
            className="flex-1 text-white"
            value={search}
            onChangeText={onSearch}
          />
        </View>

        <CategoryCarousel
          categories={categories}
          categorySelectCallback={onCategorySelect}
        ></CategoryCarousel>
      </View>

      <VaultItemFormModal
        onSave={() => {
          fetchCredentials();
        }}
        visible={showModal}
        categories={categories.filter((c) => c.id !== "0")}
        onClose={() => setShowModal(false)}
      />
      <FlatList
        data={credentialsView.filter((item) => !!item.id)}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 12,
          paddingBottom: 32,
        }}
        renderItem={({ item }) => (
          <CredentialItem
            item={item}
            categories={categories.filter((c) => c.id !== "0")}
            fetch={fetchCredentials}
          ></CredentialItem>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default VaultDashboard;
