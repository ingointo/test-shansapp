import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native'

const HomeProductList = ({ item }) => {
    console.log('Product List ++++++++++++ ')

    console.log(item)

    const navigation = useNavigation();
    const { productName, productCost } = item

    const getShortProductName = (productName, maxLength) => {
        if (productName.length <= maxLength) {
            return productName;
        } else {
            return productName.substring(0, maxLength) + '...';
        }
    };

    const shortenedProductName = getShortProductName(productName, 20);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { item: item })}>
            <View style={[styles.box]} >
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://cdn1.iconfinder.com/data/icons/scenarium-silver-vol-8/128/044_error_not_found_page-1024.png',
                    }}
                />
                <View style={styles.bottomContainer}>
                    <Text style={styles.bottomText}>New Lowest Price</Text>
                </View>
                <Text style={styles.textFam}>{shortenedProductName}</Text>
                <Text style={styles.textPrice}>Price : {productCost} QAR</Text>
            </View>
        </TouchableOpacity>





    );
}

const styles = StyleSheet.create({
    box: {
        marginTop: 25,
        marginHorizontal: 5,
        width: 150,
        height: 150,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 0.5,
        borderColor: "#ffa600"
    },
    textFam: {
        fontFamily: "sans-serif",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 3,
        color: "black",
        fontSize: 14,
        letterSpacing: 0.3
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    textPrice: {
        color: "#808080"
    },
    bottomContainer: {
        width: 125,
        height: 20,
        backgroundColor: "red",
        borderRadius: 5,
        color: "white",
        alignItems: "center",
        marginTop: 8
    },
    bottomText: {
        color: "white",
    },

});

export default HomeProductList;
