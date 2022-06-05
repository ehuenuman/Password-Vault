import React from 'react';
import PropTypes from 'prop-types';
import { Box, Progress, Text } from 'native-base';

const setColorBar = value => {
  let colorScheme;
  (value <= 50) ? colorScheme = "danger"
    : (value <= 70) ? colorScheme = "warning"
      : (value <= 90) ? colorScheme = "emerald"
        : (value > 90) && (colorScheme = "success")

  return colorScheme;
}

const PasswordStrengthBar = ({
  value,
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
