import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

import LoginScreen from './LoginScreen';
import BottomDrawer from '../../routes/BottomDrawer';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Splash = () => {
  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false); // Track user login state

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({}); // Load fonts (add more if needed)
        // Check if the user is logged in by retrieving a stored token or data
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          setUserLoggedIn(true); // User is logged in
        }
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(error);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {userLoggedIn ? (
        <BottomDrawer /> // User is logged in, navigate to the main app screen
      ) : (
        <LoginScreen navigation={navigation} /> // User is not logged in, show the login screen
      )}
    </View>
  );
};

export default Splash;
