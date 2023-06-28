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
import { darkBlue, grey, lightGrey } from "../Constants";
import Ionicons from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { GlobalContext } from "../context/GlobalContext";
import apiRoutes from "../apiRoutes";
const KidProfile = (props) => {
  const [isParent, setIsParent] = useState(false);

  const [isNameVisible, setIsNameVisible] = useState(true);
  const [isBirthDateVisible, setIsBirthDateVisible] = useState(true);
  const [isGenderVisible, setIsGenderVisible] = useState(true);
  const [isLostDateVisible, setIsLostDateVisible] = useState(true);
  const [isLastKnownVisible, setIsLastKnownVisible] = useState(true);
  const [isEditIconVisible, setEditIconVisible] = useState(false);
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(true);

  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [lastKnown, setLastKnown] = useState("");

  const { user,currentKidProfile } = useContext(GlobalContext);


  const handleEditProfile = () => {
    setEditIconVisible(!isEditIconVisible);
    setIsEditProfileVisible(!isEditProfileVisible);
  };
  useEffect(() => {
    if (currentKidProfile.kid.user == user.id) {
      setIsParent(true);
    }

    // Return a cleanup function to run when the component unmounts
    return () => {
      // Code to clean up any resources or subscriptions
    };
  }, []);

  const editKid = async () => {
    const formData = new FormData();
    formData.append("kid_id", currentKidProfile.kid.id);
    formData.append("name", name);
    formData.append("lostDate", lostDate);
    formData.append("lastKnownLocation", lastKnown);
    formData.append("birthdate", birthDate);
    /*
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();

      const fileName = image.split("/").pop(); // Extract the file name from the URI

      const fileType = blob.type; // Get the MIME type of the file

      if (
        fileType === "image/jpeg" ||
        fileType === "image/png" ||
        fileType === "image/jpg"
      ) {
        formData.append("photo", {
          uri: image,
          name: fileName,
          type: fileType,
        });
      } else {
        console.log(
          "Invalid file type. Only JPG, PNG, and JPEG images are allowed."
        );
        return;
      }
    }*/
    const response = await fetch(apiRoutes.edit_user, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.ok) {
      //const responseData = await response.text();
      console.log("kid Updated Successfully");
   
      props.navigation.replace("KidProfile");
    } else {
      // Error response
      const errorData = await response.text();
      console.log("Failed to Update Kid:", errorData);
    }
   
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("UserProfile")}
      >
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 50, left: 20 }}
        />
      </TouchableOpacity>

      <View>
        <Image
          source={{ uri: apiRoutes.mainUrl + currentKidProfile.photo }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 200,
            backgroundColor: "white",
            marginTop: 50,
            alignSelf: "center",
          }}
        ></Image>
        <Text
          style={{
            alignSelf: "center",
            marginLeft: 20,
            marginTop: 30,
            color: darkBlue,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Personal Details:
        </Text>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Name:</Text>
          {!isNameVisible && (
            <TextInput
              style={styles.field}
              placeholderTextColor={grey}
              // placeholder="Jiara Martins"
              onChangeText={(name) => setName(name)}
            ></TextInput>
          )}
          {isNameVisible && (
            <Text
              style={{
                color: darkBlue,
                marginLeft: Dimensions.get("window").width / 20,
                fontSize: 15,
              }}
            >
              {currentKidProfile.kid.name}
            </Text>
          )}
          {isEditIconVisible && (
            <TouchableOpacity onPress={() => setIsNameVisible(!isNameVisible)}>
              <Ionicons
                name={"edit"}
                size={25}
                color={darkBlue}
                style={styles.editIcon}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Birth date:</Text>
          {!isBirthDateVisible && (
            <TextInput
              style={styles.field}
              placeholderTextColor={grey}
              // placeholder="Jiara Martins"
              onChangeText={(birthDate) => setBirthDate(birthDate)}
            ></TextInput>
          )}
          {isBirthDateVisible && (
            <Text
              style={{
                color: darkBlue,
                marginLeft: Dimensions.get("window").width / 20,
                fontSize: 15,
              }}
            >
              {currentKidProfile.kid.birthdate}
            </Text>
          )}
          {isEditIconVisible && (
            <TouchableOpacity
              onPress={() => setIsBirthDateVisible(!isBirthDateVisible)}
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

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Gender:</Text>

          <Text
            style={{
              color: darkBlue,
              marginLeft: Dimensions.get("window").width / 20,
              fontSize: 15,
            }}
          >
            {currentKidProfile.kid.gender}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Lost date:</Text>
          {!isLostDateVisible && (
            <TextInput
              style={styles.field}
              placeholderTextColor={grey}
              // placeholder="Jiara Martins"
              onChangeText={(date) => setLostDate(date)}
            ></TextInput>
          )}
          {isLostDateVisible && (
            <Text
              style={{
                color: darkBlue,
                marginLeft: Dimensions.get("window").width / 20,
                fontSize: 15,
              }}
            >
              {currentKidProfile.kid.lost_date}
            </Text>
          )}
          {isEditIconVisible && (
            <TouchableOpacity
              onPress={() => setIsLostDateVisible(!isLostDateVisible)}
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

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>
            Last Known Location:
          </Text>
          {!isLastKnownVisible && (
            <TextInput
              style={styles.field}
              placeholderTextColor={grey}
              onChangeText={(location) => setLastKnown(location)}
            ></TextInput>
          )}
          {isLastKnownVisible && (
            <Text
              style={{
                color: darkBlue,
                marginLeft: Dimensions.get("window").width / 20,
                fontSize: 15,
              }}
            >
              Dokki
            </Text>
          )}
          {isEditIconVisible && (
            <TouchableOpacity
              onPress={() => setIsLastKnownVisible(!isLastKnownVisible)}
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

        <Text
          style={{
            alignSelf: "center",
            marginTop: Dimensions.get("window").height / 20,
            color: darkBlue,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          Contact Info:
        </Text>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Mobile No:</Text>
          <Text style={{ color: darkBlue, marginLeft: 25, fontSize: 15 }}>
            {currentKidProfile.kid.parentPhone}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Email:</Text>
          <Text style={{ color: darkBlue, marginLeft: 20, fontSize: 15 }}>
            {currentKidProfile.kid.parentEmail}
          </Text>
        </View>
      </View>

      {isParent && isEditProfileVisible &&(
        <TouchableOpacity
          style={styles.EditButton}
          onPress={() => handleEditProfile()}
        >
          <Text style={styles.EditText}>Edit Profile</Text>
        </TouchableOpacity>
      )}
      {!isEditProfileVisible && (
        <TouchableOpacity style={styles.EditButton} onPress={() => editKid()}>
          <Text style={styles.EditText}>Submit</Text>
        </TouchableOpacity>
      )}
      {!isEditProfileVisible && (
        <TouchableOpacity
          style={styles.discardChanges}
          onPress={() => props.navigation.replace("KidProfile")}
        >
          <Text style={styles.discardText}>Discard Changes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    fontSize: 20,
    marginLeft: Dimensions.get("window").width / 10,
    marginTop: Dimensions.get("window").height / 30,
  },
  EditButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: Dimensions.get("window").width / 2,
    paddingVertical: 15,
    marginLeft: Dimensions.get("window").width / 4,
    marginTop: Dimensions.get("window").height / 10,
  },
  EditText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  editIcon: {
    marginLeft: Dimensions.get("window").width / 10,
  },
  field: {
    borderRadius: 100,
    backgroundColor: lightGrey,
    width: Dimensions.get("window").width / 3,
    height: Dimensions.get("window").height / 25,
    paddingLeft: 20,
    fontSize: Dimensions.get("window").width / 30,
  },
  discardChanges: {
    marginLeft: Dimensions.get("window").width / 2.6,
    marginTop: Dimensions.get("window").height / 35,
  },
  discardText: {
    textDecorationLine: "underline",
  },
});

export default KidProfile;
