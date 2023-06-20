import React from "react";
import { View, StyleSheet, Text, ImageBackground,TouchableOpacity, Image } from "react-native";
import { blue, navyblue, darkBlue, lightBlue } from "../Constants";
import Ionicons from "react-native-vector-icons/AntDesign";

const MyKids = (props) => {

  return (
    <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("UserProfile")}>
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 50, left: 20 }}
        />
      </TouchableOpacity>

        <Text style={{color:darkBlue, marginTop:70,alignSelf:"center", fontSize:20, fontWeight:"bold"}}>My Kids</Text>

        <View style={styles.card} >
          <Image
            source={require("../../assets/babypic.png")}
            style={{
              width: "40%",
              height: "110%",
              borderRadius: 10,
              justifyContent: "center",
              marginRight: 10,
            }}
          />
          <View style={{flexDirection:"column", }}>
          <Text style={{fontSize:14,fontWeight:"bold", color:darkBlue}}>Name: Aly Ayman </Text>
          <Text style={{fontSize:14,fontWeight:"bold", color:darkBlue}}>Age: 8</Text>
          <Text style={{fontSize:14,fontWeight:"bold", color:darkBlue}}>Gender: Male</Text>
          <Text style={{fontSize:13,fontWeight:"bold", color:darkBlue}}>Lost Date: 15-12-2022</Text>
          <Text style={{fontSize:13,fontWeight:"bold", color:darkBlue}}>Lost Known Location: Maadi</Text>
          </View>

          </View>
    </View>
    );
};
const styles = StyleSheet.create({
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
const MyKids = (props) => {
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
        return names.map((name, index) => {
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
                style={{ top: 70, left: 20, position: "absolute" }}
                onPress={() => props.navigation.navigate('Home')}
            >
                <Ionicons name={"left"} size={30} color={darkBlue} />
            </TouchableOpacity>
            <Text style={styles.matchingText}>My Kids</Text>
            <ScrollView></ScrollView>
            <View style={styles.container}>{renderData()}</View>

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
    },
    card: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: lightBlue,
        width: "90%",
        height:"35%",
        padding: 30,
        borderRadius: 20,
        marginTop: 40,
        marginLeft:20
      },
});
export default MyKids;
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

export default MyKids;
