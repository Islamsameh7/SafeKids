import React from "react";
import { View, StyleSheet, Text, ImageBackground,TouchableOpacity } from "react-native";

import Background from "./Background";
import Btn from "./Btn";
import { blue, navyblue, darkBlue } from "./Constants";

const GetStarted = (props) => {

  return (
    
    <View>
     
      
      <ImageBackground
        source={require("../assets/getStartedImage.jpg")}
        style={{ width: 380, height: 380, marginHorizontal: 25 }}
      />

      <View style={Styles.buttonsStyle}>
        <Text style={Styles.startText}>Let's get started</Text>
        <Text style={Styles.infoText}>
          safe kids app helps you keep{"\n"}your family safe and secure
        </Text>
        <Btn
          bgColor={darkBlue}
          textColor="white"
          btnLabel="Create Account"
          Press={() => props.navigation.navigate("Signup")}
        />
        <Btn
          bgColor="white"
          textColor={navyblue}
          btnLabel="Login"
          Press={() => props.navigation.navigate("Login")}
        />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  buttonsStyle:{
    position: "absolute",
    marginHorizontal: 50,
    marginVertical: 250,
  },
  startText:{
    alignItems: "center",
    color: darkBlue,
    fontWeight: "bold",
    fontSize: 33,
    marginTop: 100,
    marginBottom: 30,
    textAlign: "center",
  },
  infoText:{
    alignItems: "center",
    color: darkBlue,
    fontSize: 20,
    marginBottom: 140,
    textAlign: "center",
  },
 
});


export default GetStarted;
