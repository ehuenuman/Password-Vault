import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import {
  Box,
  Button,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import InputField from "../UserPasswordData/components/InputField";
import PasswordInputField from "../UserPasswordData/components/PasswordInputField";

function CreateAccount({ route, navigation }) {

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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

  const submitForm = values => {
    console.log(values);
  }

  let formSchema = object({
    userName: string().required("Required field"),
    email: string().email("Write a valid email").required("Required field"),
    masterPassword: string().required("Required field"),
    masterPassword2: string().required("Required field").oneOf([ref('masterPassword'), null], "Passwords must match")
  });

  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      <Box px="15%">
        <Formik
          initialValues={{
            userName: "",
            email: "",
            masterPassword: "",
            passwordStrength: 0,
            masterPassword2: ""
          }}
          validationSchema={formSchema}
          onSubmit={values => submitForm(values)}
        >
          {({ handleSubmit, handleBlur, handleChange, values, setFieldError }) => (
            <VStack maxWidth="300px" space="24">
              <VStack>
                <InputField
                  name="userName"
                  label="Name"
                  onChangeText={handleChange("userName")}
                  onBlur={handleBlur("userName")}
                  value={values.userName}
                  hasChanged={setHasUnsavedChanges}
                />
                <InputField
                  name="email"
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  hasChanged={setHasUnsavedChanges}
                />
                <PasswordInputField
                  name="masterPassword"
                  label="Master Password"
                  onChangeText={handleChange("masterPassword")}
                  onBlur={handleBlur("masterPassword")}
                  value={values.masterPassword}
                  hasPasswordChecker={true}
                  hasChanged={setHasUnsavedChanges}
                />
                <PasswordInputField
                  name="masterPassword2"
                  label="Confirm Master Password"
                  onChangeText={handleChange("masterPassword2")}
                  onBlur={handleBlur("masterPassword2")}
                  value={values.masterPassword2}
                  hasChanged={setHasUnsavedChanges}
                />
              </VStack>
              <VStack space="2">
                <Text textAlign="center">
                  Clicking on continue button you are accepting our terms and conditions.
                </Text>
                <Button onPress={handleSubmit}>
                  Continue
                </Button>
              </VStack>
            </VStack>
          )}
        </Formik>
      </Box>
    </Box >
  );
}

export default CreateAccount;
