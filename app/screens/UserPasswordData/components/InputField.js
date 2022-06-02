import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, HStack, Input } from 'native-base';

function InputField({
  label,
  placeHolder,
  viewMode,
  ...props
}) {
  return (
    <FormControl isDisabled={viewMode} isInvalid={props.touched && props.error && true}>
      <HStack space="1">
        <FormControl.Label
          flex="1"
          _text={{
            textTransform: "uppercase"
          }}
        >
          {label}
        </FormControl.Label>
        <FormControl.ErrorMessage>{props.error}</FormControl.ErrorMessage>
      </HStack>
      <Input
        p={2}
        placeholder={placeHolder}
        borderWidth={(viewMode) ? "0" : "1"}
        {...props}
      />
      {/* <FormControl.HelperText></FormControl.HelperText> */}
    </FormControl>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  viewMode: PropTypes.bool.isRequired
}

export default InputField
