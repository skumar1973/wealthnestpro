import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import LoanBalanceTransferCalculator from "@/components/calculators/LoanBalanceTransferCalculator";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Home Loan Balance Transfer Calculator",

  description:
    "Compare an existing home loan with a potential balance transfer scenario and estimate differences in EMI, interest and applicable costs.",

  alternates: {
    canonical: "/calculators/loan-balance-transfer",
  },

  openGraph: {
    title: "Home Loan Balance Transfer Calculator",
    description:
      "Compare estimated existing and balance transfer loan scenarios.",
    url: "/calculators/loan-balance-transfer",
  },
};


export default function LoanBalanceTransferPage() {
  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Hero */}

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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
            </div>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Loan Balance Transfer Calculator
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400 sm:text-lg">
              Compare your existing loan with a potential new
              lender and estimate your EMI reduction, interest
              savings, transfer costs and net savings.
            </p>

          </div>
        </Container>
      </section>

      {/* Calculator */}

      <section className="py-12 sm:py-16">
        <Container>
          <LoanBalanceTransferCalculator />
        </Container>
      </section>

      {/* Explanation */}

      <section className="border-t border-slate-200 bg-slate-50 py-14 dark:border-slate-800 dark:bg-slate-900/40">
        <Container>

          <div className="mx-auto max-w-4xl">

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How does a loan balance transfer work?
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 dark:text-slate-400">

              <p>
                A loan balance transfer generally involves
                moving the outstanding balance of an existing
                loan to another lender, usually with the objective
                of obtaining different interest-rate or repayment
                terms.
              </p>

              <p>
                The potential benefit depends on several factors,
                including the outstanding balance, remaining
                tenure, interest-rate difference, processing fees
                and other costs associated with transferring the
                loan.
              </p>

              <p>
                A lower interest rate does not automatically mean
                a lower overall cost. Extending the new loan
                tenure can increase the total interest paid even
                when the new EMI is lower.
              </p>

            </div>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-950/20">

              <h3 className="font-semibold text-amber-900 dark:text-amber-300">
                Important
              </h3>

              <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-400">
                The results shown by this calculator are
                estimates for comparison purposes only. Actual
                lender rates, eligibility, processing charges,
                foreclosure charges, taxes and other loan terms
                may differ.
              </p>

            </div>

          </div>

        </Container>
      </section>
    </div>
  );
}