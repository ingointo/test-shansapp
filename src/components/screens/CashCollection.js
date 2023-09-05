import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from '../../api/const';
// import { useFonts } from 'expo-font';


const listAuditingUrl = `${baseUrl}/viewAuditing`;
//dummy data for updating style
// const dummyAuditingList = [
//     {
//         id: 1,
//         sequenceNum: 123,
//         date: '2023-08-21',
//         customerName: 'John Doe',
//         totalAmount: 100,
//     },
//     {
//         id: 2,
//         sequenceNum: 124,
//         date: '2023-08-22',
//         customerName: 'Jane Smith',
//         totalAmount: 200,
//     },
//     {
//         id: 3,
//         sequenceNum: 124,
//         date: '2023-08-22',
//         customerName: 'Jane Smith',
//         totalAmount: 200,
//     },
//     // Add more dummy data objects as needed
// ];


const CashCollection = () => {
    

    // const auditingList = dummyAuditingList
    const [auditingList, setAuditingList] = useState([]);

    useEffect(() => {
        axios.get(listAuditingUrl)
            .then((res) => {
                console.log(res.data.data);
                const customerDetails = res.data.data.map((item) => ({
                    id: item._id,
                    sequenceNum: item.sequence_no,
                    date: item.date,
                    customerName: item.customer_name,
                    totalAmount: item.amount,
                }));
                setAuditingList(customerDetails);
            })
            .catch((error) => {
                console.error("Error fetching invoice:", error);
            });
    }, []);

    const navigation = useNavigation();

    return (
        
        
        <View style={styles.container}>
            <ScrollView>
            {auditingList.length === 0 ? (
                <Text style={styles.notFoundText}>No Collections found</Text>
            ) : (
                auditingList.map((data, index) => (
                    <View style={styles.detailsContainer} key={data.id}>
                        <Text style={styles.label}>{data.customerName}</Text>
                        <Text  style={styles.label}>{data.totalAmount}</Text>
                        <Text  style={styles.label}>{data.date}</Text>
                    </View>
                ))
            )}
                </ScrollView>
            <TouchableOpacity
                onPress={() => navigation.navigate('NewCollection')}
                style={styles.fab}
            >
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 20,
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
    detailsContainer: {
        borderRightWidth: 7.5,
        borderBottomWidth: 0.9,
        borderLeftWidth: 0.9,
        borderTopWidth: 0.9,
        borderRightColor: "red",
        borderBottomEndRadius: 25,
        borderTopLeftRadius: 25,
        marginVertical: 5,
        padding: 30,
        justifyContent: "space-between",
        flexDirection: "row"
    },
    notFoundText: {
        textAlign: "center",
        fontSize: 30,
        color: "black"
    },
    label: {
        fontSize: 15,
       
       
    }
});

export default CashCollection;
