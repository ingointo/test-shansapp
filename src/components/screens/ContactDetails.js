import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, Button, ScrollView,FlatList } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import axios from "axios";
import OrderSummery from "./OrderSummery";
import { baseUrl } from "../../api/const";
import AsyncStorage from '@react-native-async-storage/async-storage';




const CustomAddButton = ({ title, onPress }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.addbutton}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const CustomSubmitButton = ({ title, onPress }) => {

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.submitbutton}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};




export default function ContactDetails({ route, navigation }) {
  const { item, product } = route.params;
  console.log("Product prop:", product);

  console.log("contact",item)
  // console.log("pipeline_id..............",item.customer_credit_ledger)

  // const[warehouseName,setWarehouseName]=useState('');
  // const[warehouseId,setWarehouseId]=useState('');
  const[user ,setUser]=useState('');

  useEffect(()=>{
      const fetchData = async()=>{

        try {
          const StoredData=await AsyncStorage.getItem('userData')

          console.log("storedData:",StoredData);

          if (StoredData!==null){
            const userData=JSON.parse(StoredData)
            setUser(userData);
          }else{
            setUser('No data Found')
          }
        } catch(error){
          console.log('error fetching data',error)
        }
      }

      fetchData();

  },[])

  console.log("Login user data",user);
  

  const CreateinvoiceUrl = `${baseUrl}/createCombinedInvoicePaymentReceived`

  const[totalPrice,setTotalprice]=useState([]);

  const updateTotalPrice = (newTotalPrice, index) => {
    setTotalprice(prevPrices => {
      const newPrices = [...prevPrices];
      newPrices[index] = newTotalPrice;
      return newPrices;
    });
  };

  const[prquantity,setPrQuantity]=useState([])

  const productquantity=(quantity,index)=>{
      setPrQuantity(prevQuantity=>{
        const newquantity=[...prevQuantity];
        newquantity[index]=quantity;
        return newquantity;
      })
  };

  const[unitprice,setUnitPrice]=useState([])

  const productunitprice=(price,index)=>{
    setUnitPrice(prevunitprice=>{
      const newunitprice=[...prevunitprice];
      newunitprice[index]=price;
      return newunitprice;
    });
  }

  const totalPriceSum = totalPrice.reduce((sum, value) => sum + value, 0);

  const removeProduct = (productIDToRemove,index) => {
    setAddedProducts(prevProducts => prevProducts.filter(p => p.productID !== productIDToRemove));
    setTotalprice(prevPrices => {
      const newPrices = [...prevPrices];
      newPrices.splice(index, 1); // Remove the value at the specified index
      return newPrices;
  });
};

  const[addedProducts,setAddedProducts]=useState([]);
  useEffect(()=>{
    if(product ){
        const productExists=addedProducts.some(p=>p.productID===product.productID)
      if(!productExists){
        setAddedProducts(prevProducts => [...prevProducts, product]);
      }
      
    }
  },[product])
  
console.log("pushed products:---------------------",addedProducts);


// console.log("UpdatedTotalPrice in Contactdetails page",totalPrice);

const orderItems=addedProducts.map((product,index)=>({
  "product_id":product.productID,
  "product_name":product.productName,
  "tax_type_id":"648d9b8fef9cd868dfbfa37f",
  "tax_value":0,
  "uom":null,
  "qty":prquantity[index],
  "unit_price":unitprice[index]*prquantity[index],
  "discount_percentage": 0,
  "remarks": null,
  "total": totalPrice[index],
  "unit_cost": product.productCost,
  "total_cost": prquantity[index]*product.productCost,
  "return_quantity": 0
}))

console.log("ordersummery",orderItems);

// console.log("contact details",item._id,item.name,item.warehouse_id,item.warehousename)











const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month since it's zero-based
const day = currentDate.getDate().toString().padStart(2, '0');

const formattedDate = `${year}-${month}-${day}`;
console.log("date",formattedDate)


  function handlesubmit() {

    const payload=  {
      "total_amount":totalPriceSum,
      "date": formattedDate,
      "amounts": totalPriceSum,
      "payment_status":"un_paid",
      "invoice_status": "un_paid",
      "total_tax_amount":0,
      "remarks": null,
      "trn_no": item.trn_no,
      "delivery_address": item.address,
      "due_date": null,
      "paid_amount": 0,
      "due_amount": totalPriceSum,
      "customer_id": item._id,
      "customer_name": item.name,
      "warehouse_id": user.warehouse.warehouse_id,
      "warehouse_name":user.warehouse.warehouse_name,
      "pipeline_id": null,
      "payment_terms_id": null,
      "delivery_method_id": null,
      "sales_person_id": user._id,
      "sales_person_name": user.user_name,
      "sales_channel_id": null,
      "state_id": item.state_id,
      "quotation_id": null,
      "sales_order_id": null,
      "currency_id": item.currency_id,
      "crm_product_line_ids": orderItems,
      "image_url": [],
      "payment_date": null,
      "amount": totalPriceSum,
      "type": "payment",
      "chq_no": null,
      "chq_date": "",
      "chq_type": null,
      "chart_of_accounts_id": null,
      "chart_of_accounts_name": null,
      "status": "new",
      "transaction_no": null,
      "transaction": null,
      "payment_method_id": "643ea581407e36e9962b9d2c",
      "payment_method_name": "credit",
      "journal_id": null,
      "chq_bank_id": null,
      "is_cheque_cleared": false,
      "reference": null,
      "in_amount": null,
      "out_amount": null,
      "due_balance": 0,
      "outstanding": null,
      "credit_balance": null,
      "Pdc_status": ""
    }

    console.log("payload.....................",payload)

    

    



    axios.post(CreateinvoiceUrl, payload).then(res => {
      // console.log("payload",payload)
      console.log("response-----------------------------------------",res.data);
      if(res.data.success=="true"){
        alert("Invoice Success")

      } else{
        alert(res.data.message)
      }
      
      // console.log("success");
      navigation.navigate('Contactsviewnav');
    }).catch(err => console.log(err))
    }
  

  // console.log("total price in contact page",totalPrice);
  // console.log("quantity",prquantity);
  // console.log("unitprice",unitprice);

  // console.log("productinvoice:",orderItems);






  
  


  


  
  return (

    <View style={styles.container}>
      <View style={styles.details}>
        {/* check item found or not  */}
        {item ? (<View style={styles.rowContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.mobile}>{item.customer_mobile}</Text>
        </View>) : (
          // If product is not found in the products list
          <View style={styles.product}>
            <Text>Item not found</Text>
          </View>)}
        <MaterialIcons name="smartphone" size={35} color="black" />
      </View>
      <View style={styles.addButtonContainer}>
        <CustomAddButton
          title="Add Products(s)"
          onPress={() => { navigation.navigate('ProductScreen', { contact: item });  }}
        />
      </View>
      {product && addedProducts.length > 0 &&(
        // <View>
        //   <Text>{addedProducts[0].productName}</Text>
        // </View>
        <View style={styles.scroll}>
          <FlatList
              data={addedProducts}
              keyExtractor={item=>item.productID}
              renderItem={({item,index})=><OrderSummery product={item} index={index} updateTotalPrice={updateTotalPrice} removeProduct={removeProduct} productquantity={productquantity} productunitprice={productunitprice}/>}
          />

          
          <View style={styles.bottomContainer}>
            {addedProducts.every(product => product.totalProductQuantity > 0) ? (
              <>
                <View style={{ flexDirection: "column" }}>
                  <Text style={styles.productLabel}>Total Quantity: {addedProducts.length}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.productLabel}>Price items  </Text>
                    <Text style={styles.productText}> {totalPriceSum} AED</Text>
                  </View>
                </View>
                <View style={styles.submitButtonContainer}>
                  <CustomSubmitButton
                    title="Place Order"
                    onPress={handlesubmit}
                  />
                </View>
              </>
            ) : (
              <Text style={styles.productLabel}>Some products are out of stock</Text>
            )}
          </View>

          
          
          

        </View>

      )}
      
      
      


    </View>

    )
  }
    
  



const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  details: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 17,
  },
  mobile: {
    fontSize: 15,
    marginHorizontal: 20,
  },
  addButtonContainer: {
    alignItems: "flex-end",
    padding: 20,
    marginVertical: 30
  },

  addbutton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ffa600",
    borderRadius: 13,
  },
  submitbutton: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "#ffa600",
    borderRadius: 8,

  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  rowContainer: {
    flexDirection: "column"
  },
  product: {
    marginHorizontal: 25,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 5
  },
  productHeaderLabel: {
    fontSize: 15,
    flexDirection: "row",
    fontWeight: "500"
  },

  productAvail: {
    flexDirection: 'row'
  },

  stockCheck: {
    color: "#ffa600",
    fontWeight: 'bold',
    fontSize: 15,
  },

  productfields: {
    fontSize: 15,
  },
  removeButtonText: {
    color: 'red',
    fontWeight: '600',
    fontSize: 17,
  },
  quantityInput: {
    alignItems: "center"
  },
  removeContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  priceContainer: {
    borderColor: "black",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 15,
    width: 55,
    borderRadius: 5,
    flexDirection: "row"
  },
  columnContainer: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 15,
  },
  productLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "black"
  },
  productText: {
    marginRight: 30,
    fontWeight: "500"
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margintop: 80,
  },

  scroll: {
    flex: 1,
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

});
