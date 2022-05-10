import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

import CreateAccount from './app/screens/CreateAccount';
import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';

export default function App() {
  return (
    <NativeBaseProvider>
      {/* < CreateAccount /> */}
      {/* <PasswordsList /> */}
      <UserPasswordData />

    </NativeBaseProvider>
  );
}
