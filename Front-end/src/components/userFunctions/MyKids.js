import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { GlobalContext } from "../context/GlobalContext";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue, lightBlue } from "../Constants";
import apiRoutes from "../apiRoutes";
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MyKids = (props) => {
  const { user, setCurrentKidProfile,setKidImages, stillMissing } = useContext(GlobalContext);

  const [mykids, setMyKids] = useState([]);

  useEffect(() => {
    const getMyKids = async () => {
      const formData = new FormData();

      formData.append("user_id", user.id);

      const response = await fetch(apiRoutes.getMyKids, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const kidData = await response.json();
        setMyKids(kidData);
      } else {
        // Error response
        const errorData = await response.text();
       
        console.log("Failed to get data:", errorData);
      }
    };
    getMyKids();
  }, []);
  const setKidPhotos = (profile) =>{
    setKidImages(profile.photos)
  }
  const renderData = () => {
    console.log(mykids.length);
    return mykids.map((profile, index) => {
      const name = profile.kid.name;
      const age = profile.kid.age;
      const gender = profile.kid.gender;
      const lostDate = profile.kid.lost_date;
      const lastLocation = profile.kid.last_known_location;
      const image = profile.photo;
      const stillMissing = profile.kid.still_missing
      
      return (
        <View style={styles.card} key={index}>
  <TouchableOpacity
    onPress={() => {
      setCurrentKidProfile(profile);
      setKidPhotos(profile);
      props.navigation.navigate("KidProfile");
    }}
    style={{ flexDirection: "row" }}
  >
    <Image
      source={{ uri: apiRoutes.mainUrl + image }}
      style={{
        width: windowWidth / 3,
        height: windowHeight / 7,
        borderRadius: 30,
        justifyContent: "center",
        marginRight: windowWidth / 100,
      }}
    />
    <View>
      <Text style={styles.dataText}>Name: {name}</Text>
      <Text style={styles.dataText}>Age: {age}</Text>
      <Text style={styles.dataText}>Gender: {gender}</Text>
      <Text style={styles.dataText}>LostDate: {lostDate}</Text>
      <Text style={styles.dataText}>
        LastKnownLocation: {lastLocation}
      </Text>
      {stillMissing === true && (
        <Icon name="check-circle" size={24} color="green" />
      )}
    </View>
  </TouchableOpacity>
</View>

      );
    });
  };
 
  return (
    <View>
      <Text style={styles.headText}>My Kids</Text>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={{ top: windowHeight / 14, left: windowWidth / 14, position: "absolute" }}
      >
        <Ionicons name={"left"} size={30} color={darkBlue} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>{renderData()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headText: {
    fontSize: 25,
    color: darkBlue,
    fontWeight: "bold",
    textAlign: "center",
    top: windowHeight / 7,
  },
  dataText: {
    fontSize: 14,
    color: darkBlue,
    fontWeight: "bold",
    //paddingRight:20,
    //alignSelf: 'flex-end',
  },
  card: {
    alignItems: "center",
    backgroundColor: lightBlue,
    width: windowWidth / 1.1,
    padding: 30,
    borderRadius: 20,
    marginTop: windowHeight / 20,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    top: windowHeight / 8,
  },

  scrollViewContent: {
    alignItems: "center",
    paddingTop: Dimensions.get("window").height / 14,
    paddingBottom: Dimensions.get("window").height / 3,
  },
});

export default MyKids;
