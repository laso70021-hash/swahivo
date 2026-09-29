import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  Home,
  LandPlot,
  Store,
  Warehouse,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/section";
import { PropertyCard } from "@/components/property-card";
import { SearchPanel } from "@/components/search-panel";
import {
  blogPosts,
  locations,
  properties,
  propertyTypes,
} from "@/lib/data";

export const Route = createFileRoute("/")({ component: HomePage });

const typeIcons = {
  apartment: Building2,
  house: Home,
  villa: Home,
  plot: LandPlot,
  commercial: Store,
  condo: Warehouse,
} as const;

function HomePage() {
  const featured = properties.filter((p) => p.featured).slice(0, 8);
  const locRail = useRef<HTMLDivElement>(null);
  const areaRail = useRef<HTMLDivElement>(null);

  function scroll(ref: React.RefObject<HTMLDivElement | null>, dir: 1 | -1) {
    ref.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  }

  return (
    <main>
      <section className="relative isolate min-h-[520px] overflow-hidden sm:min-h-[580px]">
        <img
          src="/images/hero.jpg"
          alt="Luxury living room in a tropical villa"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent" />
        <div className="site-container relative flex min-h-[520px] flex-col justify-center py-16 sm:min-h-[580px]">
          <div className="max-w-xl">
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-paper sm:text-5xl">
              Your Dream Home Awaits, Start Living Today
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-paper/85 sm:text-base">
              Discover verified properties for sale or rent across Zanzibar
              & Tanzania.
            </p>
            <div className="mt-8 max-w-lg">
              <SearchPanel />
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          title="Explore Popular Locations"
          to="/locations"
          linkLabel="View all locations"
        />
        <div className="relative">
          <div
            ref={locRail}
            className="flex gap-4 overflow-x-auto pb-2 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to="/locations/$slug"
                params={{ slug: loc.slug }}
                className="group relative h-44 w-40 shrink-0 overflow-hidden rounded-2xl sm:h-48 sm:w-44"
              >
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 text-paper">
                  <p className="text-sm font-semibold">{loc.name}</p>
                  <p className="text-xs text-paper/80">
                    {loc.count.toLocaleString()} Properties
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next locations"
            onClick={() => scroll(locRail, 1)}
            className="absolute -right-2 top-1/2 hidden size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-paper text-ink shadow-card sm:grid"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          title="Latest Properties on the Market"
          to="/listings"
          linkLabel="View all properties"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-5 md:grid-cols-3">
          <FeatureCard
            image="/images/features/dream.jpg"
            title="Find Your Dream Home"
            body="Browse thousands of verified properties for sale or rent in the best locations."
            to="/listings"
            cta="Explore Listings"
          />
          <FeatureCard
            image="/images/features/sell.jpg"
            title="Sell Your Property Fast"
            body="List your property and reach serious buyers or renters quickly and easily."
            to="/add-listing"
            cta="List Your Property"
          />
          <FeatureCard
            image="/images/features/invest.jpg"
            title="Invest in Real Estate"
            body="Discover high-return investment opportunities in growing markets."
            to="/investments"
            cta="Explore Investments"
          />
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="mb-7 text-xl font-bold tracking-tight text-ink sm:text-[22px]">
          Browse Properties by Type
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {propertyTypes.map((t) => {
            const Icon = typeIcons[t.id];
            return (
              <Link
                key={t.id}
                to="/listings"
                search={{ type: t.id }}
                className="flex flex-col items-center rounded-xl border border-line bg-paper px-3 py-6 text-center shadow-card transition-[box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 text-sm font-semibold text-ink">{t.label}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {t.count.toLocaleString()} Listings
                </p>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section className="pt-0">
        <div className="overflow-hidden rounded-2xl bg-brand-soft">
          <div className="grid items-center md:grid-cols-[1.1fr_1.2fr]">
            <img
              src="/images/misc/valuation.jpg"
              alt="Modern living room"
              className="h-56 w-full object-cover md:h-full"
            />
            <div className="relative p-8 sm:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Free tool
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-[28px]">
                Get Your Property Valuation
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
                Find out how much your property is worth in today's market.
                Our tool uses real data to provide accurate and up-to-date
                estimates.
              </p>
              <Link
                to="/valuation"
                className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover"
              >
                Get Free Valuation
                <ArrowRight className="size-4" />
              </Link>
              <Home className="pointer-events-none absolute -right-4 bottom-4 size-36 text-brand/15" />
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-0">
        <h2 className="mb-7 text-xl font-bold tracking-tight text-ink sm:text-[22px]">
          Popular Areas in Tanzania
        </h2>
        <div className="relative">
          <div
            ref={areaRail}
            className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {locations.map((loc) => (
              <Link
                key={loc.slug}
                to="/locations/$slug"
                params={{ slug: loc.slug }}
                className="w-44 shrink-0 sm:w-48"
              >
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="h-28 w-full object-cover sm:h-32"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-ink">{loc.name}</p>
                <p className="text-xs text-muted">
                  {loc.count.toLocaleString()} Properties
                </p>
              </Link>
            ))}
          </div>
          <button
            type="button"
            aria-label="Next areas"
            onClick={() => scroll(areaRail, 1)}
            className="absolute -right-2 top-12 hidden size-9 place-items-center rounded-full border border-line bg-paper shadow-card sm:grid"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </Section>

      <Section className="pt-0">
        <SectionHeading
          title="Latest from Our Blog"
          to="/blog"
          linkLabel="View all articles"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-paper px-2 py-1 text-[11px] font-semibold text-ink">
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-muted">
                  {post.date} · {post.readMins} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section className="pt-0 pb-16">
        <div className="overflow-hidden rounded-2xl bg-canvas">
          <div className="grid items-center md:grid-cols-[1.1fr_1fr]">
            <div className="p-8 sm:p-12">
              <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Ready to Find Your Perfect Property?
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                Join thousands of satisfied clients who found their dream
                properties with Swahivo.
              </p>
              <Link
                to="/listings"
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover"
              >
                Browse All Listings
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <img
              src="/images/misc/cta-villa.jpg"
              alt="Luxury villa with pool at dusk"
              className="h-56 w-full object-cover md:h-full"
            />
          </div>
        </div>
      </Section>
    </main>
  );
}

function FeatureCard({
  image,
  title,
  body,
  to,
  cta,
}: {
  image: string;
  title: string;
  body: string;
  to: "/listings" | "/add-listing" | "/investments";
  cta: string;
}) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-paper shadow-card">
      <img src={image} alt="" className="h-44 w-full object-cover" />
      <div className="p-5">
        <h3 className="text-base font-bold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        <Link
          to={to}
          className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-lg border border-line px-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
        >
          {cta}
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}
