import React, { useState, useContext } from "react";
import { View, StyleSheet, Text} from "react-native";
import Background from "./Background";
import { Context } from "../context/globalContext.js";



const Profile = (props) => {
  const globalContext = useContext(Context);
  const { isLoggedIn,userName } = globalContext;
  return (
    <Background>
      
      <View style={{marginHorizontal:40, marginVertical: 400 }}>
      <Text>Welcome in ur profile mr, {userName} !</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default Profile;
