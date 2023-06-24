import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image
} from "react-native";
import Background from "../Background";
import apiRoutes from "../apiRoutes";
import { post } from "../apiCalls";
import Btn from "../Btn";
import { darkBlue, navyblue,grey } from "../Constants";
import { Context } from "../../context/globalContext";
import { AuthContext } from "./AuthProvider";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginContext } = useContext(AuthContext);


  const login = async () => {
    const formData = new FormData();


    formData.append('email', email);
    formData.append('password', password);
   

    const response = await fetch(apiRoutes.login, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  
    if (response.ok) {
      const userData = await response.json();
      loginContext(userData)
      props.navigation.navigate("Home");
      
    } else {
      // Error response
      const errorData = await response.text();
      console.log('Failed to Login:', errorData);
    }
  }
  
  

  return (

   // style={{ alignItems: "center", width: "100%" }}
      
      <View >
        <View><Image
        source={require("../../assets/loginImage.jpg")}
        style={{
          width: "100%",
          height: "65%",
          
        }}
        blurRadius={5}
      />
      </View>
      
        <View
          style={{
            //backgroundColor: "white",
            height: "18%",
            width: "100%",
            //borderTopRightRadius: "20%",
           // paddingTop: Dimensions.get('window').height /20,
            paddingVertical: Dimensions.get('window').height /100,
            paddingHorizontal:Dimensions.get('window').height /40,
            alignItems: "center",
            paddingBottom:Dimensions.get('window').height /60,
          }}
        >
          <Text
            style={{
              fontSize: Dimensions.get('window').width /8,
              color: darkBlue,
              fontWeight: "bold",
              marginRight: Dimensions.get('window').width/250,
             
            }}
          >
            Login
          </Text>
          <Text
            style={{
              color: darkBlue,
              fontSize: Dimensions.get('window').width /30,
              marginBottom: Dimensions.get('window').height/30,
              marginRight: Dimensions.get('window').width/50,
            }}
          >
            Sign in to continue
          </Text>
          <Text
            style={{
              color: darkBlue,
              marginRight: Dimensions.get('window').width/1.5,
              fontSize: Dimensions.get('window').width /24,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            EMAIL
          </Text>
          <TextInput
            value={email}
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="example@website.com"
            onChangeText={(text) => setEmail(text)}
            keyboardType={"email-address"}
          ></TextInput>

          <Text
            style={{
              color: darkBlue,
              marginRight: Dimensions.get('window').width/1.8,
              fontSize: Dimensions.get('window').width /24,
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            PASSWORD
          </Text>

          <TextInput
            value={password}
            style={styles.field}
            placeholderTextColor={grey}
            placeholder="******"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          ></TextInput>

          <TouchableOpacity style={styles.loginButton} onPress={login}> 
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          
            
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgotPassword")}
            >
              <Text style={{ fontSize: Dimensions.get('window').width /25, fontWeight: "bold",marginTop:Dimensions.get('window').height /60,
              marginRight:Dimensions.get('window').width /30,color:darkBlue }}>
              Forgot Password?
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={{ fontSize: Dimensions.get('window').width /28, 
                fontWeight: "bold",marginRight:Dimensions.get('window').width /30,color:darkBlue }}
              >
                Signup
              </Text>
            </TouchableOpacity>
        
        </View>
      </View>

  );
};

const styles = StyleSheet.create({
  field: {
    borderRadius: "100%",
    color: navyblue,
    paddingVertical: Dimensions.get('window').height /60,
    paddingHorizontal: Dimensions.get('window').width /25,
    width: "85%",
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: Dimensions.get('window').height /50,
    marginRight: Dimensions.get('window').width /22,
  },
  loginButton: {
    backgroundColor: darkBlue,
    borderRadius: "100%",
    alignItems: "center",
    width: "55%",
    height:"55%",
    paddingVertical: Dimensions.get('window').height /80,
    marginTop: Dimensions.get('window').height /40,
    marginRight:Dimensions.get('window').width /70,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: Dimensions.get('window').width /20,
    fontWeight: "bold",
  },
});

export default Login;
