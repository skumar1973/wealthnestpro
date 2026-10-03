import type { Metadata } from "next";
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

export default function ContactPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Contact
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Secure the right loan with confidence.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          If you are looking for trusted guidance on home loans, balance transfer, or loan against property, our team is here to help with expertise, lender access, and service that stays with you beyond the transaction.
        </p>
         <div className="grid sm:grid-cols-1 gap-2 mt-3">
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">Start a conversation</p>
                <div className="text-xl font-semibold">
                  <ContactForm />
                </div>
            </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <a className="rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-teal-700" href="https://wa.me/919818933958?text=Hello%20Wealthnestpro" target="_blank" rel="noopener" aria-label="Chat on WhatsApp" title="Chat on WhatsApp">
          Connect on Whatsapp
          </a>
        </div>
      </Container>
    </section>
  );
}