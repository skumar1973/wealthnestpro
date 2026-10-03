import Link from "next/link";
import Container from "@/components/ui/Container";
export default function Services() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <p className="text-sm font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Solutions designed around your requirement.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-300">
          Each solution is presented with care so the customer benefits from both financial value and process comfort.
        </p>
        <div className="grid gap-6 sm:grid-cols-3 mt-2 mb-2">
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <p className="text-sm font-semibold text-teal-400">01</p>
                <h3 className="text-xl font-semibold">Home Loans</h3>
                <p className="mt-2 leading-7 text-slate-400">Tailored assistance for home purchase, construction, and resale property funding through leading lenders.</p>
                <Link className="mt-2 leading-7 text-teal-400" href="/calculators/emi">EMI Calculator</Link>
            </div>
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <p className="text-sm font-semibold text-teal-400">02</p>
                <h3 className="text-xl font-semibold">Balance Transfer</h3>
                <p className="mt-2 leading-7 text-slate-400">Smarter refinancing options to help reduce interest cost, improve terms, and explore top-up opportunities where suitable.</p>
                <Link className="mt-2 leading-7 text-teal-400" href="/calculators/loan-balance-transfer">Balance Transfer Analysis</Link>
            </div>
            <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition dark:border-slate-800 dark:bg-slate-900 sm:p-7">
                <p className="text-sm font-semibold text-teal-400">03</p>
                <h3 className="text-xl font-semibold">Loan Against Property</h3>
                <p className="mt-2 leading-7 text-slate-400">Well-structured property-backed finance solutions for business, personal, or expansion needs.</p>
                <Link className="mt-2 leading-7 text-teal-400" href="/calculators/loan-against-property">LAP Analysis</Link>
            </div>
        </div>
      </Container>
    </section>
  );
}