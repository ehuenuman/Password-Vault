import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Clipboard from 'expo-clipboard';
import { useFormikContext } from 'formik';
import { Box, FormControl, Icon, IconButton, Input, Text } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import PasswordStrengthBar from './PasswordStrengthBar';
import { getPasswordEntrophy } from '../../../utils/passwordEntrophyCalculator';

const getSecurityStatusMessage = passwordEntrophy => {
  var message;
  (passwordEntrophy <= 25) ? message = "Extremely weak"
    : (passwordEntrophy <= 50) ? message = "Very week"
      : (passwordEntrophy <= 70) ? message = "Not so strong"
        : (passwordEntrophy <= 85) ? message = "Strong"
          : (passwordEntrophy > 90) && (message = "Super strong")
  return message
}

function PasswordInputField({
  label,
  placeholder,
  viewMode,
  hasPasswordChecker = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const { values, setValues } = useFormikContext();

  useEffect(() => {
    setValues({ ...values, passwordStrength: getPasswordEntrophy(props.value) });
  }, [props.value])

  useEffect(() => {
    setShowPassword(false);
  }, [viewMode]);

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  return (
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
        {...props}
        rightElement={
          <Box
            flexDirection="row"
          >
            <IconButton
              icon={<Icon as={FontAwesome} name={showPassword ? "eye" : "eye-slash"} />}
              borderRadius="full"
              onPress={() => {
                setShowPassword(!showPassword)
              }}
            />
            {/* {(viewMode) ? */}
            {(viewMode) &&
              <IconButton
                icon={<Icon as={FontAwesome} name="copy" />}
                borderRadius="full"
                onPress={() => copyToClipboard(values.password)}
              />
              // :
              // <Button
              //   variant="ghost"
              // >
              //   Generate
              // </Button>
            }
          </Box>
        }
      />
      {(viewMode) &&
        <FormControl.HelperText
          alignItems="flex-end"
        >
          <Text>
            Security Status: {getSecurityStatusMessage(values.passwordStrength)}
          </Text>
        </FormControl.HelperText>}
      {
        (!viewMode) && (hasPasswordChecker) &&
        <PasswordStrengthBar value={values.passwordStrength} />
      }
    </FormControl>
  )
}

PasswordInputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  viewMode: PropTypes.bool.isRequired,
  hasPasswordChecker: PropTypes.bool
}

export default PasswordInputField
