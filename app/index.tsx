import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import "../global.css";

const LoginScreen: React.FC = () => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    console.log("Logging in with", form);
  };

  return (
    <View className="flex-1 bg-[#121212] justify-center items-center">
      <View className="bg-[#1E1E1E] rounded-xl p-8 h-full w-full justify-center items-center">
        <Image
          source={require("../assets/logo.png")}
          className="w-15 h-15 mb-4"
        />
        <Text className="text-2xl text-white font-light tracking-widest">
          AUTÔMATO
        </Text>
        <Text className="text-sm text-[#cccccc] mb-8">Password Manager</Text>

        <Text className="self-end text-[#999999] text-sm mt-4">Username</Text>
        <TextInput
          value={form.username}
          onChangeText={(text) => handleChange("username", text)}
          className="w-full text-right border-b border-[#666] text-white py-1 text-base"
        />

        <Text className="self-end text-[#999999] text-sm mt-4">Password</Text>
        <TextInput
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
          className="w-full text-right border-b border-[#666] text-white py-1 text-base"
        />

        <TouchableOpacity
          className="bg-[#00C382] w-full py-3 rounded-md items-center mt-8"
          onPress={handleLogin}
        >
          <Text className="text-white text-base font-semibold">Login</Text>
        </TouchableOpacity>

        <View className="mt-16 items-center">
          <Text className="text-[#ccc] text-sm">Login with biometry</Text>
          <Image
              source={require("../assets/biometric-access.png")}
            className="w-6 h-6 mt-2 tint-[#00C382]"
          />
        </View>

        <Text className="text-[#aaa] text-sm mt-16">
          Don’t have an account?{" "}
          <Text className="text-[#00C382] font-semibold">SIGN UP</Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
