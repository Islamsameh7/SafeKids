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

const Verification = (props) => {
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}><Ionicons name={'left'} size={30} color={darkBlue} style={{top:70,left:20}} /></TouchableOpacity>
      <Text style={styles.VerifyText}>Verification</Text>

      <View style={styles.Code}>
        <Text style={styles.EmailText}>Enter verification code</Text>

        <TextInput
          style={styles.field}
          placeholderTextColor={grey}
          placeholder="code"
          //onChangeText={(text) => setEmail(text)}
          keyboardType={"email-address"}
        ></TextInput>

        <View
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          
            <Text style={{color:"#696969"}} >If you didn't receive a code.</Text>
     
          <TouchableOpacity onPress={() => props.navigation.navigate("#")}>
          <Text
            style={{
              color: darkBlue,
              fontWeight: "bold",
              fontSize: 16,
              textDecorationLine: "underline",
              margin:5
            }}
          >
            Resend
          </Text>
          </TouchableOpacity>
          
        </View>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("NewPassword")}
          style={styles.VerifyButton}
        >
          <Text style={styles.VerifyBtnText}>Verify</Text>
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
   
    backgroundColor: "#b2b0b6",
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: "75%",

    marginVertical: 10,
  },
  VerifyText: {
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
  Code: {
    top: 190,
    alignItems: "center",
  },
  SigninText: {
    fontSize: 18,
    color: darkBlue,
  },
  VerifyBtnText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  VerifyButton: {
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
    top: 390,
  },
});

export default Verification;
