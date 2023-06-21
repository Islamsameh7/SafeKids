import React, { useState, useEffect,useContext } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    
} from "react-native";
import { darkBlue, lightGrey } from "../Constants";
import { GlobalContext } from "../context/GlobalContext";


const UserProfile = (props) => {
    const { user } = useContext(GlobalContext);
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
                        width: 80, height: 80, borderRadius: 200, backgroundColor: "white",
                        marginTop: -50
                    }}></Image>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Name: {"\t"} {"\t"} {user.name} </Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Birth date: {"\t"} {"\t"} {user.birthdate}</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Mobile No: {"\t"} {user.phonenumber}</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Email: {"\t"} {user.email}</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>Gender: {"\t"} {"\t"} {user.gender}</Text>
                    <Text style={{ marginTop: 30, fontSize: 15, color: darkBlue }}>City: {"\t"} {"\t"} {user.city}</Text>

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