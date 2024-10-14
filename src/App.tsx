import React, { useState } from 'react';
import NamsoCcGen from 'namso-cc-gen';
import './App.css';

function App() {
  const [cardNumber, setCardNumber] = useState('');

  const generateCardNumber = () => {
    const generatedNumber = NamsoCcGen.generate();
    setCardNumber(generatedNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Credit Card Number Generator</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={generateCardNumber}>
        Generate Card Number
      </button>
      <p className="text-lg mt-4">{cardNumber}</p>
    </div>
  );
}

export default App;
