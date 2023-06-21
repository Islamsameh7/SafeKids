import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { navyblue, darkBlue, grey } from "./Constants";

const DropdownComponent = ({ data, onChange }) => {
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
        top: -30,
      }}
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select one.."
      placeholderTextColor={grey}
      value={value}
      onChange={handleValueChange}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    width: "65%",
    backgroundColor: "rgb(220, 220, 220)",
    marginVertical: 10,
  },
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
