import React, { useEffect, useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { baseUrl } from "../../api/const";

const invoiceUrl = `${baseUrl}/viewInvoice/`;

const CustomButton = ({ title, onPress }) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.button}>
                <AntDesign name="left" size={14} color="black" />
                <Text style={styles.title}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
};

const OrderDetails = () => {

    const [invoice, setInvoice] = useState({})
    const route = useRoute(); // or use parathesis passing prop

    const id = route.params.item.id
    console.log(id)

    useEffect(() => {
        axios.get(invoiceUrl + id).then((res) => {
            console.log("+++++++++++++++++++++++++=----------------------==========", res.data.data[0])
            // setInvoice(res.data.data)
            const invoiceDetails = res.data.data[0]
            console.log("invoiceDetails-------------------", invoiceDetails)
            if (invoiceDetails) {
                const details = {
                    id: invoiceDetails._id,
                    sequenceNum: invoiceDetails.sequence_no,
                    paymentDate: invoiceDetails.date,
                    invoiceStatus: invoiceDetails.invoice_status,
                    paidAmount: invoiceDetails.paid_amount,
                    // productName: invoiceDetails.product_name,
                    date: invoiceDetails.date,
                    total: invoiceDetails.total_amount,
                    customerName: invoiceDetails.customer.customer_name,
                    // warehouseName: invoiceDetails.warehouses_name
                }
                setInvoice(details)
                console.log("details", details)
            }

            // console.log("Invoice details -----+++++++++++++++++++-----", invoiceDetails)
        });
    }, []);

    console.log("Invoic details -----+++++++++++++++++++-----", invoice)
    const navigation = useNavigation();
    return (
        <>
            <CustomButton title="Invoice Details" onPress={() => navigation.goBack()} />
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>{invoice.sequenceNum}</Text>

                {/* <View style={styles.columnContainer}>
                    <Text style={styles.label}>Product Name:</Text>
                    <Text style={styles.text}>{invoice.productName}</Text>
                </View> */}

                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Date & Time:</Text>
                    <Text style={styles.text}>{invoice.date}</Text>
                </View>
                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Total Amount:</Text>
                    <Text style={styles.text}>{invoice.total}</Text>
                </View>
                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.text}>{invoice.invoiceStatus}</Text>
                </View>
                <View style={styles.columnContainer}>
                    <Text style={styles.label}>Customer Name:</Text>
                    <Text style={styles.text}>{invoice.customerName}</Text>
                </View>

                {/* <View style={styles.columnContainer}>
                    <Text style={styles.label}>Warehouse Name:</Text>
                    <Text style={styles.text}>{invoice.warehouseName}</Text>
                </View> */}

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#ffa600",
    },
    title: {
        marginLeft: 34,
        fontSize: 15,
        color: "white",
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        color: "black"
    },
    columnContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});

export default OrderDetails;
