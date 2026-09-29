import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { PropertyCard } from "@/components/property-card";
import { SearchPanel } from "@/components/search-panel";
import { properties } from "@/lib/data";
import {
  filterProperties,
  validateListingsSearch,
} from "@/lib/listings-search";
import { toProperty, useUserListings } from "@/lib/stores";

export const Route = createFileRoute("/listings")({
  validateSearch: validateListingsSearch,
  component: ListingsPage,
});

function ListingsPage() {
  const search = Route.useSearch();
  const extras = useUserListings((s) => s.extras).map(toProperty);
  const results = filterProperties([...extras, ...properties], search);

  const title = search.deal === "rent"
    ? "Properties for Rent"
    : search.deal === "sale"
      ? "Properties for Sale"
      : "All Listings";

  return (
    <main>
      <PageBanner
        title={title}
        subtitle="Verified homes, apartments, villas, plots and commercial space across Tanzania."
        image="/images/locations/dar-es-salaam.jpg"
      />
      <div className="site-container py-10">
        <SearchPanel variant="page" initial={search} />
        <p className="mt-6 text-sm text-muted">
          {results.length} {results.length === 1 ? "property" : "properties"}{" "}
          found
        </p>
        {results.length === 0 ? (
          <p className="mt-10 rounded-xl border border-line bg-canvas px-6 py-12 text-center text-sm text-muted">
            No properties match those filters. Try a wider search.
          </p>
        ) : (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
