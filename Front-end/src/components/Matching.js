import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue } from "./Constants";
import Background from "./Background";
import { Context } from "../context/globalContext.js";

const Matching = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    const navigateToNextScreen = setTimeout(() => {
      navigation.navigate("MatchingProfiles"); // Replace 'NextScreen' with the name of the screen you want to navigate to
    }, 3000); // Replace 3000 with the desired delay in milliseconds

    return () => clearTimeout(navigateToNextScreen);
  }, [navigation]);
  return (
    <View>
      <Image
        source={require("../assets/matching.gif")}
        style={{ width: "100%", height: "100%" }}
      />
      <TouchableOpacity
        onPress={() => props.navigation.navigate("UploadPhoto")}
        style={{ top: 70, left: 20, position: "absolute" }}
      >
        <Ionicons name={"left"} size={30} color={darkBlue} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Matching;
