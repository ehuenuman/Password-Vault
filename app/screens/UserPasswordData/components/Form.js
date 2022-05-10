import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Checkbox, FormControl, Icon, IconButton, Input, Slider, Text, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

function Form({
  viewMode
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState([]);

  return (
    <VStack maxWidth="300px" minWidth="200px">
      <FormControl isDisabled={viewMode}>
        <FormControl.Label
          _text={{
            textTransform: "uppercase"
          }}
        >
          Account Name
        </FormControl.Label>
        <Input
          p={2}
          value="Facebook"
          borderWidth={(viewMode) ? "0" : "1"}
        />
      </FormControl>
      <FormControl isDisabled={viewMode}>
        <FormControl.Label
          _text={{
            textTransform: "uppercase"
          }}
        >
          Website
        </FormControl.Label>
        <Input
          p={2}
          value="w3.facebook.com"
          borderWidth={(viewMode) ? "0" : "1"}
        />
      </FormControl>
      <FormControl isDisabled={viewMode}>
        <FormControl.Label
          _text={{
            textTransform: "uppercase"
          }}
        >
          User
        </FormControl.Label>
        <Input
          p={2}
          borderWidth={(viewMode) ? "0" : "1"}
          value="Pepito"
          rightElement={(viewMode) &&
            <IconButton
              icon={<Icon as={FontAwesome} name="copy" />}
              borderRadius="full"
            />
          }
        />
      </FormControl>
      <FormControl isDisabled={viewMode}>
        <FormControl.Label
          _text={{
            textTransform: "uppercase"
          }}
        >
          Password
        </FormControl.Label>
        <Input
          p={2}
          borderWidth={(viewMode) ? "0" : "1"}
          value="12345678910"
          type={showPassword ? "text" : "password"}
          rightElement={
            <Box
              flexDirection="row"
            >
              <IconButton
                icon={<Icon as={FontAwesome} name={showPassword ? "eye-slash" : "eye"} />}
                borderRadius="full"
                onPress={() => {
                  setShowPassword(!showPassword)
                }}
              />
              {(viewMode) ?
                <IconButton
                  icon={<Icon as={FontAwesome} name="copy" />}
                  borderRadius="full"
                />
                :
                <Button
                  variant="ghost"
                >
                  Generate
                </Button>
              }
            </Box>
          }
        />
        {(viewMode) && <FormControl.HelperText
          alignItems="flex-end"
        >
          Security Status
        </FormControl.HelperText>}
      </FormControl>

      {(!viewMode) &&
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
            flexDirection="row"
            alignSelf="center"
            px={2}
            defaultValue={passwordConditions}
            onChange={values => {
              setPasswordConditions(values || []);
            }}
          >
            <Checkbox
              isDisabled
              size="sm"
              value="Numbers"
              mr={2}
              _text={{
                textTransform: "uppercase",
                fontSize: "xs",
                marginLeft: "0"
              }}
            >
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
      }
      <FormControl isDisabled={viewMode}>
        <FormControl.Label
          _text={{
            textTransform: "uppercase"
          }}
        >
          Category
        </FormControl.Label>
        <Input
          p={2}
          borderWidth={(viewMode) ? "0" : "1"}
          value="Social" />
      </FormControl>
      {(!viewMode) && <Button mt={10}>
        SAVE
      </Button>}
    </VStack >
  )
}

Form.propTypes = {
  viewMode: PropTypes.bool.isRequired
}

export default Form
