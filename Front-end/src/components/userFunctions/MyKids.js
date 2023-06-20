import React from "react";
import { View, StyleSheet, Text, ImageBackground,TouchableOpacity, Image } from "react-native";
import { blue, navyblue, darkBlue, lightBlue } from "../Constants";
import Ionicons from "react-native-vector-icons/AntDesign";

const MyKids = (props) => {

  return (
    <View>
        <TouchableOpacity onPress={() => props.navigation.navigate("UserProfile")}>
        <Ionicons
          name={"left"}
          size={30}
          color={darkBlue}
          style={{ top: 50, left: 20 }}
        />
      </TouchableOpacity>

        <Text style={{color:darkBlue, marginTop:70,alignSelf:"center", fontSize:20, fontWeight:"bold"}}>My Kids</Text>

        <View style={styles.card} >
          <Image
            source={require("../../assets/babypic.png")}
            style={{
              width: "40%",
              height: "110%",
              borderRadius: 10,
              justifyContent: "center",
              marginRight: 10,
            }}
          />
          <View style={{flexDirection:"column", }}>
          <Text style={{fontSize:14,fontWeight:"bold", color:darkBlue}}>Name: Aly Ayman </Text>
          <Text style={{fontSize:14,fontWeight:"bold", color:darkBlue}}>Age: 8</Text>
          <Text style={{fontSize:14,fontWeight:"bold", color:darkBlue}}>Gender: Male</Text>
          <Text style={{fontSize:13,fontWeight:"bold", color:darkBlue}}>Lost Date: 15-12-2022</Text>
          <Text style={{fontSize:13,fontWeight:"bold", color:darkBlue}}>Lost Known Location: Maadi</Text>
          </View>

          </View>
    </View>
    );
};
const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: lightBlue,
        width: "90%",
        height:"35%",
        padding: 30,
        borderRadius: 20,
        marginTop: 40,
        marginLeft:20
      },
});
export default MyKids;