import React, { useState, useEffect } from "react"
import { View, StyleSheet, Text, Image, StatusBar, FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import CustomButton from "../custombutton";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../../api/const";
import HomeProductList from "./HomeProductList";


const productUrl = `${baseUrl}/viewProducts`;

export default function Home() {
    const numColumns = 2

    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        axios.get(productUrl)
            .then((res) => {
                const productNamesArr = res.data.data.map((item) => ({
                    _id: item._id, // Add missing _id property
                    productName: item.product_name,
                    productCost: item.cost
                }));

                setFilteredProducts(productNamesArr);
            })
            .catch(err => console.log(err));
    }, []);


    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#ffa600" />

            <View style={styles.imageContainer} >
                <Image
                    source={require('../../../assets/shansHome.jpeg')}
                    fadeDuration={0}
                    style={{ width: 200, height: 50 }}
                />
                <FontAwesome name="bell-o" style={styles.bellIcon} />
            </View>

            <View style={styles.searchContainer}>
                <FontAwesome name="search" size={22} color="white" />
                <CustomButton title="What are you looking for ?" textcolor="#ffa600" onPress={() => navigation.navigate('OptionScreen')} />
                <AntDesign name="barcode" size={22} color="white" />
            </View>

            <View>
                <Text style={{ fontWeight: '500', textAlign: 'center', marginTop: 8, fontSize: 16, }}>Discount available for Bulk Purchase</Text>
            </View>

            <View>
                <Image source={require('../../../assets/huaweibanner.jpg')} style={{ width: 450, height: 200, resizeMode: "stretch" }} />
            </View>

            <View style={styles.button}>
                <View style={styles.buttonicon}>
                    <MaterialIcons name="directions-bike" size={28} color="black" />
                    <CustomButton title="Pickup" color="#32c918" onPress={() => console.log('Button pressed')} />
                </View>

                <View style={styles.buttonicon}>
                    <MaterialIcons name="design-services" size={28} color="black" />
                    <CustomButton title="Services" color="#fe0000" onPress={() => navigation.navigate('Jobscreen')} />
                </View>

                <View style={styles.buttonicon}>
                    <MaterialIcons name="contact-page" size={28} color="black" />
                    <CustomButton title="Contacts" color="#3c7dff" onPress={() => navigation.navigate('Contactsviewnav')} />
                </View>
            </View>
            <View style={{flex:1}}>
                <View style={styles.productListContainer}>
                    <FlatList
                        data={filteredProducts}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => <HomeProductList item={item} />}
                        numColumns={numColumns}
                    />
                </View>
            </View>
            
            <FAB
                style={styles.fab}
                icon={() => <MaterialIcons name="message" size={24} color="white" />}
                onPress={() => console.log('FAB pressed')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    Text: {
        padding: 25,
    },

    shanstext: {
        fontSize: 20,
    },

    shans: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-around',
        marginTop: 10,
    },

    fab: {
        position: 'absolute',
        left: 20,
        bottom: 100, 
        backgroundColor: '#ffa600',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    searchContainer: {
        marginTop: 15,
        marginHorizontal: 15,
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        justifyContent: 'space-evenly',
        backgroundColor: '#222222',
        alignItems: "center"
    },

    searchtext: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#eea40f',
    },

    buttonicon: {
        borderWidth: 0.5,
        borderColor: '#222222',
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 5
    },

    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    imageContainer: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        marginHorizontal: 20,
        justifyContent: "space-between"
    },
    bellIcon: {
        fontSize: 24,
        color: "black",
    },
    productListContainer:{ 
        // alignSelf: "center",
        alignItems: "center"
    }
});