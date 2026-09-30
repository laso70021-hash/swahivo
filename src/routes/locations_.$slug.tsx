import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { PropertyCard } from "@/components/property-card";
import { getLocation, propertiesForCity } from "@/lib/data";
import { useLocations } from "@/lib/locations-store";

export const Route = createFileRoute("/locations_/$slug")({
  component: LocationPage,
});

function LocationPage() {
  const { slug } = Route.useParams();
  const { getLocation: getDynamicLocation } = useLocations();

  const loc = getLocation(slug) || getDynamicLocation(slug);
  if (!loc) throw notFound();

  const list = propertiesForCity(loc.name);

  return (
    <main>
      <PageBanner
        title={loc.name}
        subtitle={
          loc.branch_status === "main"
            ? `${loc.blurb} (Main Branch Office)`
            : loc.branch_status === "coming_soon"
              ? `${loc.blurb} (Branch Office — Coming Soon)`
              : loc.blurb
        }
        image={loc.image || "/images/locations/dar-es-salaam.jpg"}
      />
      <div className="site-container py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted">
            {list.length} featured {list.length === 1 ? "listing" : "listings"}
          </p>
          <Link
            to="/listings"
            search={{ city: loc.name, q: loc.name }}
            className="text-sm font-medium text-brand hover:text-brand-hover"
          >
            View all in {loc.name}
          </Link>
        </div>
        {list.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-line bg-canvas px-6 py-12 text-center">
            <p className="text-sm font-semibold text-ink">
              New verified listings for {loc.name} are coming soon.
            </p>
            <p className="mt-1 text-xs text-muted">
              Have property in {loc.name}? Be the first to publish a listing!
            </p>
            <Link
              to="/add-listing"
              className="mt-4 inline-flex h-10 items-center rounded-lg bg-brand px-5 text-xs font-semibold text-paper hover:bg-brand-hover"
            >
              List Property in {loc.name}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
