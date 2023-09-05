import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const buttonWidth = width * 0.5; // Set the button width to half of the screen width

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.buttonContainer, { width: buttonWidth }]} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Image
                    source={require('../../../assets/left-arrow.png')}
                    fadeDuration={0}
                    style={{ width: 30, height: 30 }}
                />
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const OptionScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <CustomButton title="Choose an option" onPress={() => navigation.goBack()} />
            <View style={styles.headerTextContainer}>
                <Text style={styles.headerText}>What are you looking for?</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                    style={[styles.box, { backgroundColor: '#ebebeb' }]}
                    onPress={() => navigation.navigate('ProductScreen')}
                >
                    <Image
                        source={require('../../../assets/optionsIcons/product.png')}
                        fadeDuration={0}
                        style={{ width: 45, height: 45 }}
                    />
                    <Text style={styles.textFam}>Search Products</Text>
                </TouchableOpacity>
                <View
                    style={[styles.box, { backgroundColor: '#ebebeb' }]}
                >
                    <Image
                        source={require('../../../assets/optionsIcons/barcode.png')}
                        fadeDuration={0}
                        style={{ width: 45, height: 45 }}
                    />
                    <Text style={styles.textFam}>Scan Barcode</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <View style={[styles.box, { backgroundColor: '#ebebeb' }]} >
                    <Image
                        source={require('../../../assets/optionsIcons/productEnquery.png')}
                        fadeDuration={0}
                        style={{ width: 45, height: 45 }}
                    />
                    <Text style={styles.textFam}>Product Enquiry</Text>
                </View>
                <View style={[styles.box, { backgroundColor: '#ebebeb' }]} >
                    <Image
                        source={require('../../../assets/optionsIcons/productPurchase.png')}
                        fadeDuration={0}
                        style={{ width: 45, height: 45 }}
                    />
                    <Text style={styles.textFam}>Product Purchase Requisition</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                <TouchableOpacity
                 onPress={() => navigation.navigate('CashCollection')}>

                <View style={[styles.boxDiffer, { backgroundColor: '#ebebeb' }]} >
                    <Image
                        source={require('../../../assets/optionsIcons/cashCollection.png')}
                        fadeDuration={0}
                        style={{ width: 45, height: 45 }}
                    />
                    <Text style={styles.textFam}>Cash Collection</Text>
                </View>
                </TouchableOpacity>

                {/* task manager in the below opacity */}
                <TouchableOpacity
                 onPress={() => navigation.navigate('AddTask')}> 

                <View style={[styles.boxDiffer, { backgroundColor: '#ebebeb' }]} >
                    <Image
                        source={require('../../../assets/optionsIcons/task.png')}
                        fadeDuration={0}
                        style={{ width: 45, height: 45 }}
                    />
                    <Text style={styles.textFam}>Task Manager</Text>
                </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 3,
        backgroundColor: "#fac02e",
        borderRadius: 25,
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        marginLeft: 13, // Add some spacing between the icon and text
        marginRight: 25,
        fontFamily: "sans-serif-medium",
        letterSpacing: 0.7
    },
    box: {
        marginHorizontal: 25,
        width: 175,
        height: 140,
        borderRadius: 25,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ebebeb",
        borderWidth: 0.5
    },
    boxDiffer: {
        marginHorizontal: 25,
        width: 175,
        height: 140,
        borderRadius: 25,
        marginBottom: 15,
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#ebebeb",
        borderWidth: 0.5
    },
    textFam: {
        fontFamily: "sans-serif-medium",
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 10,
        color: "#5f5d5e",
        fontSize: 13,
        letterSpacing: 0.3
    },
    headerTextContainer: {
        marginHorizontal: 70,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4d4948",
        borderRadius: 25,
        height: 45,
        marginBottom: 25
    },
    headerText: {
        color: "#2794f0",
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "sans-serif-medium"
    }
});

export default OptionScreen;
