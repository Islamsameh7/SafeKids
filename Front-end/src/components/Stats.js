import React, { useState, useContext } from "react";
import { View, StyleSheet, Text} from "react-native";
import Background from "./Background";
import { Context } from "../context/globalContext.js";



const Stats = (props) => {
  const globalContext = useContext(Context);
  const { isLoggedIn,userName } = globalContext;
  return (
    <Background>
      
      <View style={{marginHorizontal:40, marginVertical: 400 }}>
      <Text>Stats !</Text>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({});

export default Stats;
