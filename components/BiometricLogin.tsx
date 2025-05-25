import { Text, View, Image} from "react-native";
import React, { Component } from "react";

export default class BiometricLogin extends Component {
  render() {
    return (
      <View className="items-center">
        <Text className="text-[#ccc] text-sm">Login with biometry</Text>
        <Image
          source={require("../assets/biometric-access.png")}
          className="w-6 h-6 mt-2 tint-[#00C382]"
        />
      </View>
    );
  }
}
