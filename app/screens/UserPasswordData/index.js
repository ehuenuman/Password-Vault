import React, { useState } from 'react';

import {
  Box,
  Image,
} from 'native-base';

import AppBar from './components/AppBar';
import Form from './components/Form';

export default function UserPasswordData() {

  const [formAction, setFormAction] = useState("view"); // "view"|"edit"|"new"

  const changeFormAction = (action) => {
    console.log(action);
    setFormAction(action);
  }

  return (
    <Box safeAreaTop>
      <AppBar action={formAction} actionChangeHandler={changeFormAction} />
      <Box
        px="15%"
      >
        <Image
          source={{
            uri: "https://wallpaperaccess.com/full/317501.jpg"
          }}
          alt="Brand Logo"
          size="85px"
          my={10}
          alignSelf="center"
        />
        <Form viewMode={formAction == "view" ? true : false} />
      </Box>
    </Box>

  )
}
