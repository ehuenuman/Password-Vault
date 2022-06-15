import React from 'react';
import { Box, Button, Image, Text, VStack } from 'native-base';

function Welcome({ router, navigation }) {
  return (
    <Box flex="1" justifyContent="center" alignItems="center" safeArea>
      <VStack alignItems="center" flex="1" justifyContent="space-around" mt="15%">
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
        <Box>
          <Button.Group isAttached size="lg">
            <Button
              width="100px"
              _text={{ textTransform: "uppercase" }}
              onPress={() => navigation.navigate("FirstLogin")}
            >
              Log in
            </Button>
            <Button
              colorScheme="secondary"
              width="100"
              onPress={() => navigation.navigate("CreateAccount")}
              _text={{ textAlign: "center" }}
            >
              Get Started
            </Button>
          </Button.Group>
        </Box>
      </VStack>
    </Box >
  )
}

export default Welcome
