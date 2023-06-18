import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {  darkBlue} from "./Constants";

export default function Btn({bgColor, btnLabel, textColor, Press}) {
    return (
      <TouchableOpacity
      onPress={Press}
        style={{
          backgroundColor: bgColor,
          borderColor: darkBlue,
          borderWidth:  5,
          borderRadius: 100,
          alignItems: 'center',
          width: 320,
          paddingVertical: 5,
          marginVertical: 10
        }}>
        <Text style={{color: textColor, fontSize: 25}}>
          {btnLabel}
        </Text>
      </TouchableOpacity>
    );
  }