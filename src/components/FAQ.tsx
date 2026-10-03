import JsonLd from "@/components/JsonLd";

export type FAQItem = {
  question: string;
  answer: string;
};

type FAQProps = {
  items: FAQItem[];
};

export default function FAQ({ items }: FAQProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={faqSchema} />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-muted-foreground">
            Find answers to common questions about our loan services.
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <details
              key={item.question}
              className="rounded-lg border p-5"
            >
              <summary className="cursor-pointer font-semibold">
                {item.question}
              </summary>

              <p className="mt-3 leading-7 text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}