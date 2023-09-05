import React from "react";
import { StyleSheet,Text,TouchableOpacity,View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

export  default function ContactItem({item}){

    const navigation=useNavigation();


    return(
        <TouchableOpacity onPress={()=>navigation.navigate('Contactdetails',{item:item})}>
            <View style={styles.item} >
                <MaterialIcons name="contacts" size={50} color="black" style={{marginLeft:10,marginRight:10,}} />
                <View style={styles.textinside} >
                    <Text style={styles.text}>{item.name} </Text>
                    <Text style={{marginLeft:10,marginTop:10,}}>{item.mobile}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}


const styles=StyleSheet.create({

    item:{
        flexDirection:'row',
        margin:20,
    },

    text:{
        marginLeft: 10,
        fontSize:16,
    },

    textinside:{
        flex:1,
    },



});