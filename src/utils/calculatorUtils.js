// Utility functions for calculator operations

// Format currency to display as dollars
export const formatCurrency = (amount) => {
  return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Calculate monthly loan payment
export const calculateMonthlyPayment = (principal, annualRate, years) => {
  const monthlyRate = annualRate / 100 / 12;
  const months = years * 12;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
};