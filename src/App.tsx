import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { initGA, logPageView } from './analytics';
import { generateCardNumber } from './luhn';
import { generateCVV, generateExpiryDate, validateCardDetails } from './generateDetails';

function App() {
  const [cardDetails, setCardDetails] = useState([]);
  const [bins, setBins] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [useRandom, setUseRandom] = useState(true);

  useEffect(() => {
    initGA();
    logPageView();
  }, []);

  const generateCardDetails = () => {
    const binsArray = bins.split(',').map(bin => bin.trim());
    const cards = binsArray.flatMap(bin => (
      Array.from({ length: quantity }, () => {
        const number = generateCardNumber(bin, 16);
        const expiry = useRandom ? generateExpiryDate() : `${expMonth}/${expYear}`;
        const cvvCode = useRandom ? generateCVV() : cvv;
        if (validateCardDetails(number, expiry, cvvCode)) {
          return { number, expiry, cvv: cvvCode };
        } else {
          return null;
        }
      }).filter(Boolean)
    ));
    setCardDetails(cards);
  };

  const copyToClipboard = (card) => {
    const text = `${card.number}|${card.expiry}|${card.cvv}`;
    navigator.clipboard.writeText(text);
  };

  const copyAllToClipboard = () => {
    const text = cardDetails.map(card => `${card.number}|${card.expiry}|${card.cvv}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <Helmet>
        <title>Credit Card Generator</title>
        <meta name="description" content="Generate test credit card numbers for development and testing purposes" />
        <meta name="keywords" content="Credit Card Generator, Test Credit Cards, Luhn Algorithm, BIN" />
        <meta name="author" content="Your Name" />
      </Helmet>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
        <nav className="mb-5">
          <a href="#home" className="mr-4">Home</a>
          <a href="#about" className="mr-4">About</a>
          <a href="#how-to-use" className="mr-4">How to Use</a>
          <a href="#faq">FAQ</a>
        </nav>
        <section id="home" className="flex flex-col items-center mb-10">
          <h1 className="text-3xl font-bold mb-5">Credit Card Generator</h1>
          <div className="mb-5 flex flex-col items-center">
            <input
              type="text"
              value={bins}
              onChange={(e) => setBins(e.target.value)}
              placeholder="BINs (comma-separated)"
              className="border p-2 rounded mb-2"
            />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              className="border p-2 rounded mb-2"
            />
            <input
              type="text"
              value={expMonth}
              onChange={(e) => setExpMonth(e.target.value)}
              placeholder="Expiration Month (MM)"
              className="border p-2 rounded mb-2"
              disabled={useRandom}
            />
            <input
              type="text"
              value={expYear}
              onChange={(e) => setExpYear(e.target.value)}
              placeholder="Expiration Year (YYYY)"
              className="border p-2 rounded mb-2"
              disabled={useRandom}
            />
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              placeholder="CVV"
              className="border p-2 rounded mb-2"
              disabled={useRandom}
            />
            <label className="flex items-center mb-5">
              <input
                type="checkbox"
                checked={useRandom}
                onChange={(e) => setUseRandom(e.target.checked)}
                className="mr-2"
              />
              Use Random Expiry and CVV
            </label>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={generateCardDetails}
            >
              Generate
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded mt-2"
              onClick={copyAllToClipboard}
            >
              Copy All
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
        </section>
        <section id="about" className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-bold mb-5">About Credit Card Generator</h2>
          <p className="max-w-prose text-center">
            This Credit Card Generator application allows you to generate random test credit card numbers using the Luhn algorithm. The app also generates expiry dates and CVVs, and provides the output in PIPE format. It's a handy tool for developers and testers who need to validate their payment systems.
          </p>
        </section>
        <section id="how-to-use" className="flex flex-col items-center mb-10">
          <h2 className="text-2xl font-bold mb-5">How to Use</h2>
          <p className="max-w-prose text-center mb-2">
            1. Enter the BINs (comma-separated) in the input field.
          </p>
          <p className="max-w-prose text-center mb-2">
            2. Specify the quantity of credit card numbers you want to generate.
          </p>
          <p className="max-w-prose text-center mb-2">
            3. Enter the expiration month (MM) and year (YYYY), or use random values.
          </p>
          <p className="max-w-prose text-center mb-2">
            4. Click the "Generate" button to produce the card numbers.
          </p>
          <p className="max-w-prose text-center">
            5. Copy the generated card details by clicking the "Copy" button next to each card or "Copy All" to copy all at once.
          </p>
        </section>
        <section id="faq" className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-5">Frequently Asked Questions</h2>
          <div className="max-w-prose">
            <h3 className="text-xl font-semibold mb-2">What is a BIN?</h3>
            <p className="mb-4">
              BIN stands for Bank Identification Number. It is the first 4-6 digits of a credit card number and identifies the institution that issued the card.
            </p>
            <h3 className="text-xl font-semibold mb-2">What is the Luhn algorithm?</h3>
            <p className="mb-4">
              The Luhn algorithm is a simple checksum formula used to validate a variety of identification numbers, such as credit card numbers.
            </p>
            <h3 className="text-xl font-semibold mb-2">Is it legal to generate fake credit card numbers?</h3>
            <p className="mb-4">
              Yes, generating fake credit card numbers for testing purposes is legal. These numbers cannot be used for actual transactions and are solely for testing payment systems.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
