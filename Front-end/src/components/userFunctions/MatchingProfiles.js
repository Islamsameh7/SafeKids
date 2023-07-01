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
import { GlobalContext } from "../context/GlobalContext";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue, lightBlue } from "../Constants";
import apiRoutes from "../apiRoutes";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MatchingProfiles = (props) => {
  const { matchingProfiles, setCurrentKidProfile } = useContext(GlobalContext);

  const renderData = () => {
    return matchingProfiles.map((profile, index) => {
      const accuracy = Math.round(profile.kid.similarity * 100);
      const name = profile.kid.name;
      const age = profile.kid.age;
      const gender = profile.kid.gender;
      const lostDate = profile.kid.lost_date;
      const lastLocation = profile.kid.last_known_location;
      const image = profile.photo;

      console.log(image);
      return (
        <View style={styles.card} key={index}>
          <TouchableOpacity
            onPress={() => {
              setCurrentKidProfile(profile);
              props.navigation.navigate("KidProfile");
            }}
            style={{ flexDirection: "row" }}
          >
            <Image
              source={{ uri: apiRoutes.mainUrl + image }}
              style={{
                width: windowWidth / 3,
                height: windowHeight / 7,
                borderRadius: 30,
                justifyContent: "center",
                marginRight: windowWidth / 100,
              }}
            />
            <View>
              <Text style={styles.dataText}>Similarity: {accuracy}%</Text>
              <Text style={styles.dataText}>Name: {name}</Text>
              <Text style={styles.dataText}>Age: {age}</Text>
              <Text style={styles.dataText}>Gender: {gender}</Text>
              <Text style={styles.dataText}>LostDate: {lostDate}</Text>
              <Text style={styles.dataText}>
                LastKnownLocation: {lastLocation}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={{ top: 70, left: 20, position: "absolute" }}
      >
        <Ionicons name={"left"} size={30} color={darkBlue} />
      </TouchableOpacity>
      {matchingProfiles.length > 0 && (
        <View>
          <Text style={styles.matchingText}>Matching Profiles</Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>{renderData()}</View>
          </ScrollView>
        </View>
      )}
      {
        (matchingProfiles.length <= 0 && (
          <Text style={styles.noMatchText}>
            There are no matches at the moment!{"\n"}we will notify you when
            there is a match{"\n"}
            thank you for your efforts
          </Text>
        ))
      }

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
    top: windowHeight / 7,
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
    backgroundColor: lightBlue,
    width: windowWidth / 1.1,
    padding: 30,
    borderRadius: 20,
    marginTop: windowHeight / 20,
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
  scrollViewContent: {
    alignItems: "center",
    paddingTop: Dimensions.get("window").height / 14,
    paddingBottom: Dimensions.get("window").height / 3,
  },
  noMatchText: {
    fontSize: 25,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    top: windowHeight / 7,
  },
});

export default MatchingProfiles;
