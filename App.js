import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, extendTheme, Box, Image, Center } from 'native-base';

import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';
import theme from './app/theme/base';
import { vault } from './app/data/vault';
import ModalSelectService from './app/screens/UserPasswordData/components/ModalSelectService';
import getAllBrands from './api/brands';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [decryptedData, setDecryptedData] = useState();
  const [websites, setWebsites] = useState();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await vault.init(setDecryptedData).then(response => {
          response && setAppIsReady(true);
        });
      } catch (error) {
        console.warn(error)
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    getAllBrands().then(data => setWebsites(data))
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
      <Box onLayout={onLayoutRootView} flex={1}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTitle: (props) => <Center><Image source={require("./app/assets/favicon.png")} alt="Password Vault" size="25px" /></Center>,
              headerTitleAlign: "center",
              headerTintColor: theme.colors.primary[600]
            }}
          >
            <Stack.Group screenOptions={{ animation: "slide_from_right" }}>
              <Stack.Screen name="Home" component={PasswordsList} initialParams={{ decryptedData: decryptedData }} />
              <Stack.Screen name="UserPasswordData" component={UserPasswordData} initialParams={{ passwordId: "", action: "new" }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ animation: "slide_from_bottom", presentation: "modal" }}>
              <Stack.Screen name="ServicesModal" component={ModalSelectService} initialParams={{ services: websites }} options={{ headerTitle: "Select a Service" }} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </Box>
    </NativeBaseProvider >
  );
}
