import React from "react";
import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, FlatList, Image } from "react-native";
import Ionicons from "react-native-vector-icons/AntDesign";
import { darkBlue, grey } from "./Constants";


const Notifications = (props) => {

    return (
        <View>
            <TouchableOpacity onPress={() => props.navigation.navigate("Home")}>
                <Ionicons
                    name={"left"}
                    size={25}
                    color={darkBlue}
                    style={{ top: 50, left: 20 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => props.navigation.navigate("UserProfile")}>
                <Image source={require("../assets/user.png")} style={{
                    width: 35, height: 35, borderRadius: "200", backgroundColor: "white", marginLeft: "82%", marginTop: "6%"
                }}></Image>
            </TouchableOpacity>

            <View style={Styles.container}>

                <Text style={{ color: darkBlue, fontSize: 22, fontWeight: "bold" }}>
                    Notifications
                </Text>
                <TouchableOpacity>
                    <Text style={{ color: grey, fontSize: 13, fontWeight: "normal", marginHorizontal: "40%", marginTop: "2%" }}>View All</Text>
                </TouchableOpacity>

            </View>

            <View style={Styles.content}>
                <Image source={require("../assets/settings.png")} style={{width:35,height:35,marginLeft: "8%", borderRadius:"15%" }}></Image>
                <View>
                <Text style={{color: darkBlue, fontSize: 15, fontWeight: "bold", marginHorizontal:"2%",marginTop: "2%"}}>Safe Kids</Text>
                <Text style={{color: darkBlue, fontSize: 15, fontWeight: "normal"}}>4 new kid's profiles were added today. {"\n"}Check them out!</Text>
                <Text>2 minutes ago.</Text>
                </View>
                

            </View>

        </View>




    )
};

const Styles = StyleSheet.create({
    container: {
        padding: "8%",
        flexDirection: "row",
    },
    content: {
        flexDirection: "row"
    }
});


export default Notifications;