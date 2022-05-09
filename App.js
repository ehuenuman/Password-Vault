import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

import CreateAccount from './app/screens/CreateAccount';

export default function App() {
  return (
    <NativeBaseProvider>
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
      >
        <CreateAccount />
      </Box>
    </NativeBaseProvider>
  );
}
