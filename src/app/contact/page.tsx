import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Home,
  Landmark,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import Container from "@/components/ui/Container";
import ContactForm from "@/components/send-mail";

export const metadata: Metadata = {
  title: "Contact WealthNestPro",
  description:
    "Contact WealthNestPro for enquiries about home loans, home loan balance transfer and loan against property solutions.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact WealthNestPro",
    description:
      "Submit a loan enquiry or contact WealthNestPro for home loan and property loan assistance.",
    url: "/contact",
  },
};
const services = [
  {
    icon: Home,
    title: "Home Loans",
    description: "Explore financing options for your home purchase.",
  },
  {
    icon: RefreshCw,
    title: "Balance Transfer",
    description: "Review options for transferring your existing loan.",
  },
  {
    icon: Landmark,
    title: "Loan Against Property",
    description: "Discuss borrowing options against eligible property.",
  },
];

const benefits = [
  "Guidance based on your loan requirements",
  "Help understanding lender options",
  "Clear information about the next steps",
];
export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-50 py-14 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white sm:py-20 lg:py-24">
      
      {/* Decorative background accents */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 -z-10 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-400/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl dark:bg-blue-500/10"
      />

      <Container>

        {/* Page introduction */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-800 dark:border-teal-400/20 dark:bg-teal-400/10 dark:text-teal-300">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Contact
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Secure the right loan
            <span className="mt-2 block text-teal-700 dark:text-teal-400">
              with confidence.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            If you are looking for trusted guidance on home loans, balance transfer, or loan against property, 
            our team is here to help with expertise, 
            lender access, and service that stays with you beyond the transaction.
          </p>
        </div>
        {/* Main contact layout */}
        <div className="grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          {/* Left: Contact information */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div 
              // className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:p-8"
              className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 p-7 text-white sm:p-8"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-300">
                  WealthNestPro
                </p>

                <h2 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl">
                  Start with a conversation.
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Share your requirements with us. We can help you understand
                  the available options and the information you may need.
                </p>

                <a
                  href="https://wa.me/919818933958?text=Hello%20Wealthnestpro"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start a conversation with WealthNestPro on WhatsApp"
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:w-auto"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Connect on WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div 
              // className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white sm:p-8"
              className="p-6 sm:p-8"
              >
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  How we can help
                </h3>

                <div className="mt-5 space-y-5">
                  {services.map((service) => {
                    const Icon = service.icon;

                    return (
                      <div key={service.title} className="flex gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                          <Icon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {service.title}
                          </h4>
                          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {service.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Trust and transparency */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
                  <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Guidance with clarity
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    Understand your options, the documentation involved, and
                    the next steps before making a decision.
                  </p>
                </div>
              </div>

              <ul className="mt-5 space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-start gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                <Clock3
                  className="mt-0.5 h-5 w-5 shrink-0 text-teal-600 dark:text-teal-400"
                  aria-hidden="true"
                />
                <p>
                  Send your enquiry whenever convenient. We can discuss the
                  next steps after receiving your details.
                </p>
              </div>
            </div>
          </aside>

          {/* Right: Existing contact form */}
          <div
            id="contact-form"
            className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20 sm:p-8 lg:p-10"
          >
            <div className="mb-8 border-b border-slate-200 pb-6 dark:border-slate-800">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400">
                Contact form
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Tell us about your requirements
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400 sm:text-base">
                Complete the form below and submit your enquiry to
                WealthNestPro.
              </p>
            </div>

            <div className="contact-form-theme min-w-0 text-sm">
              <ContactForm />
            </div>

            <div className="mt-8 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <p className="text-xs leading-5 text-slate-600 dark:text-slate-400">
                Please avoid submitting passwords, OTPs, full payment card
                details, or other sensitive credentials. Loan eligibility,
                interest rates, and approval are subject to the lender&apos;s
                policies and assessment.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}