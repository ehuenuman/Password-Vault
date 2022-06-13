import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Box, Image, Center } from 'native-base';

import { signInUser, signOutUser, signUpUser } from './api/auth';
import getAllBrands from './api/brands';
import { vault } from './app/data/vault';
import { AuthContext } from './app/data/AuthContext';
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

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const prepare = async () => {
      let userToken;
      try {
        await SplashScreen.preventAutoHideAsync();
        userToken = await SecureStore.getItemAsync("userToken");
        // ?? await anonymousUser();

        await vault.init(setDecryptedData).then(response => {
          response && setAppIsReady(true);
        });
      } catch (error) {
        console.error(error);
      }

      dispatch({ type: "RESTORE_TOKEN", token: userToken })
    }

    prepare();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        let response = "OK";
        const loginObject = await signInUser(data).catch(e => console.error(e));

        if (loginObject.isValid) {
          // console.log(loginObject.message);
          await SecureStore.setItemAsync("userToken", loginObject.message);
          dispatch({ type: "SIGN_IN", token: loginObject.message });
        } else {
          response = loginObject.message;
        }

        return response
      },
      signOut: async () => {
        // console.log("Sign out");
        signOutUser();
        await SecureStore.deleteItemAsync("userToken");
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        const userToken = await signUpUser(data).catch(e => console.error("100", e));
        await SecureStore.setItemAsync("userToken", userToken);
        dispatch({ type: "SIGN_IN", token: userToken });
      },
    }),
    []
  );

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
      <AuthContext.Provider value={authContext}>
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
              {
                state.userToken == null ? (
                  <Stack.Group>
                    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} initialParams={{ email: "" }} options={{ title: "", headerShadowVisible: false }} />
                    <Stack.Screen name="FirstLogin" component={Login} initialParams={{ email: "" }} options={{ title: "", headerShadowVisible: false }} />
                  </Stack.Group>
                ) : (
                  <Stack.Group
                    screenOptions={{
                      headerTitle: (props) => <Center {...props}><Image source={require("./app/assets/favicon.png")} alt="Password Vault" size="25px" /></Center>
                    }}>
                    <Stack.Screen name="Home" component={PasswordsList} initialParams={{ decryptedData: decryptedData }} />
                    <Stack.Screen name="UserPasswordData" component={UserPasswordData} initialParams={{ passwordId: "", action: "new" }} />
                  </Stack.Group>
                )
              }
              <Stack.Group screenOptions={{ presentation: "modal" }}>
                <Stack.Screen name="ServicesModal" component={ModalSelectService} initialParams={{ services: websites }} options={{ headerTitle: "Select a Service" }} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </Box>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
