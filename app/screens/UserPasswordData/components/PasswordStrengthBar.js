import React from 'react';
import PropTypes from 'prop-types';
import { Box, Progress, Text } from 'native-base';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { validateCallback } from '@firebase/util';

const setColorBar = value => {
  let colorScheme;
  (value <= 30) ? colorScheme = "danger"
    : (value <= 50) ? colorScheme = "warning"
      : (value <= 80) ? colorScheme = "emerald"
        : (value > 80) && (colorScheme = "success")

  return colorScheme;
}

const PasswordStrengthBar = ({
  value = value,
  ...props }
) => {
  return (
    <Box mx={2}>
      <Progress
        value={value}
        mt={1}
        size="xs"
        {...props}
        colorScheme={setColorBar(value)}
      >
      </Progress>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        px={2}
      >
        <Text fontSize="xs">Low</Text>
        <Text fontSize="xs">High</Text>
      </Box>
    </Box>
  )
}

PasswordStrengthBar.propTypes = {
  value: PropTypes.number.isRequired
}

export default PasswordStrengthBar
