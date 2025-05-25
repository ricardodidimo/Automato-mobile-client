import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MasterPassowrdModalForm from "../components/MasterPasswordModalForm";
import { Vault } from "../types/vault";

const VaultDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [vaults, setVaults] = useState<Vault[]>([
    { id: "1", name: "Ricardo123’s Vault", password: "123" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [vaultModel, setVaultModel] = useState<Vault>();

  const openModal = (vault: Vault) => {
    setModalVisible(true);
    setVaultModel(vault);
  };

  return (
    <View className="flex-1 bg-[#1E1E1E]">
      <View className="rounded-xl px-4 py-8 mt-10 w-full justify-center items-center">
        <AppHeader />

        <View className="items-center mb-14">
          <View className="flex-row items-center">
            <Ionicons name="settings-sharp" size={16} color="#00C382" />
            <Text className="text-[#ffffff] text-base ml-2">Configuration</Text>
          </View>
        </View>

        <View className="flex-row items-center bg-[#303535] rounded-md px-4 mb-4 w-full">
          <MaterialCommunityIcons
            name="circle-outline"
            size={24}
            color="white"
          />
          <TextInput
            placeholder="type here"
            placeholderTextColor="#666"
            className="flex-1 ml-2 text-white"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View className="flex-row w-full items-center mb-12">
          <TouchableOpacity className="flex-row items-center mr-4">
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              className="mr-1"
              color="#00C382"
            />
            <Text className="text-[white] text-sm">Create</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center">
            <MaterialCommunityIcons
              name="select-all"
              size={20}
              className="mr-1"
              color="#00C382"
            />
            <Text className="text-[white] text-sm">Select All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={vaults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openModal(item)}
              className="bg-[#303535] px-4 py-3 max-h-screen-safe-offset-10 w-full rounded-md flex-row justify-between items-center mb-3"
            >
              <Text className="text-white text-base">{item.name}</Text>

              <MaterialCommunityIcons
                name="dots-horizontal"
                size={20}
                className="mr-1"
                color="#00C382"
              />
            </TouchableOpacity>
          )}
        />

        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <MasterPassowrdModalForm
            vault={vaultModel!}
            onClose={() => setModalVisible(false)}
          />
        </Modal>
      </View>
    </View>
  );
};

export default VaultDashboard;
