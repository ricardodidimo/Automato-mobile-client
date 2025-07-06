import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import AppHeader from "../components/AppHeader";
import BiometricLogin from "../components/BiometricLogin";
import { useRouter } from "expo-router";
import { login } from "../api/auth";
import { useAuthStore } from "../stores/AuthStore";
import { z } from "zod";
import * as SecureStore from "expo-secure-store";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().nonempty("Senha é requerida"),
});

const LoginScreen: React.FC = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  useEffect(() => {
    const unsub = useAuthStore.subscribe((state) => {
      if (state.token) {
        router.replace("/vaults");
      }
    });

    return unsub;
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleLogin = async () => {
    const result = loginSchema.safeParse(form);

    if (!result.success) {
      const formatted = result.error.format();
      setErrors({
        email: formatted.email?._errors?.[0],
        password: formatted.password?._errors?.[0],
      });

      return;
    }

    setLoading(true);
    const auth = await login(form.email, form.password);
    setLoading(false);
    if (!auth.success) {
      Alert.alert("Erro", "Credenciais inválidas");
      return;
    }

    await SecureStore.setItemAsync("biometry_email", form.email);
await SecureStore.setItemAsync("biometry_password", form.password);

    useAuthStore.getState().login(auth.data.token, {
      id: auth.data.id,
      name: auth.data.name,
    });

    router.replace("/vaults");
  };

  return (
    <View className="flex-1 bg-[#202222] justify-center items-center">
      <View className="bg-[#202222] rounded-xl p-8 h-full w-full justify-center items-center">
        <AppHeader />

        <Text className="self-end text-[#999999] text-sm mt-4">Email</Text>
        <TextInput
          value={form.email}
          onChangeText={(text) => handleChange("email", text)}
          className="w-full text-right border-b border-[#666] text-white py-1 text-base"
          placeholder="email@exemplo.com"
          placeholderTextColor="#666"
        />
        {errors.email && (
          <Text className="text-red-400 self-end">{errors.email}</Text>
        )}

        <Text className="self-end text-[#999999] text-sm mt-4">Password</Text>
        <TextInput
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          className="w-full text-right border-b border-[#666] text-white py-1 text-base"
          placeholder="*******"
          placeholderTextColor="#666"
        />
        {errors.password && (
          <Text className="text-red-400 self-end">{errors.password}</Text>
        )}

        <TouchableOpacity
          className="bg-[#00C382] w-full py-3 rounded-md items-center mt-8"
          onPress={handleLogin}
        >
          <Text className="text-white text-base font-semibold">Login</Text>
        </TouchableOpacity>

        {loading && (
          <View className="mt-16">
            <ActivityIndicator color={"#00C382"} />
          </View>
        )}

        <View className="mt-16">
          <BiometricLogin />
        </View>

        <Text className="text-[#aaa] text-sm mt-16">
          Don’t have an account?{" "}
          <Text
            className="text-[#00C382] font-semibold"
            onPress={() => router.push("/register")}
          >
            SIGN UP
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
