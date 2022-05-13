import React, { useState } from 'react';
import PropTypes from "prop-types";

import {
  Box,
  Image,
  ScrollView,
} from 'native-base';
import AppBar from './components/AppBar';

import Form from './components/Form';

function UserPasswordData({ action }) {

  const [formAction, setFormAction] = useState(action);

  const changeFormAction = (action) => {
    setFormAction(action);
  }

  return (
    <Box safeAreaTop>
      <AppBar action={formAction} actionChangeHandler={changeFormAction} />

      <ScrollView>
        <Box
          px="15%"
        >
          <Image
            source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg"
            }}
            alt="Brand Logo"
            size="85px"
            my="10"
            alignSelf="center"
          />
          <Form viewMode={formAction == "view" ? true : false} modeForm={formAction} actionChangeHandler={changeFormAction} />
        </Box>
      </ScrollView>
    </Box>

  )
}

UserPasswordData.propTypes = {
  action: PropTypes.oneOf(['view', 'edit', 'new']).isRequired
}

export default UserPasswordData
