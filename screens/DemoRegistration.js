import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

const DemoLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (email === "" || password === "" || name === "") {
      Alert.alert(
        "Invalid Details",
        "Please fill all the details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        console.log("user credential", userCredential);
        const user = userCredential._tokenResponse.email;
        const myUserUid = auth.currentUser.uid;

        setDoc(doc(db, "users", `${myUserUid}`), {
          email: user,
          displayName: name,
        });
      }
    );
    navigation.replace("Home");
  };
  return (
    <View style={{ backgroundColor: themeColors.bg, flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: "#F59E0B",
              padding: 6,
              borderTopRightRadius: 20,
              borderBottomLeftRadius: 20,
              marginLeft: 9,
              marginTop: 4,
            }}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: -30,
          }}
        >
          <Image
            source={require("../assets/Signup-cuate.png")}
            style={{ width: 237, height: 200 }}
          />
        </View>
      </SafeAreaView>

      {/* Lower body below image */}
      <View
        style={{
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          flex: 1,
          backgroundColor: "white",
          paddingHorizontal: 8,
          paddingTop: 8,
          marginTop: -260, //- 290
        }}
      >
        <View style={{ marginVertical: 8 }}>
          {/* Full Name */}
          <Text style={{ color: "#718096", marginLeft: 16 }}>Full Name</Text>
          <TextInput
            onChangeText={(text) => setName(text)}
            placeholder="Enter Name"
            value={name}
            style={{
              padding: 16,
              backgroundColor: "#E5E7EB",
              color: "#374151",
              borderRadius: 16,
              marginBottom: 12,
            }}
          />
          {/* Email - address */}
          <Text style={{ color: "#718096", marginLeft: 16 }}>
            Email Address
          </Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholder="email"
            value={email}
            style={{
              padding: 16,
              backgroundColor: "#E5E7EB",
              color: "#374151",
              borderRadius: 16,
              marginBottom: 12,
            }}
          />
          {/* Password */}
          <Text style={{ color: "#4B5563", marginLeft: 16 }}>Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            placeholder="password"
            secureTextEntry
            style={{
              padding: 16,
              backgroundColor: "#F3F4F6",
              color: "#4B5563",
              borderRadius: 16,
            }}
          />
          {/* SignUp button */}
          <TouchableOpacity
            onPress={register}
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: "#FCD34D",
              borderRadius: 20,
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "bold",
                textAlign: "center",
                color: "#4B5563",
                //color: "#877dfa",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        {/* Other Providers login option */}
        <Text
          style={{
            fontSize: 24,
            //color: "#4B5563",
            color: "#877dfa",
            fontWeight: "bold",
            textAlign: "center",
            paddingTop: 2,
            paddingBottom: 8,
          }}
        >
          Or
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 12,
          }}
        >
          <TouchableOpacity
            style={{ padding: 8, backgroundColor: "#E5E7EB", borderRadius: 16 }}
          >
            <Image
              source={require("../assets/icons/google.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 8, backgroundColor: "#E5E7EB", borderRadius: 16 }}
          >
            <Image
              source={require("../assets/icons/apple.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 8, backgroundColor: "#E5E7EB", borderRadius: 16 }}
          >
            <Image
              source={require("../assets/icons/facebook.png")}
              style={{ width: 40, height: 40 }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Text style={{ color: "#9CA3AF", fontWeight: "600" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Demolog")}>
            <Text style={{ fontWeight: "600", color: "#FCD34D" }}>SignIn</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Lower body below image view ends here*/}
    </View>
  );
};

export default DemoLogin;

const styles = StyleSheet.create({});
