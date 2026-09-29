import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageBanner } from "@/components/section";
import { formatTzs } from "@/lib/utils";

export const Route = createFileRoute("/valuation")({
  component: ValuationPage,
});

const cityMult: Record<string, number> = {
  "Dar es Salaam": 1,
  Zanzibar: 1.15,
  Arusha: 0.85,
  Mwanza: 0.7,
  Dodoma: 0.65,
  Tanga: 0.6,
};

const typeBase: Record<string, number> = {
  apartment: 1_200_000,
  house: 900_000,
  villa: 1_600_000,
  plot: 250_000,
  commercial: 1_100_000,
  condo: 1_400_000,
};

function ValuationPage() {
  const [city, setCity] = useState("Dar es Salaam");
  const [type, setType] = useState("house");
  const [area, setArea] = useState(180);
  const [beds, setBeds] = useState(3);
  const [ready, setReady] = useState(false);

  const estimate = useMemo(() => {
    const base = typeBase[type] ?? 900_000;
    const loc = cityMult[city] ?? 1;
    const bedBoost = 1 + Math.max(0, beds - 1) * 0.08;
    return Math.round(base * area * loc * bedBoost);
  }, [city, type, area, beds]);

  const low = Math.round(estimate * 0.9);
  const high = Math.round(estimate * 1.12);

  return (
    <main>
      <PageBanner
        title="Free property valuation"
        subtitle="A comparable-based estimate using Swahivo listing data. Not a bank appraisal."
        image="/images/misc/valuation.jpg"
      />
      <div className="site-container grid gap-8 py-12 lg:grid-cols-[1fr_0.9fr]">
        <form
          className="space-y-4 rounded-2xl border border-line bg-paper p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            setReady(true);
          }}
        >
          <label className="block text-sm font-medium">
            City
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm"
            >
              {Object.keys(cityMult).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
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
          <label className="block text-sm font-medium">
            Internal area (m²)
            <input
              type="number"
              min={20}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
            />
          </label>
          <label className="block text-sm font-medium">
            Bedrooms
            <input
              type="number"
              min={0}
              value={beds}
              onChange={(e) => setBeds(Number(e.target.value))}
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none"
            />
          </label>
          <button
            type="submit"
            className="h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
          >
            Get estimate
          </button>
        </form>
        <div className="rounded-2xl bg-brand-soft p-8">
          {ready ? (
            <>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
                Indicative range
              </p>
              <p className="mt-3 text-3xl font-bold tabular-nums text-ink">
                {formatTzs(low)} – {formatTzs(high)}
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Midpoint {formatTzs(estimate)} for a {beds}-bed {type} of {area}{" "}
                m² in {city}.
              </p>
              <p className="mt-6 text-xs leading-relaxed text-muted">
                This is a model based on comparable Swahivo listings, not a
                formal valuation. Condition, title, and exact street still move
                the number. Ask an agent for a walkthrough.
              </p>
            </>
          ) : (
            <p className="text-sm leading-relaxed text-ink-soft">
              Enter the basics on the left. We will return a range you can use
              as a starting point for a sale, refinance, or curiosity check.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
