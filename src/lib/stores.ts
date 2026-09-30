import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ListingType, Property, PropertyType } from "@/lib/data";

export type UserRole = "admin" | "agent" | "user";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  agentId?: string;
  phone?: string;
};

export const SUPER_ADMIN_EMAIL = "nithonia67@gmail.com";

export function determineUserRole(email: string, requestedRole?: UserRole): { role: UserRole; agentId?: string } {
  const normalized = email.trim().toLowerCase();
  if (normalized === SUPER_ADMIN_EMAIL.toLowerCase()) {
    return { role: "admin" };
  }
  if (normalized === "aisha@swahivo.com") return { role: "agent", agentId: "aisha-mwinyi" };
  if (normalized === "daniel@swahivo.com") return { role: "agent", agentId: "daniel-msuya" };
  if (normalized === "neema@swahivo.com") return { role: "agent", agentId: "neema-lyimo" };
  if (normalized === "omar@swahivo.com") return { role: "agent", agentId: "omar-juma" };
  if (normalized === "zahra@swahivo.com") return { role: "agent", agentId: "zahra-hassan" };
  if (normalized === "jabari@swahivo.com") return { role: "agent", agentId: "jabari-mwakasege" };
  if (requestedRole) {
    return { role: requestedRole, agentId: requestedRole === "agent" ? `agent-${normalized.split("@")[0]}` : undefined };
  }
  return { role: "user" };
}

type SessionState = {
  user: SessionUser | null;
  login: (email: string, name?: string, role?: UserRole, agentId?: string) => void;
  updateUser: (updates: Partial<SessionUser>) => void;
  logout: () => void;
};

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, name, role, agentId) => {
        const normEmail = email.trim().toLowerCase();
        const resolved = determineUserRole(normEmail, role);
        set({
          user: {
            id: resolved.role === "admin" ? "admin-nithonia" : `user-${normEmail.split("@")[0]}`,
            email: normEmail,
            name: name?.trim() || (resolved.role === "admin" ? "Super Administrator" : normEmail.split("@")[0] || "User"),
            role: resolved.role,
            agentId: agentId || resolved.agentId,
          },
        });
      },
      updateUser: (updates) =>
        set((s) => ({
          user: s.user ? { ...s.user, ...updates } : null,
        })),
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
