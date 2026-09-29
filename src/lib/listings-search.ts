import type { Property } from "@/lib/data";

export type ListingsSearch = {
  q?: string;
  type?: string;
  deal?: string;
  price?: string;
  beds?: string;
  city?: string;
};

export function validateListingsSearch(
  s: Record<string, unknown>,
): ListingsSearch {
  const str = (key: string) =>
    typeof s[key] === "string" && s[key] ? (s[key] as string) : undefined;
  return {
    q: str("q"),
    type: str("type"),
    deal: str("deal"),
    price: str("price"),
    beds: str("beds"),
    city: str("city"),
  };
}

const priceCap: Record<string, number> = {
  "100m": 100_000_000,
  "300m": 300_000_000,
  "500m": 500_000_000,
  "1b": 1_000_000_000,
};

export function filterProperties(
  list: Property[],
  search: ListingsSearch,
): Property[] {
  return list.filter((p) => {
    if (search.q) {
      const q = search.q.toLowerCase();
      const hay = `${p.title} ${p.location} ${p.city} ${p.propertyType}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (search.type && p.propertyType !== search.type) return false;
    if (search.deal && p.listingType !== search.deal) return false;
    if (search.city && p.city.toLowerCase() !== search.city.toLowerCase())
      return false;
    if (search.beds) {
      const min = Number(search.beds);
      if (p.beds == null || p.beds < min) return false;
    }
    if (search.price && priceCap[search.price] != null) {
      if (p.price > priceCap[search.price]) return false;
    }
    return true;
  });
}
