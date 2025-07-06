import { Text, View, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useAuthStore } from "../stores/AuthStore";
import { login } from "../api/auth";

export default function BiometricLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBiometricLogin = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        Alert.alert("Erro", "Biometria não está disponível ou configurada.");
        return;
      }

      const authResult = await LocalAuthentication.authenticateAsync({
        promptMessage: "Autentique-se para continuar",
      });

      if (!authResult.success) {
        Alert.alert("Falha", "Autenticação biométrica cancelada ou falhou.");
        return;
      }

      setLoading(true);
      const storedEmail = await SecureStore.getItemAsync("biometry_email");
      const storedPassword = await SecureStore.getItemAsync("biometry_password");

      if (!storedEmail || !storedPassword) {
        setLoading(false);
        Alert.alert("Erro", "Credenciais não encontradas. Faça login manual primeiro.");
        return;
      }

      const auth = await login(storedEmail, storedPassword);
      if (!auth.success) {
        Alert.alert("Erro", "Login falhou. Tente novamente.");
        return;
      }

      useAuthStore.getState().login(auth.data.token, {
        id: auth.data.id,
        name: auth.data.name,
      });

      router.replace("/vaults");
    } catch (err) {
      Alert.alert('Login falhou. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity onPress={handleBiometricLogin}>
      <View className="items-center">
        <Text className="text-[#ccc] text-sm">Login with biometry</Text>
        {loading ? (
          <ActivityIndicator color="#00C382" style={{ marginTop: 10 }} />
        ) : (
          <Image
            source={require("../assets/biometric-access.png")}
            className="w-6 h-6 mt-2 tint-[#00C382]"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}
