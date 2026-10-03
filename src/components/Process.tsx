import Container from "@/components/ui/Container";
export default function Process() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Process
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          A thoughtful, seamless process.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          The experience is designed to feel structured, transparent, and reassuring at every step.
        </p>
        <div className="grid sm:grid-cols-3 gap-2 mt-3">
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">1</p>
                <h3 className="text-xl font-semibold">Understand your requirement</h3>
                <p className="mt-2 leading-7 text-slate-400">We begin with your financial need, property profile, and borrowing objective.</p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">2</p>
                <h3 className="text-xl font-semibold">Curate suitable options</h3>
                <p className="mt-2 leading-7 text-slate-400">We help review relevant solutions across multiple lenders and institutions.</p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">3</p>
                <h3 className="text-xl font-semibold">Manage documentation</h3>
                <p className="mt-2 leading-7 text-slate-400">Our team supports paperwork, application flow, and lender coordination.</p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">4</p>
                <h3 className="text-xl font-semibold">Drive approval and disbursal</h3>
                <p className="mt-2 leading-7 text-slate-400">We stay engaged through review, sanction, and completion of the process.</p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">5</p>
                <h3 className="text-xl font-semibold">Continue supporting you</h3>
                <p className="mt-2 leading-7 text-slate-400">Even after disbursal, we remain available for assistance and service support wherever possible.</p>
            </div>
            <div className="flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition hover:bg-white/5">
                <p className="text-sm font-semibold text-teal-400">6</p>
                <h3 className="text-xl font-semibold">Build long-term trust</h3>
                <p className="mt-2 leading-7 text-slate-400">Our goal is not only a successful loan outcome, but a relationship built on satisfaction and confidence.</p>
            </div>
        </div>
      </Container>
    </section>
  );
}