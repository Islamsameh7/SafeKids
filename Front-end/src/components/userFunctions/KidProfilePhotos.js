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
          size={"25%"}
          color={darkBlue}
          style={{ top: windowHeight / 13, right: windowWidth / 2.3 }}
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
            size={"28%"}
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
            size={"28%"}
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
            size={"28%"}
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
            size={"28%"}
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
            size={"28%"}
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
    fontSize: Dimensions.get('window').width /11,
    color: darkBlue,
    fontWeight: "bold",
    top: windowHeight / 13,
    right: windowWidth / 8,
  },
  addPhotosDesc: {
    fontSize: Dimensions.get('window').width /25,
    color: darkBlue,
    top: windowHeight / 12,
    right: windowWidth / 70,
  },
  uploadPhoto: {
    top: windowHeight / 10,
    margin: Dimensions.get('window').width /70,
    height: windowHeight / 7,
    width: "40%",
    padding: Dimensions.get('window').width /20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "35%",
    backgroundColor: lightBlue,
  },
  photo: {
    height: "50%",
    width: "30%",
    padding: "20%",
    borderRadius: "35%",
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
    borderRadius: "100%",
    alignItems: "center",
    width: "60%",
    paddingVertical: Dimensions.get('window').width /40,
    marginLeft: Dimensions.get('window').width /30,
    position: "absolute",
    top: windowHeight - 100,
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: Dimensions.get('window').width /18,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    bottom: Dimensions.get('window').height /20,
    backgroundColor: "white",
  },
  modalContent: {
    padding: Dimensions.get('window').width /50,
    borderRadius: "10%",
  },
  modalButton: {
    marginBottom: Dimensions.get('window').height /40,
    padding: Dimensions.get('window').width /30,
    borderRadius: "5%",
  },
  modalButtonText: {
    fontSize: Dimensions.get('window').width /25,
    color: "black",
    textAlign: "center",
  },
});

export default KidProfilePhotos;
