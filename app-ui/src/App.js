import React, { useState } from 'react';
import './App.css';

function App() {
  const [propertyValue, setPropertyValue] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [resultMessage, setResultMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!propertyValue || !loanAmount || propertyValue <= 0 || loanAmount <= 0) {
      setResultMessage('Please enter valid values greater than zero.');
      return;
    }

    const data = {
      PropertyValue: parseFloat(propertyValue),
      LoanAmount: parseFloat(loanAmount),
    };

    try {
      const response = await fetch('https://localhost:7052/api/lvr/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const text = await response.text();
      if (response.ok) {
        const result = JSON.parse(text);
        setResultMessage({
          lvr: `${result.lvr.toFixed(2)}%`,
          propertyValue: `$${Number(propertyValue).toLocaleString()}`,
          loanAmount: `$${Number(loanAmount).toLocaleString()}`,
        });
      } else {
        setResultMessage('An error occurred: ' + text);
      }
    } catch (error) {
      setResultMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>LVR Calculator</h1>
        <div className="container">
          <div className="form-container">
            <h2>Fill in the details</h2>
            <form onSubmit={handleSubmit}>
              <label>What is the value of the property?</label>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="Enter Property Value"
                required
              />
              <label>How much are you planning to borrow?</label>
              <input
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Enter Loan Amount"
                required
              />
              <button type="submit">Calculate</button>
            </form>
          </div>
          <div className="result-container">
            <h2>Result</h2>
            {resultMessage ? (
              <div className="result">
                <p><strong>Property Value:</strong> {resultMessage.propertyValue}</p>
                <p><strong>Loan Amount:</strong> {resultMessage.loanAmount}</p>
                <p><strong>LVR:</strong> <span className="lvr-result">{resultMessage.lvr}</span></p>
              </div>
            ) : (
              <p>Please enter values to calculate LVR.</p>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
