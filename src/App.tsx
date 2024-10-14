import React, { useState } from 'react';
import { generate } from 'namso-cc-gen';

function App() {
  const [cardNumbers, setCardNumbers] = useState([]);

  const generateCardNumbers = () => {
    const cards = generate('4716', 16, 10); // Visa starts with 4716, 16 digits, 10 cards
    setCardNumbers(cards);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-5">Credit Card Generator</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-5"
        onClick={generateCardNumbers}
      >
        Generate
      </button>
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
