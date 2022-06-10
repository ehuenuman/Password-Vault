import React, { useCallback, useContext } from 'react';
import { Avatar, Box, FlatList, HStack, Icon, IconButton, Text, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import SearchBar from './components/SearchBar';
import Footer from './components/Footer';
import { vault } from '../../data/vault';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../data/AuthContext';

function PasswordsList({ route, navigation }) {

  const { decryptedData } = route.params;
  const isFocused = useIsFocused();

  const { signOut } = useContext(AuthContext);

  signOut();

  return (
    <Box flex="1" bg="white">
      <VStack flex="1">

        {/* <SearchBar /> */}

        <FlatList
          extraData={isFocused}
          data={decryptedData} //vault.allDecryptedData()
          renderItem={({ item }) => (
            <Box
              px="10"
              py="2"
            >
              <HStack
                space="4"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar
                  size="lg"
                  bg="primary.600"
                  source={{ uri: item.logo }}
                >
                </Avatar>
                <VStack
                  flex="1"
                  space="1"
                  justifyContent="center"
                >
                  <Text
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    {item.accountName}
                  </Text>
                  <Text>{item.category}</Text>
                </VStack>
                <IconButton
                  size="lg"
                  borderRadius="full"
                  icon={<Icon as={Ionicons} name="chevron-forward" />}
                  onPress={() => navigation.navigate("UserPasswordData", { passwordId: item.id, action: "view" })}
                />
              </HStack>
            </Box>
          )}
        />

        <Footer />

      </VStack>
    </Box>
  );
}

export default PasswordsList;
