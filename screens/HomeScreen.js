import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  Pressable,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Carousel from "../components/Carousel";
import Services from "../components/Services";
import DressItem from "../components/DressItem";

const HomeScreen = () => {
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location....."
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

  //to check whether the location on the device is enabled or not
  const checkIfLocationEnabled = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
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
    } else {
      setlocationServicesEnabled(enabled);
    }
  };
  // to get the current co-ordinate(location) of device
  const getCurrentLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
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
    //to get the coordinates = latitude & longitude
    const { coords } = await Location.getCurrentPositionAsync();
    //console.log(coords); //-

    if (coords) {
      const { latitude, longitude } = coords; //destructuring the coordinates from coords

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      //console.log(response); //-

      for (let item of response) {
        let address = `${item.region} , ${item.city} , ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };
  // Actual Products ie. Dress Items
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "Shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "Dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "Jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "Shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];
  return (
    <ScrollView style={styles.AndroidSafeArea}>
      {/* Location and Profile */}
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons name="location-on" size={30} color="#fd5c63" />
        <View>
          <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
          <Text>{displayCurrentAddress}</Text>
        </View>

        <Pressable style={{ marginLeft: "auto", marginRight: 7 }}>
          {/* Pressable component are used to apply multiple events on single button like onPressIn , onPressOut, onLongPress events */}
          <Image
            style={{ width: 40, height: 40, borderRadius: 20 }}
            source={{
              uri: "https://yt3.ggpht.com/PUsCNtKicTJ7NU-aT2TLvQySb9SlT8h6rt_s0DgpnXrpjGro3a0zkxYWzXlxSCVu59as7DL7ms4=s88-c-k-c0x00ffffff-no-rj-mo",
            }}
          />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View
        style={{
          padding: 10,
          margin: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderWidth: 0.8,
          borderColor: "#2e856e",
          borderRadius: 7,
        }}
      >
        <TextInput placeholder="Search for Items or More" />
        <Feather name="search" size={24} color="#fd5c63" />
      </View>

      {/* Image Carousel  */}
      <Carousel />

      {/* Services Component */}
      <Services />

      {/* Render all the products */}
      {services.map((item, index) => (
        <DressItem item={item} key={index} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
});
