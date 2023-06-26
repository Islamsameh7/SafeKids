import React, { useState } from "react";
import { StyleSheet,Dimensions } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { navyblue, darkBlue, grey } from "./Constants";

const DropdownComponent = ({ data, onChange,dropdownStyle,placeholder }) => {
  const [value, setValue] = useState(null);

  const handleValueChange = (item) => {
    setValue(item.value);
    if (onChange) {
      onChange(item);
    }
  };

  return (
    <Dropdown
      containerStyle={{
        top: -Dimensions.get('window').height/30,
      }}
      style={dropdownStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder= {placeholder}
      placeholderTextColor={grey}
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
 
  icon: {
    marginRight: 5,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
