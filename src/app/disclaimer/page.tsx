import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Read the WealthNestPro website disclaimer regarding loan information, eligibility, interest rates, calculations and lender decisions.",
  alternates: {
    canonical: "/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Disclaimer
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: October 3, 2026
          </p>
        </div>

        <div className="space-y-10 leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              1. General Information
            </h2>

            <p>
              The information provided on WealthNestPro is intended for
              general informational and educational purposes only. It should
              not be considered financial, legal, tax, investment or other
              professional advice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              2. Loan Information
            </h2>

            <p>
              Information relating to home loans, home loan balance transfers,
              loan against property and other loan products is provided for
              general guidance.
            </p>

            <p className="mt-4">
              Actual interest rates, fees, charges, loan amounts, tenure,
              eligibility requirements, documentation and other terms may vary
              depending on the lender, applicant profile, property,
              documentation and prevailing policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              3. No Guarantee of Loan Approval
            </h2>

            <p>
              Submitting an enquiry through WealthNestPro does not guarantee
              loan approval, sanction, disbursement, a particular interest
              rate, loan amount or repayment term.
            </p>

            <p className="mt-4">
              Final decisions regarding eligibility, underwriting, approval,
              pricing, documentation and disbursement are made by the
              respective lender or financial institution according to its
              applicable policies and assessment procedures.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              4. EMI and Financial Calculators
            </h2>

            <p>
              The calculators available on this website are provided as
              estimation tools for informational purposes.
            </p>

            <p className="mt-4">
              Calculated results may differ from the actual repayment amount,
              interest payable, savings, fees or other financial outcomes
              applicable to a particular loan.
            </p>

            <p className="mt-4">
              Calculator results should not be treated as a loan quotation,
              sanction letter, financial advice or guarantee of savings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              5. Interest Rates and Charges
            </h2>

            <p>
              Interest rates, processing fees, foreclosure or prepayment
              charges, legal charges, valuation charges, insurance costs,
              taxes and other charges may change and may differ between
              lenders and applicants.
            </p>

            <p className="mt-4">
              Users should verify the applicable terms directly with the
              relevant lender before making a financial decision.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              6. Third-Party Lenders and Service Providers
            </h2>

            <p>
              WealthNestPro may provide information or assistance relating to
              lenders, banks, financial institutions or other third parties.
            </p>

            <p className="mt-4">
              WealthNestPro does not control the independent policies,
              decisions, products, services or websites of third parties.
              Users should independently review the terms and conditions,
              privacy policies and applicable documentation of such parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              7. Accuracy of Information
            </h2>

            <p>
              We make reasonable efforts to provide useful and accurate
              information. However, information on the website may change
              over time and we do not warrant that every piece of information
              will always be complete, current or error-free.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              8. No Professional Advice
            </h2>

            <p>
              Nothing on this website should be interpreted as personalised
              financial, investment, tax or legal advice.
            </p>

            <p className="mt-4">
              Users should consider their individual circumstances and obtain
              appropriate professional advice before making significant
              financial or legal decisions.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              9. External Links
            </h2>

            <p>
              The website may contain links to external websites. Such links
              are provided for convenience and information. WealthNestPro is
              not responsible for the content, availability, security or
              privacy practices of external websites.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              10. Acceptance
            </h2>

            <p>
              By using this website, you acknowledge that you have read and
              understood this Disclaimer and agree to use the information
              provided at your own discretion and responsibility.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              11. Contact
            </h2>

            <p>
              If you have questions regarding this Disclaimer, please contact
              WealthNestPro using the contact details available on our
              website.
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}