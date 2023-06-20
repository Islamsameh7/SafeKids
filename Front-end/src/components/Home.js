import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import Background from "./Background";
import { Context } from "../context/globalContext.js";
import Btn from "./Btn";
import { darkBlue, lightBlue } from "./Constants";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontIcons from "react-native-vector-icons/FontAwesome";
import AntIcons from "react-native-vector-icons/AntDesign";

const Home = (props) => {
  const globalContext = useContext(Context);
  const { isLoggedIn, userName } = globalContext;
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: "15%",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{ marginLeft: "5%" }}>
          <IonIcons name={"menu"} size={40} color={darkBlue} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: "55%" }}>
          <IonIcons name={"notifications"} size={40} color={darkBlue} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: "5%" }}>
          <FontIcons name={"user"} size={40} color={darkBlue}
          onPress={() => props.navigation.navigate("UserProfile")}
          />
        </TouchableOpacity>

      </View>
      <Text style={styles.helloText}>Hello,</Text>
      <Text style={styles.userText}>User</Text>
      <View style={{ alignItems: "center", marginTop: "5%" }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("AddKidProfile")}
          style={styles.button}>
          <AntIcons
            name={"pluscircle"}
            size={40}
            color={darkBlue}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Create a Kid profile</Text>
          <Text style={styles.buttonDesc1}>Upload missing kid information.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("UploadPhoto")}
          style={styles.button}>
          <Image source={require("../assets/upload.png")} style={styles.upload_photo_style} />

          <Text style={styles.buttonText}>Upload photo</Text>
          <Text style={styles.buttonDesc2}>Upload a photo for found kid.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("MissingKids")}
          style={styles.button}>

          <Image source={require("../assets/missing-kid.png")} style={styles.missing_kid} />
          <Text style={styles.buttonText}>Lost Kids</Text>
          <Text style={styles.buttonDesc3}>Go through the list of the lost kids.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  helloText: {
    color: darkBlue,
    fontWeight: "bold",
    fontSize: 25,
    marginLeft: "5%",
    marginTop: "7%",
  },
  userText: {
    color: darkBlue,
    fontSize: 32,
    marginLeft: "5%",
  },
  button: {
    backgroundColor: lightBlue,
    width: "80%",
    borderRadius: 20,
    margin: "3%"

  },
  buttonText: {
    color: darkBlue,
    fontSize: 25,
    paddingLeft: "5%",
    fontWeight: "bold",
  },
  buttonDesc1: {
    paddingBottom: "15%",
    paddingLeft: "5%",
    color: darkBlue,
  },
  buttonDesc2: {
    paddingBottom: "15%",
    paddingLeft: "5%",
    color: darkBlue,
  },
  buttonDesc3: {
    paddingBottom: "15%",
    paddingLeft: "5%",
    color: darkBlue,
  },
  icon: {
    marginLeft: "10%",
    paddingTop: "5%",
    paddingBottom: "3%",
  },
  upload_photo_style: {
    height: 40,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginLeft: "10%",
    borderWidth: 4,
    borderRadius: 100,
    borderColor: darkBlue,
    marginTop: '10%',
    marginBottom: '2%'
  },
  missing_kid: {
    height: 40,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginLeft: "10%",
    borderRadius: 100,
    borderColor: darkBlue,
    marginTop: '10%',
    marginBottom: '2%'
  }
});

export default Home;
