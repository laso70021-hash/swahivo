import { createFileRoute } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { agents } from "@/lib/data";

export const Route = createFileRoute("/about")({ component: AboutPage });

const stats = [
  ["12,000+", "Verified listings"],
  ["6", "Cities covered"],
  ["48", "Specialist agents"],
  ["2019", "Year founded"],
];

const values = [
  {
    title: "Verified first",
    body: "We do not publish a listing until title, seller identity, and basic condition have been checked.",
  },
  {
    title: "Local, not distant",
    body: "Every city has agents who live there. Advice is street-level, not a call centre script.",
  },
  {
    title: "Clear numbers",
    body: "Prices in TZS, fees explained up front, and no surprise ‘viewing charges’.",
  },
];

function AboutPage() {
  return (
    <main>
      <PageBanner
        title="About Swahivo"
        subtitle="A Tanzanian marketplace for people who want to buy, rent, or sell with confidence."
        image="/images/hero.jpg"
      />
      <div className="site-container py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Our story
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
              Built for Zanzibar & Tanzania
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Swahivo started in Dar es Salaam in 2019 after our founders spent
              months chasing unverified Facebook listings and incomplete titles.
              The idea was simple: a marketplace where every property is
              checked, every agent is named, and every price is honest.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Today we cover six cities, with a Zanzibar desk for island
              investment and a growing Dodoma book as the capital expands. We
              still take the same view — if we would not send our own family to
              view it, it does not go live.
            </p>
          </div>
          <img
            src="/images/locations/zanzibar.jpg"
            alt="Zanzibar"
            className="h-72 w-full rounded-2xl object-cover lg:h-full"
          />
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl bg-canvas px-6 py-8 sm:grid-cols-4">
          {stats.map(([n, l]) => (
            <div key={l} className="text-center">
              <p className="text-2xl font-bold text-ink">{n}</p>
              <p className="mt-1 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-xl font-bold text-ink">What we stand for</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {values.map((v) => (
            <article
              key={v.title}
              className="rounded-xl border border-line bg-paper p-6 shadow-card"
            >
              <h3 className="font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.body}</p>
            </article>
          ))}
        </div>

        <h2 className="mt-14 text-xl font-bold text-ink">Leadership on the ground</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {agents.map((a) => (
            <div key={a.id} className="text-center">
              <img
                src={a.photo}
                alt={a.name}
                className="mx-auto size-24 rounded-full object-cover object-top"
              />
              <p className="mt-2 text-sm font-semibold text-ink">{a.name}</p>
              <p className="text-xs text-muted">{a.city}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
