import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Edit,
  Eye,
  LayoutDashboard,
  Mail,
  MessageSquare,
  Phone,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  TrendingUp,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";
import { useSession } from "@/lib/stores";
import {
  deleteListingFn,
  getAgentDashboardFn,
  promotePropertyFn,
  topupWalletFn,
  updateInquiryStatusFn,
  updateListingFn,
  upgradeSubscriptionFn,
} from "@/lib/server-api";
import type {
  DbInquiry,
  DbPromotion,
  DbProperty,
  DbSubscriptionPlan,
  DbWallet,
  DbWalletTransaction,
} from "@/lib/swahivo-db.server";

export const Route = createFileRoute("/agent/dashboard")({
  component: AgentDashboardPage,
});

type AgentTab = "listings" | "promotions" | "leads" | "wallet" | "subscription";

export function AgentDashboardPage() {
  const user = useSession((s) => s.user);
  const [tab, setTab] = useState<AgentTab>("listings");
  const [loading, setLoading] = useState(true);

  // Agent data
  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [promotions, setPromotions] = useState<DbPromotion[]>([]);
  const [wallet, setWallet] = useState<DbWallet | null>(null);
  const [transactions, setTransactions] = useState<DbWalletTransaction[]>([]);
  const [inquiries, setInquiries] = useState<DbInquiry[]>([]);
  const [plans, setPlans] = useState<DbSubscriptionPlan[]>([]);

  // Modals
  const [promoteProperty, setPromoteProperty] = useState<DbProperty | null>(null);
  const [promoType, setPromoType] = useState<"FEATURED" | "BOOST">("FEATURED");
  const [promoDuration, setPromoDuration] = useState<7 | 14 | 30>(7);
  const [promoMethod, setPromoMethod] = useState<"wallet" | "m-pesa" | "airtel-money" | "card">("wallet");
  const [promoting, setPromoting] = useState(false);

  // Top up modal
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [topupAmount, setTopupAmount] = useState(50000);
  const [topupProvider, setTopupProvider] = useState("m-pesa");
  const [toppingUp, setToppingUp] = useState(false);

  // Upgrade modal
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("professional");
  const [upgrading, setUpgrading] = useState(false);

  // Edit property modal
  const [editingProperty, setEditingProperty] = useState<DbProperty | null>(null);

  const isAgentOrAdmin = user && (user.role === "agent" || user.role === "admin");

  async function loadDashboard() {
    if (!user) return;
    setLoading(true);
    try {
      const data = await getAgentDashboardFn({ data: user });
      setProperties(data.properties);
      setPromotions(data.promotions);
      setWallet(data.wallet);
      setTransactions(data.transactions);
      setInquiries(data.inquiries);
      setPlans(data.plans);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error loading agent dashboard";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAgentOrAdmin) {
      loadDashboard();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAgentOrAdmin, user?.email]);

  // Authorization gate
  if (!user || !isAgentOrAdmin) {
    return (
      <main>
        <PageBanner
          title="Agent Portal"
          subtitle="Exclusive dashboard for certified Swahivo real estate agents."
          image="/images/properties/beach-villa.jpg"
        />
        <div className="site-container py-16 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
            <LayoutDashboard className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-ink">Agent Authentication Required</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            You must be signed in as a licensed real estate agent to access your listings portfolio, monetization wallet, and client inquiries.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex h-11 items-center rounded-lg bg-emerald-600 px-6 text-sm font-semibold text-paper hover:bg-emerald-700"
            >
              Log in as Agent
            </Link>
            <Link
              to="/"
              className="inline-flex h-11 items-center rounded-lg border border-line px-6 text-sm font-semibold text-ink hover:bg-canvas"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Calculate greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Calculate pricing for promotion
  const currentPromoPrice =
    promoType === "FEATURED"
      ? promoDuration === 7
        ? 10000
        : promoDuration === 14
          ? 18000
          : 30000
      : promoDuration === 7
        ? 5000
        : promoDuration === 14
          ? 9000
          : 15000;

  // Active listings count
  const activeCount = properties.filter((p) => p.status === "APPROVED").length;
  const totalViews = properties.reduce((acc, p) => acc + (p.views_count || 0), 0);
  const totalInquiries = properties.reduce((acc, p) => acc + (p.inquiries_count || 0), 0);

  // Handle Promote
  async function handlePromoteSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!promoteProperty) return;
    setPromoting(true);

    try {
      await promotePropertyFn({
        data: {
          session: user,
          propertyId: promoteProperty.id,
          promotionType: promoType,
          durationDays: promoDuration,
          paymentMethod: promoMethod,
        },
      });

      toast.success(
        `Property promoted as ${promoType}! Active for ${promoDuration} days.`,
      );
      setPromoteProperty(null);
      loadDashboard();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Promotion failed";
      toast.error(msg);
    } finally {
      setPromoting(false);
    }
  }

  // Handle Top-up
  async function handleTopupSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToppingUp(true);

    try {
      await topupWalletFn({
        data: {
          session: user,
          amount: topupAmount,
          provider: topupProvider,
          reference: `TOPUP-${Date.now()}`,
        },
      });

      toast.success(`Wallet credited with TSh ${topupAmount.toLocaleString()} via ${topupProvider.toUpperCase()}!`);
      setShowTopupModal(false);
      loadDashboard();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Top up failed";
      toast.error(msg);
    } finally {
      setToppingUp(false);
    }
  }

  // Handle Plan Upgrade
  async function handleUpgradeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setUpgrading(true);

    try {
      await upgradeSubscriptionFn({
        data: {
          session: user,
          planId: selectedPlanId,
          paymentMethod: "wallet",
        },
      });

      toast.success(`Subscribed to ${selectedPlanId.toUpperCase()} plan!`);
      setShowUpgradeModal(false);
      loadDashboard();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Plan update failed";
      toast.error(msg);
    } finally {
      setUpgrading(false);
    }
  }

  // Handle Delete Property
  async function handleDelete(propertyId: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteListingFn({
        data: { session: user, propertyId },
      });
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
      toast.success("Listing deleted.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete listing";
      toast.error(msg);
    }
  }

  return (
    <main className="min-h-screen bg-canvas pb-20">
      {/* Header Banner */}
      <div className="border-b border-line bg-paper py-8">
        <div className="site-container flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="grid size-14 place-items-center rounded-2xl bg-emerald-50 text-xl font-bold text-emerald-700">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <span className="absolute -bottom-1 -right-1 grid size-5 place-items-center rounded-full bg-emerald-600 text-paper">
                <CheckCircle2 className="size-3" />
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Verified Agent
                </span>
                <span className="text-xs text-muted">• {user.email}</span>
              </div>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {greeting}, {user.name}
              </h1>
              <p className="text-xs text-muted">
                Manage your real estate listings, boost visibility, track incoming buyer leads, and review earnings.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-paper px-3 text-sm font-semibold text-ink hover:bg-canvas disabled:opacity-50"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              to="/add-listing"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover active:scale-[0.98]"
            >
              <Plus className="size-4" />
              Add Listing
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="site-container mt-6">
          <div className="flex border-b border-line">
            <button
              type="button"
              onClick={() => setTab("listings")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "listings" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Building2 className="size-4" />
              My Listings ({properties.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("promotions")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "promotions" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Sparkles className="size-4" />
              Promotions & Analytics ({promotions.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("leads")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "leads" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <MessageSquare className="size-4" />
              Client Inquiries ({inquiries.length})
              {inquiries.filter((i) => i.status === "NEW").length > 0 ? (
                <span className="rounded-full bg-brand px-1.5 py-0.2 text-[10px] font-bold text-paper">
                  {inquiries.filter((i) => i.status === "NEW").length}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setTab("wallet")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "wallet" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Wallet className="size-4" />
              Wallet & Credits
            </button>
            <button
              type="button"
              onClick={() => setTab("subscription")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "subscription" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Zap className="size-4" />
              Subscription Tier
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="site-container mt-8">
        {/* Stat Highlights Bar */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-line bg-paper p-4 shadow-card">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Total Properties</span>
            <p className="mt-2 text-2xl font-bold text-ink">{properties.length}</p>
            <p className="mt-1 text-xs text-muted">In your portfolio</p>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 shadow-card">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Active Listings</span>
            <p className="mt-2 text-2xl font-bold text-emerald-600">{activeCount}</p>
            <p className="mt-1 text-xs text-muted">Publicly visible</p>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 shadow-card">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Total Views</span>
            <p className="mt-2 text-2xl font-bold text-ink">{totalViews.toLocaleString()}</p>
            <p className="mt-1 text-xs text-muted">Across all your listings</p>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 shadow-card">
            <span className="text-xs font-bold uppercase tracking-wider text-muted">Client Inquiries</span>
            <p className="mt-2 text-2xl font-bold text-ink">{totalInquiries}</p>
            <p className="mt-1 text-xs text-muted">Direct buyer leads</p>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">Wallet Balance</span>
              <button
                type="button"
                onClick={() => setShowTopupModal(true)}
                className="text-[11px] font-bold text-brand hover:underline"
              >
                + Top Up
              </button>
            </div>
            <p className="mt-2 text-2xl font-bold text-emerald-700">
              TSh {wallet ? Number(wallet.balance).toLocaleString() : "0"}
            </p>
            <p className="mt-1 text-xs text-muted">Credits ready for promotions</p>
          </div>
        </div>

        {/* TAB 1: MY LISTINGS */}
        {tab === "listings" ? (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-ink">My Properties Portfolio</h2>
                <p className="text-xs text-muted">
                  Properties assigned to your agent account. Only you and the platform admin can edit them.
                </p>
              </div>
              <Link
                to="/add-listing"
                className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand px-3.5 text-xs font-bold text-paper hover:bg-brand-hover"
              >
                <Plus className="size-3.5" />
                Add Listing
              </Link>
            </div>

            {properties.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-paper p-12 text-center">
                <Building2 className="mx-auto size-8 text-muted" />
                <h3 className="mt-3 text-base font-bold text-ink">You haven't added any properties yet</h3>
                <p className="mt-1 text-xs text-muted">
                  List your apartments, villas, houses, or plots to reach buyers across Tanzania.
                </p>
                <Link
                  to="/add-listing"
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover"
                >
                  <Plus className="size-4" />
                  + Add Your First Listing
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="border-b border-line bg-canvas text-muted">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Property</th>
                        <th className="px-4 py-3 font-semibold">Location</th>
                        <th className="px-4 py-3 font-semibold">Price</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Views</th>
                        <th className="px-4 py-3 font-semibold">Inquiries</th>
                        <th className="px-4 py-3 font-semibold">Promotion</th>
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {properties.map((p) => (
                        <tr key={p.id} className="transition-colors hover:bg-canvas/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={p.image}
                                alt=""
                                className="size-12 shrink-0 rounded-lg object-cover"
                              />
                              <div>
                                <Link
                                  to="/listings/$id"
                                  params={{ id: p.id }}
                                  className="font-bold text-ink hover:text-brand"
                                >
                                  {p.title}
                                </Link>
                                <p className="text-[11px] text-muted capitalize">
                                  {p.property_type} • For {p.listing_type}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-ink">
                            <p className="font-medium">{p.city}</p>
                            <p className="text-[11px] text-muted">{p.location}</p>
                          </td>
                          <td className="px-4 py-3 font-bold text-ink">
                            TSh {p.price.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                p.status === "APPROVED"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : p.status === "PENDING"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-rose-50 text-rose-700"
                              }`}
                            >
                              {p.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">
                            {p.views_count}
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">
                            {p.inquiries_count}
                          </td>
                          <td className="px-4 py-3">
                            {p.is_featured ? (
                              <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                <Sparkles className="size-3" /> Featured
                              </span>
                            ) : p.is_boosted ? (
                              <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                                <TrendingUp className="size-3" /> Boosted
                              </span>
                            ) : (
                              <span className="text-[11px] text-muted">Standard</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Promote Button */}
                              {p.status === "APPROVED" ? (
                                <button
                                  type="button"
                                  onClick={() => setPromoteProperty(p)}
                                  className="inline-flex h-7 items-center gap-1 rounded bg-amber-500 px-2.5 text-xs font-bold text-paper hover:bg-amber-600"
                                >
                                  <Sparkles className="size-3" />
                                  Promote
                                </button>
                              ) : null}

                              <Link
                                to="/listings/$id"
                                params={{ id: p.id }}
                                className="grid size-7 place-items-center rounded border border-line text-muted hover:bg-canvas hover:text-ink"
                                title="View public page"
                              >
                                <Eye className="size-3.5" />
                              </Link>
                              <button
                                type="button"
                                onClick={() => setEditingProperty(p)}
                                className="grid size-7 place-items-center rounded border border-line text-muted hover:bg-canvas hover:text-ink"
                                title="Edit property"
                              >
                                <Edit className="size-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(p.id, p.title)}
                                className="grid size-7 place-items-center rounded border border-line text-rose-500 hover:bg-rose-50"
                                title="Delete property"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* TAB 2: PROMOTIONS & ANALYTICS (PART 10) */}
        {tab === "promotions" ? (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-ink">Promotion Analytics & ROI</h2>
              <p className="text-xs text-muted">
                Track how paid placements generate real buyer view spikes, direct leads, and saved favorites.
              </p>
            </div>

            {promotions.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-paper p-12 text-center">
                <Sparkles className="mx-auto size-8 text-amber-500" />
                <h3 className="mt-3 text-base font-bold text-ink">No active promotions</h3>
                <p className="mt-1 text-xs text-muted">
                  Promote your approved listings with Featured badges or Search boosts to increase inquiries by up to 5x.
                </p>
                <button
                  type="button"
                  onClick={() => setTab("listings")}
                  className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover"
                >
                  Go to My Listings to Promote
                </button>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {promotions.map((promo) => (
                  <div key={promo.id} className="rounded-2xl border border-line bg-paper p-5 shadow-card">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={promo.property_image || "/images/properties/modern-house.jpg"}
                          alt=""
                          className="size-14 rounded-xl object-cover"
                        />
                        <div>
                          <span
                            className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                              promo.promotion_type === "FEATURED"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {promo.promotion_type} LISTING
                          </span>
                          <h4 className="mt-1 font-bold text-ink">
                            {promo.property_title || promo.property_id}
                          </h4>
                          <p className="text-xs text-muted">{promo.property_location}</p>
                        </div>
                      </div>

                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          promo.status === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-canvas text-muted"
                        }`}
                      >
                        {promo.status}
                      </span>
                    </div>

                    {/* Analytics Matrix */}
                    <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl border border-line bg-canvas p-3 text-center">
                      <div>
                        <p className="text-xs text-muted">Views Driven</p>
                        <p className="mt-0.5 text-lg font-bold text-ink">
                          +{promo.views_during}
                        </p>
                        <span className="text-[10px] text-muted">Baseline: {promo.views_before}</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted">Inquiries</p>
                        <p className="mt-0.5 text-lg font-bold text-emerald-600">
                          {promo.inquiries_count}
                        </p>
                        <span className="text-[10px] text-muted">Direct Leads</span>
                      </div>
                      <div>
                        <p className="text-xs text-muted">Saved / Favs</p>
                        <p className="mt-0.5 text-lg font-bold text-brand">
                          {promo.favorites_count}
                        </p>
                        <span className="text-[10px] text-muted">User Bookmarks</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs text-muted">
                      <span>Spent: <strong className="text-ink">TSh {promo.amount.toLocaleString()}</strong> ({promo.duration_days} days)</span>
                      <span>Expires: <strong className="text-ink">{new Date(promo.expires_at).toLocaleDateString()}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* TAB 3: CLIENT INQUIRIES & LEADS */}
        {tab === "leads" ? (
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-bold text-ink">Client Inquiries & Direct Leads</h2>
              <p className="text-xs text-muted">
                Potential buyers and tenants who inquired about your properties through Swahivo.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-line bg-paper p-12 text-center text-xs text-muted">
                <MessageSquare className="mx-auto size-8 text-muted" />
                <p className="mt-2 font-bold text-ink">No inquiries received yet</p>
                <p>When buyers submit the viewing request form, leads will appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-line rounded-2xl border border-line bg-paper shadow-card">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="p-5">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-ink">{inq.sender_name}</span>
                          <span
                            className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                              inq.status === "NEW"
                                ? "bg-brand text-paper"
                                : inq.status === "CONTACTED"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-canvas text-muted"
                            }`}
                          >
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-brand font-semibold">
                          Regarding: {inq.property_title || inq.property_id}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {inq.sender_phone ? (
                          <a
                            href={`https://wa.me/${inq.sender_phone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 items-center gap-1 rounded bg-emerald-600 px-3 text-xs font-semibold text-paper hover:bg-emerald-700"
                          >
                            <Phone className="size-3.5" />
                            WhatsApp / Call
                          </a>
                        ) : null}
                        <a
                          href={`mailto:${inq.sender_email}`}
                          className="inline-flex h-8 items-center gap-1 rounded border border-line px-3 text-xs font-semibold text-ink hover:bg-canvas"
                        >
                          <Mail className="size-3.5" />
                          Email
                        </a>
                        <select
                          value={inq.status}
                          onChange={async (e) => {
                            const newStatus = e.target.value as any;
                            await updateInquiryStatusFn({
                              data: { session: user, inquiryId: inq.id, status: newStatus },
                            });
                            setInquiries((prev) =>
                              prev.map((item) => (item.id === inq.id ? { ...item, status: newStatus } : item)),
                            );
                            toast.success("Lead status updated.");
                          }}
                          className="h-8 rounded border border-line px-2 text-xs font-medium text-ink outline-none"
                        >
                          <option value="NEW">NEW</option>
                          <option value="READ">READ</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </div>
                    </div>

                    <p className="mt-3 rounded-xl border border-line bg-canvas p-3.5 text-xs text-ink">
                      "{inq.message}"
                    </p>
                    <p className="mt-2 text-[11px] text-muted">
                      Received: {new Date(inq.created_at).toLocaleString()} • Phone: {inq.sender_phone || "Not provided"} • Email: {inq.sender_email}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}

        {/* TAB 4: WALLET & CREDITS (PART 8) */}
        {tab === "wallet" ? (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-ink">Agent Credit Wallet</h2>
                <p className="text-xs text-muted">
                  Maintain your prepaid balance to instantly promote properties and pay monthly tier subscriptions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTopupModal(true)}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-paper hover:bg-emerald-700"
              >
                <Plus className="size-4" />
                Add Credits to Wallet
              </button>
            </div>

            {/* Balance Overview Card */}
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted">Available Credit Balance</p>
                  <p className="mt-1 text-3xl font-extrabold text-ink">
                    TSh {wallet ? Number(wallet.balance).toLocaleString() : "0"}{" "}
                    <span className="text-sm font-medium text-muted">TZS</span>
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Supports instant deductions for Featured (TSh 10k-30k) and Boost (TSh 5k-15k).
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTopupAmount(50000);
                      setShowTopupModal(true);
                    }}
                    className="h-10 rounded-lg border border-line px-4 text-xs font-bold text-ink hover:bg-canvas"
                  >
                    + TSh 50,000
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTopupAmount(100000);
                      setShowTopupModal(true);
                    }}
                    className="h-10 rounded-lg bg-brand px-4 text-xs font-bold text-paper hover:bg-brand-hover"
                  >
                    + TSh 100,000
                  </button>
                </div>
              </div>
            </div>

            {/* Ledger Transactions */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <h3 className="text-sm font-bold text-ink">Transaction History Ledger</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-line bg-canvas text-muted">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Reference</th>
                      <th className="px-3 py-2 font-semibold">Description</th>
                      <th className="px-3 py-2 font-semibold">Type</th>
                      <th className="px-3 py-2 font-semibold">Amount</th>
                      <th className="px-3 py-2 font-semibold">Balance Before</th>
                      <th className="px-3 py-2 font-semibold">Balance After</th>
                      <th className="px-3 py-2 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {transactions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-muted">
                          No wallet transactions logged yet.
                        </td>
                      </tr>
                    ) : (
                      transactions.map((tx) => (
                        <tr key={tx.id} className="hover:bg-canvas/50">
                          <td className="px-3 py-2.5 font-mono text-[11px] font-bold text-ink">
                            {tx.reference}
                          </td>
                          <td className="px-3 py-2.5 font-medium text-ink">{tx.description || "Credit adjustment"}</td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                tx.type === "CREDIT" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                              }`}
                            >
                              {tx.type}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-bold text-ink">
                            {tx.type === "CREDIT" ? "+" : "-"} TSh {tx.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-2.5 text-muted">TSh {tx.balance_before.toLocaleString()}</td>
                          <td className="px-3 py-2.5 font-semibold text-ink">TSh {tx.balance_after.toLocaleString()}</td>
                          <td className="px-3 py-2.5 text-muted">{new Date(tx.created_at).toLocaleDateString()}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 5: SUBSCRIPTION TIER (PART 7) */}
        {tab === "subscription" ? (
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-ink">Agent Subscription Plans</h2>
                <p className="text-xs text-muted">
                  Choose the right tier to increase your active property allowances and earn monthly listing boosts.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {plans.map((pl) => (
                <div
                  key={pl.id}
                  className={`flex flex-col justify-between rounded-2xl border p-5 shadow-card ${
                    pl.id === "professional"
                      ? "border-brand bg-paper ring-2 ring-brand/20"
                      : "border-line bg-paper"
                  }`}
                >
                  <div>
                    {pl.id === "professional" ? (
                      <span className="mb-2 inline-block rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-paper">
                        Most Popular
                      </span>
                    ) : null}
                    <h3 className="text-lg font-bold text-ink">{pl.name}</h3>
                    <p className="mt-1 text-xs text-muted">{pl.description}</p>
                    <p className="mt-4 text-2xl font-black text-ink">
                      TSh {pl.price.toLocaleString()}
                      <span className="text-xs font-normal text-muted"> / month</span>
                    </p>

                    <div className="mt-5 space-y-2.5 border-t border-line pt-4 text-xs">
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        <CheckCircle2 className="size-4 text-emerald-600" />
                        Up to {pl.listing_limit} Active Listings
                      </p>
                      <p className="flex items-center gap-2 font-semibold text-ink">
                        <CheckCircle2 className="size-4 text-emerald-600" />
                        {pl.boost_allowance} Promotional Boosts / month
                      </p>
                      {pl.features.map((feat, idx) => (
                        <p key={idx} className="flex items-center gap-2 text-muted">
                          <CheckCircle2 className="size-3.5 text-muted" />
                          {feat}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-line">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPlanId(pl.id);
                        setShowUpgradeModal(true);
                      }}
                      className={`w-full h-10 rounded-lg text-xs font-bold transition-colors ${
                        pl.id === "professional"
                          ? "bg-brand text-paper hover:bg-brand-hover"
                          : "border border-line bg-canvas text-ink hover:bg-line/40"
                      }`}
                    >
                      Select {pl.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* MODAL: PROMOTE PROPERTY (PART 5 & 6) */}
      {promoteProperty ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-amber-500" />
                <h3 className="font-bold text-ink">Promote Listing</h3>
              </div>
              <button
                type="button"
                onClick={() => setPromoteProperty(null)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handlePromoteSubmit} className="mt-4 space-y-4 text-xs">
              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="font-bold text-ink">{promoteProperty.title}</p>
                <p className="text-[11px] text-muted">{promoteProperty.location} • TSh {promoteProperty.price.toLocaleString()}</p>
              </div>

              {/* Product Choice */}
              <div>
                <label className="font-semibold text-ink">1. Promotion Type</label>
                <div className="mt-1.5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPromoType("FEATURED")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      promoType === "FEATURED"
                        ? "border-amber-500 bg-amber-50/50 ring-1 ring-amber-500"
                        : "border-line bg-paper"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                      <Sparkles className="size-4" />
                      Featured Listing
                    </div>
                    <p className="mt-1 text-[11px] text-muted">
                      Top placement across homepage, category pages, and search results.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPromoType("BOOST")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      promoType === "BOOST"
                        ? "border-blue-500 bg-blue-50/50 ring-1 ring-blue-500"
                        : "border-line bg-paper"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-blue-700 font-bold">
                      <TrendingUp className="size-4" />
                      Listing Boost
                    </div>
                    <p className="mt-1 text-[11px] text-muted">
                      Priority search ranking and elevated visibility for queries.
                    </p>
                  </button>
                </div>
              </div>

              {/* Duration Choice */}
              <div>
                <label className="font-semibold text-ink">2. Duration Period</label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPromoDuration(7)}
                    className={`rounded-lg border p-2.5 text-center ${
                      promoDuration === 7 ? "border-brand bg-brand/5 font-bold text-brand" : "border-line bg-paper text-ink"
                    }`}
                  >
                    <p className="text-xs">7 Days</p>
                    <p className="mt-0.5 text-xs font-bold">
                      TSh {promoType === "FEATURED" ? "10,000" : "5,000"}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPromoDuration(14)}
                    className={`rounded-lg border p-2.5 text-center ${
                      promoDuration === 14 ? "border-brand bg-brand/5 font-bold text-brand" : "border-line bg-paper text-ink"
                    }`}
                  >
                    <p className="text-xs">14 Days</p>
                    <p className="mt-0.5 text-xs font-bold">
                      TSh {promoType === "FEATURED" ? "18,000" : "9,000"}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPromoDuration(30)}
                    className={`rounded-lg border p-2.5 text-center ${
                      promoDuration === 30 ? "border-brand bg-brand/5 font-bold text-brand" : "border-line bg-paper text-ink"
                    }`}
                  >
                    <p className="text-xs">30 Days</p>
                    <p className="mt-0.5 text-xs font-bold">
                      TSh {promoType === "FEATURED" ? "30,000" : "15,000"}
                    </p>
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="font-semibold text-ink">3. Payment Source</label>
                <div className="mt-1.5 space-y-2">
                  <label className="flex items-center justify-between rounded-lg border border-line bg-paper p-3 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="method"
                        checked={promoMethod === "wallet"}
                        onChange={() => setPromoMethod("wallet")}
                      />
                      <div>
                        <span className="font-bold text-ink">Agent Credit Wallet</span>
                        <span className="block text-[11px] text-muted">
                          Available balance: TSh {wallet ? Number(wallet.balance).toLocaleString() : 0}
                        </span>
                      </div>
                    </div>
                    <Wallet className="size-4 text-emerald-600" />
                  </label>

                  <label className="flex items-center justify-between rounded-lg border border-line bg-paper p-3 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="method"
                        checked={promoMethod === "m-pesa"}
                        onChange={() => setPromoMethod("m-pesa")}
                      />
                      <div>
                        <span className="font-bold text-ink">M-Pesa / Tigo Pesa / Airtel</span>
                        <span className="block text-[11px] text-muted">Tanzania Mobile Money payment</span>
                      </div>
                    </div>
                    <Phone className="size-4 text-blue-600" />
                  </label>
                </div>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3 flex items-center justify-between font-bold">
                <span>Total Amount:</span>
                <span className="text-sm text-brand">TSh {currentPromoPrice.toLocaleString()}</span>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setPromoteProperty(null)}
                  className="h-9 rounded border border-line px-4 font-semibold text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={promoting}
                  className="h-9 rounded bg-brand px-5 font-semibold text-paper hover:bg-brand-hover disabled:opacity-50"
                >
                  {promoting ? "Activating..." : "Confirm & Activate"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* MODAL: TOP UP WALLET (PART 8) */}
      {showTopupModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Wallet className="size-5 text-emerald-600" />
                <h3 className="font-bold text-ink">Add Credits to Wallet</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTopupModal(false)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleTopupSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-ink">Select Credit Amount</label>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {[25000, 50000, 100000, 200000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopupAmount(amt)}
                      className={`rounded-lg border p-2.5 text-center font-bold ${
                        topupAmount === amt ? "border-brand bg-brand/5 text-brand" : "border-line bg-paper text-ink"
                      }`}
                    >
                      TSh {amt.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Payment Provider</label>
                <select
                  value={topupProvider}
                  onChange={(e) => setTopupProvider(e.target.value)}
                  className="mt-1.5 h-10 w-full rounded-lg border border-line bg-paper px-3 text-xs font-medium text-ink outline-none focus:border-brand"
                >
                  <option value="m-pesa">Vodacom M-Pesa</option>
                  <option value="airtel-money">Airtel Money</option>
                  <option value="tigo-pesa">Tigo Pesa</option>
                  <option value="crdb-bank">CRDB Bank Transfer</option>
                  <option value="nmb-bank">NMB Bank Transfer</option>
                </select>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="text-[11px] text-muted">
                  Simulated local mobile money integration. The wallet balance will be updated instantly and logged in the immutable transaction ledger.
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowTopupModal(false)}
                  className="h-9 rounded border border-line px-4 font-semibold text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={toppingUp}
                  className="h-9 rounded bg-emerald-600 px-5 font-semibold text-paper hover:bg-emerald-700 disabled:opacity-50"
                >
                  {toppingUp ? "Processing..." : `Pay TSh ${topupAmount.toLocaleString()}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* MODAL: UPGRADE SUBSCRIPTION (PART 7) */}
      {showUpgradeModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <Zap className="size-5 text-brand" />
                <h3 className="font-bold text-ink">Upgrade Agent Tier</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleUpgradeSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-ink">Target Subscription Plan</label>
                <div className="mt-2 space-y-2">
                  {plans.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center justify-between rounded-xl border p-3 cursor-pointer ${
                        selectedPlanId === p.id ? "border-brand bg-brand/5" : "border-line bg-paper"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="plan"
                          checked={selectedPlanId === p.id}
                          onChange={() => setSelectedPlanId(p.id)}
                        />
                        <div>
                          <span className="font-bold text-ink">{p.name} Plan</span>
                          <span className="block text-[11px] text-muted">
                            {p.listing_limit} Listings • {p.boost_allowance} Boosts / mo
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-ink">TSh {p.price.toLocaleString()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-line bg-canvas p-3">
                <p className="text-[11px] text-muted">
                  Fees will be deducted from your credit wallet balance (Current: TSh {wallet ? Number(wallet.balance).toLocaleString() : 0}).
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUpgradeModal(false)}
                  className="h-9 rounded border border-line px-4 font-semibold text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={upgrading}
                  className="h-9 rounded bg-brand px-5 font-semibold text-paper hover:bg-brand-hover disabled:opacity-50"
                >
                  {upgrading ? "Upgrading..." : "Confirm Subscription"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* MODAL: EDIT PROPERTY */}
      {editingProperty ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-ink">Edit Property</h3>
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const updates = {
                  title: String(fd.get("title") || ""),
                  price: Number(fd.get("price") || 0),
                  location: String(fd.get("location") || ""),
                  beds: fd.get("beds") ? Number(fd.get("beds")) : null,
                  baths: fd.get("baths") ? Number(fd.get("baths")) : null,
                  area: Number(fd.get("area") || 0),
                  description: String(fd.get("description") || ""),
                };

                try {
                  await updateListingFn({
                    data: {
                      session: user,
                      propertyId: editingProperty.id,
                      updates,
                    },
                  });
                  setProperties((prev) =>
                    prev.map((p) => (p.id === editingProperty.id ? { ...p, ...updates } : p)),
                  );
                  setEditingProperty(null);
                  toast.success("Listing updated successfully.");
                } catch (err: unknown) {
                  const msg = err instanceof Error ? err.message : "Update failed";
                  toast.error(msg);
                }
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="font-semibold text-ink">Title</label>
                <input
                  name="title"
                  defaultValue={editingProperty.title}
                  required
                  className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink">Price (TZS)</label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={editingProperty.price}
                    required
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">Location</label>
                  <input
                    name="location"
                    defaultValue={editingProperty.location}
                    required
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-ink">Beds</label>
                  <input
                    name="beds"
                    type="number"
                    defaultValue={editingProperty.beds || 0}
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">Baths</label>
                  <input
                    name="baths"
                    type="number"
                    defaultValue={editingProperty.baths || 0}
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">Area (m²)</label>
                  <input
                    name="area"
                    type="number"
                    defaultValue={editingProperty.area}
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingProperty.description}
                  rows={3}
                  className="mt-1 w-full rounded border border-line p-2 outline-none focus:border-brand"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingProperty(null)}
                  className="h-9 rounded border border-line px-4 font-semibold text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 rounded bg-brand px-4 font-semibold text-paper hover:bg-brand-hover"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
