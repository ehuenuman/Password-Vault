import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as Clipboard from 'expo-clipboard';
import { useFormikContext, useField } from 'formik';
import { Box, FormControl, HStack, Icon, IconButton, Input, Text, useToast } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

import PasswordStrengthBar from './PasswordStrengthBar';
import { getPasswordEntropy, getSecurityStatusMessage } from '../../../utils/passwordEntropyCalculator';

function PasswordInputField({
  label,
  isViewMode = false,
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
    hasPasswordChecker && setValues({ ...values, passwordStrength: getPasswordEntropy(field.value) });
    hasChanged(dirty);
  }, [field.value]);

  useEffect(() => {
    setShowPassword(false);
  }, [isViewMode]);

  const toast = useToast();
  const copyToClipboard = async (text) => {
    toast.closeAll();
    await Clipboard.setStringAsync(text);
    toast.show({
      description: "Password copied to clipboard"
    });
  };

  return (
    <FormControl isDisabled={isViewMode} isInvalid={meta.touched && meta.error}>
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
            mr="1"
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
  isViewMode: PropTypes.bool,
  hasChanged: PropTypes.func,
  hasPasswordChecker: PropTypes.bool
}

export default PasswordInputField
