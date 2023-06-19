// In App.js in a new project

import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GetStarted from "./src/components/GetStarted";
import Signup from "./src/components/authentication/Signup";
import Login from "./src/components/authentication/Login";
import { Context, Provider } from "./src/context/globalContext.js";
import Home from "./src/components/Home";
import MainContainer from "./src/components/navigation/MainContainer";
import ForgotPassword from "./src/components/authentication/ForgotPassword";
import Verification from "./src/components/authentication/Verification";
import NewPassword from "./src/components/authentication/NewPassword";
import AddKidProfile from "./src/components/userFunctions/AddKidProfile";
import KidProfilePhotos from "./src/components/userFunctions/KidProfilePhotos";
import UploadPhoto from "./src/components/userFunctions/UploadPhoto";
import Matching from "./src/components/Matching";
import AboutUs from "./src/components/AboutUs";
import MatchingProfiles from "./src/components/userFunctions/MatchingProfiles";
import MyKids from "./src/components/userFunctions/MyKids";
import Profile from "./src/components/Profile";
const Stack = createNativeStackNavigator();

function App(props) {
  const globalContext = useContext(Context);
  const isLoggedIn = globalContext;
  return (
    <Provider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: "#FFFFFF",
            },
          }}
        >

          <Stack.Screen name="GetStarted" component={GetStarted} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="AddKidProfile" component={AddKidProfile} />
          <Stack.Screen name="KidProfilePhotos" component={KidProfilePhotos} />
          <Stack.Screen name="UploadPhoto" component={UploadPhoto} />
          <Stack.Screen name="Matching" component={Matching} />
          <Stack.Screen name="MatchingProfiles" component={MatchingProfiles} />
          <Stack.Screen name="MainContainer" component={MainContainer} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="Verification" component={Verification} />
          <Stack.Screen name="NewPassword" component={NewPassword} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
          <Stack.Screen name="MyKids" component={MyKids} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
