import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, Box, FlatList, HStack, ScrollView, Text } from 'native-base';

function ModalSelectService({ route, navigation }) {
  const { websites } = route.params;

  return (
    <Box flex={1} bg="white">
      {/* <ScrollView> */}
      <FlatList
        data={websites}
        renderItem={({ item }) => (
          < TouchableOpacity
            onPress={() => {
              setSuggestions([]);
              setValues({
                ...values,
                logo: getLogo(item),
                accountName: item.name,
                website: item.domain,
              });
            }}
          >
            <HStack
              space="5"
              alignItems="center"
              p="2"
            >
              <Avatar
                size="sm"
                bg="primary.600"
                source={{
                  uri: getLogo(item)
                }}
              >
                {query.toUpperCase().slice(0, 2)}
              </Avatar>
              <Text fontSize="sm">{item.name}</Text>
            </HStack>
          </TouchableOpacity>
        )}
      />
      {/* </ScrollView> */}
    </Box>
  )
}

export default ModalSelectService;