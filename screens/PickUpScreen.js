import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
  StatusBar,
} from "react-native";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [delivery, setDelivery] = useState([]);

  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();
  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tomorrow",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const proceedToCart = () => {
    if (!selectedDate || !selectedTime || !delivery) {
      Alert.alert(
        "Empty🫗or invalid 🫤",
        "Please select ✔️ all the fields 📝",
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
    if (selectedDate && selectedTime && delivery) {
      // navigation.navigate("Cart");
      navigation.replace("Cart", {
        pickUpDate: selectedDate,
        selectedTime: selectedTime,
        no_Of_days: delivery,
      }); //replace=>to not come again back to pickUP screen and directly move back to (default Navigaiton) HomeScreen
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Enter Address</Text>
        <TextInput style={styles.textInput} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick Up Date</Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date("2023-02-21")}
            endDate={new Date("2023-02-28")}
            initialSelectedDate={new Date("2020-08-22")}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={Dimensions.get("window").width * 0.45}
            unselectedItemWidth={Dimensions.get("window").width * 0.1}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {times.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => setSelectedTime(item.time)}
                style={[
                  styles.timeButton,
                  selectedTime === item.time && styles.selectedTimeButton,
                ]}
              >
                <Text style={styles.timeButtonText}>{item.time}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {deliveryTime.map((item) => (
              <Pressable
                key={item.id}
                style={[
                  styles.deliveryButton,
                  delivery === item.name && styles.selectedDeliveryButton,
                ]}
                onPress={() => setDelivery(item.name)}
              >
                <Text style={styles.deliveryButtonText}>{item.name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>

      {/*(PopUp after Selecting Date & time) Navigation to Cart page */}

      {total == 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
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
              {cart.length} items | $ {total}
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={proceedToCart}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
  },
  textInput: {
    padding: 10,
    borderColor: "gray",
    borderWidth: 1.2,
    paddingVertical: 50,
    borderRadius: 9,
    margin: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 10,
    marginBottom: 5,
  },
  // selectedItemTextStyle: {
  //   color: "#FFF",
  // },
  // flatListContainerStyle: {
  //   marginHorizontal: 10,
  // },
  timeButton: {
    marginHorizontal: 10,
    borderRadius: 7,
    padding: 7,
    borderColor: "gray",
    borderWidth: 1.2,
    justifyContent: "center",
    height: 39,
    marginVertical: 10, //-
  },
  selectedTimeButton: {
    borderColor: "red",
    borderWidth: 1.6,
  },
  timeButtonText: {
    fontSize: 16,
  },
  deliveryButton: {
    marginHorizontal: 10,
    borderRadius: 7,
    padding: 7,
    borderColor: "gray",
    borderWidth: 1.2,
    justifyContent: "center",
    height: 39,
    marginVertical: 10,
  },
  selectedDeliveryButton: {
    borderColor: "red",
    borderWidth: 1.6,
  },
  deliveryButtonText: {
    fontSize: 16,
  },
});

export default PickUpScreen;
