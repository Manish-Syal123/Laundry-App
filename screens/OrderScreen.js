import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Pressable,
} from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const OrderScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <LottieView
        source={require("../assets/thumbs.json")}
        style={{
          height: 360,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />

      <Text
        style={{
          marginTop: 40,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        🎉 Your order has been placed 🚀
      </Text>

      <Pressable
        onPress={() => navigation.replace("Home")}
        style={{
          flexDirection: "row",
          alignItems: "center",
          textAlign: "center",
          marginTop: 40,
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Ionicons name="ios-arrow-back" size={24} color="black" />
        <Text
          style={{
            fontSize: 19,
            fontWeight: "600",
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          Back to Home
        </Text>
        <FontAwesome5 name="home" size={24} color="black" />
      </Pressable>

      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
});
