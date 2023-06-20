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

const MissingKids = (props) => {
    const names = ["malak", "mona", "john", "emma"];
    const lostDates = ["19-9-2022", "20-1-2023", "10-5-2022", "15-2-2023"];
    const images = [
        require("../../assets/malak.jpg"),
        require("../../assets/mona.jpg"),
        require("../../assets/aly.jpg"),
        require("../../assets/salma.jpg"),
    ];

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
                {chunkArray(names, 2).map((chunk, index) => (
                    <View style={styles.row} key={index}>
                        {chunk.map((name, innerIndex) => (
                            <View style={styles.card} key={innerIndex}>
                                <Image
                                    source={images[index * 2 + innerIndex]}
                                    style={styles.cardImage}
                                />
                                <View style={styles.cardInfo}>
                                    <Text style={styles.dataText}>Name: {name}</Text>
                                    <Text style={styles.dataText}>
                                        Lost Date: {lostDates[index * 2 + innerIndex]}
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
        top: 90,
    },
    scrollViewContent: {
        alignItems: "center",
        paddingTop: 20,
    },
    row: {
        flexDirection: "row",
        marginBottom: 20,
    },
    card: {
        alignItems: "center",
        backgroundColor: lightBlue,
        width: windowWidth * 0.4,
        borderRadius: 20,
        marginRight: 10,
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