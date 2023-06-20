import React from "react";
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, Dimensions } from "react-native";

import Background from "./Background";
import Btn from "./Btn";
import { blue, navyblue, darkBlue } from "./Constants";

const GetStarted = (props) => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/getStartedImage.jpg")}
        style={styles.imageBackground}
      />

      <View style={styles.buttonsStyle}>
        <Text style={styles.startText}>Let's get started</Text>
        <Text style={styles.infoText}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: '96%',
    height: '72%',
    marginHorizontal: '5%',

  },
  buttonsStyle: {
    position: "absolute",
    paddingHorizontal: Dimensions.get('window').width /20,
    paddingVertical: Dimensions.get('window').height /15,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  startText: {
    color: darkBlue,
    fontWeight: "bold",
    fontSize: Dimensions.get('window').width /11,
    marginTop: Dimensions.get('window').height/2.6 ,
    textAlign: "center",
  },
  infoText: {
    color: darkBlue,
    fontSize: Dimensions.get('window').width /18,
    marginTop: Dimensions.get('window').height/20 ,
    marginBottom: Dimensions.get('window').height/9,
    textAlign: "center",
  },
});

export default GetStarted;
