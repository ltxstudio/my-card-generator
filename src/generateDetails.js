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
