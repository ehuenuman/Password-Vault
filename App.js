import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NativeBaseProvider, Box, Center, Image } from 'native-base';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './api/firebaseConfig';
import { signInUser, signOutUser, signUpUser } from './api/auth';
import { vault } from './app/data/Vault';
import { AuthContext } from './app/data/AuthContext';
import { loadGlobalData } from './app/data/Global';
import theme from './app/theme/base';
import CreateAccount from './app/screens/CreateAccount';
import Welcome from './app/screens/IntroSlider';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import UserPasswordData from './app/screens/UserPasswordData';
import SelectAccountProviders from './app/screens/UserPasswordData/components/SelectAccountProvider'

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.error(error);
      }
    }
    loadGlobalData();
    prepare();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async (data) => {
        let message = "OK";
        await signInUser(data)
          .then(response => {
            if (response.isValid) {
              setUserToken(response.message);
              setAppIsReady(true);
            } else {
              message = response.message;
            }
          })
          .catch(e => console.error(e));

        return message
      },
      signOut: async () => {
        signOutUser();
        setUserToken(null);
      },
      signUp: async (data) => {
        signUpUser(data)
          .then(userToken => setUserToken(userToken))
          .catch(e => console.error(e));
      },
      loggedUser: () => auth.currentUser
    }),
    []
  );

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // console.log(user.displayName, "logged");
      if (userToken === null) {
        // TO DO: Re-auth
        // console.log("Re-Auth");
        await user.getIdToken()
          .then(userToken => setUserToken(userToken))
          .catch(error => console.error(error));
        setAppIsReady(true);
      }
    } else {
      // console.log("User signed out");
      setUserToken(null);
      setAppIsReady(true);
    }
  });

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
            {
              userToken === null ? (
                <Stack.Navigator
                  initialRouteName="Welcome"
                  screenOptions={{
                    headerTitle: "",
                    headerShadowVisible: false,
                    headerTintColor: theme.colors.secondary[600],
                    cardStyle: { backgroundColor: "white" },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                  }}
                >
                  <Stack.Group>
                    <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateAccount" component={CreateAccount} />
                    <Stack.Screen name="FirstLogin" component={Login} />
                  </Stack.Group>
                </Stack.Navigator>
              ) : (
                <Stack.Navigator
                  initialRouteName="Home"
                  screenOptions={{
                    headerTitleAlign: "center",
                    headerTintColor: theme.colors.secondary[600],
                    headerStyle: { shadowColor: theme.colors.tertiary[700] },
                    cardStyle: { backgroundColor: "white" },
                  }}
                >
                  <Stack.Group
                    screenOptions={{
                      headerTitle: (props) => <Center {...props}><Image source={require("./app/assets/favicon.png")} alt="Password Vault" size="25px" /></Center>,
                      cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    }}>
                    <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="UserPasswordData" component={UserPasswordData} />
                  </Stack.Group>
                  <Stack.Group screenOptions={{ presentation: "modal" }}>
                    <Stack.Screen name="AccountProviders" component={SelectAccountProviders} options={{ headerTitle: "Select your account provider", }} />
                  </Stack.Group>
                </Stack.Navigator>
              )
            }
          </NavigationContainer>
        </Box>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
