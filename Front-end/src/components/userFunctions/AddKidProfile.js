import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import { darkBlue, grey, lightGrey, lightGrey2 } from "../Constants";
import AntIcons from "react-native-vector-icons/AntDesign";
import IonIcons from "react-native-vector-icons/Ionicons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import RadioGroup from "react-native-radio-buttons-group";
import { GlobalContext } from "../context/GlobalContext";
import apiRoutes from "../apiRoutes";
import DropdownComponent from "../DropdownComponent";

var days = [];

const months = [];

for (let i = 1; i <= 12; i++) {
  months.push({ label: String(i), value: String(i) });
}
const years = [];

for (let i = 1960; i <= 2023; i++) {
  years.push({ label: String(i), value: String(i) });
}

const AddKidProfile = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [kidId, setKidId] = useState(null);
  const [lastKnownLocation, setLastKnownLocation] = useState("");
  const [lostDate, setLostDate] = useState("");
  const [notes, setNotes] = useState("");
  const [isPhotosValid, setIsPhotosValid] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [lostDay, setLostDay] = useState("");
  const [lostMonth, setLostMonth] = useState("");
  const [lostYear, setLostYear] = useState("");

  const [isBirthDateValid, setBirthDateValid] = useState(true);

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

  const setLostDays = () => {
    days = [];
    if (
      lostMonth == 1 ||
      lostMonth == 3 ||
      lostMonth == 5 ||
      lostMonth == 7 ||
      lostMonth == 8 ||
      lostMonth == 10 ||
      lostMonth == 12
    ) {
      for (let i = 1; i <= 31; i++) {
        days.push({ label: String(i), value: String(i) });
      }
    } else if (
      lostMonth == 4 ||
      lostMonth == 6 ||
      lostMonth == 9 ||
      lostMonth == 11
    ) {
      for (let i = 1; i <= 30; i++) {
        days.push({ label: String(i), value: String(i) });
      }
    } else {
      for (let i = 1; i <= 28; i++) {
        days.push({ label: String(i), value: String(i) });
      }
    }
  };
  const checkBirthDate = () => {
    if (day != "" && month != "" && year != "") {
      setBirthDateValid(true);
    } else {
      setBirthDateValid(false);
    }
  };

  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: (
        <Text
          style={{
            color: darkBlue,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {"Male"}
        </Text>
      ),
      value: "male",
      size: 13,
    },
    {
      id: "2",
      label: (
        <Text
          style={{
            color: darkBlue,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {"Female"}
        </Text>
      ),
      value: "female",
      size: 13,
    },
  ]);
  const {
    user,
    kidImages,
    emptyImages,
    fetchMatchingProfiles,
    matchingProfiles,
    setMatchingProfiles,
  } = useContext(GlobalContext);
  useEffect(() => {
    emptyImages();
  }, []);
  function onPressRadioButton(radioButtonsArray) {
    const selectedRadioButton = radioButtonsArray.find(
      (button) => button.selected === true
    );
    if (selectedRadioButton) {
      setGender(selectedRadioButton.value);
    }
    setRadioButtons(radioButtonsArray);
  }
  const addMissingKid = async () => {
    props.navigation.navigate("Matching");
    const formData = new FormData();
    checkBirthDate();
    formData.append("user", user.id); // ID of the user for the missing kid
    formData.append("name", name);
    formData.append("gender", gender);
    formData.append("birthdate", year + "-" + month + "-" + day);
    formData.append("last_known_location", lastKnownLocation);
    formData.append("lost_date", lostYear + "-" + lostMonth + "-" + lostDay);
    formData.append("still_missing", true);
    formData.append("contactNumber", user.phonenumber);

    if (kidImages.length > 0) {
      setIsPhotosValid(true);
      for (let i = 0; i < kidImages.length; i++) {
        const image = kidImages[i];
        const response = await fetch(image);
        const blob = await response.blob();
        const fileName = image.split("/").pop(); // Extract the file name from the URI
        const fileType = blob.type; // Get the MIME type of the file

        if (
          fileType === "image/jpeg" ||
          fileType === "image/png" ||
          fileType === "image/jpg"
        ) {
          formData.append("photos", {
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
      }
    }
    try {
      if (kidImages.length > 0) {
        const response = await fetch(apiRoutes.addMissingKid, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.ok) {
          // Successful response
          emptyImages();
          const kidId = await response.json();
          
          fetchMatchingProfiles(kidImages, "addKid", kidId,props);
          console.log("matching profile length is: "+matchingProfiles.length);
          
          console.log("Missing Kid added successfully");
        } else {
          // Error response
          const errorData = await response.text();
          console.log("Failed to add missing kid:", errorData);
        }
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <AntIcons
            name={"left"}
            size={30}
            color={darkBlue}
            style={{ top: 70, left: 20 }}
          />
        </TouchableOpacity>

        <Text style={styles.addKid}>Add Kid Profile</Text>

        <View style={styles.nameField}>
          <Text style={styles.Text}>Full Name</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor="rgba(128, 128, 128, 1)"
            placeholder="eg.. Jiara Martins"
            onChangeText={(name) => setName(name)}
          ></TextInput>
        </View>
        {!isPhotosValid && (
          <Text
            style={{
              marginLeft: Dimensions.get("window").width / 3.7,
              color: "red",
            }}
          >
            *You should add at least one photo*
          </Text>
        )}

        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={() => {props.navigation.navigate("KidProfilePhotos")}}
        >
          <EntypoIcons name={"plus"} size={30} color={darkBlue} />
          <Text style={styles.addPhotoText}>ADD PHOTOS</Text>
        </TouchableOpacity>

        <View style={styles.birthField}>
          <Text style={styles.Text}>Birth date</Text>
          <View style={styles.row}>
            <DropdownComponent
              data={years}
              onChange={(item) => {
                setYear(item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Year"}
            ></DropdownComponent>
            <DropdownComponent
              data={months}
              onChange={(item) => {
                setMonth(item.value);
                setDays();
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Month"}
            ></DropdownComponent>
            <DropdownComponent
              data={days}
              onChange={(item) => {
                setDay(item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Day"}
            ></DropdownComponent>
          </View>
        </View>

        <View style={styles.genderField}>
          <Text style={styles.Text}>Gender</Text>

          <RadioGroup
            size="200%"
            layout="row"
            radioButtons={radioButtons}
            onPress={onPressRadioButton}
          />
        </View>

        <View style={styles.lastKnownLocationField}>
          <Text style={styles.Text}>Last Known Location</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor="rgba(128, 128, 128, 1)"
            placeholder="eg.. Cairo - Nasr City"
            onChangeText={(location) => setLastKnownLocation(location)}
          ></TextInput>
        </View>

        <View style={styles.lostDateField}>
          <Text style={styles.Text}>Lost date</Text>
          <View style={styles.row}>
            <DropdownComponent
              data={years}
              onChange={(item) => {
                setLostYear(item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Year"}
            ></DropdownComponent>
            <DropdownComponent
              data={months}
              onChange={(item) => {
                setLostMonth(item.value);
                setLostDays();
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Month"}
            ></DropdownComponent>
            <DropdownComponent
              data={days}
              onChange={(item) => {
                setLostDay(item.value);
              }}
              dropdownStyle={styles.dateDropdown}
              placeholder={"Day"}
            ></DropdownComponent>
          </View>
        </View>
        <View style={styles.NotesField}>
          <Text style={styles.Text}>Notes</Text>
          <TextInput
            style={styles.notesField}
            onChangeText={(notes) => setNotes(notes)}
          ></TextInput>
           <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              addMissingKid();
            }}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
     
         
    
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 100,
    backgroundColor: lightGrey,
    paddingVertical: Dimensions.get("window").height / 60,
    paddingHorizontal: Dimensions.get("window").width / 18,
    width: "85%",
    fontSize: Dimensions.get("window").width / 25,
    marginVertical: Dimensions.get("window").height / 40,
  },
  notesField: {
    borderWidth: 2,
    borderColor: lightGrey2,
    paddingVertical: Dimensions.get("window").height / 22,
    paddingHorizontal: Dimensions.get("window").width / 22,
    width: "75%",
    height: "30%",
    fontSize: Dimensions.get("window").width / 22,
  },
  addKid: {
    fontSize: Dimensions.get("window").width / 15,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Dimensions.get("window").height / 40,
  },
  nameField: {
    marginTop: Dimensions.get("window").height / 22,
    marginLeft: Dimensions.get("window").width / 12,
  },
  Text: {
    fontSize: Dimensions.get("window").width / 20,
    fontWeight: "bold",
    color: darkBlue,
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
  birthField: {
    marginTop: Dimensions.get("window").height / 38,
    marginLeft: Dimensions.get("window").width / 16,
  },
  genderField: {
    marginTop: Dimensions.get("window").height / 60,
    marginLeft: Dimensions.get("window").width / 15,
  },
  mobileField: {
    marginTop: Dimensions.get("window").height / 60,
    marginLeft: Dimensions.get("window").width / 15,
  },
  lastKnownLocationField: {
    marginTop: Dimensions.get("window").height / 70,
    marginLeft: Dimensions.get("window").width / 15,
  },
  lostDateField: {
    marginTop: Dimensions.get("window").height / 70,
    marginLeft: Dimensions.get("window").width / 15,
  },
  NotesField: {
    marginTop: Dimensions.get("window").height / 70,
    marginLeft: Dimensions.get("window").width / 15,
  },
  submitButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: "50%",
    paddingVertical: Dimensions.get("window").height / 60,
    marginLeft: Dimensions.get("window").width / 4,
    marginTop: Dimensions.get("window").height / 10,
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
  row: {
    flexDirection: "row",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: Dimensions.get("window").width / 22,
    fontWeight: "bold",
  },

  genderOption: {
    color: darkBlue,
    fontWeight: "bold",
    fontSize: Dimensions.get("window").width / 22,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: Dimensions.get("window").height / 8,
  },
  container: {
    flex: 1,
  },
});

export default AddKidProfile;
