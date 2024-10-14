// src/validation.js
export const validateCardNumber = (number) => {
  const regex = /^[0-9]{16}$/;
  return regex.test(number);
};

export const validateExpiryDate = (expiry) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  return regex.test(expiry);
};

export const validateCVV = (cvv) => {
  const regex = /^[0-9]{3}$/;
  return regex.test(cvv);
};
