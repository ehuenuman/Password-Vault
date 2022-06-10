import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Formik } from "formik";
import { object, string, ref } from "yup";
import {
  Button,
  ScrollView,
  Text,
  VStack,
} from 'native-base';

import { createUser, isEmailAvailable } from "../../../api/user";
import InputField from "../UserPasswordData/components/InputField";
import PasswordInputField from "../UserPasswordData/components/PasswordInputField";

function CreateAccount({ route, navigation }) {

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => navigation.addListener(
    'beforeRemove', e => {
      const action = e.data.action;
      if (!hasUnsavedChanges) {
        return;
      }
      e.preventDefault();

      Alert.alert(
        "You are on your way to enjoying the best app",
        "Are you sure to go back?",
        [
          { text: "No", style: 'cancel', onPress: () => { } },
          {
            text: 'Yes',
            style: 'destructive',
            onPress: () => navigation.dispatch(action),
          },
        ]
      );
    }
  ), [hasUnsavedChanges, navigation]);

  const submitForm = values => {
    createUser(values)
      .then(userId => {
        //Jump to HomeScreen
      })
      .catch(err => console.warn(err));
  }

  let formSchema = object({
    userName: string().required("Required field"),
    email: string()
      .email("Write a valid email")
      .required("Required field")
      .test(
        "EmailAvailability",
        "Email is already used",
        async value => await isEmailAvailable(value).then(isAvailable => isAvailable)
      ),
    masterPassword: string()
      .matches(/[0-9]+/, "Must have at least one digit.")
      .matches(/[a-z]+/, "Must have at least one lower case.")
      .matches(/[A-Z]+/, "Must have at least one upper case.")
      .matches(/[!"#$%&'()*+,\-.\/:;<=>?@\[\]\\^_`{|}~]+/, "Must have at least one symbol.")
      .min(15, "Use 15 or more characters")
      .required("Required field"),
    masterPassword2: string().required("Required field").oneOf([ref('masterPassword'), null], "Passwords must match")
  });

  return (
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
      {({ handleSubmit, handleBlur, handleChange, values, touched, errors }) => (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-around",
            alignSelf: "center",
            paddingHorizontal: "15%",
            width: "100%",
            minWidth: 300,
          }}
        >
          <VStack space="5">
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
              type="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              hasChanged={setHasUnsavedChanges}
              rightElement={
                touched.email && errors.email === "Email is already used"
                &&
                <Button
                  variant="ghost"
                  mx={1}
                  onPress={() => navigation.navigate("FirstLogin", { email: values.email })}
                >
                  Log in
                </Button>
              }
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
              By clicking continue, you are accepting our terms and conditions of use.
            </Text>
            <Button onPress={handleSubmit}>
              Continue
            </Button>
          </VStack>
        </ScrollView>
      )}
    </Formik>
  );
}

export default CreateAccount;
