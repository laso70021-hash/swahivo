import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocations } from "@/lib/locations-store";

export type SearchValues = {
  q: string;
  city?: string;
  type: string;
  deal: string;
  price: string;
  beds: string;
};

const empty: SearchValues = {
  q: "",
  city: "",
  type: "",
  deal: "",
  price: "",
  beds: "",
};

export function SearchPanel({
  variant = "hero",
  initial,
}: {
  variant?: "hero" | "page";
  initial?: Partial<SearchValues>;
}) {
  const navigate = useNavigate();
  const { cities } = useLocations();
  const [values, setValues] = useState<SearchValues>({ ...empty, ...initial });

  const initialQ = initial?.q;
  const initialCity = initial?.city;
  const initialType = initial?.type;
  const initialDeal = initial?.deal;
  const initialPrice = initial?.price;
  const initialBeds = initial?.beds;

  useEffect(() => {
    setValues({
      q: initialQ ?? "",
      city: initialCity ?? "",
      type: initialType ?? "",
      deal: initialDeal ?? "",
      price: initialPrice ?? "",
      beds: initialBeds ?? "",
    });
  }, [initialQ, initialCity, initialType, initialDeal, initialPrice, initialBeds]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    navigate({
      to: "/listings",
      search: {
        q: values.q || undefined,
        city: values.city || undefined,
        type: values.type || undefined,
        deal: values.deal || undefined,
        price: values.price || undefined,
        beds: values.beds || undefined,
      },
    });
  }

  const selectClass = cn(
    "h-11 rounded-lg border border-line bg-paper px-3 text-sm text-ink outline-none",
    variant === "hero" && "min-w-0 flex-1 shadow-sm",
  );

  return (
    <form onSubmit={submit} className="w-full">
      <div
        className={cn(
          "flex overflow-hidden rounded-full bg-paper shadow-card",
          variant === "page" && "rounded-xl border border-line",
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2 px-4">
          <Search className="size-4 shrink-0 text-muted" />
          <input
            value={values.q}
            onChange={(e) => setValues((v) => ({ ...v, q: e.target.value }))}
            placeholder="Enter keyword or area (e.g. Masaki, Stone Town, Njiro)"
            className="h-12 min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
        </div>
        <button
          type="submit"
          className="m-1 rounded-full bg-brand px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover"
        >
          Search
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        <select
          className={selectClass}
          value={values.city || ""}
          onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))}
        >
          <option value="">All Locations</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className={selectClass}
          value={values.type}
          onChange={(e) => setValues((v) => ({ ...v, type: e.target.value }))}
        >
          <option value="">All Types</option>
          <option value="apartment">Apartments</option>
          <option value="house">Houses</option>
          <option value="villa">Villas</option>
          <option value="plot">Plots</option>
          <option value="commercial">Commercial</option>
          <option value="condo">Condos</option>
        </select>

        <select
          className={selectClass}
          value={values.deal}
          onChange={(e) => setValues((v) => ({ ...v, deal: e.target.value }))}
        >
          <option value="">Buy / Rent</option>
          <option value="sale">Buy</option>
          <option value="rent">Rent</option>
        </select>

        <select
          className={selectClass}
          value={values.price}
          onChange={(e) => setValues((v) => ({ ...v, price: e.target.value }))}
        >
          <option value="">Any Price</option>
          <option value="100m">Under TZS 100M</option>
          <option value="300m">Under TZS 300M</option>
          <option value="500m">Under TZS 500M</option>
          <option value="1b">Under TZS 1B</option>
        </select>

        <select
          className={selectClass}
          value={values.beds}
          onChange={(e) => setValues((v) => ({ ...v, beds: e.target.value }))}
        >
          <option value="">All Bedrooms</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+</option>
          <option value="4">4+</option>
        </select>
      </div>
    </form>
  );
}
