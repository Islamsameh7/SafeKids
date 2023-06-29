import React, { useState, useEffect, useContext } from "react";
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
import { useNavigation } from '@react-navigation/native';
import EntypoIcons from "react-native-vector-icons/Entypo";
import AntIcons from "react-native-vector-icons/AntDesign";
import { darkBlue, lightBlue } from "../Constants";
import { GlobalContext } from "../context/GlobalContext";
import { Modal } from "react-native-paper";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
import apiRoutes from "../apiRoutes";
const KidProfilePhotos = (props) => {
  const { setKidImages, kidImages } = useContext(GlobalContext);
  const [currentImg, setCurrentImg] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  
  useEffect(() => {
    console.log( "length is"+kidImages.length);
    for (let i = 0; i < kidImages.length; i++) {
      const currentImageState = imageList[i].state[1];
      currentImageState( apiRoutes.mainUrl + kidImages[i]);
      console.log( "uri is"+kidImages[i])
    }
  }, []);
  // Create an array of image objects with their corresponding state
  const imageList = [
    { state: useState(null) },
    { state: useState(null) },
    { state: useState(null) },
    { state: useState(null) },
    { state: useState(null) },
    { state: useState(null) },
  ];

  const addImageToList = (newImage) => {
    const updatedList = [...kidImages, newImage];
    setKidImages(updatedList);
  };

  const pickImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!_image.cancelled) {
      addImageToList(_image.uri);
      const currentImageState = imageList[currentImg - 1].state[1];
      currentImageState(_image.uri);
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
      const currentImageState = imageList[currentImg - 1].state[1];
      currentImageState(_image.uri);
    }
    setIsModalVisible(false);
  };

  const changeCurrentImage = async (currentImg) => {
    setIsModalVisible(true);
    setCurrentImg(currentImg);
  };

  const goBack = () => {
    navigation.goBack();
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

      {/* Iterate over the imageList array to generate the image components */}
      {imageList.map((image, index) => (
      index % 2 === 0 ? (
        <View key={index} style={styles.row}>
          <TouchableOpacity
            style={styles.uploadPhoto}
            onPress={() => changeCurrentImage(index + 1)}
          >
            <EntypoIcons
              name={"camera"}
              size={30}
              color={darkBlue}
              style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
            />
           
            {image.state[0] && <Image source={{ uri: image.state[0] }} style={styles.photo} />}
          </TouchableOpacity>

          {/* Render the second image in the pair if available */}
          {index + 1 < imageList.length && (
            <TouchableOpacity
              style={styles.uploadPhoto}
              onPress={() => changeCurrentImage(index + 2)}
            >
              <EntypoIcons
                name={"camera"}
                size={30}
                color={darkBlue}
                style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
              />
              {imageList[index + 1].state[0] && <Image source={{ uri: imageList[index + 1].state[0] }} style={styles.photo} />}
            </TouchableOpacity>
          )}
        </View>
      ) : null
    ))}

      <TouchableOpacity style={styles.doneButton} onPress={() => goBack()} visi>
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
    top: windowWidth /3,
    margin: windowWidth /25,
    height: windowHeight/7,
    width: windowWidth/2.4,
    padding: windowWidth/10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    backgroundColor: lightBlue,
  },
  photo: {
    height: windowHeight/7,
    width: windowWidth/2.4,
    padding: windowWidth/10,
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
    width: windowWidth/5,
    paddingVertical: 5,
    marginLeft: "19%",
    position: "absolute",
    top: windowHeight/1.1,
  },
  doneText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
  modalContainer: {
    alignItems: "center",
    justifyContent: "center",
    bottom: windowHeight/40,
    backgroundColor: "white",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  modalButton: {
    marginBottom: windowHeight/35,
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
