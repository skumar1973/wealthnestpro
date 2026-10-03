import type { Metadata } from "next";
import Expertise from "@/components/Expertise";
import Process from "@/components/Process";
import ContactPage from "../contact/page";

export const metadata: Metadata = {
  title: "Home Loan & Property Loan Expertise",
  description:
    "Learn about the areas covered by WealthNestPro, including home loans, balance transfer and loan against property requirements.",
  alternates: {
    canonical: "/expertise",
  },
  openGraph: {
    title: "Home Loan & Property Loan Expertise",
    description:
      "Explore WealthNestPro's areas of loan assistance and customer support.",
    url: "/expertise",
  },
};

export default function ExpertisePage() {
  return (
    <>
      <Expertise />
      <Process />
      <ContactPage />
    </>
  );
}