import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the WealthNestPro Terms and Conditions governing use of the website, loan enquiries, calculators and website content.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm text-muted-foreground">
            Last updated: October 3, 2026
          </p>
        </div>

        <div className="space-y-10 leading-7 text-muted-foreground">
          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              1. Acceptance of Terms
            </h2>

            <p>
              By accessing or using the WealthNestPro website, you agree to
              comply with these Terms & Conditions. If you do not agree with
              these terms, please do not use the website.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              2. About the Website
            </h2>

            <p>
              WealthNestPro provides information and enquiry facilities
              relating to financial products and services, including home
              loans, home loan balance transfers and loan against property
              solutions.
            </p>

            <p className="mt-4">
              The website may also provide educational content and financial
              calculators for general informational purposes.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              3. Website Use
            </h2>

            <p>
              You agree to use this website only for lawful purposes and in a
              manner that does not interfere with the operation, security or
              availability of the website.
            </p>

            <p className="mt-4">You must not:</p>

            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>
                Use the website for fraudulent, unlawful or abusive purposes.
              </li>
              <li>
                Attempt to gain unauthorised access to the website or its
                systems.
              </li>
              <li>
                Introduce malicious software, code or other harmful material.
              </li>
              <li>
                Copy, reproduce or commercially exploit website content
                without permission.
              </li>
              <li>
                Submit false, misleading or unauthorised information through
                website forms.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              4. Loan Enquiries
            </h2>

            <p>
              When submitting an enquiry, you agree to provide information
              that is accurate and complete to the best of your knowledge.
            </p>

            <p className="mt-4">
              An enquiry does not constitute a guarantee of loan approval,
              sanction or disbursement.
            </p>

            <p className="mt-4">
              Any final loan decision is made by the relevant lender or
              financial institution based on its own eligibility criteria,
              assessment, documentation and applicable policies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              5. Calculators and Estimates
            </h2>

            <p>
              WealthNestPro may provide EMI, prepayment, balance transfer and
              loan against property calculators.
            </p>

            <p className="mt-4">
              These calculators are intended for estimates only. Actual loan
              terms, repayment schedules, interest calculations, charges and
              savings may differ.
            </p>

            <p className="mt-4">
              You should verify all financial information with the relevant
              lender or a qualified professional before making a financial
              decision.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              6. Intellectual Property
            </h2>

            <p>
              Unless otherwise stated, website content including text,
              graphics, logos, branding, design, software and other materials
              is owned by or licensed to WealthNestPro and may be protected
              by applicable intellectual property laws.
            </p>

            <p className="mt-4">
              You may view and use the website for personal and legitimate
              purposes. Reproduction, modification, distribution or commercial
              exploitation without appropriate permission is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              7. Third-Party Services
            </h2>

            <p>
              The website may reference or link to third-party lenders,
              financial institutions, payment providers, technology providers
              or other external services.
            </p>

            <p className="mt-4">
              Your use of third-party services is subject to the terms and
              policies of the relevant third party.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              8. Availability of the Website
            </h2>

            <p>
              We aim to keep the website available and functioning properly.
              However, we do not guarantee that the website will always be
              available, uninterrupted, secure or free from errors.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              9. Limitation of Liability
            </h2>

            <p>
              To the extent permitted by applicable law, WealthNestPro shall
              not be responsible for losses or damages arising from reliance
              on general information provided on the website, calculator
              estimates, third-party services, lender decisions or temporary
              website interruptions.
            </p>

            <p className="mt-4">
              Nothing in these Terms is intended to exclude or limit any
              liability that cannot lawfully be excluded or limited under
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              10. Privacy
            </h2>

            <p>
              Your use of the website is also subject to our{" "}
              <a
                href="/privacy-policy"
                className="underline underline-offset-4"
              >
                Privacy Policy
              </a>
              , which explains how information may be collected and used.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              11. Changes to These Terms
            </h2>

            <p>
              We may modify these Terms & Conditions from time to time.
              Changes will become effective when the updated terms are
              published on this page.
            </p>

            <p className="mt-4">
              Continued use of the website after changes are published may
              constitute acceptance of the revised terms, subject to
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              12. Governing Law
            </h2>

            <p>
              These Terms & Conditions shall be governed by the applicable
              laws of India, subject to applicable statutory and regulatory
              requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-2xl font-semibold text-foreground">
              13. Contact
            </h2>

            <p>
              If you have questions regarding these Terms & Conditions,
              please contact WealthNestPro through the contact details
              provided on our website.
            </p>

            <p className="mt-4">
              Website:{" "}
              <a
                href="https://wealthnestpro.in"
                className="underline underline-offset-4"
              >
                wealthnestpro.in
              </a>
            </p>
          </section>
        </div>
      </section>
    </main>
  );
}