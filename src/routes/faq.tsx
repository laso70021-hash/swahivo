import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { faqs } from "@/lib/data";

export const Route = createFileRoute("/faq")({ component: FaqPage });

function FaqPage() {
  return (
    <main>
      <PageBanner
        title="Frequently asked questions"
        subtitle="Straight answers about listings, fees, and how Swahivo works."
        image="/images/blog/market.jpg"
      />
      <div className="site-container max-w-3xl space-y-3 py-12">
        {faqs.map((f) => (
          <details
            key={f.q}
            className="group rounded-xl border border-line bg-paper px-5 py-4"
          >
            <summary className="cursor-pointer list-none font-semibold text-ink">
              {f.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
