import { ThemeProvider } from "@rneui/themed";
import { Stack } from "expo-router";
import React from "react";
import "../global.css";

export default function _layout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="vaults" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
