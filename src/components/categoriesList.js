import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { useNavigation } from '@react-navigation/native'

const CategoriesList = ({ item, contact }) => {
    console.log('Product List ++++++++++++ ')


    console.log("contact Iist", contact)
    console.log("item---:", item)

    const navigation = useNavigation();

    const { categoryName, landingCost, imageUrl } = item

    const getShortcategoryName = (categoryName, maxLength) => {
        if (categoryName.length <= maxLength) {
            return categoryName;
        } else {
            return categoryName.substring(0, maxLength) + '...';
        }
    };

    const shortenedCategoryName = getShortcategoryName(categoryName, 20);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductScreen', { category: categoryName })}>
            <View style={[styles.box]} >
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: imageUrl || 'https://cdn1.iconfinder.com/data/icons/scenarium-silver-vol-8/128/044_error_not_found_page-1024.png',
                    }}
                />

                <Text style={styles.textFam}>{shortenedCategoryName}</Text>
                {/* <Text style={styles.textPrice}>Price : {landingCost} QAR</Text> */}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    box: {
        marginTop: 25,
        marginHorizontal: 15,
        marginLeft: 10,
        width: 130,
        height: 140,
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
        marginTop: 10,
        color: "black",
        fontSize: 15,
        letterSpacing: 0.3
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    textPrice: {
        color: "#808080"
    }
});

export default CategoriesList;
