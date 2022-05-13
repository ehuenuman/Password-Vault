import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Checkbox, FormControl, Icon, IconButton, Input, Slider, Text, VStack } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

function Form({
  viewMode,
  modeForm,
  actionChangeHandler
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <VStack maxWidth="300px">
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
          placeholder="How you identify this account?"
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
          placeholder="Where you go to do login?"
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
        <Box mx={2}>
          <Box>
            <Slider
              defaultValue={0}
              maxValue={100}
              step={1}
              mb={-2}
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
      {(!viewMode) &&
        <Button
          mt={10}
          onPress={() => {
            modeForm == "edit" ?
              actionChangeHandler("view") :
              console.log("New register");
          }}
        >
          SAVE
        </Button>}
    </VStack >
  )
}

Form.propTypes = {
  viewMode: PropTypes.bool.isRequired,
  modeForm: PropTypes.oneOf(["view", "edit", "new"]).isRequired,
  actionChangeHandler: PropTypes.func.isRequired
}

export default Form
