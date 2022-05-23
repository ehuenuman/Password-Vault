import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Input } from 'native-base';

function InputField({
  label,
  placeHolder,
  viewMode,
  ...props
}) {
  return (
    <FormControl isDisabled={viewMode}>
      <FormControl.Label
        _text={{
          textTransform: "uppercase"
        }}
      >
        {label}
      </FormControl.Label>
      <Input
        p={2}
        placeholder={placeHolder}
        borderWidth={(viewMode) ? "0" : "1"}
        {...props}
      // value={values.accountName}
      // onChangeText={handleChange("accountName")}
      // onBlur={handleBlur("accountName")}
      />
    </FormControl>
  )
}

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  viewMode: PropTypes.bool.isRequired
}

export default InputField
