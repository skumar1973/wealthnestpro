import Container from "@/components/ui/Container";

export default function Expertise() {
  return (
    <section className="py-20 sm:py-28">
      <Container>

        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Expertise
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Led by experience. Backed by insight.
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Our team includes experienced professionals and ex-bankers who understand credit evaluation, documentation, lender expectations, and process management from the inside.
        </p>

        <div className="grid gap-2 mt-3">
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <h3 className="text-xl font-semibold">Ex-banker perspective</h3>
                <p className="mt-2 leading-7 text-slate-400">This experience helps reduce avoidable delays, improve documentation readiness, and guide customers with more precision at every stage of the loan journey.</p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <h3 className="text-xl font-semibold">Customer-first service</h3>
                <p className="mt-2 leading-7 text-slate-400">We combine lender access with thoughtful handholding so customers feel informed, supported, and confident from first discussion to final outcome.</p>
            </div>
        </div>


      </Container>
    </section>
  );
}