import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
// import RegistrationScreen from './RegistrationScreen'; // Assuming RegistrationScreen uses navigation
import LoginScreen from './LoginScreen';
import OptionScreen from './OptionScreen';
import BottomDrawer from '../../routes/BottomDrawer';
import NewCollection from './NewCollection';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Splash = () => {


  const navigation = useNavigation();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 20));
      } catch (e) {
        console.warn(e);
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
      {/* <LoginScreen navigation={navigation} /> */}
      <BottomDrawer/>
    </View>
  )
}

export default Splash;
