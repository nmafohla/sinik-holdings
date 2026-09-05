export interface MortgageInput {
  propertyPrice: number;
  deposit: number;
  years: number;
  annualInterestRatePercent: number;
}

export interface MortgageResult {
  loanAmount: number;
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
}

/**
 * Calculates monthly mortgage payment and loan breakdown.
 * Formula: M = P * [r(1 + r)^n] / [(1 + r)^n - 1]
 */
export function calculateMortgageLoan(input: MortgageInput): MortgageResult {
  const price = Number.isFinite(input.propertyPrice) ? Math.max(input.propertyPrice, 0) : 0;
  const deposit = Number.isFinite(input.deposit) ? Math.max(input.deposit, 0) : 0;
  const years = Number.isFinite(input.years) && input.years > 0 ? input.years : 20;
  const annualRate = Number.isFinite(input.annualInterestRatePercent)
    ? Math.max(input.annualInterestRatePercent, 0)
    : 0;

  const loanAmount = Math.max(price - deposit, 0);
  const totalMonths = Math.round(years * 12);

  if (loanAmount === 0 || totalMonths === 0) {
    return {
      loanAmount: 0,
      monthlyPayment: 0,
      totalRepayment: 0,
      totalInterest: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment = 0;
  if (monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyPayment = (loanAmount * (monthlyRate * factor)) / (factor - 1);
  } else {
    monthlyPayment = loanAmount / totalMonths;
  }

  const roundedMonthly = Math.round(monthlyPayment * 100) / 100;
  const totalRepayment = Math.round(roundedMonthly * totalMonths * 100) / 100;
  const totalInterest = Math.max(Math.round((totalRepayment - loanAmount) * 100) / 100, 0);

  return {
    loanAmount: Math.round(loanAmount * 100) / 100,
    monthlyPayment: roundedMonthly,
    totalRepayment,
    totalInterest,
  };
}

/**
 * Formats currency amount for Zimbabwe USD display.
 */
export function formatCurrencyUsd(amount: number): string {
  return `USD ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
