import { Button, Input } from "@rneui/base";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function _screen() {
  const router = useRouter();

  const handleRegister = () => {
    console.log("TODO: register user!");
    router.push("/(auth)/(home)/home");
  };

  return (
    <View style={styles.container}>
      <Input label="Name" placeholder="Fulano Silva" />
      <Input label="Email" placeholder="fulano@example.com" />
      <Input label="Password" placeholder="password" secureTextEntry />
      <Input
        label="Password Confirmation"
        placeholder="password"
        secureTextEntry
      />
      <Button
        title="Register"
        containerStyle={styles.register}
        onPress={handleRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  register: {
    width: "100%",
    paddingHorizontal: 8,
  },
});
