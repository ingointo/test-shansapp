import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { Picker } from "@react-native-community/picker";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { baseUrl } from "../../api/const";
// import SignatureScreen from "react-native-signature-canvas";
import Sign from "../Sign/Sign";
import Toast from 'react-native-toast-message';



// const collectionTypeDropdownUrl = `${baseUrl}/viewCollectionType/collection_type_list/collection_type_dropdown`//no need this drop down we can collect data in the invoice 
const collectionTypeUrl = `${baseUrl}/viewCollectionType?bussiness_type_id=`
const invoiceDetailsUrl = `${baseUrl}/viewInvoice?sequence_no=`
const vendorDetailsUrl = `${baseUrl}/viewVendorBill?sequence_no=`
const salesReturnUrl = `${baseUrl}/viewReturn?sequence_no=`
const purchaseReturnUrl = `${baseUrl}/viewReturn?sequence_no=`
const capitalPaymentUrl = `${baseUrl}/viewCapitalPayment?sequence_no=`
const jobInvoiceUrl = `${baseUrl}/viewJobInvoice?sequence_no`
const sparePartsIssueUrl = `${baseUrl}/viewSparePartsIssue/auditing/spare_parts_issue_details?sequence_no=`
const pettyCashAllotmentUrl = `${baseUrl}/viewPettyCashAllotement?sequence_no=`
const pettyCashExpenseUrl = `${baseUrl}/viewPettyCashExpence?sequence_no=`
const capitalReceiptsUrl = `${baseUrl}/viewCapital?sequence_no=`
const createAuditingUrl = `${baseUrl}/createAuditing`


const CustomButton = ({ title, onPress }) => {

    return (
        <TouchableOpacity style={[styles.buttonContainer]} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};


// submit button

const CustomSubmitButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity style={[styles.submitButtonContainer]} onPress={onPress}>
            <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </TouchableOpacity>
    );
};
const NewCollection = () => {


    // just show toast sample
    const showToast = () => {
        Toast.show({
            type: 'success',
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }

    const route = useRoute();
    console.log(route)
    const navigation = useNavigation()

    const [resData, setResData] = useState([])
    const [collectionType, setCollectionType] = useState('');
    // const [selectedCustomer, setSelectedCustomer] = useState('');
    const [adminDetails, setAdminDetails] = useState({});
    const [customer, setCustomer] = useState({});
    const [remarks, setRemarks] = useState('')
    const [customerDataAPI, setCustomerDataAPI] = useState([])
    const [bill, setBill] = useState(null);
    // console.log(remarks)


    //fetch details from scanner compnent
    const scannedData = route.params?.scannedData; //sample output getting scanned data filtering which want to search in the sequence number sample getting output is "INV-39"
    const whichBill = route.params?.whichBill; //which bill means invoice or vendor or anything else // sample output gettinig is Invoice or Vendor bill
    const uploadUrl = route.params?.uploadUrl;

    console.log("scannedData----------", scannedData)
    console.log("whichBill----------", whichBill)
    console.log("uploadUrl----------", uploadUrl)




    useEffect(() => {
        fetchAdminDetails();
        // axios.get(collectionTypeDropdownUrl).then((response) => { //no need dropdown 
        //     console.log(response.data)
        //     setResData(response.data)
        // })
    }, []);


    useEffect(() => {
        // Fetch data and set whichBill when the component mounts
        if (route.params?.whichBill) {
            setBill(route.params.whichBill);
        }
        // ... Other useEffect code ...

    }, [route.params?.whichBill]);


    useEffect(() => {
        if (scannedData) {
            fetchCustomerDetails();
        }
    }, [scannedData]);

    const fetchAdminDetails = async () => {
        try {
            const adminDetailsStr = await AsyncStorage.getItem('userData');
            if (adminDetailsStr) {
                const parsedAdminDetails = JSON.parse(adminDetailsStr);
                setAdminDetails(parsedAdminDetails);
                // console.log("adminDetails------", adminDetails);
            }
        } catch (error) {
            console.error("Error fetching admin details:", error);
        }
    };

    console.log("adminDetails--++----", adminDetails);
    console.log("response----------", resData)

    const fetchCustomerDetails = async () => {
        try {
            if (whichBill == "Invoice") {
                // console.log("entered--------------")
                const response = await axios.get(`${invoiceDetailsUrl}${scannedData}`);

                const customerData = response.data.data[0] // Assuming the response contains the customer details
                setCustomerDataAPI(customerData)
                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.customer.customer_name,
                        invoiceNumber: customerData.sequence_no,
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.register_payments[0].payment_method_id,
                        totalAmount: customerData.total_amount !== null ? customerData.total_amount.toString() : ""



                    }
                    console.log("customerDetails=====full =+++", customerDetails)
                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)


                }

                console.log("customerData", customerData);
            }
            if (whichBill == "Vendor Bill") {
                const response = await axios.get(`${vendorDetailsUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Vendor bill customoer data", customerData)
                setCustomerDataAPI(customerData)

                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.supplier?.supplier_name || '',
                        invoiceNumber: customerData.sequence_no || '',
                        totalAmount: customerData.total_amount !== null ? customerData.total_amount.toString() : '',
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.register_payments[0].payment_method_id,
                    }
                    console.log("customerDetails======+++", customerDetails)
                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)
                }

                console.log("customerData", customerData);

            }

            if (whichBill == "SALRET") {
                const response = await axios.get(`${salesReturnUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Sales return  customoer data", customerData)
                setCustomerDataAPI(customerData)
                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.customer.customer_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.total_amount.toString(),
                        // businessType: customerData.bussiness_type_id,
                        // paymentMethod: customerData.payment_method_id,
                    }
                    console.log("customerDetails======+++", customerDetails)
                    setCustomer(customerDetails)
                }

                console.log("customerData", customerData);
            }
            if (whichBill == "PURCHRET") {
                const response = await axios.get(`${purchaseReturnUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Vendor bill customoer data", customerData)
                setCustomerDataAPI(customerData)

                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.supplier.supplier_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.total_amount.toString(),
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.payment_method_id,

                    }
                    console.log("customerDetails======+++", customerDetails)
                    setCustomer(customerDetails)
                }

                console.log("customerData", customerData);
            }

            if (whichBill == "CAPREC") {
                const response = await axios.get(`${capitalReceiptsUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Capital reciepts customoer data", customerData)
                setCustomerDataAPI(customerData)
                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.sales_person.sales_person_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.amount.toString(),
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.paid_through_chart_of_account_id,
                    }
                    console.log("customerDetails======+++", customerDetails)
                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)
                }

                console.log("customerData", customerData);
            }
            if (whichBill == "CAPPAY") {
                const response = await axios.get(`${capitalPaymentUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Capital Payment customoer data", customerData)
                setCustomerDataAPI(customerData)
                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.sales_person.sales_person_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.amount.toString(),
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.paid_through_chart_of_account_id
                    }
                    console.log("customerDetails======+++", customerDetails)

                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)
                }
                console.log("customerData", customerData);
            }
            console.log(customer);



            if (whichBill == "JobInvoice") {
                console.log("i entered jobinboice ")
                const response = await axios.get(`${jobInvoiceUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Job invoice  data", customerData)
                setCustomerDataAPI(customerData)

                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.customer.customer_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.total_amount.toString(),
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.register_payments[0].payment_method_id
                    }
                    console.log("customerDetails======+++", customerDetails)

                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)
                }
                console.log("customerData", customerData);
            }



            console.log(customer);

            if (whichBill == "PETTYALLOT") {
                const response = await axios.get(`${pettyCashAllotmentUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Job invoice  data", customerData)

                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.sales_person.sales_person_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.amount.toString(),
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.paid_through_chart_of_account_id
                    }
                    console.log("customerDetails======+++", customerDetails)

                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)
                }
                console.log("customerData", customerData);
            }
            console.log(customer);
            if (whichBill == "PETEXP") {
                const response = await axios.get(`${pettyCashExpenseUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Job invoice  data", customerData)

                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.sales_person.sales_person_name,
                        invoiceNumber: customerData.sequence_no,
                        totalAmount: customerData.amount.toString(),
                        businessType: customerData.bussiness_type_id,
                        paymentMethod: customerData.paid_through_chart_of_account_id
                    }
                    console.log("customerDetails======+++", customerDetails)

                    const collectionTypeResponse = await axios.get(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    //checking api format correct or not 
                    console.log(`${collectionTypeUrl}${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`)
                    // const collectionTypeResponse = await axios.get(`http://137.184.67.138:3004/viewCollectionType?bussiness_type_id=${customerDetails.businessType}&payment_method_id=${customerDetails.paymentMethod}`);
                    const collectionResponseData = collectionTypeResponse.data.data[0];
                    setCollectionType(collectionResponseData)
                    setCustomer(customerDetails)
                }
                console.log("customerData", customerData);
            }
            console.log(customer);
            if (whichBill == "Spare Issue") {
                console.log("i entered the spare issue ")
                const response = await axios.get(`${sparePartsIssueUrl}${scannedData}`);
                const customerData = response.data.data[0] // Assuming the response contains the customer details

                console.log("Spare issue invoice  data", customerData)

                if (customerData) {
                    const customerDetails = {
                        customerName: customerData.created_by.employee_name,
                        invoiceNumber: customerData.sequence_no,
                        // totalAmount: customerData.amount.toString(),
                        // totalAmount: customerData.spare_parts_line[0].totalCount[0].total_calculated_amounts.toString()
                        // businessType: customerData.bussiness_type_id,
                        // paymentMethod: customerData.paid_through_chart_of_account_id
                    }
                    console.log("customerDetails======+++", customerDetails)

                    setCustomer(customerDetails)
                }
                console.log("customerData", customerData);
            }
            console.log(customer);
            // setCustomerName(customerData.customer_name);
        } catch (error) {
            console.log('Error fetching customer details:', error);
        }
    };
    console.log("collectionType: ", collectionType)

    //formation date
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${year}-${month}-${day}`;
    }

    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    console.log(formattedDate);

    // const date = new Date().toDateString();
    // console.log(date)

    const handleSubmit = async () => {



        try {
            // if (!formattedDate || !adminDetails.related_profile?.name || !adminDetails.warehouse?.warehouse_name ||
            //     !adminDetails.company?.name || !collectionType.collection_type_name || !customer.customerName ||
            //     !customer.invoiceNumber || !customer.totalAmount || !remarks || !uploadUrl) {
            //     alert('Please fill in all required fields.');
            //     return;
            // }

            if (!formattedDate) {
                alert('Please select a date.');
                return;
            }
            if (!adminDetails.related_profile?.name) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Sales Person is required.',

                });
                // alert('Sales Person is required.');
                return;
            }
            if (!adminDetails.warehouse?.warehouse_name) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Shop is required.',

                });
                // alert('Shop is required.');
                return;
            }
            if (!adminDetails.company?.name) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Company is required.',

                });
                // alert('Company is required.');
                return;
            }

            console.log("invoice --------------------------------------++++++++++")


            if (bill !== "SALRET" && bill !== "PURCHRET" && bill !== "Spare Issue") {
                // Your existing validation logic for collectionType
                if (!collectionType || !collectionType.collection_type_name) {
                    Toast.show({
                        type: 'requireToast',
                        text1: 'Field is required',
                        text2: 'Collection Type is required.',
                    });
                    return;
                }
            }

            if (!customer.customerName) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Customer name is required.',

                });
                // alert('Customer name is required.');
                return;
            }
            if (!customer.invoiceNumber) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Invoice number is required.',

                });
                // alert('Invoice number is required.');
                return;
            }
            // if (!customer.totalAmount) {
            //     Toast.show({
            //         type: 'requireToast',
            //         text1: 'Field is required',
            //         text2: 'Total amount is required.',

            //     });
            //     // alert('Total amount is required.');
            //     return;
            // }
            if (!remarks) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Remarks are required.',

                });
                // alert('Remarks are required.');
                return;
            }
            if (!uploadUrl) {
                Toast.show({
                    type: 'requireToast',
                    text1: 'Field is required',
                    text2: 'Customer/Vendor Signature is required.',

                });
                // alert('Customer/Vendor Signature is required.');
                return;
            }

            let auditingData;
            if (bill === "Invoice") {
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": customerDataAPI?.untaxed_total_amount ?? 0,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "invoice_id": customerDataAPI?.crm_product_lines[0]?.invoice_id ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "register_payment_id": customerDataAPI?.register_payments[0]._id ?? null,
                    // "register_payment_sequence_no": "rp_seq_1",
                    "chq_no": customerDataAPI?.register_payments[0]?.chq_no ?? null,
                    "chq_date": customerDataAPI?.register_payments[0]?.chq_date ?? null,
                    "chq_type": customerDataAPI?.register_payments[0]?.chq_type ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": adminDetails?.company.company_id ?? null,
                    "chart_of_accounts_name": "",
                    "ledger_name": null,
                    "ledger_type": null,
                    "ledger_id": "643e4799c0e7b0adaed6a8b3",
                    "ledger_display_name": null,
                    "employee_ledger_id": "643e4799c0e7b0adaed6a8b3",
                    "employee_ledger_name": null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }



            } else if (bill == "Vendor Bill") {

                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": customerDataAPI?.untaxed_total_amount ?? 0,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    // // "invoice_id": customerDataAPI?.crm_product_lines[0]?.invoice_id ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "register_payment_id": customerDataAPI?.register_payments[0]._id ?? null,
                    "register_payment_sequence_no": customerDataAPI?.register_payments[0]?.sequence_no ?? null,
                    "chq_no": customerDataAPI?.register_payments[0]?.chq_no ?? null,
                    "chq_date": customerDataAPI?.register_payments[0]?.chq_date ?? null,
                    "chq_type": customerDataAPI?.register_payments[0]?.chq_type ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": null,
                    "chart_of_accounts_name": "",
                    "ledger_name": null,
                    "ledger_type": null,
                    "ledger_id": null,
                    "ledger_display_name": null,
                    "employee_ledger_id": null,
                    "employee_ledger_name": null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }


            } else if (bill == "SALRET") { //still not working 
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": customerDataAPI?.total_untaxed_amount ?? 0,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "register_payment_id": null,
                    "register_payment_sequence_no": null,
                    "chq_no": customerDataAPI?.chq_no ?? null,
                    "chq_date": customerDataAPI?.chq_date ?? null,
                    "chq_type": customerDataAPI?.chq_type ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": null,
                    "chart_of_accounts_name": "",
                    "ledger_name": null,
                    "ledger_type": null,
                    "ledger_id": null,
                    "ledger_display_name": null,
                    "employee_ledger_id": null,
                    "employee_ledger_name": null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }
            } else if (bill == "CAPREC") {
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": null,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": customerDataAPI?.capital_chart_of_account_id ?? null,
                    "chart_of_accounts_name": customerDataAPI?.capital_chart_of_account_name ?? null,
                    "ledger_name": null,
                    "ledger_type": null,
                    "ledger_id": null,
                    "ledger_display_name": null,
                    "employee_ledger_id": null,
                    "employee_ledger_name": null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }
            } else if (bill == "CAPPAY") {
                console.log("i entered  CAPPAY")
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": null,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "chq_no": customerDataAPI?.chq_no ?? null,
                    "chq_date": customerDataAPI?.chq_date ?? null,
                    "chq_type": customerDataAPI?.chq_type ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": customerDataAPI?.capital_chart_of_account_id ?? null,
                    "chart_of_accounts_name": customerDataAPI?.capital_chart_of_account_name ?? null,
                    "ledger_name": customerDataAPI?.ledger_name ?? null,
                    "ledger_type": customerDataAPI?.ledger_type ?? null,
                    "ledger_id": customerDataAPI?.ledger_id ?? null,
                    "ledger_display_name": null,
                    "employee_ledger_id": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_name": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }
            }


            else if (bill == "PETEXP") {
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": null,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": customerDataAPI?.paid_through_chart_of_account_id ?? null,
                    "chart_of_accounts_name": customerDataAPI?.paid_through_chart_of_account_name ?? null,
                    "ledger_name": customerDataAPI?.ledger_name ?? null,
                    "ledger_type": null,
                    "ledger_id": customerDataAPI?.ledger_id ?? null,
                    "ledger_display_name": null,
                    "employee_ledger_id": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_name": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }
            } else if (bill == "PETTYALLOT") {
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": null,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "cheque_transaction_type": "",
                    "chart_of_accounts_id": customerDataAPI?.capital_chart_of_account_id ?? null,
                    "chart_of_accounts_name": customerDataAPI?.capital_chart_of_account_name ?? null,
                    "ledger_name": customerDataAPI?.ledger_name ?? null,
                    "ledger_type": customerDataAPI?.ledger_type ?? null,
                    "ledger_id": customerDataAPI?.ledger_id ?? null,
                    "ledger_display_name": null,
                    "employee_ledger_id": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_name": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }
            } else if (bill == "PURCHRET") {
                auditingData = {
                    "date": formattedDate,
                    "amount": customer?.totalAmount ?? 0,
                    "un_taxed_amount": customerDataAPI?.total_untaxed_amount ?? 0,
                    "customer_vendor_signature": uploadUrl ?? null,
                    "cashier_signature": "",
                    "remarks": remarks || "",
                    "attachments": [null],
                    "warehouse_id": adminDetails?.warehouse_id ?? null,
                    "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
                    "sales_person_id": customerDataAPI?.sales_person_id ?? null,
                    "sales_person_name": adminDetails?.related_profile?.name ?? null,
                    "supplier_id": customerDataAPI?.supplier?.supplier_id ?? null,
                    "supplier_name": customerDataAPI?.supplier?.supplier_name ?? null,
                    "collection_type_id": collectionType?._id ?? null,
                    "collection_type_name": collectionType?.collection_type_name ?? null,
                    "company_id": adminDetails?.company.company_id ?? null,
                    "company_name": adminDetails?.company?.name ?? null,
                    "customer_id": adminDetails?.company?.company_id ?? null,
                    "customer_name": customer?.customerName ?? null,
                    "inv_sequence_no": customer?.invoiceNumber ?? null,
                    "chq_no": customerDataAPI?.chq_no ?? null,
                    "chq_date": customerDataAPI?.chq_date ?? null,
                    "chq_type": customerDataAPI?.chq_type ?? null,
                    "cheque_transaction_type": customerDataAPI?.type ?? null,
                    "chart_of_accounts_id": customerDataAPI?.capital_chart_of_account_id ?? null,
                    "chart_of_accounts_name": customerDataAPI?.capital_chart_of_account_name ?? null,
                    "ledger_name": customerDataAPI?.ledger_name ?? null,
                    "ledger_type": customerDataAPI?.ledger_type ?? null,
                    "ledger_id": customerDataAPI?.ledger_id ?? null,
                    "ledger_display_name": null,
                    "employee_ledger_id": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_name": customerDataAPI?.employee_ledger ?? null,
                    "employee_ledger_display_name": null,
                    "service_amount": null,
                    "service_product_amount": null
                }
            }
            //  else if (bill == "Spare Issue") {
            //     auditingData = {
            //         "date": formattedDate,
            //         "amount": customer?.totalAmount ?? 0,
            //         "un_taxed_amount": null,
            //         "customer_vendor_signature": uploadUrl ?? null,
            //         "cashier_signature": "",
            //         "remarks": remarks || "",
            //         "attachments": [null],
            //         "warehouse_id": adminDetails?.warehouse_id ?? null,
            //         "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
            //         "sales_person_id": customerDataAPI?.sales_person_id ?? null,
            //         "sales_person_name": adminDetails?.related_profile?.name ?? null,
            //         "supplier_id": null,
            //         "supplier_name": null,
            //         "collection_type_id": collectionType?._id ?? null,
            //         "collection_type_name": collectionType?.collection_type_name ?? null,
            //         "company_id": adminDetails?.company.company_id ?? null,
            //         "company_name": adminDetails?.company?.name ?? null,
            //         "customer_id": adminDetails?.company?.company_id ?? null,
            //         "customer_name": customer?.customerName ?? null,
            //         "invoice_id": customerDataAPI?.job_crm_product_lines[0]?.invoice_id ?? null,
            //         "inv_sequence_no": customer?.invoiceNumber ?? null,
            //         "register_payment_id": customerDataAPI?.register_payments[0]._id ?? null,
            //         // "register_payment_sequence_no": "rp_seq_1",
            //         "chq_no": customerDataAPI?.register_payments[0]?.chq_no ?? null,
            //         "chq_date": customerDataAPI?.register_payments[0]?.chq_date ?? null,
            //         "chq_type": customerDataAPI?.register_payments[0]?.chq_type ?? null,
            //         "cheque_transaction_type": customerDataAPI?.register_payments[0]?.type,
            //         "chart_of_accounts_id": "",
            //         "chart_of_accounts_name": "",
            //         "ledger_name": null,
            //         "ledger_type": null,
            //         "ledger_id": "",
            //         "ledger_display_name": null,
            //         "employee_ledger_id": assigned?.employee_id,
            //         "employee_ledger_name": assigned?.employee_name,
            //         "employee_ledger_display_name": null,
            //         "service_amount": null,
            //         "service_product_amount": null
            //     }
            // } else if (bill == "JobInvoice") {
            //     auditingData = {
            //         "date": formattedDate,
            //         "amount": customer?.totalAmount ?? 0,
            //         "un_taxed_amount": customerDataAPI?.untaxed_total_amount ?? 0,
            //         "customer_vendor_signature": uploadUrl ?? null,
            //         "cashier_signature": "",
            //         "remarks": remarks || "",
            //         "attachments": [null],
            //         "warehouse_id": adminDetails?.warehouse_id ?? null,
            //         "warehouse_name": adminDetails?.warehouse?.warehouse_name ?? null,
            //         "sales_person_id": customerDataAPI?.sales_person_id ?? null,
            //         "sales_person_name": adminDetails?.related_profile?.name ?? null,
            //         "supplier_id": null,
            //         "supplier_name": null,
            //         "collection_type_id": collectionType?._id ?? null,
            //         "collection_type_name": collectionType?.collection_type_name ?? null,
            //         "company_id": adminDetails?.company.company_id ?? null,
            //         "company_name": adminDetails?.company?.name ?? null,
            //         "customer_id": adminDetails?.company?.company_id ?? null,
            //         "customer_name": customer?.customerName ?? null,
            //         "invoice_id": customerDataAPI?.job_crm_product_lines[0]?.invoice_id ?? null,
            //         "inv_sequence_no": customer?.invoiceNumber ?? null,
            //         "register_payment_id": customerDataAPI?.register_payments[0]._id ?? null,
            //         // "register_payment_sequence_no": "rp_seq_1",
            //         "chq_no": customerDataAPI?.register_payments[0]?.chq_no ?? null,
            //         "chq_date": customerDataAPI?.register_payments[0]?.chq_date ?? null,
            //         "chq_type": customerDataAPI?.register_payments[0]?.chq_type ?? null,
            //         "cheque_transaction_type": customerDataAPI?.register_payments[0]?.type ?? null,
            //         "chart_of_accounts_id": "",
            //         "chart_of_accounts_name": "",
            //         "ledger_name": null,
            //         "ledger_type": null,
            //         "ledger_id": "",
            //         "ledger_display_name": null,
            //         "employee_ledger_id": "",
            //         "employee_ledger_name": null,
            //         "employee_ledger_display_name": null,
            //         "service_amount": null,
            //         "service_product_amount": null
            //     }
            // }

            else {
                // Handle other bill types or show an error message
                Toast.show({
                    type: 'error',
                    text1: 'Invalid Bill Type',
                    text2: 'Unsupported bill type encountered.',
                });
                return;

            }
            console.log("auditingData: ", auditingData)
            const response = await axios.post(createAuditingUrl, auditingData);
            if (response.data.success === 'true') {
                Toast.show({
                    type: 'invoiceSuccessToast',
                    text1: 'Success',
                    text2: 'Audit Created Successfully',
                    position: 'bottom',
                });
                navigation.navigate('CashCollection');
            } else {
                console.log(response)
                // Toast.show({
                //     type: 'error',
                //     text1: 'ERROR',
                //     text2: 'Audit creation failed',
                //     position: 'bottom',
                // });
            }
        } catch (error) {
            console.error('Error during handleSubmit:', error);
            // Handle the error appropriately (e.g., show an error message to the user)
        }

    }

    // collectiontype name
    let collectionTypeOptions = null;

    if (resData.data) {
        collectionTypeOptions = resData.data.map((item) => (
            <Picker.Item
                key={item._id}
                label={item.collection_type_name}
                value={item.collection_type_name}
            />
        ));
        console.log(collectionTypeOptions)
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} >
                <>
                    <View>
                        <Text style={styles.label}>Date:</Text>
                        <TextInput
                            value={formattedDate}
                            style={styles.input}
                            editable={false}
                        />

                        {/* sales Person */}
                        {/* <Text style={styles.label}>Sales Person:</Text>
                        <TextInput
                            value={adminDetails.related_profile?.name}
                            style={styles.input}
                            editable={false}
                        /> */}
                        {/* <Text style={styles.label}>Shop:</Text>
                        <TextInput
                            value={adminDetails.warehouse?.warehouse_name}
                            style={styles.input}
                            editable={false}
                        /> */}
                        <Text style={styles.label}>Brand:</Text>
                        <TextInput
                            value={adminDetails.company?.name}
                            style={styles.input}
                            editable={false}
                        />
                        <Text style={styles.label}>Collection Type:</Text>
                    </View>
                    <View style={styles.dropdown}>
                        {/* Dropdown collection type */}
                        <View style={styles.dropdown}>
                            <TextInput
                                value={collectionType ? collectionType.collection_type_name : null}
                                style={styles.input}
                                editable={false}
                                placeholder='Collection Type'
                            />
                        </View>

                    </View>
                    <View style={styles.customerBorder}>
                        <View style={styles.customerContent}>
                            <Text style={styles.label}>Customer: </Text>
                            <TextInput
                                value={customer.customerName}
                                style={styles.input}
                                editable={false}
                                placeholder='Enter Customer Name'
                            />
                            <Text style={styles.label}>Invoice Number :</Text>
                            <TextInput
                                value={customer.invoiceNumber}
                                style={styles.input}
                                editable={false}
                                placeholder='Enter Invoice No'
                            />
                            <Text style={styles.label}>AMT :</Text>
                            <TextInput
                                value={customer.totalAmount}
                                style={styles.input}
                                editable={false}
                                placeholder='Enter Total Amount'
                            />
                            <View style={styles.customerBottom}>
                                <Text style={styles.qrLabel}>Update from Qr code?</Text>
                                <CustomButton title="Scan" onPress={() => navigation.navigate('Scanner')} />
                            </View>
                        </View>

                    </View>
                    <Text style={styles.label}>Remarks :</Text>
                    <TextInput
                        style={styles.inputRemarks}
                        // editable={false}
                        placeholder='Enter Remarks'
                        onChangeText={(text) => setRemarks(text)}
                    />
                </>
                {/* <Text style={styles.selectedValue}>Selected Value: {selectedValue}</Text> */}

            </ScrollView>
            <Text style={styles.label}>Customer/Vendor Signature</Text>
            {/* <CustomButton title="sign" onPress={() => navigation.navigate('Sign')} />  */}
            <View style={styles.signatureContainer}>
                <Sign />
            </View>
            <CustomSubmitButton title="Submit" onPress={handleSubmit} />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    label: {
        color: "#ffa600",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 2,
        marginTop: 3
    },
    input: {
        borderWidth: 0.9,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 18,
        borderRadius: 6,
        fontSize: 13,
        color: "black",
        fontWeight: "600"

    },
    picker: {
        backgroundColor: '#f7f7f7',
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden', // Clip any overflow content
    },
    customerBorder: {
        marginTop: 15,
        borderWidth: 1.5,
        borderRadius: 6,
        borderColor: "#ffa600",
        marginVertical: 10
    },
    customerContent: {
        marginHorizontal: 18,
        marginVertical: 10
    },
    buttonContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    buttonText: {
        color: "#FFFFFF",
        fontSize: 13,
        fontWeight: "700",
        textAlign: "center",
        fontFamily: "sans-serif-medium",
        letterSpacing: 0.7
    },
    buttonContainer: {
        height: 30,
        paddingHorizontal: 19,
        justifyContent: "center",
        backgroundColor: "#fac02e",
        borderRadius: 2,
    },
    submitButtonContainer: {
        height: 40,
        paddingHorizontal: 19,
        justifyContent: "center",
        backgroundColor: "#fac02e",
        borderRadius: 5,
        marginTop: 15,
        marginHorizontal: 10,
        alignItems: "center"
    },
    customerBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20
    },
    qrLabel: {
        color: "#ffa600",
        fontWeight: "bold",
        fontSize: 13,
        marginBottom: 2,
        marginVertical: 30
    },
    inputRemarks: {
        borderWidth: 0.9,
        borderColor: 'gray',
        paddingHorizontal: 10,
        paddingVertical: 30,
        fontSize: 18,
        borderRadius: 6,
        fontSize: 13,
    },
    signatureContainer: {
        borderWidth: 1,
        borderColor: '#000',
        width: '100%',
        height: 200,
        marginBottom: 20,

    },
    scrollContainer: {
        flex: 1,
    }
})


export default NewCollection