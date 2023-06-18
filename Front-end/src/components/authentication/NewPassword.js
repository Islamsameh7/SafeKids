import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { blue, navyblue, darkBlue, grey,lightGrey } from "../Constants";

const NewPassword = (props) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Verification")}
      >
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 70, left: 20 }}
        />
      </TouchableOpacity>
      <Text style={styles.NewPassText}>New Password</Text>

      <View style={styles.Fields}>
        <Text style={styles.EmailText}>Enter New Password</Text>

        <TextInput
          style={styles.field}
          placeholderTextColor={grey}
          placeholder="******************"
          //onChangeText={(text) => setEmail(text)}
          secureTextEntry={true}
        ></TextInput>

        <Text style={styles.EmailText}>Confirm Password</Text>

        <TextInput
          style={styles.field}
          placeholderTextColor={grey}
          placeholder="******************"
          //onChangeText={(text) => setEmail(text)}
          secureTextEntry={true}
        ></TextInput>

        <TouchableOpacity
          onPress={() => props.navigation.navigate("Login")}
          style={styles.SubmitButton}
        >
          <Text style={styles.SubmitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 100,
    borderWidth: 4,
    borderColor: lightGrey,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: "89%",

    marginVertical: 10,
  },
  NewPassText: {
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
  Fields: {
    top: 190,
    alignItems: "center",
  },
  SigninText: {
    fontSize: 18,
    color: darkBlue,
  },
  SubmitText: {
    color: "#FFFFFF",
    fontSize: 24,
  },
  SubmitButton: {
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

export default NewPassword;
