import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";
import { useSession, useUserListings } from "@/lib/stores";
import { slugify } from "@/lib/utils";
import type { ListingType, PropertyType } from "@/lib/data";
import { createListingFn } from "@/lib/server-api";
import { useLocations } from "@/lib/locations-store";

export const Route = createFileRoute("/add-listing")({
  component: AddListingPage,
});

const sampleImages = [
  { url: "/images/properties/modern-house.jpg", label: "Modern Villa / House" },
  { url: "/images/properties/luxury-apt.jpg", label: "Luxury Apartment" },
  { url: "/images/properties/beach-villa.jpg", label: "Beachfront Villa" },
  { url: "/images/properties/interior-kitchen.jpg", label: "Contemporary Kitchen" },
  { url: "/images/properties/studio.jpg", label: "Studio / Condo" },
  { url: "/images/properties/house-dusk.jpg", label: "Evening Residence" },
];

function AddListingPage() {
  const user = useSession((s) => s.user);
  const add = useUserListings((s) => s.add);
  const navigate = useNavigate();
  const { cities } = useLocations();
  const [deal, setDeal] = useState<ListingType>("sale");
  const [type, setType] = useState<PropertyType>("house");
  const [selectedImage, setSelectedImage] = useState(sampleImages[0].url);
  const [submitting, setSubmitting] = useState(false);
  const [limitError, setLimitError] = useState<string | null>(null);

  if (!user) {
    return (
      <main>
        <PageBanner
          title="Add a listing"
          subtitle="Sign in to publish a verified property on Swahivo."
          image="/images/properties/modern-house.jpg"
        />
        <div className="site-container py-16 text-center">
          <p className="text-sm text-muted">
            You need to be logged in to list a property.
          </p>
          <Link
            to="/login"
            className="mt-5 inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
          >
            Log in to continue
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageBanner
        title="Add Listing"
        subtitle="Reach serious buyers and renters across Tanzania. Verified documentation and immediate marketplace visibility."
        image="/images/properties/beach-villa.jpg"
      />

      <div className="site-container max-w-2xl py-12">
        {/* Ownership & Limit Info */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-line bg-canvas p-4 text-sm">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="size-5 text-emerald-600" />
            <div>
              <p className="font-semibold text-ink">
                Listing as: {user.name} ({user.role === "admin" ? "Super Admin" : user.role === "agent" ? "Certified Agent" : "Registered User"})
              </p>
              <p className="text-xs text-muted">
                Ownership and listing limits are automatically enforced on the server.
              </p>
            </div>
          </div>
          {user.role === "agent" ? (
            <Link
              to="/agent/dashboard"
              className="text-xs font-semibold text-brand hover:underline"
            >
              My Dashboard
            </Link>
          ) : null}
        </div>

        {limitError ? (
          <div className="mb-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
            <div className="flex items-start gap-3">
              <AlertCircle className="size-5 shrink-0 text-amber-600" />
              <div>
                <p className="font-semibold">Listing Limit Reached</p>
                <p className="mt-1 text-xs text-amber-800">{limitError}</p>
                <div className="mt-3">
                  <Link
                    to="/agent/dashboard"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-xs font-bold text-paper hover:bg-brand-hover"
                  >
                    <Sparkles className="size-3.5" />
                    Upgrade Subscription Plan
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <form
          className="space-y-5 rounded-2xl border border-line bg-paper p-6 sm:p-8"
          onSubmit={async (e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const title = String(fd.get("title") || "");
            const city = String(fd.get("city") || "");
            const areaName = String(fd.get("area") || "");
            const price = Number(fd.get("price") || 0);
            const bedsRaw = String(fd.get("beds") || "");
            const bathsRaw = String(fd.get("baths") || "");
            const area = Number(fd.get("size") || 0);
            const description = String(fd.get("description") || "");

            setSubmitting(true);
            setLimitError(null);

            try {
              const created = await createListingFn({
                data: {
                  session: user,
                  property: {
                    title,
                    city,
                    location: `${areaName ? `${areaName}, ` : ""}${city}`,
                    price,
                    listing_type: deal,
                    property_type: type,
                    beds: bedsRaw ? Number(bedsRaw) : null,
                    baths: bathsRaw ? Number(bathsRaw) : null,
                    area,
                    description,
                    image: selectedImage,
                    gallery: [selectedImage, "/images/properties/interior-kitchen.jpg", "/images/properties/interior-bedroom.jpg"],
                  },
                },
              });

              // Also record in client store
              const id = created?.id || `${slugify(title) || "listing"}-${Date.now()}`;
              add({
                id,
                title,
                city,
                areaName,
                price,
                listingType: deal,
                propertyType: type,
                beds: bedsRaw ? Number(bedsRaw) : null,
                baths: bathsRaw ? Number(bathsRaw) : null,
                area,
                description,
              });

              toast.success(
                user.role === "admin"
                  ? "Listing published and approved immediately!"
                  : "Listing submitted successfully!",
              );

              if (user.role === "agent") {
                navigate({ to: "/agent/dashboard" });
              } else {
                navigate({ to: "/listings/$id", params: { id } });
              }
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : "Error creating listing";
              if (msg.includes("limit reached")) {
                setLimitError(msg);
              } else {
                toast.error(msg);
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <div>
            <label className="block text-sm font-semibold text-ink">
              Property Title
            </label>
            <input
              name="title"
              required
              placeholder="e.g. Modern 4-Bedroom Villa with Swimming Pool"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-ink">City</label>
              <select
                name="city"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand bg-paper"
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">Area / Neighbourhood</label>
              <input
                name="area"
                required
                placeholder="e.g. Mbezi Beach, Masaki, Nungwi"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-ink">Deal Type</label>
              <select
                value={deal}
                onChange={(e) => setDeal(e.target.value as ListingType)}
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">Property Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as PropertyType)}
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="plot">Plot</option>
                <option value="commercial">Commercial</option>
                <option value="condo">Condo</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div className="sm:col-span-2">
              <label className="text-sm font-semibold text-ink">Price (TZS)</label>
              <input
                name="price"
                required
                type="number"
                min={1}
                placeholder="450000000"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">Bedrooms</label>
              <input
                name="beds"
                type="number"
                min={0}
                placeholder="4"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-ink">Bathrooms</label>
              <input
                name="baths"
                type="number"
                min={0}
                placeholder="3"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink">Floor Area (m²)</label>
            <input
              name="size"
              required
              type="number"
              min={1}
              placeholder="250"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
            />
          </div>

          {/* Primary Photo Selection */}
          <div>
            <label className="block text-sm font-semibold text-ink">
              Choose Primary Photo
            </label>
            <div className="mt-2 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
              {sampleImages.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-4/3 overflow-hidden rounded-lg border-2 transition-all ${
                    selectedImage === img.url ? "border-brand ring-2 ring-brand/20" : "border-line opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt="" className="size-full object-cover" />
                  {selectedImage === img.url ? (
                    <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-brand text-paper">
                      <CheckCircle2 className="size-3" />
                    </span>
                  ) : null}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink">Description & Highlights</label>
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Describe the property, features, title deed status, water & power supply, and nearby landmarks..."
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover disabled:opacity-50"
            >
              {submitting ? "Publishing listing..." : "Publish Listing"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
