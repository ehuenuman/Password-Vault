import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Alert, Button, FormControl, HStack, Icon, IconButton, Image, Input, ScrollView, Text, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import { isEmailAvailable } from '../../../api/user';
import { AuthContext } from '../../data/AuthContext';

function Login({ route, navigation }) {
  const { email } = route.params;

  const [coulBeNewUser, setCouldBeNewUser] = useState(false);
  const [isFailLogin, setIsFailLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useContext(AuthContext);

  const submitForm = (values, formikBag) => {
    setCouldBeNewUser(false);
    setIsFailLogin(false);

    signIn(values)
      .then(response => {
        if (response !== "OK") {
          setLoginMessage(response);
          setIsFailLogin(true);
        }
      })
      .catch(e => console.error(e))
      .finally(() => formikBag.setSubmitting(false));
  }

  let formSchema = object({
    email: string().required("Required field"),
    masterPassword: string().required("Required field")
  });

  return (
    <Formik
      initialValues={{
        email: email,
        masterPassword: ""
      }}
      validationSchema={formSchema}
      onSubmit={(values, formikBag) => submitForm(values, formikBag)}
    >
      {({ handleSubmit, handleBlur, handleChange, values, touched, errors, isSubmitting, setFieldTouched, setFieldError }) => (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "space-around",
            alignSelf: "center",
            paddingHorizontal: "15%",
            paddingBottom: "5%",
            width: "100%",
            minWidth: 300,
          }}
        >
          <VStack space="10">
            <Image source={require("../../assets/logo_bg_transparent.png")} alt="Security Pass - All in one place" size="xl" resizeMode="contain" alignSelf="center" />
            <VStack>
              <VStack space="5">
                <FormControl isInvalid={isFailLogin || (touched.email && errors.email)}>
                  <HStack space="1">
                    <FormControl.Label flexGrow="1" _text={{ textTransform: "uppercase" }}>Email</FormControl.Label>
                    <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
                  </HStack>
                  <Input
                    onChangeText={handleChange("email")}
                    onBlur={e => {
                      setFieldTouched("email", true);
                      values.email.length > 0
                        && isEmailAvailable(values.email)
                          .then(response => {
                            response && setFieldError("email", "Email does not have registered account");
                            response && setCouldBeNewUser(true);
                          });
                    }}
                    onFocus={e => setCouldBeNewUser(false)}
                    value={values.email}
                    rightElement={
                      coulBeNewUser
                      &&
                      <Button
                        variant="ghost"
                        mx={1}
                        onPress={() => navigation.navigate("CreateAccount", { email: values.email })}
                      >
                        Sign up
                      </Button>
                    }
                  />
                </FormControl>
                <FormControl isInvalid={isFailLogin || (touched.masterPassword && errors.masterPassword)}>
                  <HStack space="1">
                    <FormControl.Label flexGrow="1" _text={{ textTransform: "uppercase" }}>Master Password</FormControl.Label>
                    <FormControl.ErrorMessage>{errors.masterPassword}</FormControl.ErrorMessage>
                  </HStack>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChangeText={handleChange("masterPassword")}
                    onBlur={handleBlur("masterPassword")}
                    value={values.masterPassword}
                    rightElement={
                      <IconButton
                        icon={<Icon as={FontAwesome} name={showPassword ? "eye" : "eye-slash"} />}
                        borderRadius="full"
                        onPress={() => {
                          setShowPassword(!showPassword)
                        }}
                      />
                    }
                  />
                </FormControl>
                {
                  isFailLogin &&
                  <Alert status="error" width="100%">
                    <Text>{loginMessage}</Text>
                  </Alert>
                }
              </VStack>
            </VStack>
          </VStack>
          <Button onPress={handleSubmit} isLoading={isSubmitting} isLoadingText="LOGGING IN" mt="4">
            Continue
          </Button>
        </ScrollView>
      )}
    </Formik >
  )
}

export default Login
