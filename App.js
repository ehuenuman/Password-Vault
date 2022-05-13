import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

import CreateAccount from './app/screens/CreateAccount';
import PasswordsList from './app/screens/PasswordsList';
import UserPasswordData from './app/screens/UserPasswordData';

import { fetchBrandByName } from './api/Brandfetch';

export default function App() {
  // fetchBrandByName("facebook.com");
  return (
    <NativeBaseProvider>
      {/* < CreateAccount /> */}
      {/* <PasswordsList /> */}
      <UserPasswordData action="new" />

    </NativeBaseProvider>
  );
}
