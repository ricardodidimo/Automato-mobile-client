import React, { useEffect, useState } from "react";
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
import { listVaults } from "../api/vault";
import { useAuthStore } from "../stores/AuthStore";
import { Vault } from "../api/api.types";
import VaultOptionsModalForm from "../components/vaults/VaultOptionsModalForm";

const VaultDashboard: React.FC = () => {
  const [search, setSearch] = useState("");
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [filteredVaults, setFilteredVaults] = useState<Vault[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [vaultModel, setVaultModel] = useState<Vault>();
  const userId = useAuthStore((s) => s.user?.id);

  async function fetchVaults() {
    const result = await listVaults(userId!, 1);
    setVaults(result.data);
    setFilteredVaults(result.data);
  }

  useEffect(() => {
    if (!userId) return;
    fetchVaults();
  }, [userId]);

  const openModal = (vault: Vault) => {
    setModalVisible(true);
    setVaultModel(vault);
  };

  const onSearch = (text: string) => {
    setSearch(text);
    setFilteredVaults(
      vaults.filter((v) => v.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const [showModal, setShowModal] = useState(false);

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
            onChangeText={onSearch}
          />
        </View>

        <View className="flex-row w-full items-center mb-12">
          <TouchableOpacity
            className="flex-row items-center mr-4"
            onPress={() => {
              setVaultModel(undefined);
              setShowModal(true);
            }}
          >
            <MaterialCommunityIcons
              name="plus-circle-outline"
              size={20}
              color="#00C382"
            />
            <Text className="text-[white] text-sm ml-1">Create</Text>
          </TouchableOpacity>
        </View>

        <VaultOptionsModalForm
          visible={showModal}
          vault={vaultModel}
          onSave={() => {fetchVaults()}}
          onClose={() => setShowModal(false)}
        />

        <FlatList
          data={filteredVaults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openModal(item)}
              className="bg-[#303535] px-4 py-3 w-full rounded-md flex-row justify-between items-center mb-3"
            >
              <Text className="text-white text-base">{item.name}</Text>
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={20}
                color="#00C382"
                onPress={() => {
                  setVaultModel(item);
                  setShowModal(true);
                }}
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
