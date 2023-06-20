import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import EntypoIcons from "react-native-vector-icons/Entypo";
import { lightBlue, navyblue, lightGrey, darkBlue, grey } from "../Constants";
import * as ImagePicker from "expo-image-picker";
import apiRoutes from "../apiRoutes";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const UploadPhoto = (props) => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [location, setLocaton] = useState("");

  const uploadPhoto = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };
  const takePhoto = async () => {
    let _image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      setImage(_image.uri);
    }
  };
  const addFoundKid = async () => {
    const formData = new FormData();
    formData.append('user', '1'); // ID of the user for the found kid
    formData.append('name', name);
    formData.append('gender', 'male');
    formData.append('age', '10');
    formData.append('location', 'Some Location');
  
    if (image) {
      const response = await fetch(image);
      const blob = await response.blob();
  
      const fileName = image.split("/").pop(); // Extract the file name from the URI
  
      const fileType = blob.type; // Get the MIME type of the file
  
      if (fileType === "image/jpeg" || fileType === "image/png" || fileType === "image/jpg") {
        formData.append("photo", { uri: image, name: fileName, type: fileType });
      } else {
        console.log("Invalid file type. Only JPG, PNG, and JPEG images are allowed.");
        return;
      }
    }
  
    const response = await fetch(apiRoutes.addFoundKid, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    if (response.ok) {
      // Successful response
      console.log('Found kid added successfully');
    } else {
      // Error response
      const errorData = await response.text();
      console.log('Failed to add found kid:', errorData);
    }
  };
  
  return (
    <View>
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 70, left: 20 }}
        />
      </TouchableOpacity>
      <Text style={styles.FillText}>Fill in the following fields</Text>

      <View style={styles.container}>
        <Text style={styles.nameText}>Name (Optional)</Text>
        <TextInput style={styles.field} onChangeText={(name) => setName(name)}></TextInput>
      </View>

      <View style={styles.container}>
        <Text style={styles.locationText}>Location</Text>
        <TextInput style={styles.field} onChangeText={(location) => setLocaton(location)}></TextInput>
      </View>

      <View style={styles.uploadedContainer}>
        <TouchableOpacity style={styles.uploadedPhoto}>
          
          <Image
            source={require("../../assets/cameraUpload.jpg")}
            style={{ width: 50, height: 45}}
          />
          
          <Text style={styles.TextUpload}>uploaded photo will appear here</Text>
          <Text style={styles.SupportsText}>Supports JPG,PNG</Text>
          {image && <Image source={{ uri: image }} style={styles.photo} />}
          
        </TouchableOpacity>
        
      </View>
      <View style={styles.row}>

        <TouchableOpacity style={styles.takePhoto} onPress={() => takePhoto()}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 45,
              borderWidth: 2,
              borderColor: "white",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}
          >
            <EntypoIcons name={"camera"} size={25} color={"#D79E9A"} />
          </View>
          <Text style={{ fontSize: 17, color: "white" }}>Take photo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.uploadPhoto} onPress={() => uploadPhoto() } >
          <Image
            source={require("../../assets/uploadGreen.jpg")}
            style={{ width: 50, height: 45 }}
          />

          <Text style={{ fontSize: 17, color: "white", top: 5 }}>
            Upload photo
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.submitContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={() =>{ 
          addFoundKid();
          props.navigation.navigate("Matching")
          } }>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    bottom: 0,
    margin: 40,
    justifyContent:'center',
    flexDirection: "row",
  },
  field: {
    borderRadius: 100,
    backgroundColor: lightGrey,
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: "78%",
    fontSize: 17,
  },
  uploadedContainer: {
    marginTop: 15,
    height: windowHeight / 2.7,
    alignItems: "center",
  },
  container: {
    top: windowHeight / 6,
    marginBottom: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  nameText: {
    right: windowWidth / 4.2,
    fontSize: 17,
    fontWeight: "bold",
    color: darkBlue,
  },
  locationText: {
    right: windowWidth / 3.3,
    fontSize: 17,
    fontWeight: "bold",
    color: darkBlue,
  },
  uploadedPhoto: {
    top: windowHeight - 700,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: darkBlue,
    height: "46%",
    width: "70%",
  },
  photo: {
    
    position: "absolute",
    height: "105%",
    width: "105%",
    
    borderRadius: 30,
  },
  takePhoto: {
    margin: 2,
    backgroundColor: "#D79E9A",
    paddingTop: 10,
    height: 100,
    width: 185,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
  },
  uploadPhoto: {
    margin: 2,
    backgroundColor: "#68A3A8",
    paddingTop: 10,
    height: 100,
    width: 185,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
  },
  FillText: {
    fontSize: 25,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    top: 90,
  },
  TextUpload: {
    fontSize: 14,
    color: darkBlue,
    fontWeight: "bold",
   
  },
  SupportsText: {
    fontSize: 10,
    color: lightGrey,
    fontWeight: "bold",
  
  },
  submitButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 100,
    paddingVertical: 5,
    marginLeft: "19%",
    position: "absolute",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 30,
  },
});

export default UploadPhoto;
