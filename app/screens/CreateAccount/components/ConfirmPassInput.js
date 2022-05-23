import React from "react";
import { useField, useFormikContext } from "formik";
import { FormControl, Icon, IconButton, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons";


const CheckConfirmPassword = () => {
  const { values: { masterPassword, masterPassword2 }, touched, setFieldError } = useFormikContext();

  React.useEffect(() => {

    (masterPassword === masterPassword2 ?
      console.log("Same pass") : console.log("Different pass")
    )
  }, [masterPassword, masterPassword2, touched]);
  return null;
}

const ConfirmPassInput = ({
  label,
  showPassword,
  setShowPassword,
  ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Input
        {...field}
        {...props}
        rightElement={
          <IconButton
            icon={<Icon as={FontAwesome} name={showPassword ? "eye-slash" : "eye"} />}
            borderRadius="full"
            onPress={() => {
              setShowPassword(!showPassword)
            }}
          />
        }
      />
      <FormControl.ErrorMessage>Passwords are not identical</FormControl.ErrorMessage>
    </FormControl>
  )
}

export default ConfirmPassInput;