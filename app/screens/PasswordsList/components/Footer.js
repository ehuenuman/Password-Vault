import React from 'react';

import { Box, Fab, HStack, Icon } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

export default function Footer() {
  return (
    <Box>
      <HStack bg="primary.400" minHeight={47} mt={10}></HStack>
      <Fab
        mr={3}
        icon={
          <Icon as={Ionicons} name="add" size={10} />
        }
      />
    </Box>
  )
}
