import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bath,
  BedDouble,
  Heart,
  LandPlot,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { PropertyCard } from "@/components/property-card";
import { getAgent, getProperty, properties } from "@/lib/data";
import { toProperty, useFavorites, useUserListings } from "@/lib/stores";
import { cn, formatTzs } from "@/lib/utils";

export const Route = createFileRoute("/listings_/$id")({
  component: PropertyPage,
});

function PropertyPage() {
  const { id } = Route.useParams();
  const extras = useUserListings((s) => s.extras).map(toProperty);
  const property = getProperty(id) ?? extras.find((p) => p.id === id);
  if (!property) throw notFound();
  const agent = getAgent(property.agentId);
  const similar = properties
    .filter((p) => p.id !== property.id && p.city === property.city)
    .slice(0, 3);
  const fav = useFavorites((s) => s.has(property.id));
  const toggle = useFavorites((s) => s.toggle);
  const [active, setActive] = useState(property.gallery[0] ?? property.image);

  return (
    <main className="site-container py-10">
      <p className="text-sm text-muted">
        <Link to="/listings" className="hover:text-ink">
          Listings
        </Link>{" "}
        / {property.title}
      </p>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <div className="overflow-hidden rounded-2xl bg-canvas">
            <img
              src={active}
              alt={property.title}
              className="block aspect-[16/10] h-auto w-full object-cover"
            />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {(property.gallery.length ? property.gallery : [property.image]).map(
              (src) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActive(src)}
                  className={cn(
                    "overflow-hidden rounded-lg border-2",
                    active === src ? "border-brand" : "border-transparent",
                  )}
                >
                  <img src={src} alt="" className="block h-20 w-full object-cover" />
                </button>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span
                className={cn(
                  "inline-flex rounded-md px-2 py-1 text-[11px] font-semibold text-paper",
                  property.listingType === "sale" ? "bg-brand" : "bg-rent",
                )}
              >
                {property.listingType === "sale" ? "For Sale" : "For Rent"}
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink">
                {property.title}
              </h1>
              <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted">
                <MapPin className="size-4" /> {property.location}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold tabular-nums text-ink">
                {formatTzs(property.price)}
                {property.listingType === "rent" ? (
                  <span className="text-sm font-medium text-muted"> / month</span>
                ) : null}
              </p>
              <button
                type="button"
                onClick={() => toggle(property.id)}
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-brand"
              >
                <Heart className={cn("size-4", fav && "fill-brand text-brand")} />
                {fav ? "Saved" : "Save"}
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 rounded-xl border border-line bg-canvas px-5 py-4 text-sm text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <BedDouble className="size-4" /> {property.beds ?? "—"} Beds
            </span>
            <span className="inline-flex items-center gap-2">
              <Bath className="size-4" /> {property.baths ?? "—"} Baths
            </span>
            <span className="inline-flex items-center gap-2">
              <LandPlot className="size-4" /> {property.area} m²
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand" /> Verified listing
            </span>
          </div>

          <h2 className="mt-8 text-lg font-bold text-ink">About this property</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">
            {property.description}
          </p>
          {property.yearBuilt ? (
            <p className="mt-2 text-sm text-muted">
              Year built: {property.yearBuilt}
            </p>
          ) : null}

          <h2 className="mt-8 text-lg font-bold text-ink">Amenities</h2>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {property.amenities.map((a) => (
              <li
                key={a}
                className="rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink-soft"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-4">
          {agent ? (
            <div className="rounded-xl border border-line bg-paper p-5 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                Listed by
              </p>
              <Link
                to="/agents/$id"
                params={{ id: agent.id }}
                className="mt-3 flex items-center gap-3"
              >
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="size-14 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-ink">{agent.name}</p>
                  <p className="text-sm text-muted">{agent.role}</p>
                </div>
              </Link>
              <a
                href={`tel:${agent.phone}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink"
              >
                <Phone className="size-4" /> {agent.phone}
              </a>
            </div>
          ) : null}

          <form
            className="rounded-xl border border-line bg-paper p-5 shadow-card"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Enquiry sent. An agent will call you shortly.");
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <h2 className="text-base font-bold text-ink">Request a viewing</h2>
            <div className="mt-4 space-y-3">
              <Field label="Name" name="name" />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <label className="block text-sm font-medium text-ink">
                Message
                <textarea
                  name="message"
                  rows={4}
                  defaultValue={`I am interested in ${property.title}.`}
                  className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
                />
              </label>
              <button
                type="submit"
                className="h-11 w-full rounded-lg bg-brand text-sm font-semibold text-paper hover:bg-brand-hover"
              >
                Send enquiry
              </button>
            </div>
          </form>
        </aside>
      </div>

      {similar.length ? (
        <div className="mt-14">
          <h2 className="mb-5 text-xl font-bold text-ink">Similar nearby</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
}: {
  label: string;
  name: string;
  type?: string;
}) {
  return (
    <label className="block text-sm font-medium text-ink">
      {label}
      <input
        name={name}
        type={type}
        required
        className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
