import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  ScrollView,
  VStack
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import AppBar from './components/AppBar';
import InputField from './components/InputField';
import SuggestBrands from './components/SuggestBrands';
import PasswordInputField from './components/PasswordInputField';
import ModalCategories from './components/ModalCategories';

function UserPasswordData({ action }) {

  const [formMode, setFormMode] = useState(action);
  const [showModal, setShowModal] = useState(false);

  const changeFormMode = (action) => {
    setFormMode(action);
  }

  const formInitialValues = {
    logo: "",
    accountName: "",
    website: "",
    user: "",
    password: "",
    passwordStrength: 0,
    category: ""
  }

  return (
    <Box safeAreaTop>
      <AppBar action={formMode} actionChangeHandler={changeFormMode} />

      <ScrollView>
        <Box px="15%">
          <Formik
            initialValues={formInitialValues}
            onSubmit={values => {
              console.log(values);
              modeForm == "edit" ?
                changeFormMode("view") :
                console.log("New register");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <VStack maxWidth="300px">
                <Avatar
                  bg="primary.500"
                  source={{
                    uri: values.logo
                  }}
                  alt="Brand Logo"
                  size="xl"
                  my="10"
                  alignSelf="center"
                >
                  {values.accountName.toUpperCase().slice(0, 2)}
                </Avatar>
                <InputField
                  label="Account Name"
                  placeHolder="How you identify this account?"
                  viewMode={formMode == "view" ? true : false}
                  value={values.accountName}
                  onChangeText={handleChange("accountName")}
                  onBlur={handleBlur("accountName")}
                />
                <SuggestBrands query={values.accountName} />
                <InputField
                  label="Website"
                  placeholder="Where you go to do login?"
                  viewMode={formMode == "view" ? true : false}
                  value={values.website}
                  onChangeText={handleChange("website")}
                  onBlur={handleBlur("website")}
                />
                <InputField
                  label="User"
                  value={values.user}
                  viewMode={formMode == "view" ? true : false}
                  onChangeText={handleChange("user")}
                  onBlur={handleBlur("user")}
                  rightElement={(formMode == "view" ? true : false) &&
                    <IconButton
                      icon={<Icon as={FontAwesome} name="copy" />}
                      borderRadius="full"
                    />
                  }
                />
                <PasswordInputField
                  label="Password"
                  value={values.password}
                  viewMode={formMode == "view" ? true : false}
                  hasPasswordChecker={true}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <InputField
                  isDisabled={true}
                  label="Category"
                  value={values.category}
                  viewMode={formMode == "view" ? true : false}
                  // onChangeText={handleChange("categories")}
                  // onBlur={handleBlur("categories")}
                  leftElement={(formMode == "view" ? false : true) &&
                    <Button
                      variant="outline"
                      onPress={() => setShowModal(true)}
                    >
                      {values.category ? "Change category" : "Select category"}
                    </Button>
                  }
                  borderWidth="0"
                />
                <ModalCategories isOpen={showModal} setShowModal={setShowModal} />
                {
                  (!formMode == "view" ? false : true) &&
                  <Button mt={10} onPress={handleSubmit}>
                    SAVE
                  </Button>
                }
              </VStack>
            )}
          </Formik>
        </Box>
      </ScrollView>
    </Box>
  )
}

UserPasswordData.propTypes = {
  action: PropTypes.oneOf(['view', 'edit', 'new']).isRequired
}

export default UserPasswordData
