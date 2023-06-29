import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image,Dimensions } from "react-native";
import Background from "./Background";
import Btn from "./Btn";
import { darkBlue, lightBlue } from "./Constants";
import IonIcons from "react-native-vector-icons/Ionicons";
import FontIcons from "react-native-vector-icons/FontAwesome";
import AntIcons from "react-native-vector-icons/AntDesign";
import { GlobalContext } from "./context/GlobalContext";
const Home = (props) => {

  const { user } = useContext(GlobalContext);
  const func = async () => {
    const formData = new FormData();



   

    const response = await fetch(apiRoutes.login, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    if (response.ok) {
 
      
    } else {
 
    }
  }
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
        <TouchableOpacity style={{ marginLeft: "5%" } } onPress={() => func()}>
          <IonIcons name={"menu"} size={40} color={darkBlue} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate("Notifications")} style={{ marginLeft: "55%" }}>
          <IonIcons name={"notifications"} size={40} color={darkBlue} />
        </TouchableOpacity>
        <TouchableOpacity style={{ marginLeft: "5%" }}>
          <FontIcons name={"user"} size={40} color={darkBlue}
            onPress={() => props.navigation.navigate("UserProfile")}
          />
        </TouchableOpacity>

      </View>
      <Text style={styles.helloText}>Hello,</Text>
      <Text style={styles.userText}>{user.name}</Text>
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
    fontSize: Dimensions.get('window').width /14,
    marginLeft: Dimensions.get('window').width/15,
    marginTop: Dimensions.get('window').height/40,
  },
  userText: {
    color: darkBlue,
    fontSize: Dimensions.get('window').width /15,
    marginLeft: Dimensions.get('window').width/15,
  },
  button: {
    backgroundColor: lightBlue,
    width: "80%",
    borderRadius: 20,
    margin: "3%"

  },
  buttonText: {
    color: darkBlue,
    fontSize: Dimensions.get('window').width/18,
    paddingLeft: Dimensions.get('window').width/25,
    fontWeight: "bold",
  },
  buttonDesc1: {
    paddingBottom: Dimensions.get('window').height/18,
    paddingLeft: Dimensions.get('window').width/23,
    color: darkBlue,
  },
  buttonDesc2: {
    paddingBottom: Dimensions.get('window').height/18,
    paddingLeft: Dimensions.get('window').width/23,
    color: darkBlue,
  },
  buttonDesc3: {
    paddingBottom: Dimensions.get('window').height/18,
    paddingLeft: Dimensions.get('window').width/23,
    color: darkBlue,
  },
  icon: {
    marginLeft: Dimensions.get('window').width/20,
    paddingTop: Dimensions.get('window').height/40,
    paddingBottom: Dimensions.get('window').width/40,
  },
  upload_photo_style: {
    height: Dimensions.get('window').height/22,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginLeft: Dimensions.get('window').width/20,
    borderWidth: 1,
    borderRadius:100,
    borderColor: darkBlue,
    marginTop: Dimensions.get('window').height/40,
    marginBottom: Dimensions.get('window').height/45
  },
  missing_kid: {
    height: Dimensions.get('window').height/20,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginLeft: Dimensions.get('window').width/20,
    borderRadius: 100,
    borderColor: darkBlue,
    marginTop: Dimensions.get('window').height/40,
    marginBottom: Dimensions.get('window').height/45
  }
});

export default Home;
