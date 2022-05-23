import React, { useCallback, useEffect, useState } from 'react';
import { NativeBaseProvider, extendTheme, View } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';

import CreateAccount from './app/screens/CreateAccount';
import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';
import { getAllEncryptedData } from './api/userPasswordData';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [encryptedData, setEncryptedData] = useState();

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await getAllEncryptedData().then(
          data => {
            console.log("fetching data");
            setEncryptedData(data);
          },
          () => console.log("Fail"));
      } catch (error) {
        console.warn(error)
      } finally {
        console.log("finally");
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
    <NativeBaseProvider theme={theme}>
      <View onLayout={onLayoutRootView} flex={1}>
        {/* < CreateAccount /> */}
        <PasswordsList data={encryptedData} />
        {/* <UserPasswordData action="new" /> */}
      </View>
    </NativeBaseProvider>
  );
}

const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        _disabled: {
          opacity: 1
        }
      }
    }
  }
});
