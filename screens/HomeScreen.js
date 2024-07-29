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
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  const [searchtext, setSearchText] = useState("");
  const [filterproduct, setFilterProduct] = useState(product);

  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const navigation = useNavigation();

  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location....."
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);

  useEffect(() => {
    checkIfLocationEnabled();
    getCurrentLocation();
  }, []);

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

    const { coords } = await Location.getCurrentPositionAsync();
    if (coords) {
      const { latitude, longitude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.region} , ${item.city} , ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  };

  useEffect(() => {
    if (product.length === 0) {
      fetchProducts();
    }
  }, [product]);

  const fetchProducts = async () => {
    const colRef = collection(db, "types");
    const docsSnap = await getDocs(colRef);
    const items = [];
    docsSnap.forEach((doc) => {
      items.push(doc.data());
    });
    items.forEach((service) => dispatch(getProducts(service)));
  };

  useEffect(() => {
    const newProducts = product.filter((prod) =>
      prod.name.toLowerCase().includes(searchtext.toLowerCase())
    );
    setFilterProduct(newProducts);
  }, [searchtext, product]);

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
    {
      id: "17",
      image: "https://cdn-icons-png.flaticon.com/128/1785/1785219.png",
      name: "Boys Blazer",
      quantity: 0,
      price: 10,
    },
    {
      id: "18",
      image: "https://cdn-icons-png.flaticon.com/128/188/188298.png",
      name: "Girls Blazer",
      quantity: 0,
      price: 10,
    },
    {
      id: "19",
      image: "https://cdn-icons-png.flaticon.com/128/2161/2161101.png",
      name: "Socks",
      quantity: 0,
      price: 10,
    },
    {
      id: "20",
      image: "https://cdn-icons-png.flaticon.com/128/5173/5173732.png",
      name: "Rain-Coat",
      quantity: 0,
      price: 10,
    },
    {
      id: "21",
      image: "https://cdn-icons-png.flaticon.com/128/1540/1540518.png",
      name: "Glove",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>
      <ScrollView style={styles.AndroidSafeArea}>
        <View
          style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
        >
          <MaterialIcons name="location-on" size={30} color="#fd5c63" />
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Home</Text>
            <Text>{displayCurrentAddress}</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate("Profile")}
            style={{ marginLeft: "auto", marginRight: 7 }}
          >
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://yt3.ggpht.com/PUsCNtKicTJ7NU-aT2TLvQySb9SlT8h6rt_s0DgpnXrpjGro3a0zkxYWzXlxSCVu59as7DL7ms4=s88-c-k-c0x00ffffff-no-rj-mo",
              }}
            />
          </Pressable>
        </View>

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
          <TextInput
            onChangeText={setSearchText}
            placeholder="Search for Items...."
          />
          <Feather name="search" size={24} color="#fd5c63" />
        </View>

        <Carousel />
        <Services />

        {filterproduct.map((item, index) => (
          <DressItem
            item={item}
            key={index}
            refreshData={() => fetchProducts()}
          />
        ))}
      </ScrollView>

      {total === 0 ? null : (
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

          <Pressable onPress={() => navigation.navigate("PickUp")}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "white" }}>
              Proceed to pickup
            </Text>
          </Pressable>
        </Pressable>
      )}
    </>
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
