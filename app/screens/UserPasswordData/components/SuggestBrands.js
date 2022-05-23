import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";
import { Avatar, Box, FlatList, HStack, PresenceTransition, ScrollView, Text, VStack } from "native-base";

import getAllBrands from "../../../../api/brands";

const SuggestBrands = ({
  query
}) => {
  const [brands, setBrands] = useState([])
  const [suggestions, setSuggestions] = useState([]);
  const { values, setValues } = useFormikContext();

  useEffect(() => {
    getAllBrands().then(data => {
      setBrands(data);
    })
  }, []);

  useEffect(() => {
    query.length > 2 ? updateSuggestions() : setSuggestions([]);
  }, [query]);

  const updateSuggestions = () => {
    const results = brands.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));
    (results.length > 0) ? setSuggestions(results) : setSuggestions([]);
  }

  const getLogo = (item) => {
    var logo = item.logos.filter(i => i.type === "icon");
    (logo == 0) && (logo = item.logos.filter(i => i.type === "symbol"));
    (logo == 0) && (logo = item.logos.filter(i => i.type === "logo"));
    return (logo[0].formats[0].src);
  }

  return (
    <Box>
      <PresenceTransition
        visible={suggestions.length > 0 ? true : false}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 250 } }}
      >
        <VStack
          borderWidth="1"
          borderTopWidth="0"
          borderColor="primary.300"
          position="relative"
          width="96%"
          left="2%"
        >
          <ScrollView>
            <FlatList
              data={suggestions}
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
                      bg="primary.500"
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
          </ScrollView>
        </VStack>
      </PresenceTransition>
    </Box >
  )
}

SuggestBrands.propTypes = {
  query: PropTypes.string.isRequired
}

export default SuggestBrands
