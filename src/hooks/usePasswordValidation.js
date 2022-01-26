import { useState, useEffect, useCallback } from 'react';

const usePasswordValidation = ({ firstPassword = '', secondPassword = '' }) => {
  const [validLength, setValidLength] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [match, setMatch] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(null);

  const validatePassword = useCallback(() => {
    if (
      validLength &&
      hasNumber &&
      upperCase &&
      lowerCase &&
      specialChar &&
      match
    ) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  }, [validLength, hasNumber, upperCase, lowerCase, specialChar, match]);

  useEffect(() => {
    setValidLength(firstPassword.length >= 8);
    setUpperCase(/([A-Z])/.test(firstPassword)); //regex to test if the password has a uppercase character
    setLowerCase(/([a-z])/.test(firstPassword)); //regex to test if the password has a lowercase character
    setHasNumber(/\d/.test(firstPassword)); //regex to test if it has a number
    setSpecialChar(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(firstPassword)); //regex to test if it has a special character
    setMatch(firstPassword && firstPassword === secondPassword);

    validatePassword();
  }, [firstPassword, secondPassword, validatePassword]);

  return isValidPassword;
};

export default usePasswordValidation;
