import React, { useState, useEffect,useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { darkBlue, grey, lightGrey } from "../Constants";
import Ionicons from "react-native-vector-icons/AntDesign";
import { useRoute } from "@react-navigation/native";
import { GlobalContext } from "../context/GlobalContext";

const KidProfile = (props) => {
  const [isParent, setIsParent] = useState(false);
  const { user } = useContext(GlobalContext);
  const route = useRoute();
  const { profile } = route.params;

  useEffect(() => {
    if (profile.kid.user == user.id) {
      setIsParent(true);
    }

    // Return a cleanup function to run when the component unmounts
    return () => {
      // Code to clean up any resources or subscriptions
    };
  }, []);
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("UserProfile")}
      >
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 50, left: 20 }}
        />
      </TouchableOpacity>

      <View>
        <Image
          source={require("../../assets/babypic.png")}
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
          <Text
            style={{
              color: darkBlue,
              marginLeft: Dimensions.get("window").width / 20,
              fontSize: 15,
            }}
          >
            {profile.kid.name}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Birth date:</Text>
          <Text
            style={{
              color: darkBlue,
              marginLeft: Dimensions.get("window").width / 20,
              fontSize: 15,
            }}
          >
            {profile.kid.birthdate}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Gender:</Text>
          <Text
            style={{
              color: darkBlue,
              marginLeft: Dimensions.get("window").width / 20,
              fontSize: 15,
            }}
          >
            {profile.kid.gender}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Lost date:</Text>
          <Text
            style={{
              color: darkBlue,
              marginLeft: Dimensions.get("window").width / 20,
              fontSize: 15,
            }}
          >
            {profile.kid.lost_date}
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>
            Last Known Location:
          </Text>
          <Text
            style={{
              color: darkBlue,
              marginLeft: Dimensions.get("window").width / 20,
              fontSize: 15,
            }}
          >
            Dokki
          </Text>
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
            010 123 456 78
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={{ color: grey, fontSize: 15 }}>Email:</Text>
          <Text style={{ color: darkBlue, marginLeft: 20, fontSize: 15 }}>
            hello@reallygreatsite.com
          </Text>
        </View>
      </View>

      {isParent && (
        <TouchableOpacity style={styles.EditButton}>
          <Text style={styles.EditText}>Edit Profile</Text>
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
});

export default KidProfile;
