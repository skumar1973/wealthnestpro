"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Calculator,
  IndianRupee,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

type LoanCalculation = {
  emi: number;
  totalInterest: number;
  totalPayment: number;
};

type BankPreset = {
  rate: number;
  ltv: number;
};

type LapResult = {
  maxLoan: number;
  requestedLoan: number;
  ltvUsed: number;
  loanCalculation: LoanCalculation;
  processingFee: number;
  totalCost: number;
  loanToValue: number;
  remainingPropertyValue: number;
};

const BANK_PRESETS: Record<string, BankPreset> = {
  "SBI": {
    rate: 10.5,
    ltv: 60,
  },

  "HDFC Bank": {
    rate: 10.5,
    ltv: 65,
  },

  "ICICI Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "Axis Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "Bank of Baroda": {
    rate: 10.5,
    ltv: 60,
  },

  "Punjab National Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "Canara Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "Union Bank of India": {
    rate: 10.5,
    ltv: 60,
  },

  "Kotak Mahindra Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "IDFC FIRST Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "Federal Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "IndusInd Bank": {
    rate: 10.5,
    ltv: 60,
  },

  "Bajaj Housing Finance": {
    rate: 10.5,
    ltv: 65,
  },

  "Tata Capital": {
    rate: 10.5,
    ltv: 65,
  },

  "Other / Custom": {
    rate: 10.5,
    ltv: 60,
  },
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
      totalInterest: 0,
      totalPayment: 0,
    };
  }

  const monthlyRate =
    annualRate / 12 / 100;

  if (monthlyRate === 0) {
    const emi = principal / months;

    return {
      emi,
      totalInterest: 0,
      totalPayment: principal,
    };
  }

  const factor = Math.pow(
    1 + monthlyRate,
    months
  );

  const emi =
    (principal *
      monthlyRate *
      factor) /
    (factor - 1);

  const totalPayment =
    emi * months;

  const totalInterest =
    totalPayment - principal;

  return {
    emi,
    totalInterest,
    totalPayment,
  };
}

function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }
  ).format(Math.max(0, value));
}

export default function LoanAgainstPropertyCalculator() {
  const [bank, setBank] =
    useState("SBI");

  const [propertyType, setPropertyType] =
    useState("Residential");

  const [applicantType, setApplicantType] =
    useState("Salaried");

  const [propertyValue, setPropertyValue] =
    useState("10000000");

  const [ltv, setLtv] =
    useState(
      String(BANK_PRESETS.SBI.ltv)
    );

  const [loanAmount, setLoanAmount] =
    useState("5000000");

  const [interestRate, setInterestRate] =
    useState(
      String(BANK_PRESETS.SBI.rate)
    );

  const [tenure, setTenure] =
    useState("15");

  const [processingFee, setProcessingFee] =
    useState("5000");

  const result =
    useMemo<LapResult | null>(() => {
      const property =
        Number(propertyValue);

      const requested =
        Number(loanAmount);

      const ltvValue =
        Number(ltv);

      const rate =
        Number(interestRate);

      const years =
        Number(tenure);

      const fee =
        Number(processingFee);

      if (
        !Number.isFinite(property) ||
        !Number.isFinite(requested) ||
        !Number.isFinite(ltvValue) ||
        !Number.isFinite(rate) ||
        !Number.isFinite(years) ||
        !Number.isFinite(fee)
      ) {
        return null;
      }

      if (
        property <= 0 ||
        requested <= 0 ||
        ltvValue <= 0 ||
        ltvValue > 100 ||
        rate < 0 ||
        years <= 0 ||
        fee < 0
      ) {
        return null;
      }

      const maxLoan =
        (property * ltvValue) / 100;

      const months =
        Math.round(years * 12);

      const loanCalculation =
        calculateLoan(
          requested,
          rate,
          months
        );

      const totalCost =
        loanCalculation.totalPayment +
        fee;

      const loanToValue =
        (requested / property) * 100;

      const remainingPropertyValue =
        Math.max(
          0,
          property - requested
        );

      return {
        maxLoan,
        requestedLoan: requested,
        ltvUsed: ltvValue,
        loanCalculation,
        processingFee: fee,
        totalCost,
        loanToValue,
        remainingPropertyValue,
      };
    }, [
      propertyValue,
      loanAmount,
      ltv,
      interestRate,
      tenure,
      processingFee,
    ]);

  function handleBankChange(
    selectedBank: string
  ) {
    setBank(selectedBank);

    const preset =
      BANK_PRESETS[selectedBank];

    if (preset) {
      setInterestRate(
        String(preset.rate)
      );

      setLtv(
        String(preset.ltv)
      );
    }
  }

  function resetCalculator() {
    setBank("SBI");
    setPropertyType("Residential");
    setApplicantType("Salaried");

    setPropertyValue("10000000");

    setLtv(
      String(BANK_PRESETS.SBI.ltv)
    );

    setLoanAmount("5000000");

    setInterestRate(
      String(BANK_PRESETS.SBI.rate)
    );

    setTenure("15");
    setProcessingFee("5000");
  }

  const loanExceedsMaximum =
    result
      ? result.requestedLoan >
        result.maxLoan
      : false;

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

                <Building2 className="h-5 w-5 text-teal-600 dark:text-teal-400" />

              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                Loan Against Property
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                Estimate your indicative LAP eligibility,
                EMI and total repayment based on the
                property value and loan terms.
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

            {/* Bank */}

            <div>

              <label
                htmlFor="lapBank"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Bank / Lender
              </label>

              <select
                id="lapBank"
                value={bank}
                onChange={(event) =>
                  handleBankChange(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                {Object.keys(
                  BANK_PRESETS
                ).map((bankName) => (
                  <option
                    key={bankName}
                    value={bankName}
                  >
                    {bankName}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Select a lender to load an
                illustrative starting rate and LTV.
                You can modify both values.
              </p>

            </div>

            {/* Property Type */}

            <div>

              <label
                htmlFor="lapPropertyType"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Property Type
              </label>

              <select
                id="lapPropertyType"
                value={propertyType}
                onChange={(event) =>
                  setPropertyType(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="Residential">
                  Residential Property
                </option>

                <option value="Commercial">
                  Commercial Property
                </option>

                <option value="Industrial">
                  Industrial Property
                </option>
              </select>

            </div>

            {/* Applicant */}

            <div>

              <label
                htmlFor="lapApplicantType"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Applicant Type
              </label>

              <select
                id="lapApplicantType"
                value={applicantType}
                onChange={(event) =>
                  setApplicantType(
                    event.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="Salaried">
                  Salaried
                </option>

                <option value="Self-employed">
                  Self-employed
                </option>

                <option value="Business Owner">
                  Business Owner
                </option>

                <option value="Professional">
                  Professional
                </option>
              </select>

            </div>

            {/* Property Value */}

            <div>

              <label
                htmlFor="lapPropertyValue"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Property Market Value
              </label>

              <div className="relative mt-2">

                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="lapPropertyValue"
                  type="number"
                  min="1"
                  step="10000"
                  value={propertyValue}
                  onChange={(event) =>
                    setPropertyValue(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

              </div>

            </div>

            {/* LTV */}

            <div>

              <label
                htmlFor="lapLtv"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Indicative LTV
              </label>

              <div className="relative mt-2">

                <input
                  id="lapLtv"
                  type="number"
                  min="1"
                  max="100"
                  step="1"
                  value={ltv}
                  onChange={(event) =>
                    setLtv(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-12 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  %
                </span>

              </div>

              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                LTV means loan-to-value ratio. Actual
                lender limits depend on property, borrower
                profile and lender policy.
              </p>

            </div>

            {/* Loan Amount */}

            <div>

              <label
                htmlFor="lapLoanAmount"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Required Loan Amount
              </label>

              <div className="relative mt-2">

                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="lapLoanAmount"
                  type="number"
                  min="1"
                  step="10000"
                  value={loanAmount}
                  onChange={(event) =>
                    setLoanAmount(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-9 pr-4 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

              </div>

            </div>

            {/* Interest Rate */}

            <div>

              <label
                htmlFor="lapInterestRate"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Annual Interest Rate
              </label>

              <div className="relative mt-2">

                <input
                  id="lapInterestRate"
                  type="number"
                  min="0"
                  max="50"
                  step="0.01"
                  value={interestRate}
                  onChange={(event) =>
                    setInterestRate(
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

            {/* Tenure */}

            <div>

              <label
                htmlFor="lapTenure"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Loan Tenure
              </label>

              <div className="relative mt-2">

                <input
                  id="lapTenure"
                  type="number"
                  min="1"
                  max="30"
                  step="1"
                  value={tenure}
                  onChange={(event) =>
                    setTenure(
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-4 pr-16 text-base text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />

                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  Years
                </span>

              </div>

            </div>

            {/* Processing Fee */}

            <div>

              <label
                htmlFor="lapProcessingFee"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Processing Fee
              </label>

              <div className="relative mt-2">

                <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="lapProcessingFee"
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

          </div>
        </div>

        {/* =====================================================
            RESULTS SECTION
        ====================================================== */}

        <div className="rounded-2xl border border-teal-100 bg-teal-50/60 p-6 dark:border-teal-900/50 dark:bg-teal-950/20 sm:p-8">

          <div className="flex items-center gap-3">

            <TrendingUp className="h-5 w-5 text-teal-600 dark:text-teal-400" />

            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              LAP Analysis
            </p>

          </div>

          <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
            Estimate your property-backed loan
          </h2>

          {result ? (
            <>
              {/* Maximum Loan */}

              <div className="mt-8 rounded-2xl border border-teal-100 bg-white p-6 dark:border-teal-900/50 dark:bg-slate-900 sm:p-8">

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Maximum Indicative Loan
                </p>

                <p className="mt-2 text-4xl font-bold tracking-tight text-teal-600 dark:text-teal-400 sm:text-5xl">
                  {formatCurrency(
                    result.maxLoan
                  )}
                </p>

                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  Based on the property value and
                  indicative LTV entered above.
                </p>

              </div>

              {/* Validation */}

              <div
                className={`mt-6 rounded-xl border p-5 ${
                  loanExceedsMaximum
                    ? "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20"
                    : "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20"
                }`}
              >

                <div className="flex items-start gap-3">

                  <ShieldCheck
                    className={`mt-0.5 h-5 w-5 shrink-0 ${
                      loanExceedsMaximum
                        ? "text-red-600 dark:text-red-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  />

                  <div>

                    <p
                      className={`font-semibold ${
                        loanExceedsMaximum
                          ? "text-red-800 dark:text-red-300"
                          : "text-green-800 dark:text-green-300"
                      }`}
                    >
                      {loanExceedsMaximum
                        ? "Requested loan exceeds the indicative LTV"
                        : "Requested loan is within the indicative LTV"}
                    </p>

                    <p
                      className={`mt-1 text-sm leading-6 ${
                        loanExceedsMaximum
                          ? "text-red-700 dark:text-red-400"
                          : "text-green-700 dark:text-green-400"
                      }`}
                    >
                      Requested loan:{" "}
                      {formatCurrency(
                        result.requestedLoan
                      )}
                      {" · "}
                      Maximum indicative loan:{" "}
                      {formatCurrency(
                        result.maxLoan
                      )}
                    </p>

                  </div>

                </div>

              </div>

              {/* Main Results */}

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Estimated EMI
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.loanCalculation.emi
                    )}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Loan-to-Value
                  </p>

                  <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
                    {result.loanToValue.toFixed(1)}%
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Interest
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.loanCalculation.totalInterest
                    )}
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Total Repayment
                  </p>

                  <p className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                    {formatCurrency(
                      result.loanCalculation.totalPayment
                    )}
                  </p>

                </div>

              </div>

              {/* Loan Summary */}

              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">

                <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Loan Summary
                </p>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Property value
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        Number(propertyValue)
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Required loan
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.requestedLoan
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Interest rate
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {Number(
                        interestRate
                      ).toFixed(2)}
                      %
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Loan tenure
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {tenure} years
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      Processing fee
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.processingFee
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* Cost */}

              <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50 p-6 dark:border-teal-900/50 dark:bg-teal-950/20">

                <p className="text-sm font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                  Estimated Cost
                </p>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Principal
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.requestedLoan
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Interest
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.loanCalculation.totalInterest
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-teal-200 pt-4 dark:border-teal-900/50">

                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      Principal + Interest
                    </span>

                    <span className="font-bold text-teal-600 dark:text-teal-400">
                      {formatCurrency(
                        result.loanCalculation.totalPayment
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4">

                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Processing fee
                    </span>

                    <span className="font-semibold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.processingFee
                      )}
                    </span>

                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-teal-200 pt-4 dark:border-teal-900/50">

                    <span className="font-semibold text-slate-900 dark:text-white">
                      Total estimated outflow
                    </span>

                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {formatCurrency(
                        result.totalCost
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* Property Ratio */}

              <div className="mt-6">

                <div className="flex items-center justify-between gap-4 text-xs">

                  <span className="text-slate-500 dark:text-slate-400">
                    Property value
                  </span>

                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {result.loanToValue.toFixed(1)}%
                    financed
                  </span>

                </div>

                <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">

                  <div
                    className="h-full rounded-full bg-teal-600 transition-all dark:bg-teal-500"
                    style={{
                      width: `${Math.min(
                        100,
                        result.loanToValue
                      )}%`,
                    }}
                  />

                </div>

                <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-500">

                  <span>
                    Loan:{" "}
                    {formatCurrency(
                      result.requestedLoan
                    )}
                  </span>

                  <span>
                    Property:{" "}
                    {formatCurrency(
                      Number(propertyValue)
                    )}
                  </span>

                </div>

              </div>
            </>
          ) : (
            <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
              Please enter valid values. Property value,
              loan amount, LTV and tenure must be greater
              than zero. LTV cannot exceed 100%.
            </div>
          )}

          <p className="mt-6 text-xs leading-5 text-slate-500 dark:text-slate-500">
            This calculator provides an illustrative estimate
            only. Actual loan eligibility, interest rate, LTV,
            property valuation, processing charges, taxes,
            documentation requirements and other terms are
            determined by the lender and may vary based on the
            applicant, property and loan product.
          </p>

        </div>
      </div>
    </section>
  );
}