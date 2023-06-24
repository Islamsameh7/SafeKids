import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  ScrollView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import Ionicons from 'react-native-vector-icons/AntDesign';
import { navyblue, darkBlue, grey } from "../Constants";
import axios from "axios";
import apiRoutes from "../apiRoutes";
import { post } from "../apiCalls";
import DropdownComponent from "../DropdownComponent";
import DatePicker from 'react-native-datepicker';

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
const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("")


  const register = async () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('birthdate', birthDate);
    formData.append('phoneNumber', mobileNumber);
    formData.append('city', city);
    formData.append('username', email);
    formData.append('gender', gender);

    try {
      const response = await fetch(apiRoutes.register, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.ok) {
        // Successful response
        const responseData = await response.json();
        console.log('User Registered Successfully:', responseData);
      } else {
        // Error response
        const errorData = await response.text();
        console.log('Failed to register user:', errorData);
      }
    } catch (error) {
      // Network or other error
      console.log('Error:', error.message);
    }

  }

  return (
    // style={{ backgroundColor: darkBlue }}
    <ScrollView>
    <View style={{ backgroundColor: darkBlue }}>
      <TouchableOpacity onPress={() => props.navigation.navigate("GetStarted")}><Ionicons name={'left'} size={"25%"} color={'white'} style={{ top: "150%", left: "5%" }} /></TouchableOpacity>
      <View style={{ alignItems: "center", width: "100%" }}>
        <View
          style={{
            backgroundColor: "white",
            
            height: "100%",
            width: "100%",
            borderTopLeftRadius: "70%",
            paddingTop: Dimensions.get('window').height / 20,
            alignItems: "center",
            top: Dimensions.get('window').height /12,
          }}
        >
          <Text
            style={{
              color: darkBlue,
              fontSize: Dimensions.get('window').width / 15,
              fontWeight: "bold",
              marginBottom: Dimensions.get('window').height / 120,
              marginLeft: Dimensions.get('window').width / 100
            }}
          >
            Create new Account
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: Dimensions.get('window').width / 28, color: darkBlue }}>
              Already Registered?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("Login")}
            >
              <Text
                style={{
                  color: darkBlue,
                  fontWeight: "bold",
                  fontSize: Dimensions.get('window').width / 28,
                  textDecorationLine: "underline",
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {/* <ScrollView> */}
            <Text
              style={{
                color: darkBlue,
                marginRight: Dimensions.get('window').width / 1.5,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 50,
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
                marginRight: Dimensions.get('window').width / 1.5,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 120,
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
                marginRight: Dimensions.get('window').width / 1.8,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 120,
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
                marginRight: Dimensions.get('window').width / 1.8,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 120,
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
                marginRight: Dimensions.get('window').width / 2.2,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 120,
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
                marginRight: Dimensions.get('window').width / 1.6,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 120,
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
                marginRight: Dimensions.get('window').width / 1.4,
                fontSize: Dimensions.get('window').width / 25,
                fontWeight: "bold",
                letterSpacing: 2,
                marginTop: Dimensions.get('window').height / 200,
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
                props.navigation.navigate("Login");
              }}
              style={{
                backgroundColor: darkBlue,

                borderRadius: "100%",
                alignItems: "center",
                width: "40%",
                paddingVertical: Dimensions.get('window').height /90,
                marginTop: Dimensions.get('window').height /50,
                paddingBottomBottom:Dimensions.get('window').height /50,
                //marginVertical: Dimensions.get('window').height /40,
              }}
            >
              <Text style={{ color: "white", fontSize: Dimensions.get('window').width /20, fontWeight: "bold" }}>
                Sign up
              </Text>
            </TouchableOpacity>
            {/* </ScrollView> */}
        </View>


      </View>
    
      </View >
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: "100%",
    color: navyblue,
    paddingHorizontal: Dimensions.get('window').width / 22,
    paddingVertical: Dimensions.get('window').height / 70,
    width: "85%",
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: Dimensions.get('window').height / 80,
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
