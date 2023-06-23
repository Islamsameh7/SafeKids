import React, { useState, useContext,useEffect } from "react";
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
import apiRoutes from "../apiRoutes";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MissingKids = (props) => {
    const [missingKids, setMissingKids] = useState([]);
    const names = ["malak", "mona", "john", "emma"];
    const lostDates = ["19-9-2022", "20-1-2023", "10-5-2022", "15-2-2023"];
    const images = [
        require("../../assets/malak.jpg"),
        require("../../assets/mona.jpg"),
        require("../../assets/aly.jpg"),
        require("../../assets/salma.jpg"),
    ];

    useEffect(() => {
        fetch(apiRoutes.getMissingKIds)
          .then(response => response.json())
          .then(data => setMissingKids(data))
          .catch(error => console.error(error));
      }, []);
      const chunks = chunkArray(missingKids, 2);

      return (
          <View style={styles.container}>
              <TouchableOpacity
                  style={{ top: 70, left: 20, position: "absolute" }}
                  onPress={() => props.navigation.navigate("Home")}
              >
                  <Ionicons name={"left"} size={30} color={darkBlue} />
              </TouchableOpacity>
              <Text style={styles.matchingText}>Missing Kids</Text>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                  {chunks.map((chunk, index) => (
                      <View style={styles.row} key={index}>
                          {chunk.map((kid, innerIndex) => (
                              <View style={styles.card} key={innerIndex}>
                                  <Image
                                      source={{uri:apiRoutes.mainUrl+kid.photo_url}}
                                      style={styles.cardImage}
                                  />
                                  <View style={styles.cardInfo}>
                                      <Text style={styles.dataText}>Name: {kid.name}</Text>
                                      <Text style={styles.dataText}>
                                          Lost Date: {kid.lost_date}
                                      </Text>
                                  </View>
                              </View>
                          ))}
                      </View>
                  ))}
              </ScrollView>
          </View>
      );
  };
  
  // Function to split an array into chunks
  const chunkArray = (array, chunkSize) => {
      const chunks = [];
      for (let i = 0; i < array.length; i += chunkSize) {
          chunks.push(array.slice(i, i + chunkSize));
      }
      return chunks;
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    matchingText: {
        fontSize: 25,
        color: darkBlue,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: Dimensions.get('window').height / 7,
    },
    scrollViewContent: {
        alignItems: "center",
        paddingTop: Dimensions.get('window').height / 14,
        paddingBottom: Dimensions.get('window').height / 10
    },
    row: {
        flexDirection: "row",
        marginBottom: Dimensions.get('window').height / 22,
    },
    card: {
        alignItems: "center",
        backgroundColor: lightBlue,
        width: Dimensions.get('window').width / 2.5,
        borderRadius: 20,
        marginHorizontal: Dimensions.get('window').width / 20,

    },
    cardImage: {
        width: "100%",
        height: 150,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    cardInfo: {
        padding: 10,
    },
    dataText: {
        fontSize: 14,
        color: darkBlue,
        fontWeight: "bold",
    },
});

export default MissingKids;