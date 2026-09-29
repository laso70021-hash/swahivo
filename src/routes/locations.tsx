import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { locations } from "@/lib/data";

export const Route = createFileRoute("/locations")({
  component: LocationsPage,
});

function LocationsPage() {
  return (
    <main>
      <PageBanner
        title="Popular locations"
        subtitle="Explore verified stock in six Tanzanian cities — from Stone Town to the capital."
        image="/images/locations/arusha.jpg"
      />
      <div className="site-container grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            to="/locations/$slug"
            params={{ slug: loc.slug }}
            className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-card"
          >
            <div className="relative h-48">
              <img
                src={loc.image}
                alt={loc.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <div className="absolute bottom-3 left-4 text-paper">
                <h2 className="text-lg font-bold">{loc.name}</h2>
                <p className="text-xs text-paper/80">
                  {loc.count.toLocaleString()} properties
                </p>
              </div>
            </div>
            <p className="p-4 text-sm leading-relaxed text-muted">{loc.blurb}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
