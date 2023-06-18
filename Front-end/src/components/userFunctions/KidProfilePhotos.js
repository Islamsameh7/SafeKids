import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import EntypoIcons from "react-native-vector-icons/Entypo";
import AntIcons from "react-native-vector-icons/AntDesign";
import { darkBlue, lightBlue } from "../Constants";
import { Modal } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const KidProfilePhotos = (props) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [image6, setImage6] = useState(null);
  const [currentImg, setCurrentImg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const pickImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      if(currentImg == 1){
        setImage1(_image.uri);
      }
      else if(currentImg == 2){
        setImage2(_image.uri);
      }
      else if(currentImg == 3){
        setImage3(_image.uri);
      }
      else if(currentImg == 4){
        setImage4(_image.uri);
      }
      else if(currentImg == 5){
        setImage5(_image.uri);
      }
      else if(currentImg == 6){
        setImage6(_image.uri);
      }
      
    }
    setIsModalVisible(false);
  };
  const takePicture = async () => {
    let _image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      if(currentImg == 1){
        setImage1(_image.uri);
      }
      else if(currentImg == 2){
        setImage2(_image.uri);
      }
      else if(currentImg == 3){
        setImage3(_image.uri);
      }
      else if(currentImg == 4){
        setImage4(_image.uri);
      }
      else if(currentImg == 5){
        setImage5(_image.uri);
      }
      else if(currentImg == 6){
        setImage6(_image.uri);
      }
      
    }
    setIsModalVisible(false);
  };
  const changeCurrentImage = async (currentImg) => {
    setIsModalVisible(true);
    setCurrentImg(currentImg);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
        <AntIcons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: windowHeight / 13, right: windowWidth / 2.6 }}
        />
      </TouchableOpacity>
      <Text style={styles.addPhotosText}>Add Photos</Text>
      <Text style={styles.addPhotosDesc}>
        Add up to 6 pictures. use real pictures
      </Text>
      {/* row 1 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.uploadPhoto}
          onPress={() => changeCurrentImage(1) }
        >
          <EntypoIcons
            name={"camera"}
            size={30}
            color={darkBlue}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          />
          {image1 && <Image source={{ uri: image1 }} style={styles.photo} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadPhoto}
          onPress={() => changeCurrentImage(2)}
        >
          <EntypoIcons
            name={"camera"}
            size={30}
            color={darkBlue}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          />
          {image2 && <Image source={{ uri: image2 }} style={styles.photo} />}
        </TouchableOpacity>
      </View>

      {/* row 2 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.uploadPhoto}
          onPress={() => changeCurrentImage(3)}
        >
          <EntypoIcons
            name={"camera"}
            size={30}
            color={darkBlue}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          />
          {image3 && <Image source={{ uri: image3 }} style={styles.photo} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadPhoto}
          onPress={() => changeCurrentImage(4)}
        >
          <EntypoIcons
            name={"camera"}
            size={30}
            color={darkBlue}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          />
          {image4 && <Image source={{ uri: image4 }} style={styles.photo} />}
        </TouchableOpacity>
      </View>

      {/* row 3 */}
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.uploadPhoto}
          onPress={() => changeCurrentImage(5)}
        >
          <EntypoIcons
            name={"camera"}
            size={30}
            color={darkBlue}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          />
          {image5 && <Image source={{ uri: image5 }} style={styles.photo} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadPhoto}
          onPress={() => changeCurrentImage(6)}
        >
          <EntypoIcons
            name={"camera"}
            size={30}
            color={darkBlue}
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          />
          {image6 && <Image source={{ uri: image6 }} style={styles.photo} />}
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.doneButton}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>


      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => takePicture()}
            >
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => pickImage()}
            >
              <Text style={styles.modalButtonText}>Choose from Library</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addPhotosText: {
    fontSize: 40,
    color: darkBlue,
    fontWeight: "bold",
    top: windowHeight / 8,
    right: windowWidth / 7,
  },
  addPhotosDesc: {
    fontSize: 20,
    color: darkBlue,
    top: windowHeight / 7,
    right: windowWidth / 90,
  },
  uploadPhoto: {
    top: windowWidth - 270,
    margin: 20,
    height: 130,
    width: 170,
    padding: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    backgroundColor: lightBlue,
  },
  photo: {
    height: 130,
    width: 170,
    padding: 45,
    borderRadius: 35,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  doneButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 230,
    paddingVertical: 5,
    marginLeft: "19%",
    position: "absolute",
    top: windowHeight - 70,
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    bottom: 20,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});

export default KidProfilePhotos;
