import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const DemoLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        setLoading(false);
      }
      if (authUser) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);
  const Login = () => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("user credential", userCredential);
      const user = userCredential.user;
      console.log("user details", user);
    });
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            source={require("../assets/Signin-pana.png")}
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
          marginTop: -180, //-
        }}
      >
        <View style={{ marginVertical: 8 }}>
          <Text style={{ color: "#718096", marginLeft: 16 }}>
            Email Address
          </Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            style={{
              padding: 16,
              backgroundColor: "#E5E7EB",
              color: "#374151",
              borderRadius: 16,
              marginBottom: 12,
            }}
            placeholder="email"
            value={email}
          />
          <Text style={{ color: "#4B5563", marginLeft: 16 }}>Password</Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            style={{
              padding: 16,
              backgroundColor: "#F3F4F6",
              color: "#4B5563",
              borderRadius: 16,
            }}
            secureTextEntry
            placeholder="password"
            value={password}
          />
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              //alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: "#4B5563",
                //color: "#877dfa",
                marginBottom: 12,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={Login}
            style={{
              paddingTop: 12,
              paddingBottom: 12,
              backgroundColor: "#FCD34D",
              borderRadius: 20,
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
              Login
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
            paddingTop: 5,
            paddingBottom: 10,
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
            marginTop: 18,
          }}
        >
          <Text style={{ color: "#9CA3AF", fontWeight: "600" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Demoreg")}>
            <Text style={{ fontWeight: "600", color: "#FCD34D" }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Lower body below image view ends here*/}
    </View>
  );
};

export default DemoLogin;

const styles = StyleSheet.create({});
