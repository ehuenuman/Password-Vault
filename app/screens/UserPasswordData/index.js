import React, { useEffect, useRef, useState } from 'react';
import { Alert, Keyboard } from 'react-native';
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

import { vault } from '../../data/Vault';
import InputField from './components/InputField';
import PasswordInputField from './components/PasswordInputField';
import ModalCategories from './components/ModalCategories';

function UserPasswordData({ route, navigation }) {

  const { passwordId = null, action } = route.params;
  const [registerId, setRegisterId] = useState(passwordId);
  const [formMode, setFormMode] = useState(action);
  const [modalCategoriesIsOpen, setModalCategoriesIsOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDeletingPassword, setIsDeletingPassword] = useState(false);
  const toast = useToast();

  const formRef = useRef();

  useEffect(() => navigation.addListener(
    'beforeRemove', e => {
      const action = e.data.action;
      !isDeletingPassword && toast.closeAll();
      if (!isDeletingPassword && (formMode === "new" || formMode === "edit")) {
        e.preventDefault();
        if (hasUnsavedChanges) {
          Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure to discard them and go back?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => { } },
              {
                text: 'Discard',
                style: 'destructive',
                onPress: () => {
                  if (formMode === "new") {
                    navigation.dispatch(action);

                  } else {
                    formRef.current?.resetForm();
                    setFormMode("view");
                    setHasUnsavedChanges(false);
                  }
                },
              },
            ]
          );
        } else {
          (formMode === "new") && navigation.dispatch(action);
          (formMode === "edit") && setFormMode("view");
        }
      } else {
        return;
      }
    }
  ), [hasUnsavedChanges, isDeletingPassword, formMode, navigation]);

  const copyToClipboard = async (text) => {
    toast.closeAll();
    await Clipboard.setStringAsync(text);
    toast.show({
      description: "User copied to clipboard"
    });
  };

  var register = (registerId === null) ? null : vault.registerById(registerId);
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
    accountName: string().required("Required"),
    website: string().required("Required"),
    user: string().required("Required"),
    password: string().required("Required"),
    category: string().required("Required")
  });

  const submitForm = async values => {
    if (formMode == "edit") {
      // TO DO: Actions to edit a register
      if (hasUnsavedChanges) {
        await vault.updateRegister(registerId, values)
          .then(sucess => {
            if (sucess) {
              setFormMode("view");
              setHasUnsavedChanges(false);
              toast.show({
                description: "Password Updated"
              });
            } // TO DO: Message that indicates the error to the user.
          })
      } else {
        setFormMode("view");
        setHasUnsavedChanges(false);
        toast.show({
          description: "Password Updated"
        });
      }
    } else {
      await vault.createRegister(values)
        .then(id => {
          if (id) {
            setRegisterId(id);
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

  const deletePassword = () => {
    Alert.alert(
      'Are you sure you want to delete the password?',
      'This action can not be undone.',
      [
        { text: "No", style: 'cancel', onPress: () => { } },
        {
          text: 'Delete it',
          style: 'destructive',
          onPress: () => {
            setIsDeletingPassword(true);
            vault.deleteRegister(registerId)
              .then(response => {
                if (response) {
                  toast.closeAll();
                  toast.show({ description: "Password Deleted", duration: 2000 });
                  navigation.goBack();
                }
              });
          },
        },
      ]
    );
  }

  return (
    <Box flex="1" >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Box px="15%">
          <Formik
            initialValues={formInitialValues}
            validationSchema={formSchema}
            onSubmit={async values => submitForm(values)}
            innerRef={formRef}
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
                    <Button variant="ghost" mr="1" onPress={() => navigation.navigate("AccountProviders", { values: values, setValues: setValues })}>
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
                  isDisabled
                  hasChanged={setHasUnsavedChanges}
                  leftElement={(formMode == "view" ? false : true) &&
                    <Button
                      variant="outline"
                      onPress={() => {
                        Keyboard.dismiss();
                        setModalCategoriesIsOpen(true);
                      }}
                    >
                      {values.category ? "Change category" : "Select category"}
                    </Button>
                  }
                  borderWidth="0"
                />
                <ModalCategories isOpen={modalCategoriesIsOpen} setShowModal={setModalCategoriesIsOpen} />
                {
                  (formMode !== "view") &&
                  <Button mt="10" onPress={handleSubmit} isLoading={isSubmitting} isLoadingText="PROTECTING DATA">
                    SAVE
                  </Button>
                }
              </VStack>
            )}
          </Formik>
          <Box mt="10" mb="10%">
            {
              (formMode === "view") &&
              <Button variant="outline" colorScheme="secondary" onPress={() => setFormMode("edit")} >
                Edit
              </Button>
            }
            {
              (formMode === "edit") &&
              <Button variant="ghost" colorScheme="danger" isLoading={isDeletingPassword} isLoadingText="DELETING PASSWORD" onPress={() => deletePassword()} >
                Delete
              </Button>
            }
          </Box>
        </Box>
      </ScrollView>
    </Box>
  )
}

export default UserPasswordData
