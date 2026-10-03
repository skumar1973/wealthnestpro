import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import ContactPage from "./contact/page";
import About from "@/components/About";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Process from "@/components/Process";
import FAQ, { FAQItem } from "@/components/FAQ";
import JsonLd from "@/components/JsonLd";
export const metadata: Metadata = {
  title:
    "Home Loan, Balance Transfer & Property Loan Services",
  description:
    "Explore home loan, home loan balance transfer and loan against property solutions with WealthNestPro. Use loan calculators and submit an enquiry.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:
      "Home Loan, Balance Transfer & Property Loan Services",
    description:
      "Explore home loan, home loan balance transfer and loan against property solutions with WealthNestPro.",
    url: "/",
  },
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WealthNestPro",
  url: "https://wealthnestpro.in",
  logo: "https://wealthnestpro.in/logo.png",
  description:
    "WealthNestPro provides information and assistance relating to home loans, home loan balance transfer and loan against property solutions.",
  areaServed: {
    "@type": "Country",
    name: "India",
  },
};
const homeLoanFAQs: FAQItem[] = [
  {
    question: "What is a home loan?",
    answer:
      "A home loan is financing provided by an eligible lender for purposes such as purchasing or constructing a residential property, subject to the lender's terms and eligibility criteria.",
  },
  {
    question: "What documents are generally required for a home loan?",
    answer:
      "Documents may include identity and address proof, income documents, bank statements and property-related documents. Exact requirements vary by lender and applicant profile.",
  },
  {
    question: "Does submitting a loan enquiry guarantee approval?",
    answer:
      "No. Submitting an enquiry does not guarantee loan approval. Final eligibility, terms and approval are determined by the respective lender based on its assessment and applicable policies.",
  },
];
export default function Home() {
  return (
    <>
    <JsonLd data={organizationSchema} />
    <div className="w-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-white">
      <Hero />
      <About />
      <Services />
      <Expertise />
      <Process />
      <ContactPage />
      <FAQ items={homeLoanFAQs} />
    </div>
    </>
  );
}
