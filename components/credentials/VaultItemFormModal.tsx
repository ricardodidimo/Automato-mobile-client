import { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons, Feather, Entypo } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { Category, Credential } from "../../api/api.types";
import z from "zod";
import {
  createCredential,
  deleteCredential,
  updateCredential,
} from "../../api/credentials";
import { useAuthStore } from "../../stores/AuthStore";

export default function VaultItemFormModal({
  visible,
  onClose,
  onSave,
  onDelete,
  credential,
  categories,
}: {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  onDelete?: () => void;
  credential?: Credential;
  categories: Category[];
}) {
  const [title, setTitle] = useState(credential?.name);
  const [primaryClaim, setPrimaryClaim] = useState(
    credential?.primaryCredential
  );
  const [secondaryClaim, setSecondaryClaim] = useState(
    credential?.secondaryCredential
  );
  const [category, setCategory] = useState(credential?.categoryId ?? categories[0].id);
  const [showPassword, setShowPassword] = useState(false);
  const state = useAuthStore();

  async function handleDeleteCredential() {
    const result = await deleteCredential({
      id: credential!.id,
      accessCode: state.accessCode!,
    });

    if (onDelete) {
      onDelete();
    }

    onClose();
  }

  const credentialSchema = z.object({
    name: z.string().nonempty("Nome é obrigatorio"),
  });
  const [errors, setErrors] = useState<{ name?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    try {
      if (credential === undefined) {
        const result = credentialSchema.safeParse({ name: title });

        if (!result.success) {
          const formatted = result.error.format();
          setErrors({
            name: formatted.name?._errors?.[0],
          });

          return;
        }
      }

      if (credential === undefined) {
        console.log("sure?");
        const c = await createCredential({
          name: title,
          description: "new credential",
          primaryCredential: primaryClaim,
          secondaryCredential: secondaryClaim,
          categoryId: category,
          vaultId: state.vault?.id,
        });
        console.log("sure?", c);
        if (!c.success) {
          Alert.alert("Erro", c.errors[0]);
          return;
        }
      } else {
        const result = await updateCredential({
          name: title,
          credentialsId: credential.id,
          vaultAccessCode: state.accessCode,
          primaryCredential: primaryClaim,
          secondaryCredential: secondaryClaim,
          categoryId: category,
          vaultId: state.vault?.id,
        });

        if (!result.success) {
          Alert.alert("Error", result.errors[0]);
          return;
        }
      }

      onSave();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.actions}>
            <View style={styles.actionsLeftColumn}>
              <Pressable onPress={onClose} style={styles.actionBtn}>
                <MaterialIcons name="cancel" size={20} color="#fff" />
                <Text style={styles.actionText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.actionBtn} onPress={handleSave}>
                <MaterialIcons
                  name="check-circle-outline"
                  size={20}
                  color="#10A977"
                />
                <Text style={styles.saveText}>Save</Text>
              </Pressable>

              {loading && (
                <View className="mt-16">
                  <ActivityIndicator color={"#00C382"} />
                </View>
              )}
            </View>
            {credential?.id != null && (
              <Pressable
                style={styles.actionBtn}
                onPress={handleDeleteCredential}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color="#e74c3c"
                />
              </Pressable>
            )}
          </View>
          <View style={styles.formRow}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="#555"
            />
            {errors.name && (
              <Text className="text-red-400 self-end">{errors.name}</Text>
            )}
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Primary Claim</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={primaryClaim}
                onChangeText={setPrimaryClaim}
                placeholder="Email or Username"
                placeholderTextColor="#555"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Secondary Claim</Text>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                value={secondaryClaim}
                onChangeText={setSecondaryClaim}
                placeholder="Password"
                placeholderTextColor="#555"
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons
                  name={showPassword ? "visibility" : "visibility-off"}
                  size={18}
                  color="#aaa"
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.formRow}>
            <Text style={styles.label}>Category</Text>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={styles.picker}
              dropdownIconColor="#aaa"
            >
              {categories.map((cat) => (
                <Picker.Item key={cat.id} label={cat.name} value={cat.id} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(10,10,10,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1f1f1f",
    borderRadius: 16,
    padding: 20,
    width: "90%",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionsLeftColumn: {
    flexDirection: "row",
    gap: 16,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  deleteAction: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  actionText: {
    color: "#fff",
    fontSize: 14,
  },
  saveText: {
    color: "#10A977",
  },
  sync: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 20,
  },
  syncText: {
    color: "#10A977",
    fontSize: 14,
  },
  formRow: {
    marginBottom: 16,
  },
  label: {
    color: "#aaa",
    marginBottom: 4,
  },
  input: {
    color: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 4,
    width: "90%",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  categoryChip: {
    backgroundColor: "#333",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  picker: {
    color: "#fff",
    backgroundColor: "#333",
    borderRadius: 12,
  },
  categoryText: {
    color: "#fff",
    fontSize: 13,
  },
});
