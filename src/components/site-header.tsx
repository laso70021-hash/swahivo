import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronDown,
  Heart,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Settings,
  Shield,
  User,
  Wallet,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { propertyTypes } from "@/lib/data";
import { useHydrated } from "@/lib/hydrated";
import { SUPER_ADMIN_EMAIL, useFavorites, useSession } from "@/lib/stores";

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
  const logout = useSession((s) => s.logout);
  const favCount = useFavorites((s) => s.ids.length);
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);
  const [listingsOpen, setListingsOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const isAdmin =
    hydrated &&
    user &&
    (user.role === "admin" || user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase());

  const isAgent = hydrated && user && user.role === "agent";

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

          {/* User Profile dropdown */}
          {hydrated && user ? (
            <div
              className="relative hidden sm:block"
              onMouseEnter={() => setUserOpen(true)}
              onMouseLeave={() => setUserOpen(false)}
            >
              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-paper px-3 text-sm font-medium text-ink transition-colors hover:bg-canvas"
              >
                <span className="grid size-6 place-items-center rounded-full bg-canvas text-xs font-bold text-brand">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[110px] truncate">{user.name}</span>
                {isAdmin ? (
                  <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                    Admin
                  </span>
                ) : isAgent ? (
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                    Agent
                  </span>
                ) : null}
                <ChevronDown className="size-3.5 text-muted" />
              </button>

              <div
                className={cn(
                  "absolute right-0 top-full z-40 w-60 pt-2 transition-all duration-150",
                  userOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <div className="overflow-hidden rounded-xl border border-line bg-paper py-2 shadow-card">
                  <div className="border-b border-line px-4 py-2.5">
                    <p className="truncate text-sm font-bold text-ink">{user.name}</p>
                    <p className="truncate text-xs text-muted">{user.email}</p>
                  </div>

                  {isAdmin ? (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-brand hover:bg-canvas"
                    >
                      <Shield className="size-4" />
                      Admin Dashboard
                    </Link>
                  ) : null}

                  {isAgent ? (
                    <Link
                      to="/agent/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-bold text-emerald-600 hover:bg-canvas"
                    >
                      <LayoutDashboard className="size-4" />
                      Agent Dashboard
                    </Link>
                  ) : null}

                  {isAgent ? (
                    <Link
                      to="/agent/dashboard"
                      onClick={() => setUserOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                    >
                      <Wallet className="size-4" />
                      My Wallet & Credits
                    </Link>
                  ) : null}

                  <Link
                    to="/profile"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink font-medium"
                  >
                    <Settings className="size-4" />
                    Profile Settings
                  </Link>

                  <Link
                    to="/favorites"
                    onClick={() => setUserOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-ink-soft hover:bg-canvas hover:text-ink"
                  >
                    <Heart className="size-4" />
                    Saved Properties
                  </Link>

                  <div className="my-1 h-px bg-line" />

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setUserOpen(false);
                    }}
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="size-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden text-sm font-medium text-ink-soft hover:text-ink sm:inline"
            >
              Log In
            </Link>
          )}

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

            {hydrated && user ? (
              <div className="mt-2 border-t border-line pt-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Account ({user.email})
                </p>
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2.5 text-sm font-bold text-brand"
                  >
                    <Shield className="size-4" />
                    Admin Dashboard
                  </Link>
                ) : null}
                {isAgent ? (
                  <Link
                    to="/agent/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 py-2.5 text-sm font-bold text-emerald-600"
                  >
                    <LayoutDashboard className="size-4" />
                    Agent Dashboard
                  </Link>
                ) : null}
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 py-2.5 text-sm font-medium text-ink"
                >
                  <Settings className="size-4" />
                  Profile Settings
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="mt-2 flex items-center gap-2 text-sm font-medium text-rose-600"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink"
              >
                Log In
              </Link>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
