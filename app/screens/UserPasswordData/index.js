import React, { useEffect, useState } from 'react';
import * as Clipboard from 'expo-clipboard';
import { Formik } from 'formik';
import { object, string } from 'yup';
import {
  AlertDialog,
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

import InputField from './components/InputField';
import PasswordInputField from './components/PasswordInputField';
import ModalCategories from './components/ModalCategories';
import { vault } from '../../data/vault';

function UserPasswordData({ route, navigation }) {

  const { passwordId, action } = route.params;
  const [formMode, setFormMode] = useState(action);
  const [showModal, setShowModal] = useState(false);
  const hasUnsavedChanges = false;
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

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  let formSchema = object({
    accountName: string().required("Required field"),
    website: string().required("Required field"),
    user: string().required("Required field"),
    password: string().required("Required field"),
    category: string().required("Required field")
  });

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <Button
  //         variant="ghost"
  //         onPress={() => {
  //           if (formMode == "new") {
  //             console.log("New register created");
  //           } else {
  //             formMode == "view" ? setFormMode("edit") : setFormMode("view");
  //           }
  //         }}
  //       >
  //         {(formMode == "view") ? "Edit" : "Save"}
  //       </Button>
  //     ),
  //   });
  // }, [navigation, formMode]);

  const submitForm = values => {
    if (formMode == "edit") {
      // TO DO: Actions to edit a register
      setFormMode("view");
    } else {
      vault.newRegister(values)
        .then(
          (message) => {
            setFormMode("view");
            successToast.show({
              description: "Password Saved"
            });
          },
          error => console.log("Error:", error)
        );
    }
  }

  return (
    <Box flex="1" bg="white">
      <ScrollView keyboardShouldPersistTaps="always">
        <Box px="15%">
          <Formik
            initialValues={formInitialValues}
            validationSchema={formSchema}
            onSubmit={values => submitForm(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setValues, isSubmitting, errors, touched }) => (
              <VStack maxWidth="300px">
                <Avatar
                  bg="primary.600"
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
                  error={errors.accountName}
                  touched={touched.accountName}
                  rightElement={(formMode !== "view" ? true : false) &&
                    <Button variant="ghost" onPress={() => navigation.navigate("ServicesModal", { values: values, setValues: setValues })} >
                      Select from list
                    </Button>
                  }
                />
                <InputField
                  label="Website"
                  placeholder="Where you go to do login?"
                  viewMode={formMode == "view" ? true : false}
                  value={values.website}
                  onChangeText={handleChange("website")}
                  onBlur={handleBlur("website")}
                  error={errors.website}
                  touched={touched.website}
                />
                <InputField
                  label="User"
                  value={values.user}
                  viewMode={formMode == "view" ? true : false}
                  onChangeText={handleChange("user")}
                  onBlur={handleBlur("user")}
                  error={errors.user}
                  touched={touched.user}
                  rightElement={(formMode == "view" ? true : false) &&
                    <IconButton
                      icon={<Icon as={FontAwesome} name="copy" />}
                      borderRadius="full"
                      onPress={() => copyToClipboard(values.user)}
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
                  error={errors.password}
                  touched={touched.password}
                />
                <InputField
                  isDisabled={true}
                  label="Category"
                  value={values.category}
                  error={errors.category}
                  touched={touched.category}
                  viewMode={formMode == "view" ? true : false}
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
