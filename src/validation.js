// src/validation.js
export const validateCardNumber = (cardNumber) => {
  const regex = /^\d{16}$/;
  return regex.test(cardNumber);
};

export const validateExpiryDate = (expiry) => {
  const regex = /^(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(expiry)) return false;
  
  const [month, year] = expiry.split('/').map(Number);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
};

export const validateCVV = (cvv) => {
  const regex = /^\d{3}$/;
  return regex.test(cvv);
};
