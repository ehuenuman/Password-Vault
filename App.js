import React from 'react';
import { NativeBaseProvider, Box, extendTheme } from 'native-base';

import CreateAccount from './app/screens/CreateAccount';
import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      {/* < CreateAccount /> */}
      {/* <PasswordsList /> */}
      <UserPasswordData action="new" />

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
