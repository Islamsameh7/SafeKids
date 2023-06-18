import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import Ionicons from 'react-native-vector-icons/AntDesign';
import { navyblue, darkBlue, grey } from "../Constants";
import axios from "axios";
import apiRoutes from "../apiRoutes";
import { post } from "../apiCalls";
import DropdownComponent from "../DropdownComponent";
import DatePicker from 'react-native-datepicker';

const genderChoice = [
  { label: "Female", value: "female" },
  { label: "Male", value: "male" },
 
];
const cityChoice =[
  { label: "Cairo", value: "cairo" },
  { label: "Alexandria", value: "alex" },
  { label: "Matrouh", value: "matrouh" },
  { label: "Hurghada", value: "hurghada" },
  { label: "Portsaid", value: "portsaid" },
];
const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("male");
  const [city, setCity] = useState("cairo");
  const [error, setError] = useState("")
  const handleRequest = async () => {
    setError("")

    let body = JSON.stringify({
      'name': name,
      'email': email,
      'password': password,
      'birthDate': birthDate,
      'mobileNumber': mobileNumber,
      'gender':gender,
      'city':city
    })

    fetch(apiRoutes.register, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:body
      })
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          setError("User already exists")
          throw res.json()
        }
      })
      .then(json => {
       /* setUserObj(json)
        setToken(json.token)
        setIsLoggedIn(true)*/
      })
      .catch(error => {
        console.log(error)
      })
  };

  return (
    <View style={{ backgroundColor: darkBlue }}>
       <TouchableOpacity onPress={() => props.navigation.navigate("GetStarted")}><Ionicons name={'left'} size={30} color={'white'} style={{top:70,left:25}} /></TouchableOpacity>
      <View style={{ alignItems: "center", width: 460 }}>
        <View
          style={{
            backgroundColor: "white",
            height: 700,
            width: 460,
            borderTopLeftRadius: 130,
            paddingTop: 15,
            alignItems: "center",
            top: 90,
          }}
        >
          <Text
            style={{
              color: darkBlue,
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Create new {"\n"} Account
          </Text>
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
              marginRight: 240,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 25,
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

          <Text
            style={{
              color: darkBlue,
              marginRight: 240,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 2,
            }}
          >
            EMAIL
          </Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="example@website.com"
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
          ></TextInput>
          <Text
            style={{
              color: darkBlue,
              marginRight: 195,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 2,
            }}
          >
            PASSWORD
          </Text>
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
              marginRight: 195,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 2,
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
          <Text
            style={{
              color: darkBlue,
              marginRight: 155,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 2,
            }}
          >
            MOBILE NUMBER
          </Text>
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
              marginRight: 230,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 2,
            }}
          >
            GENDER
          </Text>
          
      
           <DropdownComponent
            data={genderChoice}
            onChange={(item) => {
              setGender(item);
            }}
          ></DropdownComponent>
         <Text
            style={{
              color: darkBlue,
              marginRight: 260,
              fontSize: 15,
              fontWeight: "bold",
              letterSpacing: 2,
              marginTop: 2,
            }}
          >
            CITY
          </Text>
          
      
           <DropdownComponent
            data={cityChoice}
            onChange={(item) => {
              setCity(item);
            }}
          ></DropdownComponent>

          <TouchableOpacity
            onPress={() => {
              handleRequest();
              props.navigation.navigate("Login");
            }}
            style={{
              backgroundColor: darkBlue,

              borderRadius: 100,
              alignItems: "center",
              width: 250,
              paddingVertical: 5,
              marginVertical: 10,
            }}
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
    width: "65%",
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: 7,
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
