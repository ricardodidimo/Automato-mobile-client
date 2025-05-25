import { Text, View, Image} from "react-native";
import React, { Component } from "react";

export default class AppHeader extends Component {
  render() {
    return (
      <View className="justify-center items-center">
        <Image
          source={require("../assets/logo.png")}
          className="w-15 h-15 mb-4"
        />
        <Text className="text-2xl text-white font-light tracking-widest">
          AUTÔMATO
        </Text>
        <Text className="text-sm text-[#cccccc] mb-8">Password Manager</Text>
      </View>
    );
  }
}
