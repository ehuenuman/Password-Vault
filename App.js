import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NativeBaseProvider, Box, Image, Center } from 'native-base';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from './api/firebaseConfig';
import { signInUser, signOutUser, signUpUser } from './api/auth';
import { vault } from './app/data/Vault';
import { AuthContext } from './app/data/AuthContext';
import { loadGlobalData } from './app/data/Global';
import theme from './app/theme/base';
import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';
import SelectAccountProvider from './app/screens/UserPasswordData/components/SelectAccountProvider';
import CreateAccount from './app/screens/CreateAccount';
import Welcome from './app/screens/IntroSlider';
import Login from './app/screens/Login';

export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
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
      isSignout: false,
      userToken: null,
    }
  );

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
              vault.init().then(successful => {
                successful && dispatch({ type: "SIGN_IN", token: response.message });
              })
                .catch(error => console.error(error));
            } else {
              message = loginObject.message;
            }
          })
          .catch(e => console.error(e));

        return message
      },
      signOut: async () => {
        signOutUser();
        dispatch({ type: "SIGN_OUT" });
      },
      signUp: async (data) => {
        signUpUser(data)
          .then(userToken => dispatch({ type: "SIGN_IN", token: userToken }))
          .catch(e => console.error(e));
      },
    }),
    []
  );

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log(user.displayName, "logged");
      if (state.userToken === null) {
        vault.init()
          .then(successful => {
            if (successful) {
              user.getIdToken()
                .then(userToken => {
                  dispatch({ type: "RESTORE_TOKEN", token: userToken });
                  setAppIsReady(true);
                })
                .catch(error => console.error(error));
            }
          })
          .catch(error => console.error(error));
      }
    } else {
      console.log("User signed out");
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
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerTitleAlign: "center",
                headerTintColor: theme.colors.primary[600],
                cardStyle: { backgroundColor: "white" },
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            >
              {
                state.userToken === null ? (
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
                    <Stack.Screen name="Home" component={PasswordsList} />
                    <Stack.Screen name="UserPasswordData" component={UserPasswordData} />
                  </Stack.Group>
                )
              }
              <Stack.Group screenOptions={{ ...TransitionPresets.ModalTransition, }}>
                <Stack.Screen name="AccountProviders" component={SelectAccountProvider} options={{ headerTitle: "Select your account provider", }} />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </Box>
      </AuthContext.Provider>
    </NativeBaseProvider>
  );
}
