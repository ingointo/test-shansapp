import React from "react";
import { View,  TouchableOpacity, StyleSheet, TextInput} from "react-native";
import { AntDesign } from "@expo/vector-icons"


export default QuantityChanger = ({ quantity, increaseQuantity, decreaseQuantity, setQuantity }) => {
    return (
      <View style={styles.quantityChanger}>
        <TouchableOpacity onPress={decreaseQuantity}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          <TextInput
            style={styles.textInput}
            value={quantity.toString()}
            onChangeText={text => setQuantity(parseInt(text) || 0)}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={increaseQuantity}>
          <AntDesign name="arrowright" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
   
 
    quantityChanger: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
  
    textContainer: {
      borderColor: "black",
      borderWidth: 0.5,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 20,
      width: 45,
      borderRadius: 5
    },
    textInput: {
      alignItems: "center",
      justifyContent: "center",
      textAlign:"center"
    },
  });
  