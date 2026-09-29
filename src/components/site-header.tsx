import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Home, Menu, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { propertyTypes } from "@/lib/data";
import { useHydrated } from "@/lib/hydrated";
import { useFavorites, useSession } from "@/lib/stores";

const nav = [
  { to: "/", label: "Home" },
  { to: "/listings", label: "Listings", dropdown: true },
  { to: "/agents", label: "Agents" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const user = useSession((s) => s.user);
  const favCount = useFavorites((s) => s.ids.length);
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [listingsOpen, setListingsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="site-container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-paper">
            <Home className="size-4" strokeWidth={2.4} />
          </span>
          <span className="text-lg font-bold tracking-tight text-ink">Swahivo</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((item) =>
            "dropdown" in item && item.dropdown ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setListingsOpen(true)}
                onMouseLeave={() => setListingsOpen(false)}
              >
                <Link
                  to={item.to}
                  search={{}}
                  className={cn(
                    "inline-flex items-center gap-1 text-sm font-medium transition-colors duration-150",
                    pathname.startsWith("/listings")
                      ? "text-ink"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  Listings
                  <ChevronDown className="size-3.5" />
                </Link>
                <div
                  className={cn(
                    "absolute left-1/2 top-full z-40 w-52 -translate-x-1/2 pt-3 transition-opacity duration-150",
                    listingsOpen
                      ? "pointer-events-auto opacity-100"
                      : "pointer-events-none opacity-0",
                  )}
                >
                  <div className="overflow-hidden rounded-xl border border-line bg-paper py-2 shadow-card">
                    <Link
                      to="/listings"
                      search={{}}
                      className="block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                    >
                      All listings
                    </Link>
                    <Link
                      to="/listings"
                      search={{ deal: "sale" }}
                      className="block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                    >
                      For sale
                    </Link>
                    <Link
                      to="/listings"
                      search={{ deal: "rent" }}
                      className="block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                    >
                      For rent
                    </Link>
                    <div className="my-1 h-px bg-line" />
                    {propertyTypes.map((t) => (
                      <Link
                        key={t.id}
                        to="/listings"
                        search={{ type: t.id }}
                        className="block px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "text-sm font-medium transition-colors duration-150",
                  pathname === item.to ? "text-ink" : "text-ink-soft hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/favorites"
            aria-label="Saved properties"
            className="relative grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
          >
            <Heart className="size-5" />
            {hydrated && favCount > 0 ? (
              <span className="absolute right-1 top-1 grid size-4 place-items-center rounded-full bg-brand text-[10px] font-semibold text-paper">
                {favCount}
              </span>
            ) : null}
          </Link>
          <Link
            to="/login"
            className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline"
          >
            {hydrated && user ? user.name : "Log In"}
          </Link>
          <Link
            to="/add-listing"
            className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-3.5 text-sm font-semibold text-paper transition-colors duration-150 hover:bg-brand-hover active:scale-[0.96] sm:px-4"
          >
            <Plus className="size-4" />
            Add Listing
          </Link>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="site-container flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium text-ink"
            >
              {hydrated && user ? "Account" : "Log In"}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
