import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Pressable,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <>
      <SafeAreaView style={styles.AndroidSafeArea}>
        <Image
          style={{ width: 450, height: 450 }}
          source={require("../assets/payment.jpg")}
        />
        <Text style={{ textAlign: "center", padding: 10, fontSize: 15 }}>
          This is a dummy testing page so, you dont have to pay real money. And
          no product will be ordered in real this is just a testing app you can
          procide further without any worry
        </Text>
      </SafeAreaView>
      {/*(PopUp: to Place Order) Navigation to Payment Page */}
      <Pressable
        style={{
          backgroundColor: "#088F8F",
          padding: 19,
          marginBottom: 40,
          margin: 8,
          borderRadius: 7,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            Total Amount: $ {route.params.total}
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Order")}
          style={{
            backgroundColor: "#FF003D",
            padding: 10,
            borderRadius: 19,
            paddingLeft: 17,
            paddingRight: 17,
          }}
        >
          <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
            PAY $ {route.params.total + 95}
          </Text>
        </Pressable>
      </Pressable>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
