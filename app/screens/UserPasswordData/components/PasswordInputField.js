import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, FormControl, Icon, IconButton, Input } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import PasswordStrengthBar from './PasswordStrengthBar';
import { getPasswordEntrophy } from '../../../utils/passwordEntrophyCalculator';

function PasswordInputField({
  label,
  placeholder,
  viewMode,
  hasPasswordChecker = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

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
      {
        (!viewMode) && (hasPasswordChecker) &&
        <PasswordStrengthBar value={getPasswordEntrophy(props.value)} />
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