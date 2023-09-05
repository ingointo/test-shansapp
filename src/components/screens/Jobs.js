import React from "react"
import { Text,View,StyleSheet } from "react-native"
import Calender from "../Calender/Calender";
import { FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';



export default function Jobs({navigation}){
    const [selectedDate, setSelectedDate] = React.useState(null);
    return(
        <View style={styles.container}>
            <Calender onSelectedDate={setSelectedDate} selcted={selectedDate}/>
            <Text>Jobs screen</Text>

            <FAB
            style={styles.fab}
            icon={() => <MaterialIcons name="contact-page" size={24} color="white" />}
            onPress={() => navigation.navigate('AddJobscreen')}
        />
        </View>
    );
}

const styles=StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    fab: {
        position: 'absolute',
        right: 28,
        bottom: 200,
        backgroundColor: '#ffa600',
        borderRadius: 30,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
});