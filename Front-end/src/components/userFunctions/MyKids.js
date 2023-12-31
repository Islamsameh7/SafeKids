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
  const { user, setCurrentKidProfile,setKidImages, stillMissing,mykids,getMyKids } = useContext(GlobalContext);



  useEffect(() => {
   
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
      <Text style={styles.dataText}></Text>
      {!stillMissing === true && (
        <><Text style={styles.dataText2}><Icon name="check-circle" size={22} color="green" /> Found</Text></>
      )}
    </View>
  </TouchableOpacity>
</View>

      );
    });
  };
 
  return (
    <View>
     
    
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={{ top: windowHeight / 9, left: windowWidth / 14, position: "absolute" }}
      >
        <Ionicons name={"left"} size={30} color={darkBlue} />
      </TouchableOpacity>
      <Text style={styles.headText}>My Kids</Text>
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
  dataText2: {
    fontSize: 17,
    color: "rgb(0,100,0)",
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
  
    paddingBottom: Dimensions.get("window").height / 5,
  },
});

export default MyKids;
