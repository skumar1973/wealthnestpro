"use client";

import { useMemo, useState } from "react";
import {
  ArrowRightLeft,
  Calculator,
  IndianRupee,
  RotateCcw,
  TrendingDown,
} from "lucide-react";

type LoanCalculation = {
  emi: number;
  totalPayment: number;
  totalInterest: number;
};

type BalanceTransferResult = {
  current: LoanCalculation;
  newLoan: LoanCalculation;
  grossInterestSaving: number;
  transferCost: number;
  netSaving: number;
  emiReduction: number;
  breakEvenMonths: number;
};

function calculateLoan(
  principal: number,
  annualRate: number,
  months: number
): LoanCalculation {
  if (
    principal <= 0 ||
    annualRate < 0 ||
    months <= 0
  ) {
    return {
      emi: 0,
      totalPayment: 0,
      totalInterest: 0,
    };
  }

  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    const emi = principal / months;

    return {
      emi,
      totalPayment: principal,
      totalInterest: 0,
    };
  }

  const factor = Math.pow(1 + monthlyRate, months);

  const emi =
    (principal * monthlyRate * factor) /
    (factor - 1);

  const totalPayment = emi * months;

  const totalInterest =
    totalPayment - principal;

  return {
    emi,
    totalPayment,
    totalInterest,
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.max(0, value));
}

function formatMonths(months: number): string {
  if (months <= 0) {
    return "Immediate";
  }

  if (months === 1) {
    return "1 month";
  }

  return `${months} months`;
}

export default function LoanBalanceTransferCalculator() {
  const [loanType, setLoanType] =
    useState("Home Loan");

  // Existing loan
  const [outstanding, setOutstanding] =
    useState("1257000");

  const [currentRate, setCurrentRate] =
    useState("10.85");

  const [currentTenure, setCurrentTenure] =
    useState("47");

  // New loan
  const [newRate, setNewRate] =
    useState("9.25");

  const [newTenure, setNewTenure] =
    useState("47");

  // Transfer costs
  const [processingFee, setProcessingFee] =
    useState("5000");

  const [otherCharges, setOtherCharges] =
    useState("0");

  const result =
    useMemo<BalanceTransferResult | null>(() => {
      const principal = Number(outstanding);

      const existingRate =
        Number(currentRate);

      const existingMonths =
        Number(currentTenure);

      const proposedRate =
        Number(newRate);

      const proposedMonths =
        Number(newTenure);

      const processing =
        Number(processingFee);

      const other =
        Number(otherCharges);

      if (
        !Number.isFinite(principal) ||
        !Number.isFinite(existingRate) ||
        !Number.isFinite(existingMonths) ||
        !Number.isFinite(proposedRate) ||
        !Number.isFinite(proposedMonths) ||
        !Number.isFinite(processing) ||
        !Number.isFinite(other)
      ) {
        return null;
      }

      if (
        principal <= 0 ||
        existingRate < 0 ||
        existingMonths <= 0 ||
        proposedRate < 0 ||
        proposedMonths <= 0 ||
        processing < 0 ||
        other < 0
      ) {
        return null;
      }

      const current =
        calculateLoan(
          principal,
          existingRate,
          Math.round(existingMonths)
        );

      const newLoan =
        calculateLoan(
          principal,
          proposedRate,
          Math.round(proposedMonths)
        );

      const grossInterestSaving =
        current.totalInterest -
        newLoan.totalInterest;

      const transferCost =
        processing + other;

      const netSaving =
        grossInterestSaving -
        transferCost;

      const emiReduction =
        current.emi - newLoan.emi;

      let breakEvenMonths = 0;

      if (
        netSaving > 0 &&
        emiReduction > 0
      ) {
        breakEvenMonths = Math.ceil(
          transferCost / emiReduction
        );
      }

      return {
        current,
        newLoan,
        grossInterestSaving,
        transferCost,
        netSaving,
        emiReduction,
        breakEvenMonths,
      };
    }, [
      outstanding,
      currentRate,
      currentTenure,
      newRate,
      newTenure,
      processingFee,
      otherCharges,
    ]);

  function resetCalculator() {
    setLoanType("Home Loan");

    setOutstanding("1257000");
    setCurrentRate("10.85");
    setCurrentTenure("47");

    setNewRate("9.25");
    setNewTenure("47");

    setProcessingFee("5000");
    setOtherCharges("0");
  }

  return (
    <section className="w-full">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

        {/* =====================================================
            INPUT SECTION
        ====================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">

          <div className="flex items-start justify-between gap-4">

            <div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50">
                <ArrowRightLeft className="h-5 w-5 text-teal-600 dark:text-teal-400" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                Loan Transfer Details
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Compare your existing loan with a
                potential balance-transfer loan.
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

            {/* Loan Type */}

            <div>
              <label
                htmlFor="loanType"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Loan Type
              </label>

              <select
                id="loanType"
                value={loanType}
                onChange={(event) =>
                  setLoanType(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="Home Loan">
                  Home Loan
                </option>

                <option value="Personal Loan">
                  Personal Loan
                </option>

                <option value="Car Loan">
                  Car Loan
                </option>

                <option value="Business Loan">
                  Business Loan
                </option>

                <option value="Education Loan">
                  Education Loan
                </option>
              </select>
            </div>

            {/* Outstanding */}

            <div>
              <label
                htmlFor="balanceTransferOutstanding"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Current Outstanding Loan
              </label>

              <div className="relative mt-2">

                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="balanceTransferOutstanding"
                  type="number"
                  min="1"
                  step="1000"
                  value={outstanding}
                  onChange={(event) =>
                    setOutstanding(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

              </div>
            </div>

            {/* Current Rate */}

            <div>
              <label
                htmlFor="currentLoanRate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Current Interest Rate
              </label>

              <div className="relative mt-2">

                <input
                  id="currentLoanRate"
                  type="number"
                  min="0"
                  max="50"
                  step="0.01"
                  value={currentRate}
                  onChange={(event) =>
                    setCurrentRate(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>
            </div>

            {/* Current Tenure */}

            <div>
              <label
                htmlFor="currentLoanTenure"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Current Remaining Tenure
              </label>

              <div className="relative mt-2">

                <input
                  id="currentLoanTenure"
                  type="number"
                  min="1"
                  max="600"
                  step="1"
                  value={currentTenure}
                  onChange={(event) =>
                    setCurrentTenure(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-20 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  Months
                </span>

              </div>
            </div>

            {/* Divider */}

            <div className="border-t border-slate-200 pt-6 dark:border-slate-800">

              <div className="flex items-center gap-2">

                <ArrowRightLeft className="h-4 w-4 text-teal-600 dark:text-teal-400" />

                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Proposed New Loan
                </p>

              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                Enter the rate and tenure offered by
                the new lender.
              </p>

            </div>

            {/* New Rate */}

            <div>
              <label
                htmlFor="newLoanRate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                New Interest Rate
              </label>

              <div className="relative mt-2">

                <input
                  id="newLoanRate"
                  type="number"
                  min="0"
                  max="50"
                  step="0.01"
                  value={newRate}
                  onChange={(event) =>
                    setNewRate(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>
            </div>

            {/* New Tenure */}

            <div>
              <label
                htmlFor="newLoanTenure"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                New Loan Tenure
              </label>

              <div className="relative mt-2">

                <input
                  id="newLoanTenure"
                  type="number"
                  min="1"
                  max="600"
                  step="1"
                  value={newTenure}
                  onChange={(event) =>
                    setNewTenure(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-20 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  Months
                </span>

              </div>
            </div>

            {/* Processing Fee */}

            <div>
              <label
                htmlFor="processingFee"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Processing / Transfer Fee
              </label>

              <div className="relative mt-2">

                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="processingFee"
                  type="number"
                  min="0"
                  step="500"
                  value={processingFee}
                  onChange={(event) =>
                    setProcessingFee(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

              </div>
            </div>

            {/* Other Charges */}

            <div>
              <label
                htmlFor="otherTransferCharges"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Other Transfer Charges
              </label>

              <div className="relative mt-2">

                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="otherTransferCharges"
                  type="number"
                  min="0"
                  step="500"
                  value={otherCharges}
                  onChange={(event) =>
                    setOtherCharges(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Include foreclosure, documentation,
                legal, valuation or other applicable
                charges if relevant.
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            RESULTS SECTION
        ====================================================== */}

        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 dark:border-teal-900/50 dark:bg-teal-950/20 sm:p-8">

          <div className="flex items-center gap-3">

            <TrendingDown className="h-5 w-5 text-teal-600 dark:text-teal-400" />

            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Balance Transfer Analysis
            </p>

          </div>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Compare your existing loan with a new lender
          </h2>

          {result ? (
            <>
              {/* Main Saving */}

              <div className="mt-8 rounded-2xl border border-teal-100 bg-white p-6 dark:border-teal-900/50 dark:bg-slate-900 sm:p-8">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Estimated Net Saving
                </p>

                <p
                  className={`mt-2 text-4xl font-bold tracking-tight sm:text-5xl ${
                    result.netSaving >= 0
                      ? "text-teal-600 dark:text-teal-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {result.netSaving >= 0
                    ? formatCurrency(
                        result.netSaving
                      )
                    : `-${formatCurrency(
                        Math.abs(
                          result.netSaving
                        )
                      )}`}
                </p>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Gross interest saving minus
                  estimated transfer costs.
                </p>

              </div>

              {/* Summary Cards */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Current EMI
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.current.emi
                    )}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    New EMI
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.newLoan.emi
                    )}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Gross Interest Saving
                  </p>

                  <p
                    className={`mt-2 text-xl font-bold ${
                      result.grossInterestSaving >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {result.grossInterestSaving >= 0
                      ? formatCurrency(
                          result.grossInterestSaving
                        )
                      : `-${formatCurrency(
                          Math.abs(
                            result.grossInterestSaving
                          )
                        )}`}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Transfer Costs
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.transferCost
                    )}
                  </p>

                </div>

              </div>

              {/* EMI Comparison */}

              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-900/50 dark:bg-green-950/20">

                <p className="text-sm font-semibold uppercase tracking-wider text-green-700 dark:text-green-400">
                  EMI Comparison
                </p>

                <div className="mt-5 grid gap-5 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Existing EMI
                    </p>

                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.current.emi
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      New EMI
                    </p>

                    <p className="mt-1 font-bold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.newLoan.emi
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      EMI Reduction
                    </p>

                    <p
                      className={`mt-1 font-bold ${
                        result.emiReduction >= 0
                          ? "text-green-700 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {result.emiReduction >= 0
                        ? formatCurrency(
                            result.emiReduction
                          )
                        : `-${formatCurrency(
                            Math.abs(
                              result.emiReduction
                            )
                          )}`}
                    </p>
                  </div>

                </div>

              </div>

              {/* Interest Comparison */}

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Interest Comparison
                </p>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Existing loan interest
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.current.totalInterest
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      New loan interest
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.newLoan.totalInterest
                      )}
                    </span>

                  </div>

                  <div className="border-t border-slate-200 pt-4 dark:border-slate-800">

                    <div className="flex items-center justify-between gap-4">

                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Gross interest saving
                      </span>

                      <span
                        className={`font-bold ${
                          result.grossInterestSaving >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {result.grossInterestSaving >= 0
                          ? formatCurrency(
                              result.grossInterestSaving
                            )
                          : `-${formatCurrency(
                              Math.abs(
                                result.grossInterestSaving
                              )
                            )}`}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Break Even */}

              <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-6 dark:border-teal-900/50 dark:bg-teal-950/30">

                <p className="text-sm font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Break-even Analysis
                </p>

                {result.emiReduction > 0 &&
                result.transferCost > 0 ? (
                  <>
                    <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                      Estimated break-even period
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-teal-600 dark:text-teal-400">
                      {formatMonths(
                        result.breakEvenMonths
                      )}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      This estimates how long it would
                      take for the monthly EMI reduction
                      to offset the transfer costs.
                    </p>
                  </>
                ) : (
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    A meaningful break-even period cannot
                    be calculated because the new EMI does
                    not reduce or the transfer costs are
                    zero.
                  </p>
                )}

              </div>

              {/* Loan Type */}

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                <div className="flex items-center justify-between gap-4">

                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Loan type
                  </span>

                  <span className="font-semibold text-slate-900 dark:text-white">
                    {loanType}
                  </span>

                </div>

              </div>
            </>
          ) : (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              Please enter valid loan details. Loan
              amounts, rates and tenure must be valid
              positive values. Charges cannot be negative.
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-slate-500 dark:text-slate-500">
            This calculator provides an illustrative estimate
            using a standard reducing-balance loan calculation.
            Actual interest rates, EMI amounts, processing fees,
            foreclosure charges, taxes, documentation costs and
            other terms vary by lender and loan product.
          </p>

        </div>
      </div>
    </section>
  );
}