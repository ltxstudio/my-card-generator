// src/luhn.js
export const generateCardNumber = (bin, length) => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  let cardNumber = bin + Array(length - bin.length - 1).fill(0).map(randomDigit).join('');

  // Calculate check digit using Luhn algorithm
  let sum = 0;
  for (let i = 0; i < cardNumber.length; i++) {
    let digit = parseInt(cardNumber[i]);
    if ((cardNumber.length - i) % 2 === 0) digit *= 2;
    if (digit > 9) digit -= 9;
    sum += digit;
  }
  const checkDigit = (10 - (sum % 10)) % 10;
  return cardNumber + checkDigit;
};
