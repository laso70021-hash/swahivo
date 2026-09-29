import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ListingType, Property, PropertyType } from "@/lib/data";

type SessionUser = { name: string; email: string };

type SessionState = {
  user: SessionUser | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
};

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, name) =>
        set({
          user: {
            email,
            name: name?.trim() || email.split("@")[0] || "Guest",
          },
        }),
      logout: () => set({ user: null }),
    }),
    { name: "swahivo-session" },
  ),
);

type FavState = {
  ids: string[];
  toggle: (id: string) => void;
  has: (id: string) => boolean;
};

export const useFavorites = create<FavState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set({
          ids: get().ids.includes(id)
            ? get().ids.filter((x) => x !== id)
            : [...get().ids, id],
        }),
      has: (id) => get().ids.includes(id),
    }),
    { name: "swahivo-favorites" },
  ),
);

export type UserListing = {
  id: string;
  title: string;
  city: string;
  areaName: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  beds: number | null;
  baths: number | null;
  area: number;
  description: string;
};

type ListingState = {
  extras: UserListing[];
  add: (listing: UserListing) => void;
};

export const useUserListings = create<ListingState>()(
  persist(
    (set) => ({
      extras: [],
      add: (listing) => set((s) => ({ extras: [listing, ...s.extras] })),
    }),
    { name: "swahivo-user-listings" },
  ),
);

export function toProperty(listing: UserListing): Property {
  return {
    id: listing.id,
    title: listing.title,
    location: `${listing.areaName}, ${listing.city}`,
    city: listing.city,
    price: listing.price,
    listingType: listing.listingType,
    propertyType: listing.propertyType,
    beds: listing.beds,
    baths: listing.baths,
    area: listing.area,
    image: "/images/properties/modern-house.jpg",
    gallery: [
      "/images/properties/modern-house.jpg",
      "/images/properties/luxury-apt.jpg",
      "/images/properties/interior-kitchen.jpg",
    ],
    agentId: "aisha-mwinyi",
    description: listing.description,
    amenities: ["Parking", "Security", "Water tank"],
    yearBuilt: 2024,
    featured: true,
  };
}
