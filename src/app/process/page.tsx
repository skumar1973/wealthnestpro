import Process from "@/components/Process";
import type { Metadata } from "next";
import ContactPage from "../contact/page";

export const metadata: Metadata = {
  title: "Home Loan Application Process",
  description:
    "Understand the general home loan and property loan enquiry, eligibility, documentation, application, assessment and disbursement process.",
  alternates: {
    canonical: "/process",
  },
  openGraph: {
    title: "Home Loan Application Process",
    description:
      "Understand the general loan enquiry and application process.",
    url: "/process",
  },
};

export default function ProcessPage() {
  return (
    <>
    <Process />
    <ContactPage />
    </>
  );
}