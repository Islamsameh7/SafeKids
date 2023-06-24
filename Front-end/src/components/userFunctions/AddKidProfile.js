import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions
} from "react-native";
import { darkBlue, grey, lightGrey, lightGrey2 } from "../Constants";
import AntIcons from "react-native-vector-icons/AntDesign";
import IonIcons from "react-native-vector-icons/Ionicons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import RadioGroup from "react-native-radio-buttons-group";
import { RadioButton } from "react-native-paper";

const AddKidProfile = (props) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [lastKnownLocation, setLastKnownLocation] = useState("");
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
      value: "Male",
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
      value: "Female",
      size: 13,
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }
  const addMissingKid = async () => {
    const formData = new FormData();
    formData.append("user", "1"); // ID of the user for the missing kid
    formData.append("name", name);
    formData.append("gender", "male");
    formData.append("age", "10");
    formData.append("location", "Some Location");

    if (images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
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

    const response = await fetch(apiRoutes.addMissingKid, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <AntIcons
            name={"left"}
            size={"27%"}
            color={darkBlue}
            style={{ top: "200%", left: "5%" }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <IonIcons
            name={"menu"}
            size={"35%"}
            color={darkBlue}
            style={{ top: "62%", left: "85%" }}
          />
        </TouchableOpacity>

        <Text style={styles.addKid}>Add Kid Profile</Text>

        <View style={styles.nameField}>
          <Text style={styles.Text}>Full Name</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="Jiara Martins"
          ></TextInput>
        </View>

        <TouchableOpacity
          style={styles.addPhotoButton}
          onPress={() => props.navigation.navigate("KidProfilePhotos")}
        >
          <EntypoIcons name={"plus"} size={"25%"} color={darkBlue} />
          <Text style={styles.addPhotoText}>ADD PHOTOS</Text>
        </TouchableOpacity>

        <View style={styles.birthField}>
          <Text style={styles.Text}>Birth date</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="DD/MM/YYYY"
          ></TextInput>
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

        <View style={styles.mobileField}>
          <Text style={styles.Text}>Mobile Number</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="01234567891"
          ></TextInput>
        </View>

        <View style={styles.lastKnownLocationField}>
          <Text style={styles.Text}>Last Known Location</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="cairo-hadayekElKobba"
          ></TextInput>
        </View>

        <View style={styles.lostDateField}>
          <Text style={styles.Text}>Lost date</Text>
          <TextInput
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="DD/MM/YYYY"
            //onChange={(date)=>(set)}
          ></TextInput>
        </View>
        <View style={styles.NotesField}>
          <Text style={styles.Text}>Notes</Text>
          <TextInput style={styles.notesField}></TextInput>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
        </View>
        
       
        
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: "100%",
    backgroundColor: lightGrey,
    paddingVertical: Dimensions.get('window').height/60,
    paddingHorizontal: Dimensions.get('window').width/18,
    width: "85%",
    fontSize: Dimensions.get('window').width/25,
    marginVertical: Dimensions.get('window').height/40,
  },
  notesField: {
    borderWidth: "2%",
    borderColor: lightGrey2,
    paddingVertical: Dimensions.get('window').height/22,
    paddingHorizontal: Dimensions.get('window').width/22,
    width: "75%",
    height: "30%",
    fontSize: Dimensions.get('window').width/22,
  },
  addKid: {
    fontSize: Dimensions.get('window').width/15,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: Dimensions.get('window').height/40,
  },
  nameField: {
    marginTop: Dimensions.get('window').height/22,
    marginLeft: Dimensions.get('window').width/12,
  },
  Text: {
    fontSize: Dimensions.get('window').width/20,
    fontWeight: "bold",
    color: darkBlue,
  },
  addPhotoButton: {
    marginLeft: Dimensions.get('window').width/8,
    marginTop: Dimensions.get('window').height/60,
    width: "68%",
    borderColor: lightGrey2,
    borderWidth: "2%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  addPhotoText: {
    color: darkBlue,
    fontWeight: "bold",
    fontSize: Dimensions.get('window').width/20,
    padding: Dimensions.get('window').width/40,
  },
  birthField: {
    marginTop: Dimensions.get('window').height/38,
    marginLeft: Dimensions.get('window').width/16,
  },
  genderField: {
    marginTop: Dimensions.get('window').height/60,
    marginLeft: Dimensions.get('window').width/15,
  },
  mobileField: {
    marginTop: Dimensions.get('window').height/60,
    marginLeft: Dimensions.get('window').width/15,
  },
  lastKnownLocationField: {
    marginTop: Dimensions.get('window').height/70,
    marginLeft: Dimensions.get('window').width/15,
  },
  lostDateField: {
    marginTop: Dimensions.get('window').height/70,
    marginLeft: Dimensions.get('window').width/15,
  },
  NotesField: {
    marginTop: Dimensions.get('window').height/70,
    marginLeft: Dimensions.get('window').width/15,
  },
  submitButton: {
    backgroundColor: darkBlue,
    borderRadius: "100%",
    alignItems: "center",
    width: "50%",
    paddingVertical: Dimensions.get('window').height/50,
    marginLeft: Dimensions.get('window').width/4,
    position: "absolute",
   
    
  },
  // buttonContainer:{
 
  //   marginBottom:'7%',
  // },
  submitText: {
    color: "#FFFFFF",
    fontSize: Dimensions.get('window').width/22,
    fontWeight: "bold",
  },
 
  genderOption: {
    color: darkBlue,
    fontWeight: "bold",
    fontSize: Dimensions.get('window').width/22,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: Dimensions.get('window').height/2,
  },
  container: {
    flex: 1,
   
  },
});

export default AddKidProfile;
