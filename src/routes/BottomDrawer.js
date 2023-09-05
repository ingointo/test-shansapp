import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from "../components/screens/Profile";
import CategoriesScreen from "../components/screens/Categories";
import MyOrdersScreen from "../components/screens/Myorders";
import DashScreen from "../components/screens/Dashboard";
import { MaterialIcons } from '@expo/vector-icons';
import Home from "../components/screens/Home";

const Tab = createBottomTabNavigator();

export default function BottomDrawer() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: { backgroundColor: '#232323', paddingTop: 15, borderTopRightRadius: 70, borderTopLeftRadius: 70, },

                tabBarLabelStyle: { fontSize: 13, color: 'white' },

                tabBarIcon: () => {

                    let iconName, size;

                    if (route.name === 'Home') {

                        iconName = "home";

                    }

                    if (route.name === 'Categories') {

                        iconName = "category";

                    }

                    if (route.name === 'Dash') {

                        iconName = "dashboard";

                    }

                    if (route.name === 'MyOrders') {

                        iconName = "border-all";

                    }

                    if (route.name === 'Profile') {

                        iconName = "6-ft-apart";

                    }

                    return (<MaterialIcons name={iconName} size={20} color={"white"} />);
                }
            })}

        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false, }} />
            <Tab.Screen name="Categories" component={CategoriesScreen} options={{ headerShown: false, }} />
            <Tab.Screen name="Dash" component={DashScreen} options={{ headerShown: false, }} />
            <Tab.Screen name="MyOrders" component={MyOrdersScreen} options={{ headerShown: false}} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false}} />
        </Tab.Navigator>

    );
}