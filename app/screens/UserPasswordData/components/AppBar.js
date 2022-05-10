import React from 'react';
import PropTypes from 'prop-types';

import { Button, HStack, Icon, IconButton, Image } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

function AppBar({
  action,
  actionChangeHandler
}) {
  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      maxHeight="46px"
      borderBottomWidth={1}
      borderBottomColor="#F5F4F4"
      px={2}
    >
      <IconButton
        icon={<Icon as={FontAwesome} name="chevron-left" />}
        borderRadius="full"
        onPress={() => {
          console.log('Back')
        }}
      />
      <Image
        source={require('../../../assets/favicon.png')}
        alt="Password Vault"
        size="25px"
      />
      <Button
        minWidth="50px"
        colorScheme="primary"
        variant="ghost"
        onPress={() => {
          if (action == "new") {
            console.log("New register created");
          } else {
            action == "view" ? actionChangeHandler("edit") : actionChangeHandler("view");
          }
        }}
      >
        {(action == "view") ? "Edit" : "Save"}
      </Button>
    </HStack >
  )
}

AppBar.propTypes = {
  action: PropTypes.string.isRequired,
  actionChangeHandler: PropTypes.func.isRequired
}

export default AppBar
