import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { PropertyCard } from "@/components/property-card";
import { getLocation, propertiesForCity } from "@/lib/data";

export const Route = createFileRoute("/locations_/$slug")({
  component: LocationPage,
});

function LocationPage() {
  const { slug } = Route.useParams();
  const loc = getLocation(slug);
  if (!loc) throw notFound();
  const list = propertiesForCity(loc.name);

  return (
    <main>
      <PageBanner title={loc.name} subtitle={loc.blurb} image={loc.image} />
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
          <p className="rounded-xl border border-line bg-canvas px-6 py-12 text-center text-sm text-muted">
            New listings for {loc.name} are coming soon.
          </p>
        )}
      </div>
    </main>
  );
}
