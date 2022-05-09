import React, { useState } from "react";
import {
  Checkbox,
  Box,
  Button,
  FormControl,
  Input,
  Slider,
  Text,
} from 'native-base';

function CreateAccount() {

  const [passwordConditions, setPasswordConditions] = useState([]);

  return (
    <Box
      flex={1}
      justifyContent="space-evenly"
      maxWidth={300}
    >
      <Box>
        <FormControl isRequired isInvalid >
          <FormControl.Label>NAME</FormControl.Label>
          <Input p={2} />
        </FormControl>
        <FormControl isRequired isInvalid >
          <FormControl.Label>EMAIL</FormControl.Label>
          <Input p={2} />
        </FormControl>
        <FormControl isRequired isInvalid >
          <FormControl.Label>MASTER PASSWORD</FormControl.Label>
          <Input p={2} />
        </FormControl>
        <Box
          m={2}
        >
          <Box
            marginBottom="3"
          >
            <Slider
              defaultValue={0}
              maxValue={100}
              step={1}
              marginBottom="-2"
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
            size="sm"
            px={2}
            defaultValue={passwordConditions}
            onChange={values => {
              setPasswordConditions(values || []);
            }}
          >
            <Checkbox isDisabled value="Numbers" my="1">
              Numbers
            </Checkbox>
            <Checkbox isDisabled value="Letters" my="1">
              Letters
            </Checkbox>
            <Checkbox isDisabled value="Symbols" my="1">
              Symbols
            </Checkbox>
          </Checkbox.Group>
        </Box>
        <FormControl isRequired isInvalid >
          <FormControl.Label>CONFIRM PASSWORD</FormControl.Label>
          <Input p={2} />
        </FormControl>
      </Box>
      <Box>
        <Text
          textAlign="center"
          paddingBottom={2}
        >
          Clicking on continue button you are accepting our terms and conditions.
        </Text>
        <Button
          colorScheme="primary"
          onPress={() => {
            console.log('hello')
          }}
        >
          CONTINUE
        </Button>
      </Box>
    </Box >
  );
}

export default CreateAccount;