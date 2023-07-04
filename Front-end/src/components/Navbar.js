import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { darkBlue, lightBlue } from "./Constants";
import Ionicons1 from "react-native-vector-icons/AntDesign";
const NavBar = () => {
  const navigation = useNavigation();
  const logout = async() => {
    
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home" size={24} color={darkBlue} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Ionicons1 name="logout" size={24} color={darkBlue} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("UserProfile")}
      >
        <Ionicons name="person" size={24} color={darkBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderTopColor: lightBlue,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  tab: {
    alignItems: "center",
    marginLeft: 20,

    borderRightWidth: 1,
  },
});

export default NavBar;
