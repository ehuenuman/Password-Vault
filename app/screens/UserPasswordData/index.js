import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Formik } from 'formik';
import { object, string } from 'yup';
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

import InputField from './components/InputField';
import PasswordInputField from './components/PasswordInputField';
import ModalCategories from './components/ModalCategories';
import { vault } from '../../data/Vault';
import { getAccountProviders } from '../../../api/accountProviders';

function UserPasswordData({ route, navigation }) {

  const { passwordId = null, action } = route.params;
  const [formMode, setFormMode] = useState(action);
  const [modalCategoriesIsOpen, setModalCategoriesIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const toast = useToast();

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    toast.show({
      description: "User copied"
    });
  };

  var accountProviders = [];
  useEffect(() => {
    getAccountProviders().then(providers => {
      accountProviders = providers;
    });
  }, []);

  useEffect(() => navigation.addListener(
    'beforeRemove', e => {
      const action = e.data.action;
      if (formMode === "view") {
        return
      } else {
        if (!hasUnsavedChanges) {
          // If we don't have unsaved changes, then we don't need to do anything
          return;
        }
        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'You have unsaved changes. Are you sure to discard them and go back?',
          [
            { text: "Don't leave", style: 'cancel', onPress: () => { } },
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () => navigation.dispatch(action),
            },
          ]
        );
      }
    }
  ), [hasUnsavedChanges, navigation]);

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

  var register = (passwordId === null) ? null : vault.registerById(passwordId);
  var formInitialValues = {
    logo: register?.logo ?? "",
    accountName: register?.accountName ?? "",
    website: register?.website ?? "",
    user: register?.user ?? "",
    password: register?.password ?? "",
    passwordStrength: register?.passwordStrength ?? 0,
    category: register?.category ?? ""
  }

  let formSchema = object({
    accountName: string().required("Required field"),
    website: string().required("Required field"),
    user: string().required("Required field"),
    password: string().required("Required field"),
    category: string().required("Required field")
  });

  const submitForm = values => {
    if (formMode == "edit") {
      // TO DO: Actions to edit a register
      setFormMode("view");
    } else {
      vault.newRegister(values)
        .then(success => {
          if (success) {
            setFormMode("view");
            setHasUnsavedChanges(false);
            toast.show({
              description: "Password Saved"
            });
          } // TO DO: Message that indicates the error to the user.
        })
        .catch(error => console.error(error));
    }
  }

  return (
    <Box flex="1" >
      <ScrollView keyboardShouldPersistTaps="always">
        <Box px="15%">
          <Formik
            initialValues={formInitialValues}
            validationSchema={formSchema}
            onSubmit={values => submitForm(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, setValues, isSubmitting }) => (
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
                  name="accountName"
                  label="Account Name"
                  placeholder="How you identify this account?"
                  isViewMode={formMode == "view" ? true : false}
                  value={values.accountName}
                  onChangeText={handleChange("accountName")}
                  onBlur={handleBlur("accountName")}
                  hasChanged={setHasUnsavedChanges}
                  rightElement={(formMode !== "view" ? true : false) &&
                    <Button variant="ghost" onPress={() => navigation.navigate("ServicesModal", { accountProviders: accountProviders, values: values, setValues: setValues })}>
                      Select from list
                    </Button>
                  }
                />
                <InputField
                  name="website"
                  label="Website"
                  placeholder="Where you go to do login?"
                  isViewMode={formMode == "view" ? true : false}
                  value={values.website}
                  onChangeText={handleChange("website")}
                  onBlur={handleBlur("website")}
                  hasChanged={setHasUnsavedChanges}
                />
                <InputField
                  name="user"
                  label="User"
                  value={values.user}
                  isViewMode={formMode == "view" ? true : false}
                  onChangeText={handleChange("user")}
                  onBlur={handleBlur("user")}
                  hasChanged={setHasUnsavedChanges}
                  rightElement={(formMode == "view" ? true : false) &&
                    <IconButton
                      icon={<Icon as={FontAwesome} name="copy" />}
                      borderRadius="full"
                      onPress={() => copyToClipboard(values.user)}
                    />
                  }
                />
                <PasswordInputField
                  name="password"
                  label="Password"
                  value={values.password}
                  isViewMode={formMode == "view" ? true : false}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  hasChanged={setHasUnsavedChanges}
                  hasPasswordChecker={true}
                />
                <InputField
                  name="category"
                  label="Category"
                  value={values.category}
                  isViewMode={formMode == "view" ? true : false}
                  isDisabled={true}
                  hasChanged={setHasUnsavedChanges}
                  leftElement={(formMode == "view" ? false : true) &&
                    <Button
                      variant="outline"
                      onPress={() => setModalCategoriesIsOpen(true)}
                    >
                      {values.category ? "Change category" : "Select category"}
                    </Button>
                  }
                  borderWidth="0"
                />
                <ModalCategories isOpen={modalCategoriesIsOpen} setShowModal={setModalCategoriesIsOpen} />
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
