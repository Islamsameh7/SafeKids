import React from "react";
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import {  darkBlue, grey } from "./Constants";


const Notifications = (props) => {

    return (

        <View>

<TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 70, left: 20 }}
        />
      </TouchableOpacity>    
            <ImageBackground
                source={require("../assets/aboutus.jpg")}
                style={{ width: 300, height: 180, marginVertical: 130, alignSelf: "center" }}
            />

            <View style={Styles.buttonsStyle}>
                <Text style={Styles.aboutusText}>About Us</Text>
                <Text style={Styles.infoText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Cras adipiscing enim eu turpis egestas. Tristique risus nec feugiat in fermentum. {"\n"}{"\n"}
                    Lacinia at quis risus sed vulputate. Viverra ipsum nunc aliquet bibendum enim facilisis.
                </Text>

            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    buttonsStyle: {
        position: "absolute",
        marginHorizontal: 50,
        marginVertical: 250,
    },
    aboutusText: {
        // alignItems: "flex-end",
        color: darkBlue,
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 100,
        marginBottom: 15,
        textAlign: "left",
        letterSpacing: 1,
    },
    infoText: {
        alignItems: "center",
        color: grey,
        fontSize: 12,
        textAlign: "left",
    },

});


export default Notifications;