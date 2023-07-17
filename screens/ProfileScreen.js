import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  Pressable,
} from "react-native";
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        navigation.replace("Login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <Pressable style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "black" }}>
          welcome {user.email}
        </Text>
      </Pressable>

      <Pressable onPress={signOutUser}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#088F8F" }}>
          Sign Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
