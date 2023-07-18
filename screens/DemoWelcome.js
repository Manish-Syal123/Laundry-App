import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";

const DemoWelcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View
        style={{ flex: 1, justifyContent: "space-around", marginVertical: 4 }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 40, // The equivalent of 4xl in React Native
            textAlign: "center",
          }}
        >
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../assets/welcome.png")}
            style={{ width: 350, height: 350 }}
          />
        </View>
        <View
          style={{
            marginVertical: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Demoreg")}
            style={{
              paddingVertical: 10,
              backgroundColor: "#FFC107",
              marginHorizontal: 7,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
                color: "#777",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 13,
            }}
          >
            <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Demolog")}>
              <Text
                style={{ fontSize: 19, fontWeight: "600", color: "#FBBF24" }}
              >
                {" "}
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DemoWelcome;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
    flex: 1,
    backgroundColor: themeColors.bg,
  },
});
