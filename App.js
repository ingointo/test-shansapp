import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./src/components/screens/Splash";
import LoginScreen from "./src/components/screens/LoginScreen";
import Signup from './src/components/screens/RegistrationScreen'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "./src/components/screens/RegistrationScreen";
import BottomDrawer from "./src/routes/BottomDrawer";
import Home from "./src/components/screens/Home";
import ProductScreen from "./src/components/screens/ProductScreen";
import Contacts from "./src/components/screens/contacts";
import Addcontact from "./src/components/screens/addcontacts";
import OptionScreen from "./src/components/screens/OptionScreen";
import ContactDetails from "./src/components/screens/ContactDetails";
import ProductDetails from "./src/components/screens/ProductDetails";
import MyOrdersScreen from "./src/components/screens/Myorders";
import OrderDetails from "./src/components/screens/OrderDetails"
import CashCollection from "./src/components/screens/CashCollection";
import NewCollection from "./src/components/screens/NewCollection";
import Scanner from "./src/components/QrScanner/Scanner";
import Sign from "./src/components/Sign/Sign";

import Jobs from "./src/components/screens/Jobs";
import AddJob from "./src/components/screens/AddJob";

const Stack = createNativeStackNavigator();

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import TaskManager from "./src/components/screens/TaskManager";
import AddTask from "./src/components/screens/AddTask";

/*
  1. Create the config
*/
const toastConfig = {
 
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'pink' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: '400'
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),

  // tomatoToast: ({ text1, props }) => (
  //   <View style={{ padding: 5, width: '70%', backgroundColor: 'white', borderRadius: 12, borderLeftWidth: 3.5, borderLeftColor: "red",alignItems: "center", justifyContent: "center"}}>
  //     <Text style={{fontSize:18, alignSelf: "center"}}>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // ),

  requireToast: ({text1, text2}) => (
    <View style={{padding: 5, flex: 1, backgroundColor: 'red', marginVertical: 15, width: '70%', borderRadius: 12, borderLeftWidth: 3.5, borderWidth: 0.9,borderColor: "white", marginVertical: "50%"}}>
    <View style={{marginHorizontal: 5, alignContent: "center"}}>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "white"}}>{text1} !!!</Text>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "white"}}>{text2}</Text>
    </View>
  </View>
  ),
  
  invoiceSuccessToast:  ({text1, text2}) => (
    <View style={{padding: 5, flex: 1, backgroundColor: 'white', marginVertical: 10, width: '80%', borderRadius: 10, borderBottomWidth: 4.5, borderBottomColor: "green", marginVertical: "50%"}}>
    <View style={{marginHorizontal: 5, marginVertical: 10, alignContent: "center"}}>
      <Text style={{ fontSize: 12, fontWeight: "bold", color: "green"}}>{text1}</Text>
      <Text style={{ fontSize:18, fontWeight: "bold", color: "black"}}>{text2}</Text>
    </View>
  </View>
  )

};



const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>


        <Stack.Navigator screenOptions={({ route }) => ({

          headerStyle: { backgroundColor: '#ffa600' },
          headerShadowVisible: false,
          headerTintColor: "white"


        })}>
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false, }} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, }}  />
          <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
          <Stack.Screen name="Drawer" component={BottomDrawer} options={{ headerShown: false, }}/>
          <Stack.Screen name="Homenav" component={Home} options={{ headerShown: false, }} />
          <Stack.Screen name="Jobscreen" component={Jobs} options={{ headerStyle: { backgroundColor: '#ffa600', }, headerTintColor: "white", title: "Jobs"}}/>
          <Stack.Screen name="AddJobscreen" component={AddJob} options={{ headerStyle: { backgroundColor: '#ffa600', }, headerTintColor: "white", title: "Add Job"}}/>
          <Stack.Screen name="Contactsviewnav" component={Contacts} options={{ headerStyle: { backgroundColor: '#ffa600', }, headerTintColor: "white", title: "Contacts" }} />
          <Stack.Screen name="Contactdetails" component={ContactDetails} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerTintColor: "white", title: "Order Summery" }} />
          <Stack.Screen name="addcontacts" component={Addcontact} options={{ headerStyle: { backgroundColor: '#ffa600', }, headerTintColor: "white", title: "Add Contacts" }} />
          <Stack.Screen name="OptionScreen" component={OptionScreen} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, headerTintColor: "white", title: "Options" }} />
          <Stack.Screen name="ProductScreen" component={ProductScreen} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Products Screen" }} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Product Details" }} />
          <Stack.Screen name="Myorders" component={MyOrdersScreen} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Invoice Details" }} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Invoice Details" }} />
          <Stack.Screen name="CashCollection" component={CashCollection} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: true, title: "Cash Collection" }} />
          <Stack.Screen name="NewCollection" component={NewCollection} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: true, title: "New Collection" }} />
          <Stack.Screen name="Scanner" component={Scanner} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Scanner" }} />
         <Stack.Screen name="Sign"  component={Sign} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Scanner" }} />
         <Stack.Screen name="TaskManager" component={TaskManager} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Task Manager" }} />
         <Stack.Screen name="AddTask" component={AddTask} options={{ headerStyle: { backgroundColor: '#ffa600' }, headerShown: false, title: "Add Task" }} />
        </Stack.Navigator>
        <Toast config={toastConfig} />
      </View>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default App
