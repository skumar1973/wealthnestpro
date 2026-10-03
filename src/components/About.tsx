import Container from "@/components/ui/Container";

export default function About() {
  return (
  <section className="py-16 sm:py-20">
    <Container>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          About
      </h2>
      <p className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        A more refined way to borrow.
      </p>
      <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
        We help customers navigate home loans, balance transfer, and loan against property with clarity, discretion, and confidence. Our approach is advisory-led, carefully managed, and focused on satisfaction across the full customer journey.
      </p>
      <div className="grid gap-6 sm:grid-cols-2 mt-2 mb-2">
        <div
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-900 sm:p-7"
        >
          <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
            Personalized over transactional    
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            Every requirement is assessed with attention to profile, property type, lender fit, and long-term comfort. The goal is not just approval, but the right structure and a smoother borrowing experience.
          </p>
        </div>
        <div
          className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-900 sm:p-7"
        >
          <h2 className="mt-6 text-xl font-bold text-slate-900 dark:text-white">
            Support beyond disbursal
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
            We remain available for post-disbursal queries, coordination support, and service assistance wherever possible, because genuine customer satisfaction extends beyond closure.
          </p>
          </div>
        </div>
      </Container>
  </section>
  );
}