import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, color,textcolor }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color ,}]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText,{color:textcolor,}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal:21,
    paddingVertical:6,
    borderRadius: 5,
  },
  buttonText: {
    
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CustomButton;