import { create } from "zustand";
import { persist } from "zustand/middleware";
import { locations as defaultLocations } from "@/lib/data";
import type { DbLocation } from "@/lib/server-api";
import { getLocationsFn } from "@/lib/server-api";

type LocationsState = {
  locations: DbLocation[];
  isLoaded: boolean;
  isLoading: boolean;
  loadLocations: () => Promise<void>;
  setLocations: (locations: DbLocation[]) => void;
  addLocationLocal: (loc: DbLocation) => void;
  updateLocationLocal: (slug: string, updates: Partial<DbLocation>) => void;
  deleteLocationLocal: (slug: string) => void;
};

const initialLocs: DbLocation[] = defaultLocations.map((l) => ({
  ...l,
  is_branch: l.slug === "zanzibar" || l.slug === "dar-es-salaam" || l.slug === "arusha",
  branch_status: l.slug === "zanzibar" ? "main" : (l.slug === "dar-es-salaam" || l.slug === "arusha") ? "coming_soon" : null,
}));

export const useLocationsStore = create<LocationsState>()(
  persist(
    (set, get) => ({
      locations: initialLocs,
      isLoaded: false,
      isLoading: false,

      loadLocations: async () => {
        if (get().isLoading) return;
        set({ isLoading: true });
        try {
          const locs = await getLocationsFn();
          if (Array.isArray(locs) && locs.length > 0) {
            set({ locations: locs, isLoaded: true });
          }
        } catch (err) {
          console.error("[locations-store] failed to load locations from server:", err);
        } finally {
          set({ isLoading: false });
        }
      },

      setLocations: (locations) => set({ locations, isLoaded: true }),

      addLocationLocal: (loc) =>
        set((s) => ({
          locations: [
            ...s.locations.filter((x) => x.slug !== loc.slug),
            loc,
          ],
        })),

      updateLocationLocal: (slug, updates) =>
        set((s) => ({
          locations: s.locations.map((loc) =>
            loc.slug === slug ? { ...loc, ...updates } : loc,
          ),
        })),

      deleteLocationLocal: (slug) =>
        set((s) => ({
          locations: s.locations.filter((x) => x.slug !== slug),
        })),
    }),
    {
      name: "swahivo-locations-v1",
      partialize: (state) => ({ locations: state.locations }),
    },
  ),
);

/** Hook to automatically fetch and access dynamic locations across the entire site */
export function useLocations() {
  const locations = useLocationsStore((s) => s.locations);
  const isLoading = useLocationsStore((s) => s.isLoading);
  const loadLocations = useLocationsStore((s) => s.loadLocations);

  return {
    locations,
    isLoading,
    refresh: loadLocations,
    cities: Array.from(new Set(locations.map((l) => l.name))),
    getLocation: (slug: string) =>
      locations.find((l) => l.slug.toLowerCase() === slug.toLowerCase()),
    mainBranch: locations.find((l) => l.branch_status === "main"),
    comingSoonBranches: locations.filter((l) => l.branch_status === "coming_soon"),
  };
}
