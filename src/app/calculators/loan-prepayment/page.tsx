import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import LoanPrepaymentCalculator from "@/components/calculators/LoanPrepaymentCalculator";

export const metadata: Metadata = {
  title: "Loan Prepayment Calculator",

  description:
    "Estimate the potential impact of making a partial prepayment toward an existing home loan and compare estimated interest and repayment changes.",

  alternates: {
    canonical: "/calculators/loan-prepayment",
  },

  openGraph: {
    title: "Loan Prepayment Calculator",
    description:
      "Estimate the impact of partial loan prepayment on repayment and interest.",
    url: "/calculators/loan-prepayment",
  },
};

export default function LoanPrepaymentPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <Container>
          <div className="py-16 sm:py-20">
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <ArrowLeft className="h-4 w-4" />
              All Calculators
            </Link>

            <div className="mt-8 max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Financial Calculator
              </p>

              <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                Loan Prepayment Calculator
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                Estimate how a part-payment could affect your remaining loan
                tenure, EMI and total interest.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <LoanPrepaymentCalculator />
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              How loan prepayment works
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              A part-payment reduces the outstanding principal of a loan.
              Future interest is then calculated on the reduced outstanding
              balance, subject to the terms and calculation method used by
              the lender.
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Keep EMI the same
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  If the lender keeps your EMI unchanged, the reduced
                  principal can result in a shorter remaining loan tenure.
                  This can reduce the amount of future interest paid.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Keep tenure the same
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  If the remaining tenure stays unchanged, the reduced
                  principal can result in a lower EMI. The total interest
                  payable can also decrease.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
              <p className="text-sm leading-6 text-amber-800 dark:text-amber-300">
                <strong>Disclaimer:</strong> This calculator is provided for
                informational and illustrative purposes only. Actual savings,
                revised EMI, tenure and charges depend on the lender's
                policies, loan agreement, interest calculation method,
                prepayment charges and other applicable terms. Please confirm
                the final figures with your lender.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}