import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue, grey } from "./Constants";
import { GlobalContext } from "./context/GlobalContext";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const Notifications = (props) => {
  const { notifications,readNotifiation } = useContext(GlobalContext);

  const renderData = () => {
    return notifications.map((notification, index) => {
     
      const userId = notification.user;
      const message = notification.message;
      const kid_id = notification.kid_id;
      const kid_type = notification.kid_type;
      const timestamp = notification.timestamp;
      const is_read = notification.is_read;

      
      return (
        <TouchableOpacity onPress={() => {
            readNotifiation(notification.id);
            props.navigation.navigate("KidProfile");
        }}>
          <View
            style={{
              marginTop: windowHeight / 25,
              flexDirection: "row",
              marginLeft: windowWidth / 10,
              borderBottomWidth:0.2,
            }}
            
          >
            <Image
              source={require("../assets/settings.png")}
              style={{ width: 35, height: 35, borderRadius: 15 }}
            ></Image>
            <View style={{ marginLeft: "2%", marginTop: "1%" }} key={index}>
              <Text
                style={{ color: darkBlue, fontSize: 14, fontWeight: "bold" }}
              >
                Safe Kids
                <Text
                  style={{
                    color: darkBlue,
                    fontSize: 12,
                    fontWeight: "normal",
                  }}
                >
                  {" "}
                  {message}
                </Text>
              </Text>
              <Text
                style={{
                  color: grey,
                  fontSize: 12,
                  fontWeight: "normal",
                  marginLeft: "50%",
                }}
              >
                {timestamp}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };
  return (
    <View>
      <View style={Styles.row}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
          <Ionicons
            name={"left"}
            size={25}
            color={darkBlue}
            style={{
              marginTop: windowHeight / 12,
              marginLeft: windowWidth / 10,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={Styles.profile}
          onPress={() => props.navigation.navigate("UserProfile")}
        >
          <Image
            source={require("../assets/user.png")}
            style={{
              width: windowWidth / 15,
              height: windowHeight / 25,
              borderRadius: 100,
            }}
          ></Image>
        </TouchableOpacity>
      </View>

      <Text style={Styles.notificationsText}>Notifications</Text>
      <ScrollView contentContainerStyle={Styles.scrollViewContent}>
            <View style={Styles.container}>{renderData()}</View>
          </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  notificationsText: {
    //paddingLeft: "8%",
    paddingLeft: "8%",
    paddingTop:"8%",
    flexDirection: "row",
    color: darkBlue,
    fontSize: 22,
    fontWeight: "bold",
    marginTop: windowHeight / 25,
  },
  profile: {
    left: windowWidth / 1.5,
    marginTop: windowHeight / 12,
  },
  row: {
    flexDirection: "row",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
  
  },
  scrollViewContent: {
    alignItems: "center",
    paddingTop: Dimensions.get("window").height / 14,
    paddingBottom: Dimensions.get("window").height / 3,
  },
});

export default Notifications;
