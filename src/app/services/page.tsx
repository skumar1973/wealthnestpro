import type { Metadata } from "next";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import ContactPage from "../contact/page";
import Process from "@/components/Process";

export const metadata: Metadata = {
  title: "Home Loan & Property Loan Services",
  description:
    "Explore WealthNestPro services including home loans, home loan balance transfer and loan against property solutions.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Home Loan & Property Loan Services",
    description:
      "Explore home loan, home loan balance transfer and loan against property services.",
    url: "/services",
  },
};

export default function ServicePage() {
  return (
    <>
      <Services />
      <Expertise />
      <Process />
      <ContactPage />
    </>
  );
}