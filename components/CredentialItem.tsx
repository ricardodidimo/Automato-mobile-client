import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useEffect, useState } from "react";
import VaultItemFormModal from "./credentials/VaultItemFormModal";
import { Category, Credential } from "../api/api.types";

export default function CredentialItem(props: { item: Credential, categories: Category[] }) {
  function copyCredential(target: "Primary" | "Second") {
    if (target === "Primary") {
      Clipboard.setStringAsync(props.item.primaryCredential);
      return;
    }
    Clipboard.setStringAsync(props.item.secondaryCredential);
  }

  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconSquare}>
          <Pressable onPress={() => copyCredential("Primary")}>
            <MaterialIcons name="person-outline" size={18} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.iconSquare}>
          <Pressable onPress={() => copyCredential("Second")}>
            <MaterialIcons name="password" size={16} color="#fff" />
          </Pressable>
        </View>

        <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
          {props.item.name}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.email} numberOfLines={1} ellipsizeMode="tail">
          {props.item.primaryCredential}
        </Text>
        <Pressable onPress={() => setShowModal(true)}>
          <Entypo name="dots-three-horizontal" size={16} color="#a5a5a5" />
        </Pressable>
      </View>

      <VaultItemFormModal
        visible={showModal}
        categories={props.categories}
        credential={props.item}
        onClose={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#303535",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconSquare: {
    backgroundColor: "#10A977",
    width: 34,
    height: 34,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  label: {
    color: "#cfcfcf",
    fontSize: 14,
    marginRight: 8,
    letterSpacing: 1,
    maxWidth: 120,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  email: {
    color: "#cfcfcf",
    fontSize: 14,
    marginRight: 4,
    maxWidth: 100,
  },
});
