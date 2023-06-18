import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
    fontSize: 35,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    top: 90,
  },
  EmailText: {
    fontSize: 25,
    color: darkBlue,
    fontWeight: "bold",
  },
  Email: {
    top: 190,
    alignItems: "center",
  },
  SigninText: {
    fontSize: 18,
    color: darkBlue,
  },
  SendText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  SendButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 260,
    paddingVertical: 7,
    marginTop: 80,
  },
  SignupSection: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    top:390,
  },
});

export default ForgotPassword;
