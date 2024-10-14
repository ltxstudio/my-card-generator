// src/generateDetails.js

export const generateExpiryDate = () => {
  const currentYear = new Date().getFullYear();
  const year = currentYear + Math.floor(Math.random() * 5);
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
  return `${month}/${year}`;
};

export const generateCVV = () => {
  return String(Math.floor(Math.random() * 900) + 100); // Generate a 3-digit CVV
};

export const validateCardDetails = (number, expiry, cvv) => {
  // Validate card number using Luhn algorithm
  const luhnCheck = (num) => {
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
      let digit = parseInt(num[i]);
      if ((num.length - i) % 2 === 0) digit *= 2;
      if (digit > 9) digit -= 9;
      sum += digit;
    }
    return sum % 10 === 0;
  };

  // Validate expiry date format and value
  const expiryCheck = /^\d{2}\/\d{4}$/.test(expiry);
  const [month, year] = expiry.split('/').map(Number);
  const validMonth = month >= 1 && month <= 12;
  const validYear = year >= new Date().getFullYear();

  // Validate CVV format and value
  const cvvCheck = /^\d{3}$/.test(cvv);

  return luhnCheck(number) && expiryCheck && validMonth && validYear && cvvCheck;
};
