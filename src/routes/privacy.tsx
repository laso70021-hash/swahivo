import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <main>
      <PageBanner title="Privacy policy" subtitle="How we handle the information you share with Swahivo." />
      <article className="site-container max-w-3xl space-y-4 py-12 text-sm leading-relaxed text-ink-soft">
        <p>
          Swahivo collects the details you type into enquiry forms, listing
          submissions, and the newsletter — typically a name, email, phone, and
          message. We use them to answer you and to operate the marketplace.
        </p>
        <p>
          Saved properties and demo login details stay in your browser. We do
          not sell personal data. Enquiry messages are shared with the agent
          responsible for that listing so they can call you back.
        </p>
        <p>
          You can ask us to delete an enquiry record by writing to
          hello@swahivo.com. This policy is written for a product demo; a live
          deployment would add a full legal review.
        </p>
      </article>
    </main>
  );
}
