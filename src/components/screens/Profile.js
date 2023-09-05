import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Button from "../Button";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 

export default function ProfileScreen() {
    const [adminDetails, setAdminDetails] = useState({});
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userData'); 
            navigation.navigate('LoginScreen'); 
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const adminDetails = await AsyncStorage.getItem('userData');
                if (adminDetails !== null) {
                    const parsedAdminDetails = JSON.parse(adminDetails);
                    setAdminDetails(parsedAdminDetails);
                }
            } catch (error) {
                console.error("Error fetching admin details:", error);
            }
        };
        fetchAdminDetails();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Text style={styles.headText}>Profile</Text>
                <View style={{flexDirection: "row", marginLeft: 250, marginRight: 5}}>

                <AntDesign name="unlock" size={25} color="white" />
                <Feather name="edit" size={25} color="white" />
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../../assets/profileLogo.png')}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.capText}>{adminDetails.user_name}</Text>
                {/* Add other details as needed */}
            </View>
            <View>

            </View>
            <View style={styles.bottomButton}>
                <Button  title=" Logout" onPress={handleLogout}/>
            </View>
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    top: {
        backgroundColor: "#ffa600",
        padding: 20,
        flexDirection: "row",
        
    },
    headText: {
        color: "white",
        fontSize: 18,

    },
    tinyLogo: {
        width: 100,
        height: 100,
        alignSelf: "center",
        marginTop: 15,
    },
    detailsContainer: {
        alignSelf: "center",
    },
    bottomButton: {
        marginVertical: 370,
        marginHorizontal: 85
    }, 
    capText: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
});
