import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  TextInput,
} from "react-native";
import { darkBlue, lightGrey, grey } from "../Constants";
import { GlobalContext } from "../context/GlobalContext";
import Ionicons from "react-native-vector-icons/AntDesign";
import apiRoutes from "../apiRoutes";

const UserProfile = (props) => {
  const { user, updateUserContext } = useContext(GlobalContext);
  const [isNameVisible, setIsNameVisible] = useState(true);
  const [isDateVisible, setIsDateVisible] = useState(true);
  const [isMobileVisible, setIsMobileVisible] = useState(true);
  const [isCityVisible, setIsCityVisible] = useState(true);
  const [isEditIconVisible, setEditIconVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(true);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");

  const handleEditProfile = () => {
    setEditIconVisible(!isEditIconVisible);
    setIsEditProfileVisible(!isEditProfileVisible);
  };
  const editUser = async () => {
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("name", name);
    formData.append("birthdate", birthDate);
    formData.append("phonenumber", phoneNumber);
    formData.append("city", city);

    const response = await fetch(apiRoutes.edit_user, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.ok) {
      //const responseData = await response.text();
      console.log("User Updated Successfully");
      const userData = await response.json();
      updateUserContext(userData);
      props.navigation.replace("UserProfile");
    } else {
      // Error response
      const errorData = await response.text();
      console.log("Failed to Update User:", errorData);
    }
  };
  return (
    <View>
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: darkBlue,
            height: Dimensions.get("window").height / 7,
            borderBottomLeftRadius: 500,
            borderBottomRightRadius: 500,
          }}
        ></View>

        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            source={require("../../assets/user.png")}
            style={{
              width: 80,
              height: 80,
              borderRadius: 200,
              backgroundColor: "white",
              marginTop: -50,
            }}
          ></Image>

          {/* NAME FIELD */}
          <View style={styles.row}>
            {isNameVisible && (
              <Text style={styles.infoField}>
                Name: {"\t"} {"\t"} {user.name}{" "}
              </Text>
            )}
            {!isNameVisible && (
              <View style={styles.nameInputField}>
                <Text style={styles.Text}>Name:</Text>
                <TextInput
                  style={styles.field}
                  placeholderTextColor={grey}
                  // placeholder="Jiara Martins"
                  onChangeText={(name) => setName(name)}
                ></TextInput>
              </View>
            )}
            {isEditIconVisible && (
              <TouchableOpacity
                onPress={() => setIsNameVisible(!isNameVisible)}
              >
                <Ionicons
                  name={"edit"}
                  size={25}
                  color={darkBlue}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* DATE FIELD */}
          <View style={styles.row}>
            {isDateVisible && (
              <Text style={styles.infoField}>
                Birth date: {"\t"} {"\t"} {user.birthdate}
              </Text>
            )}
            {!isDateVisible && (
              <View style={styles.inputField}>
                <Text style={styles.Text}>BirthDate:</Text>
                <TextInput
                  style={styles.field}
                  placeholderTextColor={grey}
                  // placeholder="Jiara Martins"
                  onChangeText={(date) => setBirthDate(date)}
                ></TextInput>
              </View>
            )}
            {isEditIconVisible && (
              <TouchableOpacity
                onPress={() => setIsDateVisible(!isDateVisible)}
              >
                <Ionicons
                  name={"edit"}
                  size={25}
                  color={darkBlue}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* MOBILE FIELD */}
          <View style={styles.row}>
            {isMobileVisible && (
              <Text style={styles.infoField}>
                Mobile No: {"\t"} {user.phonenumber}
              </Text>
            )}
            {!isMobileVisible && (
              <View style={styles.inputField}>
                <Text style={styles.Text}>Mobile No:</Text>
                <TextInput
                  style={styles.field}
                  placeholderTextColor={grey}
                  // placeholder="Jiara Martins"
                  onChangeText={(mobile) => setPhoneNumber(mobile)}
                ></TextInput>
              </View>
            )}
            {isEditIconVisible && (
              <TouchableOpacity
                onPress={() => setIsMobileVisible(!isMobileVisible)}
              >
                <Ionicons
                  name={"edit"}
                  size={25}
                  color={darkBlue}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* CITY FIELD */}
          <View style={styles.row}>
            {isCityVisible && (
              <Text style={styles.infoField}>
                City: {"\t"} {"\t"} {user.city}
              </Text>
            )}
            {!isCityVisible && (
              <View style={styles.inputField}>
                <Text style={styles.Text}>City:</Text>
                <TextInput
                  style={styles.field}
                  placeholderTextColor={grey}
                  // placeholder="Jiara Martins"
                  onChangeText={(city) => setCity(city)}
                ></TextInput>
              </View>
            )}
            {isEditIconVisible && (
              <TouchableOpacity
                onPress={() => setIsCityVisible(!isCityVisible)}
              >
                <Ionicons
                  name={"edit"}
                  size={25}
                  color={darkBlue}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View>
          <TouchableOpacity
            style={styles.MykidsButton}
            onPress={() => props.navigation.navigate("MyKids")}
          >
            <Text style={styles.MykidsText}>My Kids </Text>
          </TouchableOpacity>
          {isEditProfileVisible && (
            <TouchableOpacity
              style={styles.EditButton}
              onPress={() => handleEditProfile()}
            >
              <Text style={styles.EditText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          {!isEditProfileVisible && (
            <TouchableOpacity
              style={styles.EditButton}
              onPress={() => editUser()}
            >
              <Text style={styles.EditText}>Submit</Text>
            </TouchableOpacity>
          )}
          {!isEditProfileVisible && (
            <TouchableOpacity
              style={styles.discardChanges}
              onPress={() => props.navigation.replace("UserProfile")}
            >
              <Text style={styles.discardText}>Discard Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  discardChanges: {
    marginLeft: Dimensions.get("window").width / 2.6,
    marginTop: Dimensions.get("window").height / 35,
  },
  discardText: {
    textDecorationLine: "underline",
  },
  MykidsButton: {
    alignItems: "center",
    width: 200,
    paddingVertical: 15,
    marginLeft: "25%",
    marginTop: Dimensions.get("window").height / 20,
  },
  field: {
    borderRadius: 100,
    backgroundColor: lightGrey,
    width: Dimensions.get("window").width / 2,
    height: Dimensions.get("window").height / 20,
    paddingLeft: 20,
    fontSize: Dimensions.get("window").width / 30,
    marginVertical: Dimensions.get("window").height / 100,
  },
  Text: {
    fontSize: 15,
    marginRight: Dimensions.get("window").width / 70,
    marginTop: Dimensions.get("window").height / 45,
    color: darkBlue,
  },
  MykidsText: {
    color: darkBlue,
    fontSize: 18,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  EditButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 200,
    paddingVertical: 13,
    marginLeft: "25%",
  },
  EditText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  infoField: {
    marginTop: Dimensions.get("window").height / 22,
    fontSize: 15,
    color: darkBlue,
  },
  nameInputField: {
    flexDirection: "row",
    marginTop: Dimensions.get("window").height / 22,
    marginLeft: Dimensions.get("window").width / 10,
  },
  inputField: {
    flexDirection: "row",
    marginTop: Dimensions.get("window").height / 30,
    marginLeft: Dimensions.get("window").width / 100,
  },
  row: {
    flexDirection: "row",
  },
  editIcon: {
    marginTop: Dimensions.get("window").height / 22,
    marginLeft: Dimensions.get("window").width / 20,
  },
});

export default UserProfile;
