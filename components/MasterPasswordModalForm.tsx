import React from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import { Vault } from "../types/vault";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  onClose: () => void;
  vault: Vault;
};

const MasterPasswordModalForm: React.FC<Props> = ({ onClose, vault }) => {
  return (
    <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#1E1E1E] bg-opacity-90 justify-center items-center">
      <View className="bg-[#2A2A2A] p-6 rounded-lg w-4/5">
        <Text className="text-white text-lg mb-4 text-center">
          Enter master password for{" "}
          <Text className="font-bold">{vault.name}</Text>
        </Text>
        <TextInput
          autoFocus
          secureTextEntry
          placeholder="Master password"
          placeholderTextColor="#888"
          className="text-white py-2 rounded mb-4"
        />

        <View className="flex-row justify-end">
          <Pressable onPress={onClose} className="flex-row px-2 py-2">
            <MaterialCommunityIcons
              name="close-circle-outline"
              size={20}
              color="#DC2626"
            />
            <Text className="text-[#DC2626] text-center ml-1">Cancel</Text>
          </Pressable>
          <Pressable onPress={onClose} className="flex-row px-4 py-2 rounded">
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
