import React, { useState } from 'react';
import { formatCurrency } from '../utils/calculatorUtils';

function Investing() {
  // State for Roth IRA Calculator
  const [rothInitial, setRothInitial] = useState('');
  const [rothContribution, setRothContribution] = useState('');
  const [rothRate, setRothRate] = useState('');
  const [rothYears, setRothYears] = useState('');
  const [rothResult, setRothResult] = useState('');

  // State for Retirement Goal Calculator
  const [goalAmount, setGoalAmount] = useState('');
  const [retireYears, setRetireYears] = useState('');
  const [expectedReturn, setExpectedReturn] = useState('');
  const [retireResult, setRetireResult] = useState('');

  // State for Investment Return Comparison
  const [investAmount, setInvestAmount] = useState('');
  const [rate1, setRate1] = useState('');
  const [rate2, setRate2] = useState('');
  const [investYears, setInvestYears] = useState('');
  const [investCompareResult, setInvestCompareResult] = useState('');

  // Handle Roth IRA calculation
  const handleRothIRA = (e) => {
    e.preventDefault();
    const initial = parseFloat(rothInitial);
    const contribution = parseFloat(rothContribution);
    const rate = parseFloat(rothRate) / 100;
    const years = parseFloat(rothYears);
    
    if (isNaN(initial) || isNaN(contribution) || isNaN(rate) || isNaN(years)) return;
    
    let futureValue = initial;
    for (let i = 0; i < years; i++) {
      futureValue = futureValue * (1 + rate) + contribution;
    }
    
    setRothResult(`Estimated Roth IRA Value: ${formatCurrency(futureValue)}`);
  };

  // Handle Retirement Goal calculation
  const handleRetirementGoal = (e) => {
    e.preventDefault();
    const goal = parseFloat(goalAmount);
    const years = parseFloat(retireYears);
    const returnRate = parseFloat(expectedReturn) / 100 / 12;
    const months = years * 12;
    
    if (isNaN(goal) || isNaN(years) || isNaN(returnRate)) return;
    
    const monthlySave = goal * returnRate / (Math.pow(1 + returnRate, months) - 1);
    
    setRetireResult(
      `You need to save ${formatCurrency(monthlySave)} per month to reach ${formatCurrency(goal)} in ${years} years.`
    );
  };

  // Handle Investment Comparison
  const handleInvestmentComparison = (e) => {
    e.preventDefault();
    const amount = parseFloat(investAmount);
    const rateA = parseFloat(rate1) / 100;
    const rateB = parseFloat(rate2) / 100;
    const years = parseFloat(investYears);
    
    if (isNaN(amount) || isNaN(rateA) || isNaN(rateB) || isNaN(years)) return;
    
    const valueA = amount * Math.pow(1 + rateA, years);
    const valueB = amount * Math.pow(1 + rateB, years);
    const better = valueA > valueB ? 'Investment A' : 'Investment B';
    const gap = Math.abs(valueA - valueB);
    
    setInvestCompareResult(
      <>
        Value from Investment A: {formatCurrency(valueA)}<br />
        Value from Investment B: {formatCurrency(valueB)}<br />
        <strong>{better}</strong> earns {formatCurrency(gap)} more over {years} years.
      </>
    );
  };

  return (
    <div className="container mt-4">
      {/* Roth IRA Growth Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Roth IRA Growth Calculator</h3>
          <form onSubmit={handleRothIRA}>
            <input 
              type="number" 
              step="any" 
              placeholder="Initial Balance ($)" 
              className="form-control mb-2" 
              required
              value={rothInitial}
              onChange={(e) => setRothInitial(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Annual Contribution ($)" 
              className="form-control mb-2" 
              required
              value={rothContribution}
              onChange={(e) => setRothContribution(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Expected Return (%)" 
              className="form-control mb-2" 
              required
              value={rothRate}
              onChange={(e) => setRothRate(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Years to Invest" 
              className="form-control mb-2" 
              required
              value={rothYears}
              onChange={(e) => setRothYears(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{rothResult}</p>
        </div>
      </div>

      {/* Retirement Goal Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Retirement Goal Calculator</h3>
          <form onSubmit={handleRetirementGoal}>
            <input 
              type="number" 
              step="any" 
              placeholder="Target Retirement Amount ($)" 
              className="form-control mb-2" 
              required
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Years to Save" 
              className="form-control mb-2" 
              required
              value={retireYears}
              onChange={(e) => setRetireYears(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Expected Annual Return (%)" 
              className="form-control mb-2" 
              required
              value={expectedReturn}
              onChange={(e) => setExpectedReturn(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Calculate</button>
          </form>
          <p className="mt-2">{retireResult}</p>
        </div>
      </div>

      {/* Investment Return Comparison Calculator */}
      <div className="card shadow mb-4 rounded-3">
        <div className="card-body">
          <h3 className="card-title">Investment Return Comparison</h3>
          <form onSubmit={handleInvestmentComparison}>
            <input 
              type="number" 
              step="any" 
              placeholder="Investment Amount ($)" 
              className="form-control mb-2" 
              required
              value={investAmount}
              onChange={(e) => setInvestAmount(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Return Rate A (%)" 
              className="form-control mb-2" 
              required
              value={rate1}
              onChange={(e) => setRate1(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Return Rate B (%)" 
              className="form-control mb-2" 
              required
              value={rate2}
              onChange={(e) => setRate2(e.target.value)}
            />
            <input 
              type="number" 
              step="any" 
              placeholder="Years to Invest" 
              className="form-control mb-2" 
              required
              value={investYears}
              onChange={(e) => setInvestYears(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Compare</button>
          </form>
          <p className="mt-2">{investCompareResult}</p>
        </div>
      </div>
    </div>
  );
}

export default Investing;