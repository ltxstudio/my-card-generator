// src/App.jsx
import React, { useState } from 'react';
import { generateCardNumber } from './luhn';
import { generateExpiryDate, generateCVV } from './generateDetails';

function App() {
  const [cardDetails, setCardDetails] = useState([]);
  const [bin, setBin] = useState('');
  const [quantity, setQuantity] = useState(1);

  const generateCardDetails = () => {
    const cards = Array.from({ length: quantity }, () => ({
      number: generateCardNumber(bin, 16),
      expiry: generateExpiryDate(),
      cvv: generateCVV(),
    }));
    setCardDetails(cards);
  };

  const copyToClipboard = (card) => {
    const text = `${card.number}|${card.expiry}|${card.cvv}`;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-5">Credit Card Generator</h1>
      <div className="mb-5 flex flex-col items-center">
        <input
          type="text"
          value={bin}
          onChange={(e) => setBin(e.target.value)}
          placeholder="BIN"
          className="border p-2 rounded mb-2"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border p-2 rounded mb-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={generateCardDetails}
        >
          Generate
        </button>
      </div>
      <div className="w-full max-w-md bg-white p-3 rounded shadow">
        {cardDetails.map((card, index) => (
          <div key={index} className="mb-2 flex justify-between items-center">
            <div>
              <p>{`${card.number}|${card.expiry}|${card.cvv}`}</p>
            </div>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => copyToClipboard(card)}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
