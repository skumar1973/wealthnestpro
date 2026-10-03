import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  User,
  Landmark,
  PiggyBank,
  HandCoins,
} from "lucide-react";
import Container from "@/components/ui/Container";

const highlights = [
  "Wide lender network across banks, NBFCs, and housing finance companies",
  "Expert guidance backed by ex-bankers and experienced professionals",
  "Support from application to sanction, disbursal, and beyond",
  "Faster processing with thoughtful documentation assistance",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-engineering-grid">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-teal-100/60 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-slate-100 blur-3xl" />
      </div>

      <Container>
        <div className="relative grid min-h-[680px] items-center gap-12 py-20 lg:grid-cols-2 lg:py-24">
          
          {/* Left - Main message */}
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700">
              {/* <span className="h-2 w-2 rounded-full bg-teal-600" /> */}
              PREMIUM LOAN GUIDANCE
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-4xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl xl:text-7xl">
              Elevated loan Solutions,
              <span className="block text-teal-600">
                guided by experience.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:text-xl">
              Access premium support for home loans, balance transfer, and loan against property through a trusted network of banks, 
              NBFCs, and housing finance companies. 
            </p>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">
              Competitive rates, faster processing, and dependable guidance before 
              and beyond disbursal.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
              >
                Speak with an Expert
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center rounded-lg border border-slate-300 bg-white dark:bg-slate-900 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                Explore Services
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-600"
                >
                  <CheckCircle2 className="h-4 w-4 text-teal-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right - Service overview */}
          <div className="relative lg:pl-8">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/50 backdrop-blur sm:p-8">
              
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    TRUSTED APPROACH
                  </p>

                  <h2 className="mt-1 text-2xl font-bold dark:bg-engineering-grid dark:text-white text-slate-900">
                    Structured Borrowing with a more personal standard of service.
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-1 ">
                {/* Service 1 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <User className="h-5 w-5 text-teal-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white ">
                      Ex Bankers
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white">
                      Pratical Lender-side insight.
                    </p>
                  </div>
                </div>

                {/* Service 2 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-50">
                    <Landmark className="h-5 w-5 text-teal-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white ">
                      Multi-lender
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white">
                      Wide access across institutions.
                    </p>
                  </div>
                </div>
                </div>
                {/* Service 3 */}
                 <div className="grid grid-cols-2 gap-1 ">
                <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-teal-50">
                    <PiggyBank className="h-5 w-5 text-teal-600" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white ">
                      Guided
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white " >
                      Documentation and coordination support
                    </p>
                  </div>
                </div>

                {/* Service 4 */}
                <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                    <HandCoins className="h-5 w-5 text-teal-700" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white ">
                      Ongoing
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-white ">
                      Customer care beyond disbursal.
                    </p>
                  </div>
                </div>
              </div>
              </div>
              {/* Bottom message */}
              <div className="mt-6 border-slate-200 pt-5">
                <p className="text-sm leading-6 text-slate-500 dark:text-white ">
                  <span className="font-semibold text-slate-700 dark:text-white ">
                    First time consultation to post-disbursal support,
                  </span>{" "}
                  every step is designed to feel calm, informed, and seemless.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}