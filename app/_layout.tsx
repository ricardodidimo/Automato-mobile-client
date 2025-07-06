import { Stack } from "expo-router";
import React from "react";
import "../global.css";

export default function _layout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="vaults" options={{ headerShown: false }} />
        <Stack.Screen name="credentials" options={{ headerShown: false }} />
      </Stack>
  );
}
