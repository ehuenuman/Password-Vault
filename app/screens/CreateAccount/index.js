import React, { useState } from "react";
import { Formik, useFormikContext } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Center,
  FormControl,
  Input,
  Slider,
  Text,
  VStack,
  IconButton,
  Icon,
} from 'native-base';
import { FontAwesome } from "@expo/vector-icons"

import ConfirmPassInput from "./components/ConfirmPassInput";

function CreateAccount() {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Center
      flex={1}
    >
      <Box
        maxWidth={300}
      >
        <Formik
          initialValues={{
            name: "",
            email: "",
            masterPassword: "",
            passwordStrength: 50,
            passwordConditions: [],
            masterPassword2: ''
          }}
          onSubmit={values => console.log(values)}
        >
          {({ handleSubmit, handleBlur, handleChange, values, errors }) => (
            <Box>
              <Box>
                <FormControl >
                  <FormControl.Label>NAME</FormControl.Label>
                  <Input
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                </FormControl>
                <FormControl >
                  <FormControl.Label>EMAIL</FormControl.Label>
                  <Input
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </FormControl>
                <FormControl >
                  <FormControl.Label>MASTER PASSWORD</FormControl.Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChangeText={handleChange("masterPassword")}
                    onBlur={handleBlur("masterPassword")}
                    value={values.masterPassword}
                    rightElement={
                      <IconButton
                        icon={<Icon as={FontAwesome} name={showPassword ? "eye-slash" : "eye"} />}
                        borderRadius="full"
                        onPress={() => {
                          setShowPassword(!showPassword)
                        }}
                      />
                    }
                  />
                </FormControl>
                <Box m={2}>
                  <Box marginBottom="3">
                    <Slider
                      defaultValue={values.passwordStrength}
                      maxValue={100}
                      step={1}
                      marginBottom="-2"
                      isDisabled
                    >
                      <Slider.Track >
                        <Slider.FilledTrack />
                      </Slider.Track>
                    </Slider>
                    <Box
                      flexDirection="row"
                      justifyContent="space-between"
                      px={2}
                    >
                      <Text fontSize="xs">Low</Text>
                      <Text fontSize="xs">High</Text>
                    </Box>
                  </Box>
                  <Checkbox.Group
                    flexDir="row"
                    alignSelf="center"
                    size="sm"
                    px={2}
                    defaultValue={values.passwordConditions}
                    onChange={handleChange("passwordConditions")}
                  >
                    <Checkbox isDisabled size="sm" value="Numbers" mr={2} _text={{ textTransform: "uppercase", fontSize: "xs", marginLeft: "0" }}>
                      Numbers
                    </Checkbox>
                    <Checkbox isDisabled size="sm" value="Letters" mr={2} _text={{ textTransform: "uppercase", fontSize: "xs", marginLeft: "0" }}>
                      Letters
                    </Checkbox>
                    <Checkbox isDisabled size="sm" value="Symbols" _text={{ textTransform: "uppercase", fontSize: "xs", marginLeft: "0" }}>
                      Symbols
                    </Checkbox>
                  </Checkbox.Group>
                </Box>
                <ConfirmPassInput
                  name="masterPassword2"
                  label="CONFIRM PASSWORD"
                  type={showPassword ? "text" : "password"}
                  // onChangeText={handleChange("masterPassword2")}
                  // onBlur={handleBlur("masterPassword2")}
                  value={values.masterPassword2}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
              </Box>
              <VStack
                space={2}
                mt={16}
              >
                <Text textAlign="center">
                  Clicking on continue button you are accepting our terms and conditions.
                </Text>
                <Button
                  colorScheme="primary"
                  onPress={handleSubmit}
                >
                  Continue
                </Button>
              </VStack>
            </Box>
          )}
        </Formik>
      </Box>
    </Center>
  );
}

export default CreateAccount;