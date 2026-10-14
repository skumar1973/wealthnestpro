import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ReviewExperience from "@/components/reviews/ReviewExperience";

export const metadata: Metadata = {
  title: "Customer Reviews & Ratings | WealthNestPro",
  description:
    "Read published customer feedback about WealthNestPro home loan, balance transfer, and loan against property services.",
  alternates: {
    canonical: "/reviews",
  },
  openGraph: {
    title: "Customer Reviews & Ratings | WealthNestPro",
    description:
      "Explore published feedback about WealthNestPro loan guidance services.",
    url: "/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-14 text-slate-900 transition-colors dark:bg-slate-950 dark:text-white sm:py-20">
      <Container>
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
            Customer feedback
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Reviews &amp; Ratings
          </h1>

          <p className="mt-5 text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            Read published customer feedback and share your experience with
            WealthNestPro.
          </p>
        </header>

        <ReviewExperience />
      </Container>
    </main>
  );
}
