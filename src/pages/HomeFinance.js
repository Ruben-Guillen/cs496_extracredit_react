import React, { useState } from 'react';
import { formatCurrency, calculateMonthlyPayment } from '../utils/calculatorUtils';

function HomeFinance() {
  // State for Mortgage Payment Calculator
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgageRate, setMortgageRate] = useState('');
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [mortgageResult, setMortgageResult] = useState('');

  // State for Mortgage Affordability Calculator
  const [income, setIncome] = useState('');
  const [monthlyDebt, setMonthlyDebt] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [mortgageRateAfford, setMortgageRateAfford] = useState('');
  const [loanTermAfford, setLoanTermAfford] = useState('');
  const [affordabilityResult, setAffordabilityResult] = useState('');

  // State for Refinance Savings Calculator
  const [refiBalance, setRefiBalance] = useState('');
  const [refiOldRate, setRefiOldRate] = useState('');
  const [refiNewRate, setRefiNewRate] = useState('');
  const [refiYears, setRefiYears] = useState('');
  const [refiResult, setRefiResult] = useState('');

  // Handle Mortgage Payment calculation
  const handleMortgageCalculation = (e) => {
    e.preventDefault();
    const P = parseFloat(mortgageAmount);
    const r = parseFloat(mortgageRate) / 100 / 12;
    const n = parseFloat(mortgageTerm) * 12;
    
    if (isNaN(P) || isNaN(r) || isNaN(n)) return;
    
    const monthlyPayment = calculateMonthlyPayment(P, parseFloat(mortgageRate), parseFloat(mortgageTerm));
    setMortgageResult(`Monthly Payment: ${formatCurrency(monthlyPayment)}`);
  };

  // Handle Mortgage Affordability calculation
  const handleAffordabilityCalculation = (e) => {
    e.preventDefault();
    const annualIncome = parseFloat(income);
    const debt = parseFloat(monthlyDebt);
    const down = parseFloat(downPayment);
    const rate = parseFloat(mortgageRateAfford) / 100 / 12;
    const term = parseFloat(loanTermAfford);
    
    if (isNaN(annualIncome) || isNaN(debt) || isNaN(down) || isNaN(rate) || isNaN(term)) return;
    
    const maxDTI = 0.36;
    const monthlyIncome = annualIncome / 12;
    const availableForMortgage = monthlyIncome * maxDTI - debt;
    
    const months = term * 12;
    const affordableLoan = availableForMortgage * (1 - Math.pow(1 + rate, -months)) / rate;
    const totalHomeValue = affordableLoan + down;
    
    setAffordabilityResult(
      <>
        <strong>Estimated Home You Can Afford:</strong> {formatCurrency(totalHomeValue)}<br />
        <strong>Estimated Loan:</strong> {formatCurrency(affordableLoan)}<br />
        <strong>Max Monthly Payment (36% DTI):</strong> {formatCurrency(availableForMortgage)}
      </>
    );
  };

  // Handle Refinance Savings calculation
  const handleRefinanceSavings = (e) => {
    e.preventDefault();
    const balance = parseFloat(refiBalance);
    const oldRate = parseFloat(refiOldRate) / 100 / 12;
    const newRate = parseFloat(refiNewRate) / 100 / 12;
    const years = parseFloat(refiYears);
    const months = years * 12;
    
    if (isNaN(balance) || isNaN(oldRate) || isNaN(newRate) || isNaN(months)) return;
    
    const oldMonthly = (balance * oldRate) / (1 - Math.pow(1 + oldRate, -months));
    const newMonthly = (balance * newRate) / (1 - Math.pow(1 + newRate, -months));
    const monthlySavings = oldMonthly - newMonthly;
    const totalSavings = monthlySavings * months;
    
    setRefiResult(
      <>
        <strong>Old Monthly Payment:</strong> {formatCurrency(oldMonthly)}<br />
        <strong>New Monthly Payment:</strong> {formatCurrency(newMonthly)}<br />
        <strong>Monthly Savings:</strong> {formatCurrency(monthlySavings)}<br />
        <strong>Total Savings Over {years} Years:</strong> {formatCurrency(totalSavings)}
      </>
    );
  };

  return (
    <div className="container mt-4">
      {/* Mortgage Monthly Payment Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Mortgage Monthly Payment Calculator</h3>
          <form onSubmit={handleMortgageCalculation}>
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Amount ($)" 
              className="form-control mb-2" 
              required
              value={mortgageAmount}
              onChange={(e) => setMortgageAmount(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Annual Interest Rate (%)" 
              className="form-control mb-2" 
              required
              value={mortgageRate}
              onChange={(e) => setMortgageRate(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Term (years)" 
              className="form-control mb-2" 
              required
              value={mortgageTerm}
              onChange={(e) => setMortgageTerm(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{mortgageResult}</p>
        </div>
      </div>

      {/* Mortgage Affordability Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Mortgage Affordability Calculator</h3>
          <form onSubmit={handleAffordabilityCalculation}>
            <input 
              type="number" 
              step="any" 
              placeholder="Annual Income ($)" 
              className="form-control mb-2" 
              required
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Monthly Debt Payments ($)" 
              className="form-control mb-2" 
              required
              value={monthlyDebt}
              onChange={(e) => setMonthlyDebt(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Down Payment ($)" 
              className="form-control mb-2" 
              required
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Expected Interest Rate (%)" 
              className="form-control mb-2" 
              required
              value={mortgageRateAfford}
              onChange={(e) => setMortgageRateAfford(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Loan Term (Years)" 
              className="form-control mb-2" 
              required
              value={loanTermAfford}
              onChange={(e) => setLoanTermAfford(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Estimate</button>
          </form>
          <p className="mt-2">{affordabilityResult}</p>
        </div>
      </div>

      {/* Refinance Savings Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Refinance Savings Calculator</h3>
          <form onSubmit={handleRefinanceSavings}>
            <input 
              type="number" 
              step="any" 
              placeholder="Current Loan Balance ($)" 
              className="form-control mb-2" 
              required
              value={refiBalance}
              onChange={(e) => setRefiBalance(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Current Interest Rate (%)" 
              className="form-control mb-2" 
              required
              value={refiOldRate}
              onChange={(e) => setRefiOldRate(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="New Interest Rate (%)" 
              className="form-control mb-2" 
              required
              value={refiNewRate}
              onChange={(e) => setRefiNewRate(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Years Remaining" 
              className="form-control mb-2" 
              required
              value={refiYears}
              onChange={(e) => setRefiYears(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{refiResult}</p>
        </div>
      </div>
    </div>
  );
}

export default HomeFinance;