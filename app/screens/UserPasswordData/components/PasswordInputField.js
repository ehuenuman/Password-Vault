import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Clipboard from 'expo-clipboard';
import { useFormikContext, useField } from 'formik';
import { Box, FormControl, HStack, Icon, IconButton, Input, Text, Toast, useToast } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import PasswordStrengthBar from './PasswordStrengthBar';
import { getPasswordEntrophy } from '../../../utils/passwordEntrophyCalculator';

const getSecurityStatusMessage = passwordEntrophy => {
  var message;
  (passwordEntrophy <= 25) ? message = "Extremely weak"
    : (passwordEntrophy <= 50) ? message = "Very week"
      : (passwordEntrophy <= 70) ? message = "Not so strong"
        : (passwordEntrophy <= 90) ? message = "Strong"
          : (passwordEntrophy > 90) && (message = "Super strong")
  return message
}

function PasswordInputField({
  label,
  isViewMode,
  hasChanged,
  hasPasswordChecker = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(props);
  const { values, setValues, dirty } = useFormikContext();

  useEffect(() => {
    // console.log(field.name, " isInitial: ", meta.initialValue === field.value);
    // console.log("dirty:", dirty);
    setValues({ ...values, passwordStrength: getPasswordEntrophy(field.value) });
    hasChanged(dirty);
  }, [field.value]);

  useEffect(() => {
    setShowPassword(false);
  }, [isViewMode]);

  const toast = useToast();
  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
    toast.show({
      description: "Password copied"
    });
  };

  return (
    <FormControl isDisabled={isViewMode} isInvalid={meta.touched && meta.error && true}>
      <HStack space="1">
        <FormControl.Label
          flex="1"
          _text={{
            textTransform: "uppercase"
          }}
        >
          {label}
        </FormControl.Label>
        <FormControl.ErrorMessage>{meta.error}</FormControl.ErrorMessage>
      </HStack>
      <Input
        p={2}
        borderWidth={(isViewMode) ? "0" : "1"}
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
            {/* {(isViewMode) ? */}
            {(isViewMode) &&
              <IconButton
                icon={<Icon as={FontAwesome} name="copy" />}
                borderRadius="full"
                onPress={() => copyToClipboard(field.value)}
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
      {(isViewMode) &&
        <FormControl.HelperText alignItems="flex-end">
          <Text>
            Security Status: {getSecurityStatusMessage(values.passwordStrength)}
          </Text>
        </FormControl.HelperText>}
      {
        (!isViewMode) && (hasPasswordChecker) &&
        <PasswordStrengthBar value={values.passwordStrength} />
      }
    </FormControl>
  )
}

PasswordInputField.propTypes = {
  label: PropTypes.string.isRequired,
  isViewMode: PropTypes.bool.isRequired,
  hasChanged: PropTypes.func.isRequired,
  hasPasswordChecker: PropTypes.bool
}

export default PasswordInputField
