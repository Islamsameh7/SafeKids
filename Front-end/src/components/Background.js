import { View, Text,StyleSheet, ImageBackground } from 'react-native'
import React from 'react'

const Background = ({children}) => {
  return (
    <View >

      <ImageBackground 
      source={require("../assets/getStartedImage.jpg")} 
      style={{  width: 380,
        height: 380,
        marginHorizontal:25}}/>

      <View 
      style={{ position:'absolute'}}>
        {children}
      </View>

    </View>
  )
}
const styles = StyleSheet.create({})

export default Background