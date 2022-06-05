/**
 * Get the numeric value of the password entropy using the amount of characters and Log base 2.
 * More info: https://en.wikipedia.org/wiki/Password_strength
 * @param {string} password User's password
 * @returns Password Entropy
 */
export const getPasswordEntropy = password => {
  var poolSizePassword = 0;
  const lengthPassword = password ? password.length : 0;
  const poolSizes = {
    numbers: 10,
    upperCaseLetters: 26,
    lowerCaseLetters: 26,
    specialSymbols: 34
  }
  const regularExp = {
    // contains_alphaNumeric : /^(?!-)(?!.*-)[A-Za-z0-9-]+(?<!-)$/,
    // onlyLetters : /^[A-Za-z]+$/,
    // onlyNumbers : /^[0-9]+$/,
    // onlyMixOfAlphaNumeric : /^([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*$/
    numbers: /\d+/,
    upperCaseLetters: /[A-Z]/,
    lowerCaseLetters: /[a-z]/,
    specialSymbols: /[!"#$%&'()*+,-.\/:;<=>?@\[\]\\^_`{|}~]/
  }

  if (lengthPassword > 0) {
    regularExp.numbers.test(password) && (poolSizePassword += poolSizes.numbers);
    regularExp.upperCaseLetters.test(password) && (poolSizePassword += poolSizes.upperCaseLetters);
    regularExp.lowerCaseLetters.test(password) && (poolSizePassword += poolSizes.lowerCaseLetters);
    regularExp.specialSymbols.test(password) && (poolSizePassword += poolSizes.specialSymbols);

    return (lengthPassword * Math.log2(poolSizePassword));
  } else {
    return 0
  }
}

/**
 * Get a personalised message depending on the password entropy value.
 * @param {number} passwordEntropy 
 * @returns Message indentifying with words the password strength.
 * It could be any of the follows Extremely weak | Very weak | Not so strong | Strong | Super strong.
 */
export const getSecurityStatusMessage = passwordEntropy => {
  var message;
  (passwordEntropy <= 25) ? message = "Extremely weak"
    : (passwordEntropy <= 50) ? message = "Very week"
      : (passwordEntropy <= 70) ? message = "Not so strong"
        : (passwordEntropy <= 90) ? message = "Strong"
          : (passwordEntropy > 90) && (message = "Super strong")
  return message
}
