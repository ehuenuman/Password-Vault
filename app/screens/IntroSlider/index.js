import { Box, Button, HStack, Image, Text, VStack } from 'native-base';
import React from 'react';

function Welcome({ router, navigation }) {
  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <VStack space="32" alignItems="center">
        <VStack space="16" alignItems="center">
          <Image
            source={require("../../assets/welcome.png")}
            alt="Phone with password notification"
            maxWidth="600px"
            size="2xl"
            resizeMode="contain"
          />
          <VStack space="3" px="24" alignItems="center">
            <Text fontSize="2xl" fontWeight="700" style={{ textAlign: "center" }}>Never forget passwords again!</Text>
            <Text fontSize="2xl" fontWeight="700" style={{ textAlign: "center" }}>Keep them always in your pocket</Text>
          </VStack>
        </VStack>
        <Box>
          <Button.Group isAttached size="lg">
            <Button width="100px" _text={{ textTransform: "uppercase" }}>Log in</Button>
            <Button
              colorScheme="secondary"
              width="100"
              onPress={() => navigation.navigate("CreateAccount")}
            >
              Get Started
            </Button>
          </Button.Group>
        </Box>
      </VStack >
    </Box >
  )
}

export default Welcome
