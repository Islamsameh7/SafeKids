import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";

import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue, lightBlue } from "../Constants";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const MatchingProfiles = (props) => {
  const accuracies = ["97%", "85%"];
  const names = ["malak", "mona"];
  const ages = ["6", "7"];
  const genders = ["female", "female"];
  const lostDates = ["19-9-2022", "20-1-2023"];
  const lastLocations = ["dokki", "haram"];
  const numCards = 2;
  const images = [
    require("../../assets/malak.jpg"),
    require("../../assets/mona.jpg"),
  ];

  const renderData = () => {
    return accuracies.map((accuracy, index) => {
      const name = names[index];
      const age = ages[index];
      const gender = genders[index];
      const lostDate = lostDates[index];
      const lastLocation = lastLocations[index];
      const image = images[index];
      return (
        <View style={styles.card} key={index}>
          <Image
            source={image}
            style={{
              width: "45%",
              height: "95%",
              borderRadius: 30,
              justifyContent: "center",
              marginRight: 10,
            }}
          />
          <View>
            <Text style={styles.dataText}>Accuracy: {accuracy}</Text>
            <Text style={styles.dataText}>Name: {name}</Text>
            <Text style={styles.dataText}>Age: {age}</Text>
            <Text style={styles.dataText}>Gender: {gender}</Text>
            <Text style={styles.dataText}>LostDate: {lostDate}</Text>
            <Text style={styles.dataText}>
              LastKnownLocation: {lastLocation}
            </Text>
          </View>
        </View>
      );
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("UploadPhoto")}
        style={{ top: 70, left: 20, position: "absolute" }}
      >
        <Ionicons name={"left"} size={30} color={darkBlue} />
      </TouchableOpacity>
      <Text style={styles.matchingText}>Matching Profiles</Text>
      <ScrollView></ScrollView>
      <View style={styles.container}>{renderData()}</View>

      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  matchingText: {
    fontSize: 25,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    top: 90,
  },
  dataText: {
    fontSize: 14,
    color: darkBlue,
    fontWeight: "bold",
    //paddingRight:20,
    //alignSelf: 'flex-end',
  },
  card: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: lightBlue,
    width: "85%",
    padding: 30,
    borderRadius: 20,
    marginTop: 50,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: windowHeight / 8,
  },
  doneButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 170,
    paddingVertical: 5,
    top: windowHeight / 3,
    marginLeft: "30%",
    justifyContent: "center",
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
});

export default MatchingProfiles;
