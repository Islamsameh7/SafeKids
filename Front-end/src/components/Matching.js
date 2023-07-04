import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity,Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue } from "./Constants";
import Background from "./Background";


const Matching = (props) => {
  const navigation = useNavigation();
  useEffect(() => {
    const navigateToNextScreen = setTimeout(() => {
      props.navigation.navigate("MatchingProfiles") // Replace 'NextScreen' with the name of the screen you want to navigate to
    }, 10000); // Replace 3000 with the desired delay in milliseconds

    return () => clearTimeout(navigateToNextScreen);
  }, [navigation]);
  return (
    <View>
      <Image
        source={require("../assets/matching.gif")}
        style={{ width: "100%", height: "100%" }}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({});

export default Matching;
