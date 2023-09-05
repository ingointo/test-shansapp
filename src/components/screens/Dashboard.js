import React from "react";
import {View, Text, StyleSheet} from 'react-native'

const Dashboard = () => {
    const { container } = styles
    return (
        <View style={container}>
            <Text>
                Your Dashboard is Active !! you successfully loggedIn...............
            </Text>

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }

})
export default Dashboard
