import React, { useState } from 'react';
import { formatCurrency, calculateMonthlyPayment } from '../utils/calculatorUtils';

function Loans() {
  // State for Loan Payment Calculator
  const [loanAmount, setLoanAmount] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [loanResult, setLoanResult] = useState('');

  // State for Car Loan Calculator
  const [carLoanAmount, setCarLoanAmount] = useState('');
  const [carDownPayment, setCarDownPayment] = useState('');
  const [carAPR, setCarAPR] = useState('');
  const [carLoanTerm, setCarLoanTerm] = useState('');
  const [carLoanResult, setCarLoanResult] = useState('');

  // State for Early Loan Payoff Calculator
  const [earlyLoanAmount, setEarlyLoanAmount] = useState('');
  const [earlyRate, setEarlyRate] = useState('');
  const [earlyTerm, setEarlyTerm] = useState('');
  const [extraPayment, setExtraPayment] = useState('');
  const [earlyResult, setEarlyResult] = useState('');

  // Handle basic loan calculation
  const handleLoanPaymentCalculation = (e) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const r = parseFloat(annualRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    
    if (isNaN(P) || isNaN(r) || isNaN(n)) return;
    
    const payment = calculateMonthlyPayment(P, parseFloat(annualRate), parseFloat(loanTerm));
    setLoanResult(`Monthly Payment: ${formatCurrency(payment)}`);
  };

  // Handle car loan calculation
  const handleCarLoanCalculation = (e) => {
    e.preventDefault();
    const amount = parseFloat(carLoanAmount);
    const down = parseFloat(carDownPayment);
    const apr = parseFloat(carAPR) / 100 / 12;
    const years = parseFloat(carLoanTerm);
    const months = years * 12;
    
    if (isNaN(amount) || isNaN(down) || isNaN(apr) || isNaN(months)) return;
    
    const loan = amount - down;
    const monthly = (loan * apr) / (1 - Math.pow(1 + apr, -months));
    const totalPaid = monthly * months;
    const interestPaid = totalPaid - loan;
    
    setCarLoanResult(
      <>
        <strong>Monthly Payment:</strong> {formatCurrency(monthly)}<br />
        <strong>Total Interest Paid:</strong> {formatCurrency(interestPaid)}
      </>
    );
  };

  // Handle early payoff calculation
  const handleEarlyPayoffCalculation = (e) => {
    e.preventDefault();
    const P = parseFloat(earlyLoanAmount);
    const r = parseFloat(earlyRate) / 100 / 12;
    const n = parseFloat(earlyTerm) * 12;
    const extra = parseFloat(extraPayment);
    
    if (isNaN(P) || isNaN(r) || isNaN(n) || isNaN(extra)) return;
    
    const basePayment = (P * r) / (1 - Math.pow(1 + r, -n));
    const newPayment = basePayment + extra;
    
    let balance = P, months = 0, totalInterest = 0;
    while (balance > 0 && months < 1000) {
      const interest = balance * r;
      const principal = Math.min(newPayment - interest, balance);
      balance -= principal;
      totalInterest += interest;
      months++;
    }
    
    const originalTotalInterest = (basePayment * n) - P;
    const interestSaved = originalTotalInterest - totalInterest;
    
    setEarlyResult(
      <>
        <strong>New Payoff Time:</strong> {months} months ({(months / 12).toFixed(1)} years)<br />
        <strong>Interest Saved:</strong> {formatCurrency(interestSaved)}
      </>
    );
  };

  return (
    <div className="container mt-4">
      {/* Loan Payment Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Loan Payment Calculator</h3>
          <form onSubmit={handleLoanPaymentCalculation}>
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Amount ($)" 
              className="form-control mb-2" 
              required
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
            <input 
              type="number" 
              step="any"
              placeholder="Annual Interest Rate (%)" 
              className="form-control mb-2" 
              required
              value={annualRate}
              onChange={(e) => setAnnualRate(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Term (years)" 
              className="form-control mb-2" 
              required
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{loanResult}</p>
        </div>
      </div>

      {/* Monthly Car Loan Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Monthly Car Loan Calculator</h3>
          <form onSubmit={handleCarLoanCalculation}>
            <input 
              type="number" 
              step="any" 
              placeholder="Car Loan Amount ($)" 
              className="form-control mb-2" 
              required
              value={carLoanAmount}
              onChange={(e) => setCarLoanAmount(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Down Payment ($)" 
              className="form-control mb-2" 
              required
              value={carDownPayment}
              onChange={(e) => setCarDownPayment(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Annual Interest Rate (APR %)" 
              className="form-control mb-2" 
              required
              value={carAPR}
              onChange={(e) => setCarAPR(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Term (Years)" 
              className="form-control mb-2" 
              required
              value={carLoanTerm}
              onChange={(e) => setCarLoanTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{carLoanResult}</p>
        </div>
      </div>

      {/* Early Loan Payoff Estimator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Early Loan Payoff Estimator</h3>
          <form onSubmit={handleEarlyPayoffCalculation}>
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Amount ($)" 
              className="form-control mb-2" 
              required
              value={earlyLoanAmount}
              onChange={(e) => setEarlyLoanAmount(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Annual Interest Rate (%)" 
              className="form-control mb-2" 
              required
              value={earlyRate}
              onChange={(e) => setEarlyRate(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Term (Years)" 
              className="form-control mb-2" 
              required
              value={earlyTerm}
              onChange={(e) => setEarlyTerm(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Extra Monthly Payment ($)" 
              className="form-control mb-2" 
              required
              value={extraPayment}
              onChange={(e) => setExtraPayment(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{earlyResult}</p>
        </div>
      </div>
    </div>
  );
}

export default Loans;