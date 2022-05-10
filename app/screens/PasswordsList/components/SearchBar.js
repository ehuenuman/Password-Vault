import React from 'react';

import { HStack, Icon, Image, Input } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <HStack
      space={5}
      alignItems="center"
      px={10}
      py={6}
    >
      <Image
        source={require('../../../assets/favicon.png')}
        alt="Password Vault"
      />
      <Input
        flex={1}
        fontSize="14"
        InputRightElement={
          <Icon m="2" ml="3" size="6" color="gray.400"
            as={
              <Ionicons name="search" />
            }
          />
        }
      />
    </HStack>
  )
}
