import React, { useContext } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Avatar, Box, FlatList, HStack, Icon, IconButton, Text, VStack } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import Footer from './components/Footer';
import { AuthContext } from '../../data/AuthContext';
import { vault } from '../../data/Vault';

function PasswordsList({ route, navigation }) {

  const { signOut } = useContext(AuthContext);
  const isFocused = useIsFocused();


  // signOut();

  return (
    <VStack flex="1">
      {
        (vault.allDecryptedData().length > 0) ?
          <FlatList
            extraData={isFocused}
            data={vault.allDecryptedData()}
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
          :
          <Box flex="1" justifyContent="center" alignItems="center" px="20%">
            <Text fontSize="4xl" textAlign="center" bold>It's time don't forget a password anymore.</Text>
            <Text fontSize="4xl" textAlign="center" bold>Just start creating a new entry!</Text>
          </Box>
      }
      <Footer />

    </VStack>
  );
}

export default PasswordsList;
