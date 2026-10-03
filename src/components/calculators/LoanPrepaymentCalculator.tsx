"use client";

import { useMemo, useState } from "react";
import {
  Calculator,
  IndianRupee,
  RotateCcw,
  TrendingDown,
} from "lucide-react";

type LoanResult = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
  months: number;
};

type PrepaymentResult = {
  current: LoanResult;
  afterPrepayment: LoanResult;
  sameEmi: {
    months: number;
    interest: number;
    interestSaved: number;
    monthsSaved: number;
  };
  sameTenure: {
    emi: number;
    interest: number;
    interestSaved: number;
    emiReduction: number;
  };
};

function calculateLoan(
  principal: number,
  annualRate: number,
  months: number
): LoanResult {
  if (principal <= 0 || months <= 0) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
      months: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    const emi = principal / months;

    return {
      emi,
      totalPayment: principal,
      totalInterest: 0,
      months,
    };
  }

  const factor = Math.pow(1 + monthlyRate, months);

  const emi =
    (principal * monthlyRate * factor) /
    (factor - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
    months,
  };
}

function calculateMonthsForSameEmi(
  principal: number,
  annualRate: number,
  emi: number
): number {
  if (principal <= 0 || emi <= 0) {
    return 0;
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return Math.ceil(principal / emi);
  }

  /*
   * If EMI is not enough to cover monthly interest,
   * the loan cannot be repaid with this EMI.
   */
  if (emi <= principal * monthlyRate) {
    return 0;
  }

  const months =
    -Math.log(
      1 - (principal * monthlyRate) / emi
    ) / Math.log(1 + monthlyRate);

  return Math.ceil(months);
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

export default function LoanPrepaymentCalculator() {
  const [outstanding, setOutstanding] = useState("125700");
  const [interestRate, setInterestRate] = useState("10.85");
  const [remainingMonths, setRemainingMonths] = useState("47");
  const [prepayment, setPrepayment] = useState("30000");

  const result = useMemo<PrepaymentResult | null>(() => {
    const principal = Number(outstanding);
    const rate = Number(interestRate);
    const months = Number(remainingMonths);
    const partPayment = Number(prepayment);

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(rate) ||
      !Number.isFinite(months) ||
      !Number.isFinite(partPayment)
    ) {
      return null;
    }

    if (
      principal <= 0 ||
      rate < 0 ||
      months <= 0 ||
      partPayment <= 0 ||
      partPayment >= principal
    ) {
      return null;
    }

    const current = calculateLoan(
      principal,
      rate,
      Math.round(months)
    );

    const newPrincipal = principal - partPayment;

    const afterPrepayment = calculateLoan(
      newPrincipal,
      rate,
      Math.round(months)
    );

    /*
     * Option A:
     * Keep current EMI and reduce tenure.
     */
    const sameEmiMonths = calculateMonthsForSameEmi(
      newPrincipal,
      rate,
      current.emi
    );

    if (sameEmiMonths <= 0) {
      return null;
    }

    const sameEmiLoan = calculateLoan(
      newPrincipal,
      rate,
      sameEmiMonths
    );

    const sameEmiInterestSaved =
      current.totalInterest -
      sameEmiLoan.totalInterest;

    const monthsSaved =
      Math.round(months) - sameEmiMonths;

    /*
     * Option B:
     * Keep original remaining tenure and reduce EMI.
     */
    const sameTenureInterest =
      afterPrepayment.totalInterest;

    const sameTenureInterestSaved =
      current.totalInterest -
      sameTenureInterest;

    const emiReduction =
      current.emi - afterPrepayment.emi;

    return {
      current,
      afterPrepayment,
      sameEmi: {
        months: sameEmiMonths,
        interest: sameEmiLoan.totalInterest,
        interestSaved: sameEmiInterestSaved,
        monthsSaved,
      },
      sameTenure: {
        emi: afterPrepayment.emi,
        interest: sameTenureInterest,
        interestSaved: sameTenureInterestSaved,
        emiReduction,
      },
    };
  }, [
    outstanding,
    interestRate,
    remainingMonths,
    prepayment,
  ]);

  function resetCalculator() {
    setOutstanding("125700");
    setInterestRate("10.85");
    setRemainingMonths("47");
    setPrepayment("30000");
  }

  return (
    <section className="w-full">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

        {/* INPUT PANEL */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50">
                <Calculator className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                Current Loan Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Enter your current outstanding loan and the amount you plan
                to prepay.
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

            {/* Outstanding */}
            <div>
              <label
                htmlFor="outstanding"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Current Outstanding Loan
              </label>

              <div className="relative mt-2">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="outstanding"
                  type="number"
                  min="1"
                  step="1000"
                  value={outstanding}
                  onChange={(event) =>
                    setOutstanding(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            {/* Interest */}
            <div>
              <label
                htmlFor="prepaymentInterestRate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Annual Interest Rate
              </label>

              <div className="relative mt-2">
                <input
                  id="prepaymentInterestRate"
                  type="number"
                  min="0"
                  max="50"
                  step="0.01"
                  value={interestRate}
                  onChange={(event) =>
                    setInterestRate(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>
              </div>
            </div>

            {/* Remaining tenure */}
            <div>
              <label
                htmlFor="remainingMonths"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Remaining Tenure
              </label>

              <div className="relative mt-2">
                <input
                  id="remainingMonths"
                  type="number"
                  min="1"
                  max="600"
                  step="1"
                  value={remainingMonths}
                  onChange={(event) =>
                    setRemainingMonths(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-20 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  Months
                </span>
              </div>
            </div>

            {/* Prepayment */}
            <div>
              <label
                htmlFor="prepayment"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Part-Payment Amount
              </label>

              <div className="relative mt-2">
                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="prepayment"
                  type="number"
                  min="1"
                  step="1000"
                  value={prepayment}
                  onChange={(event) =>
                    setPrepayment(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Part-payment must be less than the current outstanding amount.
              </p>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 dark:border-teal-900/50 dark:bg-teal-950/20 sm:p-8">

          <div className="flex items-center gap-3">
            <TrendingDown className="h-5 w-5 text-teal-600 dark:text-teal-400" />

            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Prepayment Analysis
            </p>
          </div>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            See how your prepayment could affect the loan
          </h2>

          {result ? (
            <>

              {/* Main savings */}
              <div className="mt-8 rounded-2xl border border-teal-100 bg-white p-6 dark:border-teal-900/50 dark:bg-slate-900 sm:p-8">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Potential Interest Saved
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-teal-600 dark:text-teal-400 sm:text-5xl">
                  {formatCurrency(
                    result.sameEmi.interestSaved
                  )}
                </p>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Assuming you make the part-payment and continue with the
                  same EMI.
                </p>
              </div>

              {/* Comparison */}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Current EMI
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(result.current.emi)}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Outstanding After Prepayment
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      Number(outstanding) -
                        Number(prepayment)
                    )}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Current Interest Remaining
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.current.totalInterest
                    )}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Interest After Prepayment
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.sameEmi.interest
                    )}
                  </p>

                </div>

              </div>

              {/* Option A */}
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">

                <p className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                  Option A
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  Keep EMI the same
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      New remaining tenure
                    </p>

                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {result.sameEmi.months} months
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Tenure reduction
                    </p>

                    <p className="mt-1 font-bold text-green-700 dark:text-green-400">
                      {result.sameEmi.monthsSaved} months
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Interest saved
                    </p>

                    <p className="mt-1 font-bold text-green-700 dark:text-green-400">
                      {formatCurrency(
                        result.sameEmi.interestSaved
                      )}
                    </p>
                  </div>

                </div>
              </div>

              {/* Option B */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Option B
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                  Keep tenure the same
                </h3>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      New EMI
                    </p>

                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.sameTenure.emi
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      EMI reduction
                    </p>

                    <p className="mt-1 font-bold text-teal-600 dark:text-teal-400">
                      {formatCurrency(
                        result.sameTenure.emiReduction
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Interest saved
                    </p>

                    <p className="mt-1 font-bold text-teal-600 dark:text-teal-400">
                      {formatCurrency(
                        result.sameTenure.interestSaved
                      )}
                    </p>
                  </div>

                </div>
              </div>

            </>
          ) : (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              Please enter valid values. The part-payment amount must be
              greater than zero and less than the current outstanding loan.
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-slate-500 dark:text-slate-500">
            This calculator provides an estimate using a standard
            reducing-balance loan calculation. Actual savings may differ due
            to lender-specific interest calculations, prepayment charges,
            taxes, fees, EMI dates and other loan terms.
          </p>
        </div>
      </div>
    </section>
  );
}