import React, { useEffect, useState } from 'react';
import { TouchableOpacity, LogBox } from 'react-native';
import { Avatar, Box, FlatList, HStack, Icon, Input, Text, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import { ACCOUNT_PROVIDERS } from '../../../data/Global';

// TO DO: Fix this!
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function SelectAccountProvider({ route, navigation }) {
  const { values, setValues } = route.params;
  const [searchTerm, setSearchTerm] = useState();
  const [suggestions, setSuggestions] = useState(ACCOUNT_PROVIDERS);

  const updateSuggestions = query => {
    setSearchTerm(query);
    let results = ACCOUNT_PROVIDERS.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
    if (results.length > 0) {
      setSuggestions(results);
    } else {
      let newService = {
        name: query,
        domain: "",
        logo: "newItem"
      }
      setSuggestions([newService]);
    }
  }

  const getLogo = (item) => {
    if (item.logo === "newItem") {
      return ""
    } else {
      let logo = item.logos.filter(i => i.type === "icon");
      (logo == 0) && (logo = item.logos.filter(i => i.type === "symbol"));
      (logo == 0) && (logo = item.logos.filter(i => i.type === "logo"));
      return (logo[0].formats[0].src);
    }
  }

  return (
    <Box flex="1" bg="white">
      <VStack space="3" px="4">
        <Input
          placeholder="Search a service"
          value={searchTerm}
          fontSize="14"
          mt="2"
          leftElement={
            <Icon as={FontAwesome} name="search" size="5" ml="2" />
          }
          onChangeText={text => updateSuggestions(text)}
        />
        <FlatList
          data={suggestions}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            < TouchableOpacity
              onPress={() => {
                setValues({
                  ...values,
                  logo: getLogo(item),
                  accountName: item.name,
                  website: item.domain,
                });
                navigation.goBack()
              }}
            >
              <HStack
                space="5"
                alignItems="center"
                p="2"
              >
                <Avatar
                  size="md"
                  bg="primary.600"
                  source={{
                    uri: getLogo(item)
                  }}
                >
                  {item.name.toUpperCase().slice(0, 2)}
                </Avatar>
                <VStack>
                  <Text fontSize="md">{item.name}</Text>
                  {item.domain !== "" && <Text fontSize="sm">{item.domain}</Text>}
                </VStack>
              </HStack>
            </TouchableOpacity>
          )}
        />
      </VStack>
    </Box>
  )
}

export default SelectAccountProvider;