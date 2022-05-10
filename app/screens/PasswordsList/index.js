import React from 'react';

import { Avatar, Box, Center, Circle, Fab, FlatList, HStack, Icon, IconButton, Image, Input, Text, VStack } from 'native-base';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import SearchBar from './components/SearchBar';
import Footer from './components/Footer';

function PasswordsList() {
  const data = [
    {
      "_id": "6279e7d24f4035e9700c39fe",
      "accountName": "Google",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Gregory",
      "pass": "a3322e6e-066c-471a-b5ef-426d7359d3ff",
      "category": "Games"
    },
    {
      "_id": "6279e7d23c006f160091e5b2",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Heather",
      "pass": "095eb146-d866-4c44-9e8b-e502b67a1251",
      "category": "Social"
    },
    {
      "_id": "6279e7d2a352ab05e2766d0f",
      "accountName": "Instagram",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Blanchard",
      "pass": "987789f6-47f8-4f61-b6ed-faa4acda2e6b",
      "category": "Social"
    },
    {
      "_id": "6279e7d23d303f703728450e",
      "accountName": "Facebook",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Mcfarland",
      "pass": "8aa7b86a-2d99-4d92-a1ac-846cbfde1981",
      "category": "Games"
    },
    {
      "_id": "6279e7d2bda67ce1685ecb7b",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Cain",
      "pass": "b0d799ca-644d-47c6-ab73-c08e5f24294e",
      "category": "Social"
    },
    {
      "_id": "6279e7d29c40c480cd3e5325",
      "accountName": "Google",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Angela",
      "pass": "a0c8286f-5899-4065-ba44-94661c0ae286",
      "category": "News"
    },
    {
      "_id": "6279e7d2f3a8741dda745c89",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Harrison",
      "pass": "3d55505c-d4c5-4b0f-9902-bb9acd71774b",
      "category": "Social"
    },
    {
      "_id": "6279e7d210c58648a6efd374",
      "accountName": "Instagram",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Audrey",
      "pass": "13919ce3-b4cf-49bd-9bbe-ffd8656e67d2",
      "category": "News"
    },
    {
      "_id": "6279e7d2797276de9951d6bc",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Crystal",
      "pass": "fa5689d9-7bae-489e-828f-ae76a517eea8",
      "category": "Personal"
    },
    {
      "_id": "6279e7d28e3171b2d190b2a7",
      "accountName": "Facebook",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Kirk",
      "pass": "baa628ff-b967-4b48-b8cd-7ef1dfdbcf15",
      "category": "Social"
    },
    {
      "_id": "6279e7d2feb3cf8787678d8e",
      "accountName": "Facebook",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Rochelle",
      "pass": "50d6e4e5-6863-44d9-81df-2c85a63c6ef6",
      "category": "News"
    },
    {
      "_id": "6279e7d28979dbc3a6f321a6",
      "accountName": "Google",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Gray",
      "pass": "4f7d2d4d-1eaa-4922-8585-9c0f115f9f70",
      "category": "News"
    },
    {
      "_id": "6279e7d261f599e0ab3c5648",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Aurora",
      "pass": "039afbdf-1f8a-4c8e-ab95-b71586908be5",
      "category": "Social"
    },
    {
      "_id": "6279e7d28acaa9424fde2635",
      "accountName": "Facebook",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Henson",
      "pass": "74e5d11e-e99a-4518-a8e7-51ac2e13fc97",
      "category": "Social"
    },
    {
      "_id": "6279e7d278da43b9064ecced",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Marsha",
      "pass": "2530836f-4929-4ec3-94e9-f8cdaf388578",
      "category": "News"
    },
    {
      "_id": "6279e7d25becd9f9d81c8b2d",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Alexis",
      "pass": "1e9ef0b1-54b3-404b-b122-be496867ca62",
      "category": "News"
    },
    {
      "_id": "6279e7d2acd1244af38e70a4",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Cooke",
      "pass": "3d57add3-df59-4544-836e-1998a6152fc5",
      "category": "News"
    },
    {
      "_id": "6279e7d2f5dd63a913346bb9",
      "accountName": "TikTok",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Franklin",
      "pass": "e2e68d05-ce9e-4fde-9869-a79b351587d3",
      "category": "Social"
    },
    {
      "_id": "6279e7d2c5517223953a8ecb",
      "accountName": "Facebook",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Reeves",
      "pass": "b7d18885-edb2-440d-bb23-adb7cee68b96",
      "category": "News"
    },
    {
      "_id": "6279e7d257b97e75bac454a4",
      "accountName": "Last One",
      "logo": "https://via.placeholder.com/64/C4C4C4",
      "website": "w3.website.com",
      "user": "Best",
      "pass": "a5248371-8e00-4309-8d0e-42b50cfa044e",
      "category": "Personal"
    }
  ];

  return (
    <VStack
      safeAreaTop
      flex={1}
    >

      <SearchBar />

      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Box
            px={10}
            py={2}
          >
            <HStack
              space="4"
              justifyContent="space-between"
              alignItems="center"
            >
              <Avatar
                size="lg"
                bg="primary.400"
                source={{ uri: item.logo }}
              >
              </Avatar>
              <VStack
                flex={1}
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
              <Icon
                as={FontAwesome}
                name="chevron-right"
                size="xl"
              />
            </HStack>
          </Box>

        )}

      />
      <Footer />
    </VStack>

  );
}

export default PasswordsList;
