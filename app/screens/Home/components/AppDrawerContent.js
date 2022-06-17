import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { Avatar, Box, Divider, HStack, Image, Text, VStack } from 'native-base';

import { AuthContext } from '../../../data/AuthContext';

function AppDrawerContent(props) {

  const { signOut, loggedUser } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="2">
        <HStack space="3" mx="3" my="4">
          <Image
            alt="Secure Password Logo"
            borderRadius="100"
            resizeMode="contain"
            source={require("../../../assets/icon_bg_color.png")}
            size="sm"
          />
          <VStack space="1" justifyContent="center">
            <Text bold fontSize="lg">{loggedUser().displayName}</Text>
            <Text>{loggedUser().email}</Text>
          </VStack>
        </HStack>
        <Divider bgColor="tertiary.700" />

        <DrawerItemList {...props} />
        <DrawerItem label="Sign Out" onPress={() => signOut()} />
      </VStack>

    </DrawerContentScrollView >
  );
}

export default AppDrawerContent;