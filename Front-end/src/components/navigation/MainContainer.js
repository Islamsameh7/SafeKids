import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { navyblue } from '../Constants';

// Screens
import Home from '../Home';
import Profile from '../Profile';
import Stats from '../Stats';


//Screen names
const homeName = "Home";
const profileName = "Profile";
const statsName = "Stats"


const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
   
      <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? 'home' : 'home-outline';

            } else if (rn === profileName) {
              iconName = focused ? 'person' : 'person-outline';

            } else if (rn === statsName) {
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: navyblue,
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }} >

        <Tab.Screen options={{headerShown: false}} name={homeName} component={Home} />
        <Tab.Screen options={{headerShown: false}} name={profileName} component={Profile} />
        <Tab.Screen options={{headerShown: false}} name={statsName} component={Stats} />
      </Tab.Navigator >
   
  );
}

export default MainContainer;