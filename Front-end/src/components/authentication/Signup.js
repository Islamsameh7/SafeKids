import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { navyblue, darkBlue, grey } from "../Constants";
import axios from "axios";
import apiRoutes from "../apiRoutes";
import { post } from "../apiCalls";
import DropdownComponent from "../DropdownComponent";
import DatePicker from "react-native-datepicker";

const genderChoice = [
  { label: "Female", value: "F" },
  { label: "Male", value: "M" },
];
const cityChoice = [
  { label: "Cairo", value: "cairo" },
  { label: "Alexandria", value: "alex" },
  { label: "Matrouh", value: "matrouh" },
  { label: "Hurghada", value: "hurghada" },
  { label: "Portsaid", value: "portsaid" },
];

const showAlert = (message) => {
  Alert.alert("", message, [{ text: "OK" }], { cancelable: true });
};

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");

  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [error, setError] = useState("");

  const register = async () => {
    const formData = new FormData();

    formData.append("name", name);
   
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthdate", birthDate);
    formData.append("phoneNumber", mobileNumber);
    formData.append("city", city);
    formData.append("username", name);
    formData.append("gender", gender);

    validateEmail();
    validateMobile();
    validatePassword();

    if (isEmailValid && isPasswordValid && isPhoneValid) {
      console.log(formData);
      const response = await fetch(apiRoutes.register, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        // Successful response
        const responseData = await response.text();
        console.log("User Registered Successfully:", responseData);
        showAlert("Registered Successfully");
        props.navigation.navigate("Login");
      } else {
        // Error response
        const errorData = await response.text();
        console.log("Failed to register user:", errorData);
      }
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailRegex.test(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };

  const validatePassword = () => {
    if (password === "" || password.length<8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const validateMobile = () => {
    const mobileRegex = /^(011|010|012)\d{8}$/;
    if (mobileNumber === "" || !mobileRegex.test(mobileNumber)) {
      setPhoneValid(false);
    } else {
      setPhoneValid(true);
    }
  };
  return (
    <View style={{ backgroundColor: darkBlue }}>
      <TouchableOpacity onPress={() => props.navigation.navigate("GetStarted")}>
        <Ionicons
          name={"left"}
          size={30}
          color={"white"}
          style={{
            marginTop: Dimensions.get("window").height / 20,
            left: Dimensions.get("window").width / 20,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          alignItems: "center",
          width: Dimensions.get("window").width / 0.9,
        }}
      >
        <View style={styles.pageLayout}>
          <Text style={styles.createAccText}>Create new {"\n"} Account</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: darkBlue }}>
              Already Registered?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: darkBlue,
                  fontWeight: "bold",
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: darkBlue,
              marginRight: Dimensions.get("window").width / 1.22,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: Dimensions.get("window").height / 40,
            }}
          >
            NAME
          </Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="John Doe"
            onChangeText={(text) => setName(text)}
          ></TextInput>
          <View style={styles.row}>
            <Text
              style={{
                color: darkBlue,
                flex: 1,
                alignItems: "flex-start",
                left: Dimensions.get("window").width / 9.6,
                fontSize: 15,
                fontWeight: "bold",
                letterSpacing: 2,
              }}
            >
              EMAIL
            </Text>
            {!isEmailValid && (
              <Text
                style={{
                  marginRight: Dimensions.get("window").width / 4.2,
                  color: "red",
                }}
              >
                *Please enter a valid email address*
              </Text>
            )}
          </View>

          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="example@website.com"
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
          ></TextInput>

          <View style={styles.row}>
            <Text
              style={{
                color: darkBlue,
                flex: 1,
                alignItems: "flex-start",
                left: Dimensions.get("window").width / 9.6,
                fontSize: 15,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get("window").height / 200,
              }}
            >
              PASSWORD
            </Text>
            {!isPasswordValid && (
              <Text
                style={{
                  marginRight: Dimensions.get("window").width / 6.4,
                  color: "red",
                }}
              >
                *Password Must be at least 8 characters*
              </Text>
            )}
          </View>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="********"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          ></TextInput>
          <Text
            style={{
              color: darkBlue,
              marginRight: Dimensions.get("window").width / 1.5,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: Dimensions.get("window").height / 200,
            }}
          >
            BIRTH DATE
          </Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="DD-MM-YYYY"
            onChangeText={(text) => setBirthDate(text)}
          ></TextInput>
            <View style={styles.row}>
          <Text
            style={{
              color: darkBlue,
              flex:1,
              left: Dimensions.get("window").width / 10,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: Dimensions.get("window").height / 200,
            }}
          >
            MOBILE NUMBER
          </Text>
          {!isPhoneValid && (
              <Text
                style={{
                  marginRight: Dimensions.get("window").width / 3.4,
                  color: "red",
                }}
              >
                *invalid phone number*
              </Text>
            )}
            </View>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="Contact Number"
            onChangeText={(text) => setMobileNumber(text)}
            keyboardType={"numeric"}
          ></TextInput>
          <Text
            style={{
              color: darkBlue,
              marginRight: Dimensions.get("window").width / 1.34,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: Dimensions.get("window").height / 200,
            }}
          >
            GENDER
          </Text>

          <DropdownComponent
            data={genderChoice}
            onChange={(item) => {
              setGender(item.value);
            }}
          ></DropdownComponent>
          <Text
            style={{
              color: darkBlue,
              marginRight: Dimensions.get("window").width / 1.24,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: Dimensions.get("window").height / 200,
            }}
          >
            CITY
          </Text>

          <DropdownComponent
            data={cityChoice}
            onChange={(item) => {
              setCity(item.value);
            }}
          ></DropdownComponent>

          <TouchableOpacity
            onPress={() => {
              register();
            }}
            style={styles.signupButton}
          >
            <Text style={{ color: "white", fontSize: 23, fontWeight: "bold" }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 100,
    color: navyblue,
    paddingHorizontal: 8,
    paddingVertical: 6,
    width: Dimensions.get("window").width / 1.2,
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: 7,
    marginRight: Dimensions.get("window").width / 10,
  },
  createAccText: {
    color: darkBlue,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: Dimensions.get("window").height / 60,
  },
  pageLayout: {
    backgroundColor: "white",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width + Dimensions.get("window").width / 7,
    borderTopLeftRadius: Dimensions.get("window").height / 7,
    paddingTop: 15,
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 50,
  },
  signupButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    paddingVertical: 5,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
  },
});

export default Signup;
/*
<TextInput
            style={styles.field}
            placeholderTextColor={navyblue}
            placeholder="Last Name"
            onChangeText={(text) => setLastname(text)}
          ></TextInput>
          
          */
