import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";

export const Route = createFileRoute("/investments")({
  component: InvestmentsPage,
});

function InvestmentsPage() {
  const picks = properties.filter((p) =>
    ["villa", "condo", "commercial", "plot"].includes(p.propertyType),
  );

  return (
    <main>
      <PageBanner
        title="Invest in real estate"
        subtitle="Yield-led villas, hotel-managed condos, commercial floors, and titled land."
        image="/images/misc/cta-villa.jpg"
      />
      <div className="site-container py-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Zanzibar yield", "Hotel-managed condos and beach villas with audited occupancy."],
            ["Dar commercial", "CBD floors and light industrial along the Morogoro corridor."],
            ["Capital growth", "Dodoma apartments and Arusha plots as the map of demand shifts."],
          ].map(([t, b]) => (
            <article key={t} className="rounded-xl border border-line p-6 shadow-card">
              <h2 className="font-bold text-ink">{t}</h2>
              <p className="mt-2 text-sm text-muted">{b}</p>
            </article>
          ))}
        </div>
        <h2 className="mt-12 mb-5 text-xl font-bold text-ink">Investment listings</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {picks.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Talk to{" "}
          <Link to="/agents" className="font-medium text-brand">
            an agent
          </Link>{" "}
          before you underwrite a deal.
        </p>
      </div>
    </main>
  );
}
