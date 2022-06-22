import React, { useContext, useState } from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Alert, Button, FormControl, HStack, Icon, IconButton, Image, Input, ScrollView, Text, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import { AuthContext } from '../../data/AuthContext';

function Login({ route, navigation }) {
  const { email = "" } = route.params;

  const [coulBeNewUser, setCouldBeNewUser] = useState(false);
  const [isFailLogin, setIsFailLogin] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signIn } = useContext(AuthContext);

  const submitForm = async values => {
    setCouldBeNewUser(false);
    setIsFailLogin(false);

    await signIn(values)
      .then(response => {
        setLoginMessage(response);
        if (response !== "OK") {
          setIsFailLogin(true);
          (response == "Email does not have account") && setCouldBeNewUser(true);
        }
      })
      .catch(e => console.error(e));
  }

  let formSchema = object({
    email: string().email("Must be a valid email").required("Required"),
    masterPassword: string().required("Required")
  });

  return (
    <Formik
      initialValues={{
        email: email,
        masterPassword: ""
      }}
      validationSchema={formSchema}
      onSubmit={async values => submitForm(values, formikBag)}
    >
      {({ handleSubmit, handleBlur, handleChange, values, touched, errors, isSubmitting, setFieldValue, setFieldTouched, setFieldError }) => (
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
                    onChangeText={e => {
                      setFieldValue("email", e);
                      setIsFailLogin(false);
                      setCouldBeNewUser(false);
                    }}
                    onBlur={handleBlur("email")}
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
                    onChangeText={e => {
                      setFieldValue("masterPassword", e);
                      setIsFailLogin(false);
                    }}
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
