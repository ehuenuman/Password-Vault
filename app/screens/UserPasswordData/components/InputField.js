import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import { FormControl, HStack, Input } from 'native-base';

function InputField({
  name,
  label,
  isViewMode = false,
  hasChanged,
  ...props
}) {
  const [field, meta] = useField(name);
  const { dirty } = useFormikContext();

  useEffect(() => {
    // console.log(meta.initialValue, field.value, meta.initialValue === field.value);
    // console.log(field.name, " isInitial: ", meta.initialValue === field.value);
    // console.log("dirty:", dirty);
    // (meta.initialValue !== field.value || !dirty) && hasChanged(dirty);
    hasChanged(dirty)
  }, [field.value]);

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
        {...props}
      />
      {/* <FormControl.HelperText></FormControl.HelperText> */}
    </FormControl>
  )
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isViewMode: PropTypes.bool,
  hasChanged: PropTypes.func.isRequired
}

export default InputField
