import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Box, Image, Center, Icon } from 'native-base';

import getAllBrands from './api/brands';
import { vault } from './app/data/vault';
import theme from './app/theme/base';
import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';
import ModalSelectService from './app/screens/UserPasswordData/components/ModalSelectService';
import CreateAccount from './app/screens/CreateAccount';
import Welcome from './app/screens/IntroSlider';
import Login from './app/screens/Login';

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

  const Stack = createStackNavigator();

  return (
    <NativeBaseProvider theme={theme}>
      <Box onLayout={onLayoutRootView} flex={1}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerTitleAlign: "center",
              headerTintColor: theme.colors.primary[600],
              cardStyle: { backgroundColor: 'white' },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}
          >
            <Stack.Group>
              <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
              <Stack.Screen name="CreateAccount" component={CreateAccount} options={{ title: "", headerShadowVisible: false }} />
              <Stack.Screen name="FirstLogin" component={Login} initialParams={{ isPersistantUser: false }} options={{ title: "", headerShadowVisible: false }} />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerTitle: (props) => <Center {...props}><Image source={require("./app/assets/favicon.png")} alt="Password Vault" size="25px" /></Center>
              }}>
              <Stack.Screen name="Home" component={PasswordsList} initialParams={{ decryptedData: decryptedData }} />
              <Stack.Screen name="UserPasswordData" component={UserPasswordData} initialParams={{ passwordId: "", action: "new" }} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen name="ServicesModal" component={ModalSelectService} initialParams={{ services: websites }} options={{ headerTitle: "Select a Service" }} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </Box>
    </NativeBaseProvider >
  );
}
