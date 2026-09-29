import { Link } from "@tanstack/react-router";
import { Bath, BedDouble, Heart, LandPlot } from "lucide-react";
import type { Property } from "@/lib/data";
import { useFavorites } from "@/lib/stores";
import { cn, formatTzs } from "@/lib/utils";

export function PropertyCard({ property }: { property: Property }) {
  const fav = useFavorites((s) => s.has(property.id));
  const toggle = useFavorites((s) => s.toggle);

  return (
    <article className="group overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow,transform] duration-200 hover:shadow-card-hover">
      <Link to="/listings/$id" params={{ id: property.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <span
            className={cn(
              "absolute left-3 top-3 rounded-md px-2 py-1 text-[11px] font-semibold text-paper",
              property.listingType === "sale" ? "bg-brand" : "bg-rent",
            )}
          >
            {property.listingType === "sale" ? "For Sale" : "For Rent"}
          </span>
          <button
            type="button"
            aria-label={fav ? "Remove from saved" : "Save property"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(property.id);
            }}
            className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-paper/95 text-ink-soft shadow-sm transition-colors hover:text-brand"
          >
            <Heart
              className={cn("size-4", fav && "fill-brand text-brand")}
            />
          </button>
        </div>
        <div className="p-4">
          <p className="text-base font-bold tabular-nums text-ink">
            {formatTzs(property.price)}
            {property.listingType === "rent" ? (
              <span className="text-sm font-medium text-muted"> / month</span>
            ) : null}
          </p>
          <h3 className="mt-1 text-[15px] font-semibold text-ink">
            {property.title}
          </h3>
          <p className="mt-0.5 text-sm text-muted">{property.location}</p>
          <div className="mt-3 flex items-center gap-4 text-xs text-muted">
            {property.beds != null ? (
              <span className="inline-flex items-center gap-1">
                <BedDouble className="size-3.5" /> {property.beds}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <BedDouble className="size-3.5" /> —
              </span>
            )}
            {property.baths != null ? (
              <span className="inline-flex items-center gap-1">
                <Bath className="size-3.5" /> {property.baths}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Bath className="size-3.5" /> —
              </span>
            )}
            <span className="inline-flex items-center gap-1">
              <LandPlot className="size-3.5" /> {property.area} m²
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
