import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Box, VStack } from 'native-base';

import { AuthContext } from '../../../data/AuthContext';

function AppDrawerContent(props) {

  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="3">

        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out"
          onPress={() => signOut()}
        />
      </VStack>

    </DrawerContentScrollView>
  );
}

export default AppDrawerContent;