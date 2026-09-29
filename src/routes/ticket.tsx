import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";

export const Route = createFileRoute("/ticket")({ component: TicketPage });

function TicketPage() {
  return (
    <main>
      <PageBanner
        title="Submit a ticket"
        subtitle="Something wrong with a listing, an enquiry, or your account? Tell us."
        image="/images/locations/mwanza.jpg"
      />
      <form
        className="site-container max-w-xl space-y-4 py-12"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Ticket received. Support will reply by email.");
          e.currentTarget.reset();
        }}
      >
        <label className="block text-sm font-medium">
          Email
          <input
            required
            type="email"
            className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
          />
        </label>
        <label className="block text-sm font-medium">
          Topic
          <select className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm">
            <option>Listing issue</option>
            <option>Payment / fees</option>
            <option>Account</option>
            <option>Other</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Details
          <textarea
            required
            rows={6}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none"
          />
        </label>
        <button
          type="submit"
          className="h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
        >
          Submit ticket
        </button>
      </form>
    </main>
  );
}
