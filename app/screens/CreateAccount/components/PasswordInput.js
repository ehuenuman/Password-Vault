import React from "react";
import { useFormikContext } from "formik";
import { Icon, IconButton, Input } from "native-base";
import { FontAwesome } from "@expo/vector-icons"

export default function PasswordInput() {
  const { values: { masterPassword, masterPassword2 }, touched } = useFormikContext();

  React.useEffect(() => {
    touched.masterPassword &&
      (masterPassword === masterPassword2 ?
        console.log("Same pass") : console.log("Diferent pass")
      )
  }, [values, touched]);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      onChangeText={handleChange("masterPassword2")}
      onBlur={handleBlur("masterPassword2")}
      value={values.masterPassword2}
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
  )
}
