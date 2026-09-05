import { describe, expect, it } from 'vitest';
import { calculateMortgageLoan, formatCurrencyUsd } from './mortgage';

describe('calculateMortgageLoan', () => {
  it('calculates standard 20-year mortgage at 12% interest correctly', () => {
    // Property $100,000, Deposit $20,000 => Loan $80,000, 20 yrs (240 mos), 12%
    const res = calculateMortgageLoan({
      propertyPrice: 100000,
      deposit: 20000,
      years: 20,
      annualInterestRatePercent: 12,
    });

    expect(res.loanAmount).toBe(80000);
    expect(res.monthlyPayment).toBe(880.87);
    expect(res.totalRepayment).toBe(211408.8);
    expect(res.totalInterest).toBe(131408.8);
  });

  it('handles 0% interest rate by dividing loan evenly by months', () => {
    const res = calculateMortgageLoan({
      propertyPrice: 120000,
      deposit: 0,
      years: 10,
      annualInterestRatePercent: 0,
    });

    expect(res.loanAmount).toBe(120000);
    expect(res.monthlyPayment).toBe(1000);
    expect(res.totalRepayment).toBe(120000);
    expect(res.totalInterest).toBe(0);
  });

  it('handles 100% deposit with zero loan amount', () => {
    const res = calculateMortgageLoan({
      propertyPrice: 50000,
      deposit: 50000,
      years: 20,
      annualInterestRatePercent: 10,
    });

    expect(res.loanAmount).toBe(0);
    expect(res.monthlyPayment).toBe(0);
    expect(res.totalRepayment).toBe(0);
    expect(res.totalInterest).toBe(0);
  });

  it('handles negative or invalid numbers safely', () => {
    const res = calculateMortgageLoan({
      propertyPrice: -50000,
      deposit: -10000,
      years: -5,
      annualInterestRatePercent: -2,
    });

    expect(res.loanAmount).toBe(0);
    expect(res.monthlyPayment).toBe(0);
  });

  it('formats currency for USD display properly', () => {
    expect(formatCurrencyUsd(880.87)).toBe('USD 880.87');
    expect(formatCurrencyUsd(1250000)).toBe('USD 1,250,000.00');
  });
});
