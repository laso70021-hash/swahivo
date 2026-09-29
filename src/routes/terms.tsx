import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";

export const Route = createFileRoute("/terms")({ component: TermsPage });

function TermsPage() {
  return (
    <main>
      <PageBanner title="Terms & conditions" subtitle="The ground rules for using Swahivo." />
      <article className="site-container max-w-3xl space-y-4 py-12 text-sm leading-relaxed text-ink-soft">
        <p>
          Listings on Swahivo are invitations to treat, not a binding offer.
          Always instruct your own advocate to complete due diligence before
          you pay a deposit or sign a sale agreement.
        </p>
        <p>
          Sellers and agents warrant that the information they submit is
          accurate. Swahivo verifies title and identity as far as reasonably
          possible, but we are not a party to your transaction.
        </p>
        <p>
          The valuation tool is an estimate. It is not a licensed appraisal and
          must not be used for court, tax, or credit decisions without a
          professional valuer.
        </p>
      </article>
    </main>
  );
}
