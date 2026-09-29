import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";
import { useSession, useUserListings } from "@/lib/stores";
import { slugify } from "@/lib/utils";
import type { ListingType, PropertyType } from "@/lib/data";

export const Route = createFileRoute("/add-listing")({
  component: AddListingPage,
});

function AddListingPage() {
  const user = useSession((s) => s.user);
  const add = useUserListings((s) => s.add);
  const navigate = useNavigate();
  const [deal, setDeal] = useState<ListingType>("sale");
  const [type, setType] = useState<PropertyType>("house");

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
        subtitle="Reach serious buyers and renters across Tanzania. We review documents before going live."
        image="/images/properties/beach-villa.jpg"
      />
      <form
        className="site-container max-w-2xl space-y-4 py-12"
        onSubmit={(e) => {
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
          const id = `${slugify(title) || "listing"}-${Date.now()}`;
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
          toast.success("Listing submitted for review.");
          navigate({ to: "/listings/$id", params: { id } });
        }}
      >
        <label className="block text-sm font-medium">
          Title
          <input
            name="title"
            required
            placeholder="Modern 4-Bedroom House"
            className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            City
            <select
              name="city"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm"
            >
              <option>Dar es Salaam</option>
              <option>Zanzibar</option>
              <option>Arusha</option>
              <option>Mwanza</option>
              <option>Dodoma</option>
              <option>Tanga</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Area / neighbourhood
            <input
              name="area"
              required
              placeholder="Mbezi Beach"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Buy or rent
            <select
              value={deal}
              onChange={(e) => setDeal(e.target.value as ListingType)}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm"
            >
              <option value="sale">For sale</option>
              <option value="rent">For rent</option>
            </select>
          </label>
          <label className="text-sm font-medium">
            Property type
            <select
              value={type}
              onChange={(e) => setType(e.target.value as PropertyType)}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm"
            >
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="commercial">Commercial</option>
              <option value="condo">Condo</option>
            </select>
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-4">
          <label className="text-sm font-medium sm:col-span-2">
            Price (TZS)
            <input
              name="price"
              required
              type="number"
              min={1}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
            />
          </label>
          <label className="text-sm font-medium">
            Beds
            <input
              name="beds"
              type="number"
              min={0}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
            />
          </label>
          <label className="text-sm font-medium">
            Baths
            <input
              name="baths"
              type="number"
              min={0}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
            />
          </label>
        </div>
        <label className="block text-sm font-medium">
          Area (m²)
          <input
            name="size"
            required
            type="number"
            min={1}
            className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
          />
        </label>
        <label className="block text-sm font-medium">
          Description
          <textarea
            name="description"
            required
            rows={5}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none"
          />
        </label>
        <button
          type="submit"
          className="h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
        >
          Submit listing
        </button>
      </form>
    </main>
  );
}
