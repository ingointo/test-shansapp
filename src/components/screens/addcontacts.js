import React from "react";
import { StyleSheet,Text,View,TextInput,Button, ScrollView,TouchableOpacity,Alert } from "react-native";
import { baseUrl } from "../../api/const";
import { Formik } from "formik";
import { Picker } from "@react-native-community/picker";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import * as Yup from 'yup';
import { useNavigation } from "@react-navigation/native";


export const AddSchema= Yup.object().shape({
    name:Yup.string().required('Please enter your Name'),
    customer_mobile:Yup.number().required('Please enter you Phone Number'),
    customer_email:Yup.string().email('Invalid email').required("Please etner you email"),


})





export default function Addcontact(){

    
    const contactUrl=`${baseUrl}/createCustomer`;
    const languageUrl=`${baseUrl}/viewLanguage/language_list/language_dropdown`;
    const stateUrl=`${baseUrl}/viewState/state_list/state_drop_down`;
    const areaUrl=`${baseUrl}/viewArea/area_list/drop_down`;
    const countryUrl=`${baseUrl}/viewCountry/country_list/country_dropdown`;
    const currencyUrl=`${baseUrl}/viewCurrency/currency_list/currency_dropdown`;
    const imageUrl=`${baseUrl}/fileUpload`;
    const navigation=useNavigation();


    const[language,setLanguage]=useState([]);
    const[state,setState]=useState([]);
    const[area,setArea]=useState([]);
    const[country,setCountry]=useState([]);
    const[customerType, setCustomerType] = useState("");
    const[currency,setCurrency]=useState([]);
    const[customerTitle,setCustomerTitle]=useState("");
    const[formsubmitted,setFormSubmitted]=useState(false)


    
    


    useEffect(()=>{
        axios.get(languageUrl).then((res)=>{
            const langArray=res.data.data.map((item)=>({
                language_name:item.language_name,
                _id:item._id,
                language_code:item.language_code,
            }));
            setLanguage(langArray);
        }).catch(err=>console.log(err));

        axios.get(stateUrl).then((res)=>{
            const stateArray=res.data.data.map((item)=>({
                state_name:item.state_name,
                _id:item._id,
                country_id:item.country_id
                
            }));
            setState(stateArray);
        }).catch(err=>console.log(err));

        axios.get(areaUrl).then((res)=>{
            const areaArray=res.data.data.map((item)=>({
                area_name:item.area_name,
                _id:item._id,
                state_id:item.state.state_id
                
            }));
            setArea(areaArray);
        }).catch(err=>console.log(err));

        axios.get(countryUrl).then((res)=>{
            const countryArray=res.data.data.map((item)=>({
                country_name:item.country_name,
                _id:item._id,
                
            }));
            setCountry(countryArray);
        }).catch(err=>console.log(err));

        axios.get(currencyUrl).then((res)=>{
            const currencyArray=res.data.data.map((item)=>({
                currency_name:item.currency_name,
                _id:item._id,
                
            }));
            setCurrency(currencyArray);
        }).catch(err=>console.log(err));
    },[])

    


    
    return(
        <ScrollView style={styles.container}>
                <Formik
            initialValues={{name:'',customer_mobile:'',customer_email:'',whatsapp_no:'',
            language_id:'',country_id:'',state_id:'',currency_id:'',area_id:'',address:'',
            customer_title:'',trn_no:'',image_url:'',customer_type:''
        }}
        validationSchema={AddSchema}
        onSubmit={(values,{setFormSubmitted})=>{
            
            setFormSubmitted(true);
            // axios.post(imageUrl,result).then((res)=>setFieldValue('file_upload', res.data))
            axios.post(contactUrl,values).then(
                (res)=>{
                    Alert.alert("Contact Successfully added")
                    console.log(values)
                    setFormSubmitted(false)
                    navigation.navigate('Contactsviewnav');
                    

                }
            ).catch((err)=>{
                Alert.alert(err,"Contact not added")
                setFormSubmitted(false);
            })
        
        }
    }
        >



            {(props)=>(
                
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.headingtext}>Customer Type:</Text>
                            <View style={styles.dropinput}>
                                <Picker
                                    style={styles.input}
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder="Select Customer Type"
                                    onValueChange={(itemValue)=>{
                                        props.setFieldValue('customer_type', itemValue);
                                        setCustomerType(itemValue)}}
                                    selectedValue={props.values.customer_type}
                                >
                                    <Picker.Item label="Select Customer Type" value="" />
                                    <Picker.Item label="B2B" value="b2b"/>
                                    <Picker.Item label="B2C" value="b2c"/>

                                </Picker>
                            </View>
                            
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Name:</Text>
                            
                            <View style={styles.customer_title}>
                                <Picker
                                    style={styles.title_input}
                                    enabled={true}
                                    mode="dropdown"
                                    prompt="Select Customer Title"
                                    onValueChange={(itemValue)=>{
                                        props.setFieldValue('customer_title', itemValue);
                                        // setCustomerTitle(itemValue)
                                    }}
                                    selectedValue={props.values.customer_title}
                                >
                                <Picker.Item label="M/s" value="M/s"/>
                                <Picker.Item label="Mr" value="Mr"/>
                                <Picker.Item label="Ms" value="Ms"/>

                                </Picker>
                            </View>
                            <TextInput
                                    style={styles.input}
                                    placeholder="customer Name"
                                    onChangeText={props.handleChange('name')}
                                    value={props.values.name}
                                    onBlur={props.handleBlur('name')}
                                    />
                                    {props.touched.name && props.errors.name && 
                                    <Text style={styles.errorText}>{ props.errors.name}</Text>
                                    }
                            
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Mobile Number:</Text>
                            <TextInput
                                    style={styles.input}
                                    placeholder="Mobile"
                                    onChangeText={props.handleChange('customer_mobile')}
                                    keyboardType="numeric"
                                    value={props.values.customer_mobile}
                                    />
                                    {props.touched.customer_mobile && props.errors.customer_mobile && 
                                    <Text style={styles.errorText}>{ props.errors.customer_mobile}</Text>
                                    }
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Whatsapp Number:</Text>
                            <TextInput
                                    style={styles.input}
                                    placeholder="Whatsapp Number"
                                    onChangeText={props.handleChange('whatsapp_no')}
                                    keyboardType="numeric"
                                    value={props.values.whatsapp_no}
                                    />
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Email:</Text>
                            <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    onChangeText={props.handleChange('customer_email')}
                                    value={props.values.customer_email}
                                    />
                                    {props.touched.customer_email && props.errors.customer_email && 
                                    <Text style={styles.errorText}>{ props.errors.customer_email}</Text>
                                    }
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Address:</Text>
                            <TextInput
                                    style={styles.input}
                                    placeholder="Address"
                                    onChangeText={props.handleChange('address')}
                                    value={props.values.address}
                                    />
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Country:</Text>
                            <View style={styles.dropinput}>
                                <Picker
                                    style={styles.input}
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder="Select Country"
                                    onValueChange={props.handleChange('country_id')}
                                    selectedValue={props.values.country_id}
                                >
                                    <Picker.Item label="Select Country" value="" />
                                    {country.map((item)=>{
                                        return (
                                            
                                            <Picker.Item
                                                label={item.country_name.toString()}
                                                value={item._id}
                                                key={item._id}
                                            />
                                        )
                                    })}

                                    
                                </Picker>
                            </View>
                            
                        </View>
                        <View>
                            <Text style={styles.headingtext}>State:</Text>
                            <View style={styles.dropinput}>
                                <Picker
                                    style={styles.input}
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder={props.values.state_id ? props.values.state_id : "select state"}
                                    onValueChange={props.handleChange('state_id')}
                                    selectedValue={props.values.state_id}
                                >
                                {/* <Picker.Item label="Select State" value="" /> */}
                                {state.map((item)=>{
                                    if(item.country_id===props.values.country_id){
                                        // console.log('State:', item.state_name, 'ID:', item._id);
                                        return (
                                            <Picker.Item
                                                label={item.state_name.toString()}
                                                value={item._id}
                                                key={item._id}
                                            />
                                        )
                                    }
                                    }
                                    
                                    )
                                }

                                
                                </Picker>
                            </View>
                            
                            
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Area:</Text>
                            <View style={styles.dropinput}>
                                <Picker
                                    style={styles.input}
                                    enabled={true}
                                    mode="dropdown"
                                    // placeholder="Select Area"
                                    onValueChange={props.handleChange('area_id')}
                                    selectedValue={props.values.area_id}
                                >
                                    <Picker.Item label="Select Area" value="" />
                                    {area.map((item)=>{
                                        console.log('Area:', item.state_id, 'ID:', item._id);
                                        if(item.state_id===props.values.state_id){
                                                // console.log("77777777777777777777777777",props.values.state_id)
                                        return (
                                            <Picker.Item
                                                label={item.area_name.toString()}
                                                value={item._id}
                                                key={item._id}
                                            />
                                        )} 
                                        // console.log("Areacode",props.values.area_id)
                                    })}

                                    
                                </Picker>
                            </View>
                            
                        </View>
                        <View>
                            <Text style={styles.headingtext}>TRN:</Text>
                            <TextInput
                                    style={styles.input}
                                    placeholder="TRN"
                                    onChangeText={props.handleChange('trn_no')}
                                    keyboardType="numeric"
                                    value={props.values.trn_no}
                                    />
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Language:</Text>
                            <View style={styles.dropinput}>
                                <Picker
                                    
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder="Select language"
                                    onValueChange={props.handleChange('language_id')}
                                    selectedValue={props.values.language_id}
                                >
                                    <Picker.Item label="Select Language" value="" />
                                    {language.map((item)=>{
                                        return (
                                            <Picker.Item
                                                label={item.language_name.toString()}
                                                value={item._id}
                                                key={item._id}
                                            />
                                        
                                        )
                                    })}

                                    
                                </Picker>
                            </View>
                            
                        </View>
                        <View>
                            <Text style={styles.headingtext}>Currency:</Text>
                            <View style={styles.dropinput}>
                                <Picker
                                    
                                    enabled={true}
                                    mode="dropdown"
                                    placeholder="Select Currency"
                                    onValueChange={props.handleChange('currency_id')}
                                    selectedValue={props.values.currency_id}
                                >
                                    <Picker.Item label="Select Currency" value="" />
                                    {currency.map((item)=>{
                                        return (
                                            <Picker.Item
                                                label={item.currency_name.toString()}
                                                value={item._id}
                                                key={item._id}
                                            />
                                        )   
                                    })}

                                    
                                </Picker>
                            </View>
                            

                        </View>
                        <TouchableOpacity style={styles.button} onPress={props.handleSubmit}>
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    
                
            )}
                
            </Formik>

        </ScrollView>
    
    );

    
}

const styles=StyleSheet.create({

    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    form:{
        marginVertical:20,
        
    },

    input:{
        borderWidth:0.5,
        borderColor:"black",
        paddingHorizontal: 10,
        paddingVertical:7,
        fontSize:18,
        borderRadius:6,
        maxWidth:350,
        marginHorizontal:10,
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginTop: 5,
    },

    headingtext:{
        color: '#ffa600',
        margin:7,
        fontWeight:'600',
        fontSize:16,
    },

    button: {
        maxWidth: 350,
        backgroundColor: '#ffa600',
        borderRadius: 6,
        paddingVertical: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        marginHorizontal:20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },

    dropinput:{
        borderWidth:0.5,
        borderColor:"black",
        fontSize:18,
        borderRadius:6,
        maxWidth:350,
        marginHorizontal:10,
    },
    customer_title:{
        borderWidth:0.5,
        borderColor:"black",
        borderRadius:6,
        maxWidth:150,
        marginLeft:10,
        overflow:'hidden',
        
    },

    title_input:{
        marginHorizontal:20,
        
    },





});