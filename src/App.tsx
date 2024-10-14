// src/App.jsx
import React, { useState } from 'react';
import { generateCardNumber } from './luhn';

function App() {
  const [cardNumbers, setCardNumbers] = useState([]);
  const [bin, setBin] = useState('4716');
  const [length, setLength] = useState(16);
  const [quantity, setQuantity] = useState(1);

  const generateCardNumbers = () => {
    const cards = Array.from({ length: quantity }, () => generateCardNumber(bin, length));
    setCardNumbers(cards);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-5">Credit Card Generator</h1>
      <div className="mb-5">
        <input
          type="text"
          value={bin}
          onChange={(e) => setBin(e.target.value)}
          placeholder="BIN"
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          placeholder="Length"
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          className="border p-2 rounded"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
          onClick={generateCardNumbers}
        >
          Generate
        </button>
      </div>
      <ul className="space-y-2">
        {cardNumbers.map((card, index) => (
          <li key={index} className="bg-white p-3 rounded shadow">
            {card}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
