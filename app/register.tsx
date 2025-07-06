import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { useRouter } from "expo-router";

const RegisterScreen: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validate()) {
      router.push("/vaults")
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#1E1E1E]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="bg-[#1E1E1E] rounded-xl p-8 w-full items-center">
              <AppHeader />

              <Text className="self-end text-[#999999] text-sm mt-4">Username</Text>
              <TextInput
                value={form.username}
                onChangeText={(text) => handleChange("username", text)}
                className="w-full text-right border-b border-[#666] text-white py-1 text-base"
              />
              {errors.username && (
                <Text className="text-red-500 self-start text-sm">{errors.username}</Text>
              )}

              <Text className="self-end text-[#999999] text-sm mt-4">Email</Text>
              <TextInput
                value={form.email}
                onChangeText={(text) => handleChange("email", text)}
                className="w-full text-right border-b border-[#666] text-white py-1 text-base"
              />
              {errors.email && (
                <Text className="text-red-500 self-start text-sm">{errors.email}</Text>
              )}

              <Text className="self-end text-[#999999] text-sm mt-4">Password</Text>
              <TextInput
                value={form.password}
                onChangeText={(text) => handleChange("password", text)}
                secureTextEntry
                className="w-full text-right border-b border-[#666] text-white py-1 text-base"
              />
              {errors.password && (
                <Text className="text-red-500 self-start text-sm">{errors.password}</Text>
              )}

              <Text className="self-end text-[#999999] text-sm mt-4">Confirm password</Text>
              <TextInput
                value={form.confirmPassword}
                onChangeText={(text) => handleChange("confirmPassword", text)}
                secureTextEntry
                className="w-full text-right border-b border-[#666] text-white py-1 text-base"
              />
              
              {errors.confirmPassword && (
                <Text className="text-red-500 self-start text-sm">
                  {errors.confirmPassword}
                </Text>
              )}

              <TouchableOpacity
                className="bg-[#00C382] w-full py-3 rounded-md items-center mt-8"
                onPress={handleRegister}
              >
                <Text className="text-white text-base font-semibold">Start</Text>
              </TouchableOpacity>

              <Text className="text-[#aaa] text-sm mt-16">
                Already have an account?{" "}
                <Text
                  className="text-[#00C382] font-semibold"
                  onPress={() => router.push("/")}
                >
                  LOG IN
                </Text>
              </Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
