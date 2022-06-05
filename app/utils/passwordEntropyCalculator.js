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
