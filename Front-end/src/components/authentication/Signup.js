import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Dimensions,
  Alert,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { navyblue, darkBlue, grey } from "../Constants";
import axios from "axios";
import apiRoutes from "../apiRoutes";
import { post } from "../apiCalls";
import DropdownComponent from "../DropdownComponent";
// import DatePicker from "react-native-datepicker";

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
var days = [];

const months = [];

for (let i = 1; i <= 12; i++) {
  months.push({ label: String(i), value: String(i) });
}
const years = [];

for (let i = 1960; i <= 2005; i++) {
  years.push({ label: String(i), value: String(i) });
}

const showAlert = (message) => {
  Alert.alert("", message, [{ text: "OK" }], { cancelable: true });
};

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isNationalIDValid, setIsNationalIDValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);
  const [isPhoneValid, setPhoneValid] = useState(true);
  const [isBirthDateValid, setBirthDateValid] = useState(true);
  const [isGenderValid, setIsGenderValid] = useState(true);
  const [isCityValid, setIsCityValid] = useState(true);

  const [emailExists, setEmailExists] = useState(false);
  const [phoneExists, setPhoneExists] = useState(false);
  const [nationalIdExists, setNationalIdExists] = useState(false);

  const [dateArr, setDateArr] = useState([]);
  const setDays = () => {
    days = [];
    if (
      month == 1 ||
      month == 3 ||
      month == 5 ||
      month == 7 ||
      month == 8 ||
      month == 10 ||
      month == 12
    ) {
      for (let i = 1; i <= 31; i++) {
        days.push({ label: String(i), value: String(i) });
      }
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      for (let i = 1; i <= 30; i++) {
        days.push({ label: String(i), value: String(i) });
      }
    } else {
      for (let i = 1; i <= 28; i++) {
        days.push({ label: String(i), value: String(i) });
      }
    }
  };

 
  const register = async () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("national_id", nationalID);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("birthdate", year + "-" + month + "-" + day);
    formData.append("phoneNumber", mobileNumber);
    formData.append("city", city);
    formData.append("username", email);
    formData.append("gender", gender);

    validateBirthdate();
    validateName(name);
    validateEmail(email);
    validateMobile(mobileNumber);
    validatePassword(password);
    validateNationalID(nationalID);
    validateCity(city);
    validateGender(gender);

    if (
      isEmailValid &&
      isPasswordValid &&
      isPhoneValid &&
      isBirthDateValid &&
      isNationalIDValid
    ) {
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
        props.navigation.navigate("GetStarted");
      } else {
        // Error response
        const responseData = await response.json();

        Object.keys(responseData).forEach((field) => {
          const errors = responseData[field];
          console.log(`Field: ${field}`);

          if (Object.keys(responseData).length <= 4) {
            errors.forEach((error) => {
              
              if (field == "email" && isEmailValid) {
              
                setEmailExists(true);
              }
              if (field == "phoneNumber" && isPhoneValid) {
                setPhoneExists(true);
              }
              if (field == "national_id" && isNationalIDValid) {
                setNationalIdExists(true);
              }
            });
          }

          console.log(
            "Failed to register user: " + Object.keys(responseData).length
          );
        });
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "" || !emailRegex.test(email)) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
    }
  };
  const validateNationalID = (nationalID) => {
    const nationalIDRegex =
      /^(2|3)([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])(01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)([13579]{4}|[02468]{4})([1-9])$/;
    if (nationalID === "" || !nationalIDRegex.test(nationalID)) {
      setIsNationalIDValid(false);
    } else {
      setIsNationalIDValid(true);
    }
  };

  const validatePassword = (password) => {
    if (password === "" || password.length < 8) {
      setPasswordValid(false);
    } else {
      setPasswordValid(true);
    }
  };

  const validateMobile = (mobileNumber) => {
    const mobileRegex = /^(011|010|012)\d{8}$/;
    if (mobileNumber === "" || !mobileRegex.test(mobileNumber)) {
      setPhoneValid(false);
    } else {
      setPhoneValid(true);
    }
  };
  const checkBirthDate = (str) => {
    setDateArr((prevArray) => [...prevArray, ...str]);
    if (day != "" && month != "" && year != "") {
      setBirthDateValid(true);
    } else if (dateArr.length == 2) {
      setBirthDateValid(true);
    } else {
      setBirthDateValid(false);
    }
  };
  const validateBirthdate = () => {
    if (day != "" && month != "" && year != "") {
      setBirthDateValid(true);
    } else {
      setBirthDateValid(false);
    }
  };
  const validateName = (name) => {
    if (name != "") {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };
  const validateGender = (gender) => {
    if (gender != "") {
      setIsGenderValid(true);
    } else {
      setIsGenderValid(false);
    }
  };
  const validateCity = (city) => {
    if (city != "") {
      setIsCityValid(true);
    } else {
      setIsCityValid(false);
    }
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={{ backgroundColor: darkBlue }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("GetStarted")}
          >
            <Ionicons
              name={"left"}
              size={30}
              color={"white"}
              style={{
                marginTop: Dimensions.get("window").height / 20,
                left: Dimensions.get("window").width / 10,
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
              <Text style={styles.createAccText}>
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
                    marginTop: Dimensions.get("window").height / 40,
                  }}
                >
                  NAME
                </Text>
                {!isNameValid && (
                  <Text
                    style={{
                      marginRight: Dimensions.get("window").width / 2.3,
                      marginTop: Dimensions.get("window").height / 40,
                      color: "red",
                    }}
                  >
                    *Name Is Required*
                  </Text>
                )}
              </View>

              <TextInput
                style={styles.field}
                placeholderTextColor="rgba(128, 128, 128, 1)"
                placeholder="eg.. Ahmed Khaled"
                onChangeText={(text) => {
                  setName(text);
                  validateName(text);
                }}
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
                {emailExists && isEmailValid && (
                  <Text
                    style={{
                      marginRight: Dimensions.get("window").width / 4.2,
                      color: "red",
                    }}
                  >
                    *Email Address Already Exists*
                  </Text>
                )}
              </View>

              <TextInput
                style={styles.field}
                placeholderTextColor="rgba(128, 128, 128, 1)"
                placeholder="example@website.com"
                onChangeText={(text) => {
                  setEmail(text);
                  validateEmail(text);
                  setEmailExists(false);
                }}
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
                  }}
                >
                  NATIONAL ID
                </Text>
                {!isNationalIDValid && (
                  <Text
                    style={{
                      marginRight: Dimensions.get("window").width / 4.2,
                      color: "red",
                    }}
                  >
                    *Please enter a valid National ID*
                  </Text>
                )}
                {isNationalIDValid && nationalIdExists && (
                  <Text
                    style={{
                      marginRight: Dimensions.get("window").width / 4.2,
                      color: "red",
                    }}
                  >
                    *This National Id Already Exists*
                  </Text>
                )}
              </View>

              <TextInput
                style={styles.field}
                placeholderTextColor="rgba(128, 128, 128, 1)"
                placeholder="Type Your National Id (14 numbers)"
                onChangeText={(text) => {
                  setNationalID(text);
                  validateNationalID(text);
                  setNationalIdExists(false);
                }}
                keyboardType={"numeric"}
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
                placeholderTextColor="rgba(128, 128, 128, 1)"
                placeholder="********"
                onChangeText={(text) => {
                  setPassword(text);
                  validatePassword(text);
                }}
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
              {!isBirthDateValid && (
                <Text
                  style={{
                    marginRight: Dimensions.get("window").width / 6.4,
                    color: "red",
                  }}
                >
                  *Birthdate not valid*
                </Text>
              )}
              <View style={styles.row}>
                <DropdownComponent
                  data={years}
                  onChange={(item) => {
                    setYear(item.value);
                    checkBirthDate("y");
                  }}
                  dropdownStyle={styles.dateDropdown}
                  placeholder={"Year"}
                ></DropdownComponent>
                <DropdownComponent
                  data={months}
                  onChange={(item) => {
                    setMonth(item.value);
                    setDays();
                    checkBirthDate("m");
                  }}
                  dropdownStyle={styles.dateDropdown}
                  placeholder={"Month"}
                ></DropdownComponent>
                <DropdownComponent
                  data={days}
                  onChange={(item) => {
                    setDay(item.value);
                    checkBirthDate("d");
                  }}
                  dropdownStyle={styles.dateDropdown}
                  placeholder={"Day"}
                ></DropdownComponent>
              </View>

              <View style={styles.row}>
                <Text
                  style={{
                    color: darkBlue,
                    flex: 1,
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
                    *Invalid phone number*
                  </Text>
                )}
                {isPhoneValid && phoneExists && (
                  <Text
                    style={{
                      marginRight: Dimensions.get("window").width / 4.2,
                      color: "red",
                    }}
                  >
                    *This Phone Number Already Exists*
                  </Text>
                )}
              </View>
              <TextInput
                style={styles.field}
                placeholderTextColor="rgba(128, 128, 128, 1)"
                placeholder="Contact Number"
                onChangeText={(text) => {
                  setMobileNumber(text);
                  validateMobile(text);
                  setPhoneExists(false);
                }}
                keyboardType={"numeric"}
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
                  GENDER
                </Text>
                {!isGenderValid && (
                  <Text
                    style={{
                      marginRight: Dimensions.get("window").width / 2.3,
                      color: "red",
                    }}
                  >
                    *Gender Is Required*
                  </Text>
                )}
              </View>
              <DropdownComponent
                data={genderChoice}
                onChange={(item) => {
                  setGender(item.value);
                  validateGender(item.value);
                }}
                dropdownStyle={styles.dropdown}
                placeholder={"select one..."}
              ></DropdownComponent>
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
                CITY
              </Text>
              {!isCityValid && (
                <Text
                  style={{
                    marginRight: Dimensions.get("window").width / 2.3,
                    color: "red",
                  }}
                >
                  *City Is Required*
                </Text>
              )}
              </View>
              
              <DropdownComponent
                data={cityChoice}
                onChange={(item) => {
                  setCity(item.value);
                  validateCity(item.value);
                }}
                dropdownStyle={styles.dropdown}
                placeholder={"select one..."}
              ></DropdownComponent>

              <TouchableOpacity
                onPress={() => {
                  register();
                }}
                style={styles.signupButton}
              >
                <Text
                  style={{ color: "white", fontSize: 23, fontWeight: "bold" }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  scrollViewContent: {
    alignItems: "center",

    paddingBottom: Dimensions.get("window").height / 10,
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
  dropdown: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: Dimensions.get("window").width / 1.2,
    backgroundColor: "rgb(220, 220, 220)",
    marginVertical: 10,
    marginRight: Dimensions.get("window").width / 10,
  },
  dateDropdown: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: Dimensions.get("window").width / 4.7,
    backgroundColor: "rgb(220, 220, 220)",
    marginVertical: 10,
    marginRight: Dimensions.get("window").width / 10,
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
