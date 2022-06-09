import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Box, Button, FormControl, HStack, Image, Input, VStack } from 'native-base';

function Login({ route, navigation }) {
  // const { isPersistentUSer } = route.params;

  const submitForm = values => {
    console.log(values);
  }

  let formSchema = object({
    email: string().required("Required field"),
    masterPassword: string().required("Required field")
  });

  return (
    <Box
      flex="1"
      pb="32"
      pt="20"
      px="15%"
    >
      <Formik
        initialValues={{
          email: "",
          masterPassword: ""
        }}
        validationSchema={formSchema}
        onSubmit={values => submitForm(values)}
      >
        {({ handleSubmit, handleBlur, handleChange, values, touched, errors }) => (
          <Box
            flex="1"
            flexDirection="column"
            justifyContent="space-between"
            maxWidth="300px"
          >
            <VStack space="10">
              <Image source={require("../../assets/icon_bg_transparent.png")} alt="Security Pass - All in one place" size="lg" resizeMode="contain" alignSelf="center" />
              <VStack>
                <VStack space="5">
                  <FormControl isInvalid={touched.email && errors.email} >
                    <HStack space="1">
                      <FormControl.Label flex="1" _text={{ textTransform: "uppercase" }}>Email</FormControl.Label>
                      <FormControl.ErrorMessage>{errors.email}</FormControl.ErrorMessage>
                    </HStack>
                    <Input
                      type="email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                    />
                  </FormControl>
                  <FormControl isInvalid={touched.masterPassword && errors.masterPassword} >
                    <HStack space="1">
                      <FormControl.Label flex={1} _text={{ textTransform: "uppercase" }}>Master Password</FormControl.Label>
                      <FormControl.ErrorMessage>{errors.masterPassword}</FormControl.ErrorMessage>
                    </HStack>
                    <Input
                      type="password"
                      onChangeText={handleChange("masterPassword")}
                      onBlur={handleBlur("masterPassword")}
                      value={values.masterPassword}
                    />
                  </FormControl>
                </VStack>
              </VStack>
            </VStack>
            <Button onPress={handleSubmit}>
              Continue
            </Button>
          </Box>
        )
        }
      </Formik >
    </Box >
  )
}

export default Login
