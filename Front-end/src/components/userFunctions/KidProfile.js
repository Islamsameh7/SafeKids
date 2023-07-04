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
import { darkBlue, grey, lightGrey, lightGrey2 } from "../Constants";
import Ionicons from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { GlobalContext } from "../context/GlobalContext";
import apiRoutes from "../apiRoutes";
import DropdownComponent from "../DropdownComponent";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

var days = [];

const months = [];

for (let i = 1; i <= 12; i++) {
  months.push({ label: String(i), value: String(i) });
}
const years = [];

for (let i = 1960; i <= 2005; i++) {
  years.push({ label: String(i), value: String(i) });
}

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

  const { user, currentKidProfile ,getMyKids} = useContext(GlobalContext);
  const [stillMissing, setIsStillMissing] = useState(
    Boolean(currentKidProfile.kid.still_missing)
  );

  const handleStillMissing = () => {
    const newStillMissing = !stillMissing;
    setIsStillMissing(newStillMissing);
    currentKidProfile.kid.still_missing = newStillMissing;
    change_id_state(newStillMissing);
  };
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const navigation = useNavigation();
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

  const handleEditProfile = () => {
    setEditIconVisible(!isEditIconVisible);
    setIsEditProfileVisible(!isEditProfileVisible);
  };
  const change_id_state = async (stillMissing) => {
    const formData = new FormData();
    formData.append("kid_id", currentKidProfile.kid.id);
    formData.append("still_missing", stillMissing);

    const response = await fetch(apiRoutes.changeKidState, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.ok) {
    } else {
    }
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

  const goBack = () => {
    navigation.goBack();
  };

  const editKid = async () => {
    const formData = new FormData();
    formData.append("kid_id", currentKidProfile.kid.id);
    formData.append("name", name);
    formData.append("lostDate", lostDate);
    formData.append("lastKnownLocation", lastKnown);
    formData.append("birthdate", year + "-" + month + "-" + day);
    currentKidProfile.kid.birthdate = year + "-" + month + "-" + day;
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
    const response = await fetch(apiRoutes.edit_kid, {
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
      <TouchableOpacity onPress={() =>{getMyKids(); goBack()}}>
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: Dimensions.get("window").height / 10, left: Dimensions.get("window").width / 10 }}
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
              onChangeText={(name) => {
                setName(name);
                currentKidProfile.kid.name = name;
              }}
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
              <Ionicons name={"edit"} size={25} color={darkBlue} />
            </TouchableOpacity>
          )}
        </View>
        {!isBirthDateVisible && (
          <View style={styles.row}>
            <DropdownComponent
              data={years}
              onChange={(item) => {
                setYear(item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Y"}
              placeholderStyle={{ fontSize: 15 }}
            ></DropdownComponent>
            <DropdownComponent
              data={months}
              onChange={(item) => {
                setMonth(item.value);
                setDays();
                console.log("month is" + item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"M"}
              placeholderStyle={{ fontSize: 15 }}
            ></DropdownComponent>
            <DropdownComponent
              data={days}
              onChange={(item) => {
                setDay(item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"D"}
              placeholderStyle={{ fontSize: 15 }}
            ></DropdownComponent>
          </View>
        )}
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
              onChangeText={(date) => {
                setLostDate(date);
                currentKidProfile.kid.lost_date = date;
              }}
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
              onChangeText={(location) => {
                setLastKnown(location);
                currentKidProfile.kid.last_known_location = location;
              }}
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
              {currentKidProfile.kid.last_known_location}
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
            {currentKidProfile.kid.contact_phone}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Email:</Text>
          <Text style={{ color: darkBlue, marginLeft: 20, fontSize: 15 }}>
            {currentKidProfile.kid.contact_email}
          </Text>
        </View>
      </View>

      {isParent && isEditProfileVisible && (
        <View>
          <TouchableOpacity
            style={styles.addPhotoButton}
            onPress={() => props.navigation.navigate("KidProfilePhotos")}
          >
            <EntypoIcons name={"plus"} size={30} color={darkBlue} />
            <Text style={styles.addPhotoText}>ADD PHOTOS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.EditButton}
            onPress={() => handleEditProfile()}
          >
            <Text style={styles.EditText}>Edit Profile</Text>
          </TouchableOpacity>
          <View>
            <View style={{ flexDirection: "row", bottom: 100, left: 41 }}>
              <Text
                style={{ fontSize: 15, fontWeight: "bold", color: darkBlue }}
              >
                {stillMissing ? "Found" : "Found"}
              </Text>
              <TouchableOpacity
                onPress={handleStillMissing}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: stillMissing ? "" : "",
                  justifyContent: "center",
                  alignItems: "center",
                  left: 10,
                }}
              >
                {!stillMissing && (
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 2,
                      backgroundColor: darkBlue,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {!isEditProfileVisible && (
        <TouchableOpacity
          style={styles.EditButton}
          onPress={() => {
            editKid();
          }}
        >
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
  dateDropdown: {
    borderRadius: 100,
    paddingHorizontal: 6,
    width: Dimensions.get("window").width / 5.2,
    backgroundColor: "rgb(220, 220, 220)",

    marginRight: Dimensions.get("window").width / 14,
  },
  row: {
    flexDirection: "row",
    marginLeft: Dimensions.get("window").width / 7,
  },
  addPhotoButton: {
    marginLeft: Dimensions.get("window").width / 8,
    marginTop: Dimensions.get("window").height / 60,
    width: "68%",
    borderColor: lightGrey2,
    borderWidth: 2,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  addPhotoText: {
    color: darkBlue,
    fontWeight: "bold",
    fontSize: Dimensions.get("window").width / 20,
    padding: Dimensions.get("window").width / 40,
  },
});

export default KidProfile;
