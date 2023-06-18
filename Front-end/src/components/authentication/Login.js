import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import Background from "../Background";
import apiRoutes from "../apiRoutes";
import { post } from "../apiCalls";
import Btn from "../Btn";
import { darkBlue, navyblue,grey } from "../Constants";
import { Context } from "../../context/globalContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const globalContext = useContext(Context);
  const { setIsLoggedIn, domain, setUserName, setToken } = globalContext;
  const [error, setError] = useState("");

  function tempLogin(){
    props.navigation.navigate("Home");
  }
  const handleLogin = async () => {
    try {
      const response = await fetch(apiRoutes.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      console.log(body)
      if (response.ok) {
        // Login successful
        const data = await response.json();
        // Handle the successful login response, e.g., set user state, store token, etc.
      } else {
        console.log(response.json())
        // Login failed
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };
  
  

  return (
 
      
      
      <View style={{ alignItems: "center", width: 460 }}>
        <View><ImageBackground
        source={require("../../assets/loginImage.jpg")}
        style={{
          width: 420,
          height: 450,
          
          marginRight:40,
        }}
        blurRadius={5}
      />
      </View>
      
        <View
          style={{
            backgroundColor: "white",
            height: 400,
            width: 460,
            borderTopRightRadius: 140,
            paddingTop: 50,
            alignItems: "center",
            bottom:125,
          }}
        >
          <Text
            style={{
              fontSize: 60,
              color: darkBlue,
              fontWeight: "bold",
              marginRight: 40,
            }}
          >
            Login
          </Text>
          <Text
            style={{
              color: darkBlue,
              fontSize: 13,
              marginBottom: 20,
              marginRight: 40,
            }}
          >
            Sign in to continue
          </Text>
          <Text
            style={{
              color: darkBlue,
              marginRight: 300,
              fontSize: 15,
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
              marginRight: 260,
              fontSize: 15,
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

          <TouchableOpacity style={styles.loginButton} onPress={tempLogin}> 
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>

          

         
            
            <TouchableOpacity
              onPress={() => props.navigation.navigate("ForgotPassword")}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold",marginTop:25,marginRight:50,color:darkBlue }}>
              Forgot Password?
            </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => props.navigation.navigate("Signup")}
            >
              <Text
                style={{ fontSize: 16, fontWeight: "bold",marginTop:5,marginRight:50,color:darkBlue }}
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
    borderRadius: 100,
    color: navyblue,
    paddingVertical: 13,
    paddingHorizontal: 8,
    width: "69%",
    backgroundColor: "rgb(220,220, 220)",
    marginVertical: 10,
    marginRight: 50,
  },
  loginButton: {
    backgroundColor: darkBlue,
    borderRadius: 100,
    alignItems: "center",
    width: 260,
    paddingVertical: 11,
    marginTop: 25,
    marginRight:60,
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default Login;
