import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity,Dimensions,Alert} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue } from "./Constants";
import Background from "./Background";
import { GlobalContext } from "./context/GlobalContext";

const Matching = (props) => {
  const { matchingProfiles, type, response, setResponse } = useContext(GlobalContext);
  const navigation = useNavigation();
  /*
  useEffect(() => {
    const navigateToNextScreen = setTimeout(() => {
      props.navigation.navigate("MatchingProfiles") // Replace 'NextScreen' with the name of the screen you want to navigate to
    }, 10000); // Replace 3000 with the desired delay in milliseconds

    return () => clearTimeout(navigateToNextScreen);
  }, [navigation]);*/
  useEffect(() => {
    console.log("response is"+response);
    if (response) {
      if (matchingProfiles.length > 0) {
        props.navigation.navigate("MatchingProfiles");
      } else {
        if (type === 'upload') {
          props.navigation.navigate("MatchingProfiles");
        } else {
          Alert.alert(
            "",
            "Profile Created Successfully and we will let you know when someone finds the kid.",
            [{ text: "OK" }],
            { cancelable: true }
          );
          props.navigation.navigate("Home");
        }
      }
      
      setResponse(false);
    }
  }, [response, matchingProfiles, type, navigation, setResponse]);

  
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
