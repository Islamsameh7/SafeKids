import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
} from "react-native";
import { darkBlue, grey, lightGrey } from "../Constants";
import Ionicons from "react-native-vector-icons/AntDesign";


const KidProfile = (props) => {

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
 
                <View >
                    <Image source={require("../../assets/babypic.png")} style={{
                        width: 100, height: 100, borderRadius: "200", backgroundColor: "white",marginTop:50,alignSelf:"center"}}></Image>
                        <Text style={{alignSelf:"left", marginLeft:20, marginTop:30, color:darkBlue, fontSize:15, fontWeight:"bold"}}>Personal Details:</Text>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Name:</Text>
                    <Text style={{color: darkBlue, marginLeft:50, fontSize:15}}>Yassin Salah</Text>
                    </View>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Birth date:</Text>
                    <Text style={{color: darkBlue, marginLeft:30, fontSize:15}}>5-10-2015</Text>
                    </View>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Gender:</Text>
                    <Text style={{color: darkBlue, marginLeft:60, fontSize:15}}>Male</Text>
                    </View>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Lost date:</Text>
                    <Text style={{color: darkBlue, marginLeft:30, fontSize:15}}>9-8-2022</Text>
                    </View>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Last Known Location:</Text>
                    <Text style={{color: darkBlue, marginLeft:15, fontSize:15}}>Dokki</Text>
                    </View>

                    <Text style={{alignSelf:"left", marginLeft:20, marginTop:30, color:darkBlue, fontSize:15, fontWeight:"bold"}}>Contact Info:</Text>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Mobile No:</Text>
                    <Text style={{color: darkBlue, marginLeft:25, fontSize:15}}>010 123 456 78</Text>
                    </View>

                    <View style={styles.content}> 
                    <Text style={{color:grey,fontSize:15}}>Email:</Text>
                    <Text style={{color: darkBlue, marginLeft:20, fontSize:15}}>hello@reallygreatsite.com</Text>
                    </View>

                </View>

                <View>

                    <TouchableOpacity style={styles.EditButton} >
                        <Text style={styles.EditText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>


        </View>

    );
};


const styles = StyleSheet.create({

    content:{
        flexDirection:"row",
        fontSize:20,
        marginLeft:40,
        marginTop:20,  

    },
    EditButton: {
        backgroundColor: darkBlue,
        borderRadius: 100,
        alignItems: "center",
        width: 200,
        paddingVertical: 15,
        marginLeft: "25%",
        marginTop:50

    },
    EditText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default KidProfile;