import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { darkBlue, grey, lightGrey, lightGrey2 } from "../Constants";
import AntIcons from "react-native-vector-icons/AntDesign";
import IonIcons from "react-native-vector-icons/Ionicons";
import EntypoIcons from "react-native-vector-icons/Entypo";
import RadioGroup from "react-native-radio-buttons-group";
import { RadioButton } from "react-native-paper";

const AddKidProfile = (props) => {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: (
        <Text style={{
            color:darkBlue,
            fontWeight: "bold",
            fontSize:18,
            }}>
          {'Male'}
        </Text>
      ),
      value: "Male",
      size:13,
     
      
    },
    {
      id: "2",
      label: (
        <Text style={{
            color:darkBlue,
            fontWeight: "bold",
            fontSize:18,
            
        }
        }>
          {'Female'}
        </Text>
      ),
      value: "Female",
      size:13,
     
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <AntIcons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 70, left: 20 }}
          
        />
      </TouchableOpacity>

      <TouchableOpacity>
        <IonIcons
          name={"menu"}
          size={40}
          color={darkBlue}
          style={{ top: 33, left: "83%" }}
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

      <TouchableOpacity style={styles.addPhotoButton} onPress={() => props.navigation.navigate("KidProfilePhotos")}>
        <EntypoIcons name={"plus"} size={30} color={darkBlue} />
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
          size='200%'
          layout='row'
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

      <View style={styles.lostDateField}>
        <Text style={styles.Text}>Lost date</Text>
        <TextInput
          style={styles.field}
          placeholderTextColor={grey}
          placeholder="DD/MM/YYYY"
        ></TextInput>
      </View>
      <View style={styles.NotesField}>
        <Text style={styles.Text}>Notes</Text>
        <TextInput
          style={styles.notesField}
          
        ></TextInput>
      </View>
      <TouchableOpacity style={styles.submitButton} > 
            <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: 100,
    backgroundColor: lightGrey,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: "75%",
    fontSize: 17,
    marginVertical: 10,
  },
  notesField: {
    
    borderWidth:2,
    borderColor:lightGrey2,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: "75%",
    height:"30%",
    fontSize: 10,
   
  },
  addKid: {
    fontSize: 25,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    top: 25,
  },
  nameField: {
    top: 45,
    marginLeft: "10%",
  },
  Text: {
    fontSize: 20,
    fontWeight: "bold",
    color: darkBlue,
  },
  addPhotoButton: {
    marginLeft: "10%",
    top: 55,
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
    fontSize: 20,
    padding: 10,
  },
  birthField: {
    top: 70,
    marginLeft: "10%",
  },
  genderField: {
    top: 80,
    marginLeft: "10%",
    
  },
  mobileField: {
    top: 95,
    marginLeft: "10%",
  },
  lostDateField: {
    top: 100,
    marginLeft: "10%",
  },
  NotesField:{
    top: 105,
    marginLeft: "10%",
  },
  submitButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 230,
    paddingVertical: 5,
    marginLeft:"19%",
    position: 'absolute', 
    bottom: 0,
  
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  genderOption:{
    color:darkBlue,
    fontWeight: "bold",
    fontSize:5,
  },
  
});

export default AddKidProfile;
