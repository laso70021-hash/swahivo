import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { PropertyCard } from "@/components/property-card";
import { properties } from "@/lib/data";
import { toProperty, useFavorites, useUserListings } from "@/lib/stores";

export const Route = createFileRoute("/favorites")({
  component: FavoritesPage,
});

function FavoritesPage() {
  const ids = useFavorites((s) => s.ids);
  const extras = useUserListings((s) => s.extras).map(toProperty);
  const saved = [...extras, ...properties].filter((p) => ids.includes(p.id));

  return (
    <main>
      <PageBanner
        title="Saved properties"
        subtitle="Homes you have hearted — stored on this device."
        image="/images/properties/luxury-apt.jpg"
      />
      <div className="site-container py-12">
        {saved.length === 0 ? (
          <div className="rounded-xl border border-line bg-canvas px-6 py-16 text-center">
            <p className="text-sm text-muted">You have not saved any properties yet.</p>
            <Link
              to="/listings"
              className="mt-5 inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover"
            >
              Browse listings
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {saved.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
