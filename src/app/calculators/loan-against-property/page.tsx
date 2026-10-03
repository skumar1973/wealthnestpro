import Link from "next/link";
import type { Metadata } from "next";

import LoanAgainstPropertyCalculator from "@/components/calculators/LoanAgainstPropertyCalculator";
import Container from "@/components/ui/Container";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Loan Against Property Calculator",

  description:
    "Calculate estimated EMI and repayment amounts for a loan against property based on loan amount, interest rate and tenure.",

  alternates: {
    canonical: "/calculators/loan-against-property",
  },

  openGraph: {
    title: "Loan Against Property Calculator",
    description:
      "Calculate estimated EMI and repayment for a Loan Against Property.",
    url: "/calculators/loan-against-property",
  },
};

export default function LoanAgainstPropertyPage() {
  return (
    <div className="bg-white dark:bg-slate-950">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">

        <Container>

          <div className="mx-auto max-w-4xl py-16 text-center sm:py-20">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <ArrowLeft className="h-4 w-4" />
              All Calculators
            </Link>
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 dark:bg-teal-950/60">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7 text-teal-600 dark:text-teal-400"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10.5 12 3l9 7.5"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 9.5V21h14V9.5"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 21v-7h6v7"
                />
              </svg>

            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Loan Against Property Calculator
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
              Estimate your indicative property-backed loan
              amount, EMI, loan-to-value ratio, total interest
              and repayment based on your property and loan
              details.
            </p>

          </div>

        </Container>

      </section>

      {/* =====================================================
          CALCULATOR
      ====================================================== */}

      <section className="py-12 sm:py-16">

        <Container>

          <LoanAgainstPropertyCalculator />

        </Container>

      </section>

      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <section className="border-t border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-900/40">

        <Container>

          <div className="mx-auto max-w-4xl">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              What is a Loan Against Property?
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-400">

              <p>
                A Loan Against Property (LAP) is a secured loan
                where an eligible property is offered as security
                to the lender. Depending on the lender and
                applicant profile, residential or commercial
                property may be considered.
              </p>

              <p>
                The amount that can potentially be borrowed is
                influenced by factors such as property valuation,
                applicable loan-to-value limits, income,
                repayment capacity, credit profile, property
                characteristics and lender policy.
              </p>

              <p>
                The EMI calculation is based on the loan amount,
                applicable interest rate and repayment tenure.
                A longer tenure can reduce the monthly EMI but
                can increase the total interest paid over the
                life of the loan.
              </p>

            </div>

            {/* How calculation works */}

            <div className="mt-10">

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                How the calculator works
              </h3>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                    Step 1
                  </div>

                  <h4 className="mt-2 font-semibold text-slate-900 dark:text-white">
                    Property Value
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Enter the estimated market value of
                    the property.
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                    Step 2
                  </div>

                  <h4 className="mt-2 font-semibold text-slate-900 dark:text-white">
                    LTV Estimate
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Apply the indicative loan-to-value
                    percentage.
                  </p>

                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">

                  <div className="text-sm font-semibold text-teal-600 dark:text-teal-400">
                    Step 3
                  </div>

                  <h4 className="mt-2 font-semibold text-slate-900 dark:text-white">
                    EMI Calculation
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Calculate estimated EMI and total
                    repayment using the entered rate and
                    tenure.
                  </p>

                </div>

              </div>

            </div>

            {/* Disclaimer */}

            <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">

              <h3 className="font-semibold text-amber-900 dark:text-amber-300">
                Important information
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-400">
                The figures produced by this calculator are
                estimates for educational and comparison
                purposes. They are not a loan approval or
                sanction. Actual eligibility, interest rates,
                LTV, property valuation, processing fees,
                taxes, legal and technical charges, repayment
                terms and documentation requirements vary by
                lender and applicant.
              </p>

            </div>

          </div>

        </Container>

      </section>

    </div>
  );
}