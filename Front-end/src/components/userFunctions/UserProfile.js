import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { darkBlue, lightGrey } from "../Constants";



const UserProfile = (props) => {

    return (
        <View>
            <ScrollView>

                <View style={{
                    padding: 10, width: "100%", backgroundColor: darkBlue, height: 150, borderBottomLeftRadius: 500,
                    borderBottomRightRadius: 500,
                }}>

                </View>
                <View style={{ alignItems: "center" }}>
                    <Image source={require("../../assets/user.png")} style={{
                        width: 80, height: 80, borderRadius: "200", backgroundColor: "white",
                        marginTop: -50
                    }}></Image>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Name: {"\t"} {"\t"} Menna Adel </Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Birth date: {"\t"} {"\t"} 3-2-1985</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Mobile No: {"\t"} 010 258 789 12</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Email: {"\t"} hello@reallygreatsite.com</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Gender: {"\t"} {"\t"} Female</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>City: {"\t"} {"\t"} Cairo</Text>

                </View>

                <View>
                    <TouchableOpacity style={styles.MykidsButton} onPress={() => props.navigation.navigate("MyKids")}>
                        <Text style={styles.MykidsText}>My Kids </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.EditButton} >
                        <Text style={styles.EditText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>

    );
};


const styles = StyleSheet.create({
    MykidsButton: {

        alignItems: "center",
        width: 200,
        paddingVertical: 15,
        marginLeft: "25%",
        marginTop: 70

    },
    MykidsText: {
        color: darkBlue,
        fontSize: 18,
        fontWeight: "bold",
        textDecorationLine: "underline"
    },
    EditButton: {
        backgroundColor: darkBlue,
        borderRadius: 100,
        alignItems: "center",
        width: 200,
        paddingVertical: 15,
        marginLeft: "25%",

    },
    EditText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default UserProfile;