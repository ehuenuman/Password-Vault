import React, { useLayoutEffect, useState } from 'react';
import { Formik } from 'formik';
import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  ScrollView,
  useToast,
  VStack
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import AppBar from './components/AppBar';
import InputField from './components/InputField';
import SuggestBrands from './components/SuggestBrands';
import PasswordInputField from './components/PasswordInputField';
import ModalCategories from './components/ModalCategories';
import { createUserPasswordData } from '../../../api/userPasswordData';
import { vault } from '../../data/vault';

function UserPasswordData({ route, navigation }) {

  const { passwordId, action } = route.params;
  const [formMode, setFormMode] = useState(action);
  const [showModal, setShowModal] = useState(false);
  const successToast = useToast();

  var register = vault.registerById(passwordId)
  var formInitialValues = {
    logo: register?.logo ?? "",
    accountName: register?.accountName ?? "",
    website: register?.website ?? "",
    user: register?.user ?? "",
    password: register?.password ?? "",
    passwordStrength: register?.passwordStrength ?? 0,
    category: register?.category ?? ""
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          variant="ghost"
          onPress={() => {
            if (formMode == "new") {
              console.log("New register created");
            } else {
              formMode == "view" ? setFormMode("edit") : setFormMode("view");
            }
          }}
        >
          {(formMode == "view") ? "Edit" : "Save"}
        </Button>
      ),
    });
  }, [navigation, formMode]);

  const submitForm = values => {
    // console.log("FormMode", action);
    if (formMode == "edit") {
      setFormMode("view");
    } else {
      createUserPasswordData(values).then(
        () => {
          // console.log("New Regiter Created")
          setFormMode("view");
          successToast.show({
            description: "Password Saved"
          });
        },
        error => console.log("Error:", error))
    }
  }

  return (
    <Box flex="1" bg="white">
      {/* <AppBar action={formMode} actionChangeHandler={changeFormMode} /> */}
      <ScrollView>
        <Box px="15%">
          <Formik
            initialValues={formInitialValues}
            onSubmit={values => submitForm(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
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
                  (formMode != "view") &&
                  <Button mt={10} onPress={handleSubmit} isLoading={isSubmitting} isLoadingText="PROTECTING DATA">
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

export default UserPasswordData
