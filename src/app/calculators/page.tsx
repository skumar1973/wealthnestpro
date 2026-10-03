import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Landmark,
  PiggyBank,
  CreditCard,
  ArrowRightLeft,
  Building2,
} from "lucide-react";

import Container from "@/components/ui/Container";
import { Metadata } from "next";
import FAQ, { FAQItem } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Loan Calculators",

  description:
    "Use WealthNestPro loan calculators to estimate home loan EMI, loan prepayment impact, balance transfer scenarios and loan against property repayments.",

  alternates: {
    canonical: "/calculators",
  },

  openGraph: {
    title: "Home Loan & Property Loan Calculators",
    description:
      "Calculate estimated EMI, prepayment impact, balance transfer scenarios and property loan repayments.",
    url: "/calculators",
  },
};

const calculators = [
  {
    title: "EMI Calculator",
    description:
      "Calculate estimated monthly loan EMI, total interest and total repayment based on loan amount, interest rate and tenure.",
    href: "/calculators/emi",
    icon: Calculator,
    status: "Available",
  },
  {
  title: "Loan Prepayment Calculator",
  description:
    "Estimate potential interest savings, tenure reduction and EMI changes when making a partial loan prepayment.",
  href: "/calculators/loan-prepayment",
  icon: CreditCard,
  status: "Available",
  },
  {
  title: "Loan Balance Transfer",
  description:
    "Compare your existing loan with a potential balance transfer and estimate EMI and interest savings.",
  href: "/calculators/loan-balance-transfer",
  icon: ArrowRightLeft,
  status: "Available",
  },
  {
  title: "Loan Against Property",
  description:
    "Estimate LAP eligibility, EMI, LTV, interest and total repayment using your property value and loan terms.",
  href: "/calculators/loan-against-property",
  icon: Building2,
  status: "Available",
  },
  {
    title: "SIP Calculator",
    description:
      "Estimate the potential future value of regular monthly investments based on investment amount, expected return and duration.",
    href: "#",
    icon: PiggyBank,
    status: "Coming Soon",
  },
  {
    title: "FD Calculator",
    description:
      "Estimate maturity value and interest earned on a fixed deposit based on deposit amount, interest rate and tenure.",
    href: "#",
    icon: Landmark,
    status: "Coming Soon",
  },
];
const emiFAQs: FAQItem[] = [
  {
    question: "What is an EMI?",
    answer:
      "EMI, or Equated Monthly Instalment, is the periodic payment made toward a loan according to the applicable repayment schedule.",
  },
  {
    question: "How is home loan EMI calculated?",
    answer:
      "Home loan EMI is generally calculated using the loan amount, applicable interest rate and repayment tenure.",
  },
  {
    question: "Are the calculator results guaranteed to match a lender's EMI?",
    answer:
      "No. Calculator results are indicative estimates. Actual repayment amounts may vary based on the lender's interest rate, fees, repayment terms and other applicable conditions.",
  },
];
export default function CalculatorsPage() {
  return (
    <>
      <section className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
        <Container>
          <div className="mx-auto max-w-3xl py-20 text-center sm:py-24">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Financial Calculators
            </p>

            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
              Simple tools for financial planning
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              Use our calculators to understand estimated loan payments,
              investment growth and other financial scenarios.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calculator) => {
              const Icon = calculator.icon;
              const available = calculator.status === "Available";

              return (
                <div
                  key={calculator.title}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-900 sm:p-7"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 dark:bg-teal-950/50">
                      <Icon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        available
                          ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {calculator.status}
                    </span>
                  </div>

                  <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
                    {calculator.title}
                  </h2>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-400">
                    {calculator.description}
                  </p>

                  {available ? (
                    <Link
                      href={calculator.href}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300"
                    >
                      Use Calculator
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <span className="mt-6 text-sm font-medium text-slate-400">
                      Coming soon
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-950">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">
              Need help understanding your calculation?
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
              Calculators provide estimates for planning purposes. Actual
              financial products may have different rates, charges and terms.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Discuss Your Requirement
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <FAQ items={emiFAQs} />
        </Container>
      </section>
    </>
  );
}