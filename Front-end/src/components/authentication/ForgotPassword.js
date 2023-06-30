import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from 'react-native-vector-icons/AntDesign';
import { blue, navyblue, darkBlue, grey } from "../Constants";

const ForgotPassword = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}><Ionicons name={'left'} size={30} color={darkBlue} style={{top:70,left:20}} /></TouchableOpacity>
      <Text style={styles.ForgotPassText}>Forgot Password</Text>

      <View style={styles.Email}>
        <Text style={styles.EmailText}>Enter Email Address</Text>

        <TextInput
          style={styles.field}
          placeholderTextColor={grey}
          placeholder="example@website.com"
          //onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
        ></TextInput>

        <TouchableOpacity onPress={() => props.navigation.navigate("Login")}>
          <Text style={styles.SigninText}>Back to sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Verification")}
          style={styles.SendButton}
        >
          <Text style={styles.SendText}>Send</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.SignupSection}>
        <Text style={{ fontSize: 16, color: darkBlue }}>
          Don't have an account?{" "}
        </Text>
        <TouchableOpacity onPress={() => props.navigation.navigate("Signup")}>
          <Text
            style={{
              color: darkBlue,
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
            }}
          >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: "#C5C5C5",
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: "89%",

    marginVertical: 10,
  },
  ForgotPassText: {
    fontSize: Dimensions.get("window").height / 23,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Dimensions.get("window").height / 9,
  },
  EmailText: {
    fontSize: Dimensions.get("window").height / 32,
    color: darkBlue,
    fontWeight: "bold",
  },
  Email: {
    marginTop: Dimensions.get("window").height / 6,
    alignItems: "center",
  },
  SigninText: {
    fontSize: Dimensions.get("window").height / 45,
    color: darkBlue,
  },
  SendText: {
    color: "#FFFFFF",
    fontSize: Dimensions.get("window").height / 40,
  },
  SendButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: Dimensions.get("window").width/2,
    paddingVertical: 7,
    marginTop: Dimensions.get("window").height / 10,
  },
  SignupSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop:20,
  },
});

export default ForgotPassword;
