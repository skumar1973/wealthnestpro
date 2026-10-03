"use client";

import { useMemo, useState } from "react";
import { Calculator, IndianRupee, RotateCcw } from "lucide-react";

type CalculationResult = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
  interestPercentage: number;
};

function calculateEmi(
  principal: number,
  annualRate: number,
  tenureMonths: number
): CalculationResult {
  const monthlyRate = annualRate / 12 / 100;

  let emi: number;

  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    const factor = Math.pow(1 + monthlyRate, tenureMonths);

    emi = (principal * monthlyRate * factor) / (factor - 1);
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  const interestPercentage =
    totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return {
    emi,
    totalPayment,
    totalInterest,
    principal,
    interestPercentage,
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value);
}

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("1000000");
  const [interestRate, setInterestRate] = useState("10");
  const [tenureYears, setTenureYears] = useState("5");

  const result = useMemo(() => {
    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const years = Number(tenureYears);

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(years) ||
      principal <= 0 ||
      annualRate < 0 ||
      years <= 0
    ) {
      return null;
    }

    const tenureMonths = Math.round(years * 12);

    if (tenureMonths <= 0) {
      return null;
    }

    return calculateEmi(principal, annualRate, tenureMonths);
  }, [loanAmount, interestRate, tenureYears]);

  function resetCalculator() {
    setLoanAmount("1000000");
    setInterestRate("10");
    setTenureYears("5");
  }

  return (
    <section className="w-full">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Input panel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50">
                <Calculator className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                Loan Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Enter your loan details to calculate the estimated monthly EMI.
              </p>
            </div>

            <button
              type="button"
              onClick={resetCalculator}
              title="Reset calculator"
              aria-label="Reset calculator"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 space-y-6">
            {/* Loan amount */}
            <div>
              <label
                htmlFor="loanAmount"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Loan Amount
              </label>

              <div className="relative mt-2">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="loanAmount"
                  type="number"
                  min="1"
                  max="100000000"
                  step="1000"
                  value={loanAmount}
                  onChange={(event) => setLoanAmount(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="Enter loan amount"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Example: ₹10,00,000
              </p>
            </div>

            {/* Interest rate */}
            <div>
              <label
                htmlFor="interestRate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Annual Interest Rate
              </label>

              <div className="relative mt-2">
                <input
                  id="interestRate"
                  type="number"
                  min="0"
                  max="50"
                  step="0.01"
                  value={interestRate}
                  onChange={(event) => setInterestRate(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="Enter interest rate"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Enter the annual reducing-balance interest rate.
              </p>
            </div>

            {/* Tenure */}
            <div>
              <label
                htmlFor="tenureYears"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Loan Tenure
              </label>

              <div className="relative mt-2">
                <input
                  id="tenureYears"
                  type="number"
                  min="1"
                  max="40"
                  step="1"
                  value={tenureYears}
                  onChange={(event) => setTenureYears(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-16 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  placeholder="Enter tenure"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  Years
                </span>
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Tenure is converted into monthly installments.
              </p>
            </div>
          </div>
        </div>

        {/* Result panel */}
        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 dark:border-teal-900/50 dark:bg-teal-950/20 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
            EMI Result
          </p>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Your estimated monthly payment
          </h2>

          {result ? (
            <>
              <div className="mt-8 rounded-2xl border border-teal-100 bg-white p-6 dark:border-teal-900/50 dark:bg-slate-900 sm:p-8">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Monthly EMI
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-teal-600 dark:text-teal-400 sm:text-5xl">
                  {formatCurrency(result.emi)}
                </p>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Approximately {formatNumber(result.emi)} per month
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Principal Amount
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(result.principal)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Interest
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(result.totalInterest)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Repayment
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                    {formatCurrency(result.totalPayment)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Interest Share
                  </p>

                  <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white">
                    {result.interestPercentage.toFixed(1)}%
                  </p>
                </div>
              </div>

              {/* Simple breakdown */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    Principal
                  </span>

                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(result.principal)}
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-full rounded-full bg-teal-600"
                    style={{
                      width: `${Math.max(
                        0,
                        Math.min(100, 100 - result.interestPercentage)
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-600 dark:text-slate-400">
                    Interest
                  </span>

                  <span className="font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(result.totalInterest)}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              Please enter valid loan amount, interest rate and tenure.
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-slate-500 dark:text-slate-500">
            This calculator provides an estimate based on the reducing-balance
            EMI formula. Actual EMI, fees, taxes and repayment terms may vary
            depending on the lender and loan product.
          </p>
        </div>
      </div>
    </section>
  );
}