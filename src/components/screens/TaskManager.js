import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from "@expo/vector-icons"



const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonContent}>
                    <AntDesign name="left" size={20} color="black" />
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const TaskManager = () => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View>
                <CustomButton title="Task Manager" onPress={() => navigation.goBack()} />
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('TaskAddManager')}
                style={styles.fab}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: "#ffa600",
    },
    buttonContent: {
        flexDirection: "row",
        marginLeft: 10,
        marginBottom: 12,
        alignItems: "center"
    },

    buttonText: {
        marginLeft: 34,
        fontSize: 17,
        color: "white"
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#07d7c7',
        borderRadius: 30,
        elevation: 8,
    },
    fabIcon: {
        fontSize: 40,
        color: 'white',
    },
})

export default TaskManager