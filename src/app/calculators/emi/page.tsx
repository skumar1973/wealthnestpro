import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Container from "@/components/ui/Container";
import EmiCalculator from "@/components/calculators/EmiCalculator";

export const metadata = {
  title: "EMI Calculator",
  description:
    "Calculate estimated loan EMI, total interest and total repayment using our online EMI calculator.",
};

export default function EmiCalculatorPage() {
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
                EMI Calculator
              </h1>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                Estimate your monthly loan payment, total interest and total
                repayment based on the loan amount, interest rate and tenure.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <EmiCalculator />
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              How EMI is calculated
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              The calculator uses the standard reducing-balance EMI formula
              commonly used for installment-based loans.
            </p>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <p className="whitespace-nowrap text-center font-mono text-lg text-slate-900 dark:text-slate-100">
                EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-white">
                  P
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Principal loan amount.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-white">
                  r
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Monthly interest rate.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-white">
                  n
                </p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Total number of monthly installments.
                </p>
              </div>
            </div>

            <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 dark:border-amber-900/50 dark:bg-amber-950/20">
              <p className="text-sm leading-6 text-amber-800 dark:text-amber-300">
                <strong>Disclaimer:</strong> This calculator is provided for
                informational and illustrative purposes only. Actual EMI,
                interest, fees, taxes, processing charges and other loan terms
                may vary depending on the lender and financial product.
                Please verify the final terms with the relevant financial
                institution.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}