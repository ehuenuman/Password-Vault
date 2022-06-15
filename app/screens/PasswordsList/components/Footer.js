import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Fab, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {

  const navigation = useNavigation();

  return (
    <Box>
      <HStack bg="secondary.800" minHeight={47} mt={10}></HStack>
      <Fab
        renderInPortal={false}
        icon={
          <Icon as={Ionicons} name="add" size={10} />
        }
        onPress={() => navigation.navigate("UserPasswordData", { action: "new" })}
      />
    </Box>
  )
}
