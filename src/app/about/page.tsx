import type { Metadata } from "next";
import About from "@/components/About";
import Services from "@/components/Services";
import Expertise from "@/components/Expertise";
import Process from "@/components/Process";
import ContactPage from "../contact/page";
export const metadata: Metadata = {
  title: "About WealthNestPro",
  description:
    "Learn about WealthNestPro and our approach to helping customers explore home loans, balance transfer and loan against property solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About WealthNestPro",
    description:
      "Learn about WealthNestPro and our approach to home loans, balance transfer and property-backed financing solutions.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <>
    <About />
    <Services />
    <Expertise />
    <Process />
    <ContactPage />
    </>
  );
}