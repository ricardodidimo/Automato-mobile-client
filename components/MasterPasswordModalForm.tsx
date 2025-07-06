import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Vault } from "../api/api.types";
import { listCredentials } from "../api/credentials";
import { useAuthStore } from "../stores/AuthStore";
import { router, useFocusEffect } from "expo-router";

type Props = {
  onClose: () => void;
  vault: Vault;
};

const MasterPasswordModalForm: React.FC<Props> = ({ onClose, vault }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [masterPassword, setmasterPassword] = useState<string>("");

  const authStore = useAuthStore();

  useEffect(() => {
    if (authStore.vault?.id === vault.id) {
      router.replace("/credentials");
    }
  }, [authStore.vault, vault.id, router]);

  async function confirmPassword() {
    try {
      const fetchedCredentials = await listCredentials({
        page: 1,
        accessCode: masterPassword,
        vaultId: vault.id,
        pageSize: 1,
      });

      if (!fetchedCredentials.success) {
        setErrors({ masterPassword: "Invalid code!" });
        return;
      }

      authStore.unlock(masterPassword, vault);
      router.replace("/credentials");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#1E1E1E] bg-opacity-90 justify-center items-center">
      <View className="bg-[#2A2A2A] p-6 rounded-lg w-4/5">
        <Text className="text-white text-lg mb-4 text-center">
          Enter master password for{" "}
          <Text className="font-bold">{vault.name}</Text>
        </Text>
        <TextInput
          autoFocus
          value={masterPassword}
          onChangeText={(text) => setmasterPassword(text)}
          secureTextEntry
          placeholder="Master password"
          placeholderTextColor="#888"
          className="text-white py-2 rounded mb-4"
        />
        {errors.masterPassword && (
          <Text className="text-red-500 self-start text-sm">
            {errors.masterPassword}
          </Text>
        )}
        <View className="flex-row justify-end">
          <Pressable onPress={onClose} className="flex-row px-2 py-2">
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={20}
              color="#DC2626"
            />
            <Text className="text-[#DC2626] text-center ml-1">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={() => confirmPassword()}
            className="flex-row px-4 py-2 rounded"
          >
            <MaterialCommunityIcons
              name="check-circle-outline"
              size={20}
              color="white"
            />
            <Text className="text-white text-center ml-1">Confirm</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default MasterPasswordModalForm;
