import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

const DemoLogin = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>DemoLogin</Text>
    </SafeAreaView>
  );
};

export default DemoLogin;

const styles = StyleSheet.create({});
