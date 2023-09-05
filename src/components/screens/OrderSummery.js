import React, { useEffect, useState } from "react";
import { Text,View,StyleSheet,TextInput,TouchableOpacity } from "react-native";
import QuantityChanger from "../QuantityChanger/QuantityChanger";



export default function OrderSummery({product,index,updateTotalPrice,removeProduct, productquantity,productunitprice}){
        // console.log("Product details",product)
        const [price, setPrice] = useState(product.sale_price || 0);
        
        const[quantity,setQuantity]=useState(1);
        
        useEffect(() => {
            if (product.sale_price != null) {
                    setPrice(product.sale_price || 0);
                
            }
        }, [product]);

        

        
        
        const handlePriceChange = (value) => {
            setPrice(parseFloat(value));
            
        }

        const increaseQuantity = () => {
            if(quantity<product.productQuantity){
                setQuantity(quantity + 1);
            }
            
        };
        
        const decreaseQuantity = () => {
            if (quantity > 1) {
            setQuantity(quantity - 1);
            }
        };

        
    useEffect(() => {
        const subtotal = price * quantity;
        updateTotalPrice(subtotal, index); // Passing the index along with subtotal
        productquantity(quantity,index);
        productunitprice(price,index);
    }, [price, quantity]);


        const handleRemoveProduct = () => {
            removeProduct(product.productID,index); // Call the removeProduct function with the product ID
        };
        // console.log("array of rpices in ordersummery",productPrices)

        
        
        

    return(
        <View style={styles.Summery}>
            {product.totalProductQuantity !=0 ? (
                <View>
                    <View style={styles.titlemargin}>
                        <Text style={styles.titletext}>
                            {product.productName}
                        </Text>
                    </View>
                    <View style={styles.fieldmargin}> 
                        <Text style={styles.fieldtext}>Availability:</Text>
                        <Text style={styles.instock}>In Stock</Text>
                    </View>
                    <View style={styles.fieldmargin}> 
                        <Text style={styles.fieldtext}>Price:</Text>
                        <View style={styles.priceContainer}>
                            <TextInput keyboardType="numeric" onChangeText={(text)=>{handlePriceChange(text) } } value={price.toString()}></TextInput>
                        </View>
                        <Text style={styles.priceText}>AED</Text>
                    </View>
                    
                    <View style={styles.removeContainer}>
                        <QuantityChanger
                            quantity={quantity}
                            increaseQuantity={increaseQuantity}
                            decreaseQuantity={decreaseQuantity}
                            setQuantity={setQuantity} // Add this line
                        />

                        
                        <TouchableOpacity onPress={handleRemoveProduct}>
                            <Text style={styles.removeButtonText}>REMOVE</Text>
                        </TouchableOpacity>
                        </View>

                        
            
                    <View style={styles.fieldmargin}>
                        <Text style={styles.fieldtext}>Product Code:</Text>
                        <Text>{product.productCode}</Text>
                    </View>
                    <View style={styles.fieldmargin}>
                        <Text style={styles.fieldtext}>Product Category</Text>
                        <Text>{product.productCategory}</Text>
                    </View>
                    <View style={styles.fieldmargin}>
                        <Text style={styles.fieldtext}>On Hand:</Text>
                        <Text>{product.productQuantity}</Text>
                    </View>
                    <View style={styles.fieldmargin}>
                        <Text style={styles.fieldtext}>Min Sale Price:</Text>
                        <Text>{product.minSalePrice}</Text>
                    </View>
                    <View style={styles.fieldtext}>
                        <Text style={styles.fieldtext}>More Information:</Text>
                        <Text>{product.productDesc}</Text>
                    </View>
                    {/* <View>
                        <Text>Total:</Text>
                        <Text>{subtotal}</Text>
                    </View> */}
                    
                </View>
            ):(
                <View>
                    <View style={styles.titlemargin}>
                        <Text style={styles.titletext}>
                            {product.productName}
                        </Text>
                    </View>
                    <View style={styles.fieldmargin}> 
                        <Text style={styles.fieldtext}>Availability:</Text>
                        <Text style={styles.outofstock}>Out Of Stock</Text>
                        
                        
                    </View>

                    <View>
                            <TouchableOpacity onPress={handleRemoveProduct}>
                                <Text style={styles.removeButtonText}>REMOVE</Text>
                            </TouchableOpacity>


                    </View>
                    
                </View>
            )}
            


        </View>
    )

    
}


const styles= StyleSheet.create({
    Summery:{
        marginHorizontal: 25,
    },

    titlemargin:{
        fontSize: 15,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginVertical:15,
        

    },
    titletext:{
        fontSize:15,
        fontWeight:'800',


    },
    fieldmargin:{
        flexDirection:'row',
        marginBottom:10,
        
    },
    fieldtext:{
        marginRight:6,
        fontSize:14,
        fontWeight:'500',
    },
    instock:{
        color:"#ffa600",
        fontWeight:'500',
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

    priceText:{
        fontWeight:'500',
        fontSize:14,
    },

    removeButtonText: {
        color: 'red',
        fontWeight: '600',
        fontSize: 17,
    },

    removeContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
    },

    outofstock:{
        color:"red",
        fontWeight:'500',
    },

    
});
