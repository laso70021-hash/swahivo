import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Building2, MapPin } from "lucide-react";
import { PageBanner } from "@/components/section";
import { useLocations } from "@/lib/locations-store";

export const Route = createFileRoute("/locations")({
  component: LocationsPage,
});

function LocationsPage() {
  const { locations, refresh } = useLocations();

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <main>
      <PageBanner
        title="Popular locations & Branches"
        subtitle="Explore verified real estate across Tanzania — from Stone Town, Zanzibar (Main Branch) to Dar es Salaam, Arusha and beyond."
        image="/images/locations/zanzibar.jpg"
      />
      <div className="site-container grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((loc) => (
          <Link
            key={loc.slug}
            to="/locations/$slug"
            params={{ slug: loc.slug }}
            className="group overflow-hidden rounded-2xl border border-line bg-paper shadow-card transition-all hover:border-brand/40"
          >
            <div className="relative h-48">
              <img
                src={loc.image}
                alt={loc.name}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
              <div className="absolute top-3 right-3">
                {loc.branch_status === "main" ? (
                  <span className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-paper shadow-sm">
                    Main Branch
                  </span>
                ) : loc.branch_status === "coming_soon" ? (
                  <span className="rounded-full bg-amber-500/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-paper shadow-sm">
                    Branch: Coming Soon
                  </span>
                ) : null}
              </div>
              <div className="absolute bottom-3 left-4 text-paper">
                <h2 className="text-lg font-bold flex items-center gap-1.5">
                  <MapPin className="size-4 text-brand" />
                  {loc.name}
                </h2>
                <p className="text-xs text-paper/80">
                  {loc.count.toLocaleString()} properties
                </p>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm leading-relaxed text-muted">{loc.blurb}</p>
              <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-brand">
                <span>View properties</span>
                <span>→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
