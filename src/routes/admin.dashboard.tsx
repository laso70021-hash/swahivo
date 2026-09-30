import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Building2,
  CheckCircle2,
  DollarSign,
  Edit,
  Eye,
  MapPin,
  Plus,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Trash2,
  TrendingUp,
  UserCheck,
  UserMinus,
  Users,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";
import { SUPER_ADMIN_EMAIL, useSession } from "@/lib/stores";
import { useLocationsStore } from "@/lib/locations-store";
import {
  addLocationAdminFn,
  assignAgentRoleFn,
  cancelPromotionAdminFn,
  deleteListingFn,
  deleteLocationAdminFn,
  getAdminAgentsFn,
  getAdminOverviewFn,
  getAdminPaymentsFn,
  getAdminPlansFn,
  getAdminPromoPricingFn,
  getAdminPropertiesFn,
  getAdminPromotionsFn,
  getAdminSubscriptionsFn,
  getLocationsFn,
  revokeAgentRoleFn,
  setAgentStatusFn,
  setListingApprovalFn,
  suspendAgentFn,
  updateListingFn,
  updateLocationAdminFn,
  updatePaymentStatusFn,
  updatePricingPlanFn,
  updatePromotionPriceFn,
} from "@/lib/server-api";
import type {
  DbAgent,
  DbLocation,
  DbPayment,
  DbPromotion,
  DbProperty,
  DbSubscriptionPlan,
} from "@/lib/server-api";

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboardPage,
});

type Tab = "overview" | "properties" | "agents" | "locations" | "monetization" | "pricing";

export function AdminDashboardPage() {
  const user = useSession((s) => s.user);
  const [tab, setTab] = useState<Tab>("overview");
  const [loading, setLoading] = useState(true);

  // Data states
  const [overview, setOverview] = useState<{
    todayRevenue: number;
    monthRevenue: number;
    totalRevenue: number;
    featuredRevenue: number;
    boostRevenue: number;
    subscriptionRevenue: number;
    walletRevenue: number;
    totalProperties: number;
    activeProperties: number;
    pendingProperties: number;
    totalAgents: number;
    totalUsers: number;
    activePromotions: number;
    activeSubscriptions: number;
  } | null>(null);

  const [properties, setProperties] = useState<DbProperty[]>([]);
  const [agents, setAgents] = useState<DbAgent[]>([]);
  const [payments, setPayments] = useState<DbPayment[]>([]);
  const [promotions, setPromotions] = useState<DbPromotion[]>([]);
  const [subscriptions, setSubscriptions] = useState<Array<{
    id: string;
    agent_id: string;
    agent_name: string;
    agent_email: string;
    plan_id: string;
    plan_name: string;
    amount: number;
    status: string;
    start_at: string;
    expires_at: string;
  }>>([]);
  const [plans, setPlans] = useState<DbSubscriptionPlan[]>([]);
  const [promoPricing, setPromoPricing] = useState<Array<{
    id: string;
    promotion_type: "FEATURED" | "BOOST";
    duration_days: number;
    price: number;
  }>>([]);

  // Search & Filter states
  const [propertyFilter, setPropertyFilter] = useState<string>("ALL");
  const [propertySearch, setPropertySearch] = useState<string>("");
  const [agentSearch, setAgentSearch] = useState<string>("");

  // Locations management states
  const [locations, setLocations] = useState<DbLocation[]>([]);
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<DbLocation | null>(null);
  const [newLocName, setNewLocName] = useState("");
  const [newLocSlug, setNewLocSlug] = useState("");
  const [newLocImage, setNewLocImage] = useState("/images/locations/dar-es-salaam.jpg");
  const [newLocBlurb, setNewLocBlurb] = useState("");
  const [newLocCount, setNewLocCount] = useState(0);
  const [newLocIsBranch, setNewLocIsBranch] = useState(false);
  const [newLocBranchStatus, setNewLocBranchStatus] = useState<string>("");
  const [savingLocation, setSavingLocation] = useState(false);

  // Edit property modal
  const [editingProperty, setEditingProperty] = useState<DbProperty | null>(null);
  // Add agent modal
  const [showAddAgentModal, setShowAddAgentModal] = useState(false);
  const [newAgentData, setNewAgentData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "Dar es Salaam",
    bio: "",
    plan: "starter",
  });

  const isAdmin =
    user && (user.role === "admin" || user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase());

  async function loadAdminData() {
    if (!isAdmin) return;
    setLoading(true);
    try {
      const [ov, props, ags, pays, promos, subs, plns, prc, locs] = await Promise.all([
        getAdminOverviewFn({ data: user }),
        getAdminPropertiesFn({ data: user }),
        getAdminAgentsFn({ data: user }),
        getAdminPaymentsFn({ data: user }),
        getAdminPromotionsFn({ data: user }),
        getAdminSubscriptionsFn({ data: user }),
        getAdminPlansFn(),
        getAdminPromoPricingFn(),
        getLocationsFn(),
      ]);
      setOverview(ov);
      setProperties(props);
      setAgents(ags);
      setPayments(pays);
      setPromotions(promos);
      setSubscriptions(subs);
      setPlans(plns);
      setPromoPricing(prc);
      setLocations(locs);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error loading dashboard";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, user?.email]);

  // Authorization check
  if (!user || !isAdmin) {
    return (
      <main>
        <PageBanner
          title="Access Restricted"
          subtitle="Swahivo Super Administrator Area."
          image="/images/properties/luxury-apt.jpg"
        />
        <div className="site-container py-16 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-rose-100 text-rose-600">
            <ShieldAlert className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-ink">Super Administrator Access Required</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            You must be authenticated with the master administrator account (
            <span className="font-semibold text-ink">{SUPER_ADMIN_EMAIL}</span>) to manage the marketplace.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/login"
              className="inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
            >
              Sign In as Admin
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

  // Handle Property Approval / Rejection
  async function handleStatusChange(propertyId: string, status: "APPROVED" | "REJECTED" | "SUSPENDED" | "PENDING") {
    try {
      await setListingApprovalFn({
        data: { session: user, propertyId, status },
      });
      setProperties((prev) =>
        prev.map((p) => (p.id === propertyId ? { ...p, status } : p)),
      );
      toast.success(`Property status set to ${status}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update property status";
      toast.error(msg);
    }
  }

  // Handle Save Edited Property
  async function handleSaveProperty(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingProperty) return;
    const fd = new FormData(e.currentTarget);
    const updates = {
      title: String(fd.get("title") || ""),
      price: Number(fd.get("price") || 0),
      location: String(fd.get("location") || ""),
      beds: fd.get("beds") ? Number(fd.get("beds")) : null,
      baths: fd.get("baths") ? Number(fd.get("baths")) : null,
      area: Number(fd.get("area") || 0),
      description: String(fd.get("description") || ""),
      status: (fd.get("status") as any) || editingProperty.status,
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
      toast.success("Property updated successfully.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update property";
      toast.error(msg);
    }
  }

  // Handle Add Location
  async function handleCreateLocation(e: React.FormEvent) {
    e.preventDefault();
    if (!newLocName.trim()) return;
    setSavingLocation(true);
    try {
      const created = await addLocationAdminFn({
        data: {
          session: user,
          location: {
            name: newLocName.trim(),
            slug: newLocSlug.trim() || newLocName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            image: newLocImage.trim() || "/images/locations/dar-es-salaam.jpg",
            blurb: newLocBlurb.trim() || `Verified properties and real estate in ${newLocName.trim()}.`,
            count: Number(newLocCount) || 0,
            is_branch: newLocIsBranch,
            branch_status: newLocBranchStatus ? (newLocBranchStatus as any) : null,
          },
        },
      });
      setLocations((prev) => [...prev.filter((l) => l.slug !== created.slug), created]);
      useLocationsStore.getState().addLocationLocal(created);
      toast.success(`Location "${created.name}" added successfully and is now active across Swahivo!`);
      setShowAddLocationModal(false);
      setNewLocName("");
      setNewLocSlug("");
      setNewLocBlurb("");
      setNewLocCount(0);
      setNewLocIsBranch(false);
      setNewLocBranchStatus("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to add location";
      toast.error(msg);
    } finally {
      setSavingLocation(false);
    }
  }

  // Handle Update Location
  async function handleUpdateLocation(e: React.FormEvent) {
    e.preventDefault();
    if (!editingLocation) return;
    setSavingLocation(true);
    try {
      const updated = await updateLocationAdminFn({
        data: {
          session: user,
          slug: editingLocation.slug,
          location: {
            name: editingLocation.name,
            count: Number(editingLocation.count) || 0,
            image: editingLocation.image,
            blurb: editingLocation.blurb,
            is_branch: Boolean(editingLocation.is_branch),
            branch_status: editingLocation.branch_status || null,
          },
        },
      });
      setLocations((prev) => prev.map((l) => (l.slug === updated.slug ? updated : l)));
      useLocationsStore.getState().updateLocationLocal(updated.slug, updated);
      toast.success(`Location "${updated.name}" updated successfully.`);
      setEditingLocation(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update location";
      toast.error(msg);
    } finally {
      setSavingLocation(false);
    }
  }

  // Handle Delete Location
  async function handleDeleteLocation(slug: string, name: string) {
    if (!confirm(`Are you sure you want to remove "${name}" location?`)) return;
    try {
      await deleteLocationAdminFn({
        data: { session: user, slug },
      });
      setLocations((prev) => prev.filter((l) => l.slug !== slug));
      useLocationsStore.getState().deleteLocationLocal(slug);
      toast.success(`Location "${name}" removed from marketplace.`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to delete location";
      toast.error(msg);
    }
  }

  // Handle Assign Agent
  async function handleCreateAgent(e: React.FormEvent) {
    e.preventDefault();
    try {
      await assignAgentRoleFn({
        data: {
          session: user,
          name: newAgentData.name,
          email: newAgentData.email,
          phone: newAgentData.phone,
          city: newAgentData.city,
          bio: newAgentData.bio || "Certified Real Estate Professional",
          languages: ["English", "Swahili"],
          subscription_plan: newAgentData.plan,
        },
      });
      toast.success(`Agent ${newAgentData.name} onboarded!`);
      setShowAddAgentModal(false);
      setNewAgentData({ name: "", email: "", phone: "", city: "Dar es Salaam", bio: "", plan: "starter" });
      loadAdminData();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to assign agent role";
      toast.error(msg);
    }
  }

  // Filtered properties
  const filteredProperties = properties.filter((p) => {
    const matchesStatus = propertyFilter === "ALL" || p.status === propertyFilter;
    const matchesSearch =
      !propertySearch ||
      p.title.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.location.toLowerCase().includes(propertySearch.toLowerCase()) ||
      p.city.toLowerCase().includes(propertySearch.toLowerCase()) ||
      (p.agent_name && p.agent_name.toLowerCase().includes(propertySearch.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Filtered agents
  const filteredAgents = agents.filter(
    (a) =>
      !agentSearch ||
      a.name.toLowerCase().includes(agentSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(agentSearch.toLowerCase()) ||
      a.city.toLowerCase().includes(agentSearch.toLowerCase()),
  );

  return (
    <main className="min-h-screen bg-canvas pb-20">
      {/* Header Banner */}
      <div className="border-b border-line bg-paper py-8">
        <div className="site-container flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-brand text-paper">
                <Shield className="size-4.5" />
              </span>
              <span className="rounded bg-brand/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-brand">
                Super Administrator
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Swahivo Master Admin
            </h1>
            <p className="mt-1 text-sm text-muted">
              Marketplace operations, global property approvals, agent licensing, and revenue controls.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={loadAdminData}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-line bg-paper px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-canvas disabled:opacity-50"
            >
              <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
            <Link
              to="/add-listing"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-brand px-4 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover"
            >
              <Plus className="size-4" />
              Create Property
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="site-container mt-6">
          <div className="flex border-b border-line">
            <button
              type="button"
              onClick={() => setTab("overview")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "overview" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <TrendingUp className="size-4" />
              Overview
            </button>
            <button
              type="button"
              onClick={() => setTab("properties")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "properties" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Building2 className="size-4" />
              Properties ({properties.length})
              {overview?.pendingProperties ? (
                <span className="rounded-full bg-amber-500 px-1.5 py-0.2 text-[10px] font-bold text-white">
                  {overview.pendingProperties}
                </span>
              ) : null}
            </button>
            <button
              type="button"
              onClick={() => setTab("agents")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "agents" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Users className="size-4" />
              Agents ({agents.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("locations")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "locations" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <MapPin className="size-4" />
              Locations & Branches ({locations.length})
            </button>
            <button
              type="button"
              onClick={() => setTab("monetization")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "monetization" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <DollarSign className="size-4" />
              Monetization & Revenue
            </button>
            <button
              type="button"
              onClick={() => setTab("pricing")}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === "pricing" ? "border-brand text-brand" : "border-transparent text-muted hover:text-ink"
              }`}
            >
              <Settings className="size-4" />
              Pricing Config
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="site-container mt-8">
        {loading && !overview ? (
          <div className="flex h-64 items-center justify-center rounded-2xl border border-line bg-paper">
            <div className="flex items-center gap-3 text-sm font-semibold text-muted">
              <RefreshCw className="size-5 animate-spin text-brand" />
              Loading Swahivo Admin Systems...
            </div>
          </div>
        ) : null}

        {/* TAB 1: OVERVIEW */}
        {tab === "overview" && overview ? (
          <div className="space-y-8">
            {/* Primary Stat Cards */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Total Properties
                  </span>
                  <span className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                    <Building2 className="size-4.5" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-ink">{overview.totalProperties}</p>
                <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                  <span className="font-semibold text-emerald-600">{overview.activeProperties} Active</span>
                  <span>•</span>
                  <span className="font-semibold text-amber-600">{overview.pendingProperties} Pending Approval</span>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Licensed Agents
                  </span>
                  <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <UserCheck className="size-4.5" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-ink">{overview.totalAgents}</p>
                <p className="mt-2 text-xs text-muted">
                  Across Dar es Salaam, Zanzibar, Arusha & Mwanza
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Total Revenue
                  </span>
                  <span className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <DollarSign className="size-4.5" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-emerald-600">
                  TSh {overview.totalRevenue.toLocaleString()}
                </p>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                  <span className="font-semibold text-ink">This Month:</span>
                  <span>TSh {overview.monthRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted">
                    Active Promotions
                  </span>
                  <span className="grid size-9 place-items-center rounded-lg bg-amber-50 text-amber-600">
                    <Sparkles className="size-4.5" />
                  </span>
                </div>
                <p className="mt-3 text-2xl font-bold text-ink">{overview.activePromotions}</p>
                <p className="mt-2 text-xs text-muted">
                  Featured properties & listing boosts currently active
                </p>
              </div>
            </div>

            {/* Revenue Stream Breakdown */}
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <h2 className="text-base font-bold text-ink">Marketplace Revenue Streams</h2>
              <p className="text-xs text-muted">Live monetized volume collected across all channels.</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="text-xs font-semibold text-muted">Featured Listings</p>
                  <p className="mt-1 text-xl font-bold text-ink">
                    TSh {overview.featuredRevenue.toLocaleString()}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">7, 14 & 30-day top placements</p>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="text-xs font-semibold text-muted">Listing Boosts</p>
                  <p className="mt-1 text-xl font-bold text-ink">
                    TSh {overview.boostRevenue.toLocaleString()}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">Search priority boosts</p>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="text-xs font-semibold text-muted">Agent Subscriptions</p>
                  <p className="mt-1 text-xl font-bold text-ink">
                    TSh {overview.subscriptionRevenue.toLocaleString()}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">Starter, Pro & Agency tiers</p>
                </div>
                <div className="rounded-xl border border-line bg-canvas p-4">
                  <p className="text-xs font-semibold text-muted">Wallet Top-Ups</p>
                  <p className="mt-1 text-xl font-bold text-ink">
                    TSh {overview.walletRevenue.toLocaleString()}
                  </p>
                  <p className="mt-1 text-[11px] text-muted">M-Pesa, Airtel & Bank credits</p>
                </div>
              </div>
            </div>

            {/* Pending Approvals Quick Queue */}
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-ink">Action Required: Listing Review Queue</h2>
                  <p className="text-xs text-muted">
                    New submissions waiting for title verification and document checks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setTab("properties");
                    setPropertyFilter("PENDING");
                  }}
                  className="text-xs font-bold text-brand hover:underline"
                >
                  View All Pending ({overview.pendingProperties})
                </button>
              </div>

              {properties.filter((p) => p.status === "PENDING").length === 0 ? (
                <div className="mt-6 rounded-xl border border-dashed border-line py-8 text-center text-xs text-muted">
                  <CheckCircle2 className="mx-auto size-6 text-emerald-600" />
                  <p className="mt-2 font-semibold text-ink">Review queue is empty!</p>
                  <p className="text-muted">All submitted properties have been reviewed.</p>
                </div>
              ) : (
                <div className="mt-4 divide-y divide-line">
                  {properties
                    .filter((p) => p.status === "PENDING")
                    .slice(0, 5)
                    .map((p) => (
                      <div key={p.id} className="flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt=""
                            className="size-12 shrink-0 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-semibold text-ink">{p.title}</p>
                            <p className="text-xs text-muted">
                              {p.location} • TSh {p.price.toLocaleString()} • Listed by {p.agent_name || "Agent"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            to="/listings/$id"
                            params={{ id: p.id }}
                            className="inline-flex h-8 items-center gap-1 rounded border border-line px-2.5 text-xs font-semibold text-ink hover:bg-canvas"
                          >
                            <Eye className="size-3.5" />
                            View
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(p.id, "APPROVED")}
                            className="inline-flex h-8 items-center gap-1 rounded bg-emerald-600 px-3 text-xs font-semibold text-paper hover:bg-emerald-700"
                          >
                            <CheckCircle2 className="size-3.5" />
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(p.id, "REJECTED")}
                            className="inline-flex h-8 items-center gap-1 rounded bg-rose-50 px-3 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                          >
                            <X className="size-3.5" />
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* TAB 2: GLOBAL PROPERTIES MANAGEMENT */}
        {tab === "properties" ? (
          <div className="space-y-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-ink">Global Property Registry</h2>
                <p className="text-xs text-muted">
                  Full control over all listings, approvals, promotions, and metadata.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
                  <input
                    value={propertySearch}
                    onChange={(e) => setPropertySearch(e.target.value)}
                    placeholder="Search properties or agents..."
                    className="h-9 w-60 rounded-lg border border-line bg-paper pl-8 pr-3 text-xs outline-none focus:border-brand"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={propertyFilter}
                  onChange={(e) => setPropertyFilter(e.target.value)}
                  className="h-9 rounded-lg border border-line bg-paper px-3 text-xs font-medium text-ink outline-none"
                >
                  <option value="ALL">All Statuses ({properties.length})</option>
                  <option value="APPROVED">Approved ({properties.filter((p) => p.status === "APPROVED").length})</option>
                  <option value="PENDING">Pending Review ({properties.filter((p) => p.status === "PENDING").length})</option>
                  <option value="REJECTED">Rejected ({properties.filter((p) => p.status === "REJECTED").length})</option>
                  <option value="SUSPENDED">Suspended ({properties.filter((p) => p.status === "SUSPENDED").length})</option>
                </select>
              </div>
            </div>

            {/* Properties Table */}
            <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-line bg-canvas text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Property</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Location</th>
                      <th className="px-4 py-3 font-semibold">Price</th>
                      <th className="px-4 py-3 font-semibold">Agent / Owner</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Promotion</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredProperties.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-sm text-muted">
                          No properties found matching filters.
                        </td>
                      </tr>
                    ) : (
                      filteredProperties.map((p) => (
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
                                <p className="text-[11px] text-muted">ID: {p.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 uppercase">
                            <span className="font-semibold text-ink">{p.property_type}</span>
                            <span className="block text-[10px] text-muted">For {p.listing_type}</span>
                          </td>
                          <td className="px-4 py-3 text-ink">
                            <p className="font-medium">{p.city}</p>
                            <p className="text-[11px] text-muted">{p.location}</p>
                          </td>
                          <td className="px-4 py-3 font-bold text-ink">
                            TSh {p.price.toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-ink">
                            <p className="font-semibold">{p.agent_name || "Assigned Agent"}</p>
                            <p className="text-[10px] text-muted">{p.agent_id}</p>
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={p.status}
                              onChange={(e) =>
                                handleStatusChange(p.id, e.target.value as any)
                              }
                              className={`rounded-full px-2.5 py-1 text-[11px] font-bold outline-none ${
                                p.status === "APPROVED"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : p.status === "PENDING"
                                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                                    : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                            >
                              <option value="APPROVED">APPROVED</option>
                              <option value="PENDING">PENDING</option>
                              <option value="REJECTED">REJECTED</option>
                              <option value="SUSPENDED">SUSPENDED</option>
                            </select>
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
                              <Link
                                to="/listings/$id"
                                params={{ id: p.id }}
                                title="View public listing"
                                className="grid size-7 place-items-center rounded border border-line text-muted hover:bg-canvas hover:text-ink"
                              >
                                <Eye className="size-3.5" />
                              </Link>
                              <button
                                type="button"
                                title="Edit listing metadata"
                                onClick={() => setEditingProperty(p)}
                                className="grid size-7 place-items-center rounded border border-line text-muted hover:bg-canvas hover:text-ink"
                              >
                                <Edit className="size-3.5" />
                              </button>
                              <button
                                type="button"
                                title="Delete listing"
                                onClick={async () => {
                                  if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                    try {
                                      await setListingApprovalFn({
                                        data: { session: user, propertyId: p.id, status: "REJECTED" },
                                      });
                                      setProperties((prev) => prev.filter((item) => item.id !== p.id));
                                      toast.success("Property removed.");
                                    } catch (err: unknown) {
                                      const msg = err instanceof Error ? err.message : "Error deleting property";
                                      toast.error(msg);
                                    }
                                  }
                                }}
                                className="grid size-7 place-items-center rounded border border-line text-rose-500 hover:bg-rose-50"
                              >
                                <Trash2 className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 3: AGENTS MANAGEMENT */}
        {tab === "agents" ? (
          <div className="space-y-5">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-lg font-bold text-ink">Licensed Agent Directory</h2>
                <p className="text-xs text-muted">
                  Assign agent privileges, monitor portfolio performance, and manage subscriptions.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted" />
                  <input
                    value={agentSearch}
                    onChange={(e) => setAgentSearch(e.target.value)}
                    placeholder="Search agents by name or city..."
                    className="h-9 w-60 rounded-lg border border-line bg-paper pl-8 pr-3 text-xs outline-none focus:border-brand"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddAgentModal(true)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-brand px-3.5 text-xs font-semibold text-paper hover:bg-brand-hover"
                >
                  <Plus className="size-3.5" />
                  + Assign Agent
                </button>
              </div>
            </div>

            {/* Agent Table */}
            <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-line bg-canvas text-muted">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Agent</th>
                      <th className="px-4 py-3 font-semibold">Contact</th>
                      <th className="px-4 py-3 font-semibold">City</th>
                      <th className="px-4 py-3 font-semibold">Listings (Active / Total)</th>
                      <th className="px-4 py-3 font-semibold">Client Inquiries</th>
                      <th className="px-4 py-3 font-semibold">Subscription Plan</th>
                      <th className="px-4 py-3 font-semibold">Account Status</th>
                      <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {filteredAgents.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-sm text-muted">
                          No agents found matching search.
                        </td>
                      </tr>
                    ) : (
                      filteredAgents.map((a) => (
                        <tr key={a.id} className="transition-colors hover:bg-canvas/50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={a.photo}
                                alt=""
                                className="size-10 shrink-0 rounded-full object-cover"
                              />
                              <div>
                                <p className="font-bold text-ink">{a.name}</p>
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
                                  <CheckCircle2 className="size-3" /> {a.verification_status}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-medium text-ink">{a.email}</p>
                            <p className="text-[11px] text-muted">{a.phone}</p>
                          </td>
                          <td className="px-4 py-3 font-medium text-ink">{a.city}</td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-emerald-600">{a.active_listings}</span>
                            <span className="text-muted"> / {a.total_listings}</span>
                          </td>
                          <td className="px-4 py-3 font-semibold text-ink">
                            {a.total_inquiries} leads
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                              {a.subscription_plan}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              type="button"
                              onClick={async () => {
                                const newStatus = a.account_status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
                                await setAgentStatusFn({
                                  data: { session: user, agentId: a.id, account_status: newStatus },
                                });
                                setAgents((prev) =>
                                  prev.map((item) => (item.id === a.id ? { ...item, account_status: newStatus } : item)),
                                );
                                toast.success(`Agent ${a.name} is now ${newStatus}`);
                              }}
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                a.account_status === "ACTIVE"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "bg-rose-50 text-rose-700"
                              }`}
                            >
                              {a.account_status}
                            </button>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                to="/agents/$id"
                                params={{ id: a.id }}
                                className="inline-flex h-7 items-center rounded border border-line px-2 text-xs font-semibold text-ink hover:bg-canvas"
                              >
                                View Profile
                              </Link>
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm(`Revoke agent role for ${a.name}?`)) {
                                    await revokeAgentRoleFn({
                                      data: { session: user, agentId: a.id },
                                    });
                                    setAgents((prev) => prev.filter((item) => item.id !== a.id));
                                    toast.success("Agent role revoked.");
                                  }
                                }}
                                className="grid size-7 place-items-center rounded border border-line text-rose-500 hover:bg-rose-50"
                                title="Revoke Agent Status"
                              >
                                <UserMinus className="size-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 4: MONETIZATION & REVENUE */}
        {tab === "monetization" ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-ink">Monetization Operations</h2>
              <p className="text-xs text-muted">
                Transaction audit, payment statuses, active listing promotions, and subscriptions.
              </p>
            </div>

            {/* Payments Ledger */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <h3 className="text-sm font-bold text-ink">Recent Payments & Invoices ({payments.length})</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-line bg-canvas text-muted">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Reference</th>
                      <th className="px-3 py-2 font-semibold">User / Agent</th>
                      <th className="px-3 py-2 font-semibold">Product</th>
                      <th className="px-3 py-2 font-semibold">Amount</th>
                      <th className="px-3 py-2 font-semibold">Provider</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                      <th className="px-3 py-2 font-semibold">Date</th>
                      <th className="px-3 py-2 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-muted">
                          No payment records logged yet.
                        </td>
                      </tr>
                    ) : (
                      payments.slice(0, 15).map((pay) => (
                        <tr key={pay.id} className="hover:bg-canvas/50">
                          <td className="px-3 py-2.5 font-mono text-[11px] font-bold text-ink">
                            {pay.provider_reference || pay.id.slice(0, 12)}
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="font-semibold text-ink">{pay.agent_name || pay.user_email || "User"}</span>
                          </td>
                          <td className="px-3 py-2.5">
                            <span className="rounded bg-canvas px-2 py-0.5 font-mono text-[10px] font-semibold text-ink">
                              {pay.product_type}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-bold text-ink">
                            TSh {pay.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-2.5 capitalize text-muted">{pay.provider.replace("_", " ")}</td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                                pay.status === "PAID"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : pay.status === "REFUNDED"
                                    ? "bg-purple-50 text-purple-700"
                                    : "bg-amber-50 text-amber-700"
                              }`}
                            >
                              {pay.status}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-muted">
                            {new Date(pay.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            {pay.status === "PAID" ? (
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm("Mark this transaction as REFUNDED?")) {
                                    await updatePaymentStatusFn({
                                      data: { session: user, paymentId: pay.id, status: "REFUNDED" },
                                    });
                                    setPayments((prev) =>
                                      prev.map((item) => (item.id === pay.id ? { ...item, status: "REFUNDED" } : item)),
                                    );
                                    toast.success("Payment marked as refunded.");
                                  }
                                }}
                                className="text-[11px] font-semibold text-rose-600 hover:underline"
                              >
                                Refund
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Promotions Table */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <h3 className="text-sm font-bold text-ink">Active Property Promotions ({promotions.length})</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-line bg-canvas text-muted">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Property</th>
                      <th className="px-3 py-2 font-semibold">Agent</th>
                      <th className="px-3 py-2 font-semibold">Type</th>
                      <th className="px-3 py-2 font-semibold">Duration</th>
                      <th className="px-3 py-2 font-semibold">Amount</th>
                      <th className="px-3 py-2 font-semibold">Expires At</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                      <th className="px-3 py-2 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {promotions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-muted">
                          No active promotions found.
                        </td>
                      </tr>
                    ) : (
                      promotions.map((pr) => (
                        <tr key={pr.id} className="hover:bg-canvas/50">
                          <td className="px-3 py-2.5 font-semibold text-ink">
                            {pr.property_title || pr.property_id}
                          </td>
                          <td className="px-3 py-2.5 text-muted">{pr.agent_name || pr.agent_id}</td>
                          <td className="px-3 py-2.5">
                            <span
                              className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                                pr.promotion_type === "FEATURED"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-blue-50 text-blue-700"
                              }`}
                            >
                              {pr.promotion_type}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 font-medium">{pr.duration_days} Days</td>
                          <td className="px-3 py-2.5 font-bold text-ink">
                            TSh {pr.amount.toLocaleString()}
                          </td>
                          <td className="px-3 py-2.5 text-muted">
                            {new Date(pr.expires_at).toLocaleDateString()}
                          </td>
                          <td className="px-3 py-2.5 font-bold">
                            <span
                              className={`rounded px-2 py-0.5 text-[10px] ${
                                pr.status === "ACTIVE" ? "bg-emerald-50 text-emerald-700" : "bg-canvas text-muted"
                              }`}
                            >
                              {pr.status}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right">
                            {pr.status === "ACTIVE" ? (
                              <button
                                type="button"
                                onClick={async () => {
                                  if (confirm("Cancel this promotion immediately?")) {
                                    await cancelPromotionAdminFn({
                                      data: { session: user, promoId: pr.id },
                                    });
                                    setPromotions((prev) =>
                                      prev.map((item) => (item.id === pr.id ? { ...item, status: "CANCELLED" } : item)),
                                    );
                                    toast.success("Promotion cancelled.");
                                  }
                                }}
                                className="text-[11px] font-semibold text-rose-600 hover:underline"
                              >
                                Cancel
                              </button>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Subscriptions */}
            <div className="rounded-2xl border border-line bg-paper p-5 shadow-card">
              <h3 className="text-sm font-bold text-ink">Agent Subscriptions ({subscriptions.length})</h3>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-line bg-canvas text-muted">
                    <tr>
                      <th className="px-3 py-2 font-semibold">Agent</th>
                      <th className="px-3 py-2 font-semibold">Tier Plan</th>
                      <th className="px-3 py-2 font-semibold">Amount / Mo</th>
                      <th className="px-3 py-2 font-semibold">Started</th>
                      <th className="px-3 py-2 font-semibold">Renewal Date</th>
                      <th className="px-3 py-2 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {subscriptions.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-muted">
                          No active subscriptions logged.
                        </td>
                      </tr>
                    ) : (
                      subscriptions.map((s) => (
                        <tr key={s.id} className="hover:bg-canvas/50">
                          <td className="px-3 py-2.5">
                            <p className="font-bold text-ink">{s.agent_name}</p>
                            <p className="text-[11px] text-muted">{s.agent_email}</p>
                          </td>
                          <td className="px-3 py-2.5 font-semibold uppercase text-brand">{s.plan_name}</td>
                          <td className="px-3 py-2.5 font-bold text-ink">TSh {s.amount.toLocaleString()}</td>
                          <td className="px-3 py-2.5 text-muted">{new Date(s.start_at).toLocaleDateString()}</td>
                          <td className="px-3 py-2.5 text-muted">{new Date(s.expires_at).toLocaleDateString()}</td>
                          <td className="px-3 py-2.5">
                            <span className="rounded bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 5: PRICING CONFIGURATION (PART 12) */}
        {tab === "pricing" ? (
          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-bold text-ink">Marketplace Pricing Configuration</h2>
              <p className="text-xs text-muted">
                Admin controls to modify promotion rates and subscription plans without source code edits.
              </p>
            </div>

            {/* Promotion Pricing Edit */}
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <h3 className="text-base font-bold text-ink">Promotion Pricing (TSh)</h3>
              <p className="text-xs text-muted">Set fees for Featured property badges and Search boost boosts.</p>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {promoPricing.map((pr) => (
                  <div key={pr.id} className="rounded-xl border border-line bg-canvas p-4">
                    <div className="flex items-center justify-between">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                          pr.promotion_type === "FEATURED" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {pr.promotion_type}
                      </span>
                      <span className="text-xs font-semibold text-muted">{pr.duration_days} Days</span>
                    </div>

                    <div className="mt-3">
                      <label className="text-[11px] font-medium text-muted">Price in TSh:</label>
                      <div className="mt-1 flex items-center gap-2">
                        <input
                          type="number"
                          defaultValue={pr.price}
                          id={`price-${pr.id}`}
                          className="h-9 w-full rounded border border-line bg-paper px-2.5 text-sm font-bold text-ink outline-none focus:border-brand"
                        />
                        <button
                          type="button"
                          onClick={async () => {
                            const input = document.getElementById(`price-${pr.id}`) as HTMLInputElement;
                            const newPrice = Number(input?.value);
                            if (newPrice > 0) {
                              await updatePromotionPriceFn({
                                data: { session: user, id: pr.id, price: newPrice },
                              });
                              setPromoPricing((prev) =>
                                prev.map((item) => (item.id === pr.id ? { ...item, price: newPrice } : item)),
                              );
                              toast.success(`Updated ${pr.promotion_type} (${pr.duration_days}d) price to TSh ${newPrice.toLocaleString()}`);
                            }
                          }}
                          className="h-9 shrink-0 rounded bg-brand px-3 text-xs font-semibold text-paper hover:bg-brand-hover"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription Plans Edit */}
            <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
              <h3 className="text-base font-bold text-ink">Agent Subscription Plans</h3>
              <p className="text-xs text-muted">Configure monthly tier fees, active listing allowances, and perks.</p>

              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {plans.map((pl) => (
                  <div key={pl.id} className="flex flex-col justify-between rounded-xl border border-line bg-canvas p-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-ink">{pl.name}</h4>
                        <span className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand">
                          {pl.id}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">{pl.description}</p>

                      <div className="mt-4 space-y-2.5">
                        <div>
                          <label className="text-[11px] font-medium text-muted">Price (TSh / Month):</label>
                          <input
                            type="number"
                            defaultValue={pl.price}
                            id={`plan-price-${pl.id}`}
                            className="mt-0.5 h-8 w-full rounded border border-line bg-paper px-2 text-xs font-bold text-ink outline-none focus:border-brand"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-muted">Active Listing Limit:</label>
                          <input
                            type="number"
                            defaultValue={pl.listing_limit}
                            id={`plan-limit-${pl.id}`}
                            className="mt-0.5 h-8 w-full rounded border border-line bg-paper px-2 text-xs font-bold text-ink outline-none focus:border-brand"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-medium text-muted">Boost Allowance / Mo:</label>
                          <input
                            type="number"
                            defaultValue={pl.boost_allowance}
                            id={`plan-boosts-${pl.id}`}
                            className="mt-0.5 h-8 w-full rounded border border-line bg-paper px-2 text-xs font-bold text-ink outline-none focus:border-brand"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-line">
                      <button
                        type="button"
                        onClick={async () => {
                          const priceInput = document.getElementById(`plan-price-${pl.id}`) as HTMLInputElement;
                          const limitInput = document.getElementById(`plan-limit-${pl.id}`) as HTMLInputElement;
                          const boostInput = document.getElementById(`plan-boosts-${pl.id}`) as HTMLInputElement;
                          const price = Number(priceInput?.value || 0);
                          const listing_limit = Number(limitInput?.value || 1);
                          const boost_allowance = Number(boostInput?.value || 0);

                          await updatePricingPlanFn({
                            data: {
                              session: user,
                              planId: pl.id,
                              updates: { price, listing_limit, boost_allowance },
                            },
                          });
                          setPlans((prev) =>
                            prev.map((item) =>
                              item.id === pl.id ? { ...item, price, listing_limit, boost_allowance } : item,
                            ),
                          );
                          toast.success(`Updated ${pl.name} plan configuration.`);
                        }}
                        className="w-full h-8 rounded bg-brand text-xs font-semibold text-paper hover:bg-brand-hover"
                      >
                        Save Tier Settings
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* TAB 4: LOCATIONS */}
        {tab === "locations" ? (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-ink">
                  Marketplace Locations & Branches
                </h2>
                <p className="mt-1 text-xs text-muted">
                  Control geographical real estate markets. Any location added here is immediately active across search filters, listing publishing, and the homepage.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNewLocName("");
                  setNewLocSlug("");
                  setNewLocImage("/images/locations/dar-es-salaam.jpg");
                  setNewLocBlurb("");
                  setNewLocCount(0);
                  setNewLocIsBranch(false);
                  setNewLocBranchStatus("");
                  setShowAddLocationModal(true);
                }}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-xs font-semibold text-paper shadow-sm hover:bg-brand-hover"
              >
                <Plus className="size-4" />
                Add New Location
              </button>
            </div>

            {/* Locations Cards Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((loc) => (
                <div
                  key={loc.slug}
                  className="overflow-hidden rounded-2xl border border-line bg-paper shadow-card transition-all hover:border-brand/40"
                >
                  <div className="relative h-36 w-full">
                    <img
                      src={loc.image || "/images/locations/dar-es-salaam.jpg"}
                      alt={loc.name}
                      className="size-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                    <div className="absolute top-2.5 right-2.5 flex gap-1">
                      {loc.branch_status === "main" ? (
                        <span className="rounded-full bg-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-paper shadow-sm">
                          Main Branch
                        </span>
                      ) : loc.branch_status === "coming_soon" ? (
                        <span className="rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          Coming Soon
                        </span>
                      ) : loc.is_branch ? (
                        <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
                          Active Branch
                        </span>
                      ) : null}
                    </div>
                    <div className="absolute bottom-2.5 left-3.5 text-paper">
                      <h3 className="text-base font-bold flex items-center gap-1.5">
                        <MapPin className="size-4 text-brand" />
                        {loc.name}
                      </h3>
                      <p className="text-[11px] text-paper/80">
                        {loc.count} properties • slug: {loc.slug}
                      </p>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="line-clamp-2 text-xs text-muted">{loc.blurb}</p>

                    <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
                      <Link
                        to="/locations/$slug"
                        params={{ slug: loc.slug }}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                      >
                        <Eye className="size-3.5" />
                        View Live
                      </Link>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setEditingLocation(loc)}
                          className="rounded-lg border border-line px-2.5 py-1 text-xs font-medium text-ink hover:bg-canvas"
                        >
                          <Edit className="size-3.5 inline mr-1" />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteLocation(loc.slug, loc.name)}
                          className="rounded-lg border border-rose-200 px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* MODAL: ADD LOCATION */}
      {showAddLocationModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-ink flex items-center gap-2">
                <MapPin className="size-4 text-brand" />
                Add New Marketplace Location
              </h3>
              <button
                type="button"
                onClick={() => setShowAddLocationModal(false)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateLocation} className="mt-4 space-y-3.5 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-ink">Location Name</label>
                  <input
                    required
                    value={newLocName}
                    onChange={(e) => {
                      const v = e.target.value;
                      setNewLocName(v);
                      if (!newLocSlug || newLocSlug === newLocName.toLowerCase().replace(/[^a-z0-9]+/g, "-")) {
                        setNewLocSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                      }
                    }}
                    placeholder="e.g. Kilimanjaro, Morogoro, Mtwara"
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">URL Slug</label>
                  <input
                    required
                    value={newLocSlug}
                    onChange={(e) => setNewLocSlug(e.target.value)}
                    placeholder="e.g. kilimanjaro"
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Location Image URL</label>
                <input
                  required
                  value={newLocImage}
                  onChange={(e) => setNewLocImage(e.target.value)}
                  placeholder="/images/locations/dar-es-salaam.jpg"
                  className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                />
                <div className="mt-1.5 flex flex-wrap gap-1.5 text-[11px] text-muted">
                  <span>Presets:</span>
                  {[
                    "/images/locations/zanzibar.jpg",
                    "/images/locations/dar-es-salaam.jpg",
                    "/images/locations/arusha.jpg",
                    "/images/locations/mwanza.jpg",
                    "/images/locations/dodoma.jpg",
                    "/images/locations/tanga.jpg",
                  ].map((url) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setNewLocImage(url)}
                      className="rounded bg-canvas px-1.5 py-0.5 hover:bg-line/40 text-ink"
                    >
                      {url.split("/").pop()?.replace(".jpg", "")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Description / Blurb</label>
                <textarea
                  required
                  rows={2}
                  value={newLocBlurb}
                  onChange={(e) => setNewLocBlurb(e.target.value)}
                  placeholder="Describe properties, lifestyle, and investment opportunities in this location..."
                  className="mt-1 w-full rounded-lg border border-line p-2 outline-none focus:border-brand"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="font-semibold text-ink">Properties Count</label>
                  <input
                    type="number"
                    min={0}
                    value={newLocCount}
                    onChange={(e) => setNewLocCount(Number(e.target.value))}
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">Branch Office?</label>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="newIsBranch"
                      checked={newLocIsBranch}
                      onChange={(e) => setNewLocIsBranch(e.target.checked)}
                      className="size-4 text-brand rounded border-line"
                    />
                    <label htmlFor="newIsBranch" className="text-xs text-ink cursor-pointer">
                      Is Branch
                    </label>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-ink">Branch Status</label>
                  <select
                    value={newLocBranchStatus}
                    onChange={(e) => setNewLocBranchStatus(e.target.value)}
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2 bg-paper outline-none focus:border-brand"
                  >
                    <option value="">None (Standard)</option>
                    <option value="main">Main Branch</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="active">Active Branch</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-line pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddLocationModal(false)}
                  className="h-9 rounded-lg border border-line px-4 text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLocation}
                  className="h-9 rounded-lg bg-brand px-4 font-semibold text-paper hover:bg-brand-hover disabled:opacity-50"
                >
                  {savingLocation ? "Saving..." : "Add Location to Site"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {/* MODAL: EDIT LOCATION */}
      {editingLocation ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-ink flex items-center gap-2">
                <Edit className="size-4 text-brand" />
                Edit Location: {editingLocation.name}
              </h3>
              <button
                type="button"
                onClick={() => setEditingLocation(null)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateLocation} className="mt-4 space-y-3.5 text-xs">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="font-semibold text-ink">Location Name</label>
                  <input
                    required
                    value={editingLocation.name}
                    onChange={(e) =>
                      setEditingLocation((prev) => (prev ? { ...prev, name: e.target.value } : null))
                    }
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">URL Slug (Locked)</label>
                  <input
                    disabled
                    value={editingLocation.slug}
                    className="mt-1 h-9 w-full rounded-lg border border-line bg-canvas px-2.5 text-muted cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Image URL</label>
                <input
                  required
                  value={editingLocation.image}
                  onChange={(e) =>
                    setEditingLocation((prev) => (prev ? { ...prev, image: e.target.value } : null))
                  }
                  className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="font-semibold text-ink">Blurb</label>
                <textarea
                  required
                  rows={2}
                  value={editingLocation.blurb}
                  onChange={(e) =>
                    setEditingLocation((prev) => (prev ? { ...prev, blurb: e.target.value } : null))
                  }
                  className="mt-1 w-full rounded-lg border border-line p-2 outline-none focus:border-brand"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="font-semibold text-ink">Properties Count</label>
                  <input
                    type="number"
                    min={0}
                    value={editingLocation.count}
                    onChange={(e) =>
                      setEditingLocation((prev) =>
                        prev ? { ...prev, count: Number(e.target.value) } : null,
                      )
                    }
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">Is Branch?</label>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="editIsBranch"
                      checked={Boolean(editingLocation.is_branch)}
                      onChange={(e) =>
                        setEditingLocation((prev) =>
                          prev ? { ...prev, is_branch: e.target.checked } : null,
                        )
                      }
                      className="size-4 text-brand rounded border-line"
                    />
                    <label htmlFor="editIsBranch" className="text-xs text-ink cursor-pointer">
                      Branch Office
                    </label>
                  </div>
                </div>
                <div>
                  <label className="font-semibold text-ink">Branch Status</label>
                  <select
                    value={editingLocation.branch_status || ""}
                    onChange={(e) =>
                      setEditingLocation((prev) =>
                        prev ? { ...prev, branch_status: (e.target.value as any) || null } : null,
                      )
                    }
                    className="mt-1 h-9 w-full rounded-lg border border-line px-2 bg-paper outline-none focus:border-brand"
                  >
                    <option value="">None</option>
                    <option value="main">Main Branch</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="active">Active Branch</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-line pt-3">
                <button
                  type="button"
                  onClick={() => setEditingLocation(null)}
                  className="h-9 rounded-lg border border-line px-4 text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingLocation}
                  className="h-9 rounded-lg bg-brand px-4 font-semibold text-paper hover:bg-brand-hover disabled:opacity-50"
                >
                  {savingLocation ? "Saving..." : "Save Changes"}
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
              <h3 className="font-bold text-ink">Edit Listing #{editingProperty.id}</h3>
              <button
                type="button"
                onClick={() => setEditingProperty(null)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProperty} className="mt-4 space-y-3.5 text-xs">
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
                  <label className="font-semibold text-ink">Approval Status</label>
                  <select
                    name="status"
                    defaultValue={editingProperty.status}
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  >
                    <option value="APPROVED">APPROVED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Location & City</label>
                <input
                  name="location"
                  defaultValue={editingProperty.location}
                  required
                  className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                />
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

      {/* MODAL: ASSIGN AGENT */}
      {showAddAgentModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-line bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-bold text-ink">Assign New Licensed Agent</h3>
              <button
                type="button"
                onClick={() => setShowAddAgentModal(false)}
                className="grid size-7 place-items-center rounded text-muted hover:bg-canvas"
              >
                <X className="size-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAgent} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-ink">Full Name</label>
                <input
                  required
                  value={newAgentData.name}
                  onChange={(e) => setNewAgentData({ ...newAgentData, name: e.target.value })}
                  placeholder="e.g. Juma Rashid"
                  className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="font-semibold text-ink">Email Address</label>
                <input
                  required
                  type="email"
                  value={newAgentData.email}
                  onChange={(e) => setNewAgentData({ ...newAgentData, email: e.target.value })}
                  placeholder="juma.rashid@swahivo.com"
                  className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-ink">Phone</label>
                  <input
                    required
                    value={newAgentData.phone}
                    onChange={(e) => setNewAgentData({ ...newAgentData, phone: e.target.value })}
                    placeholder="+255 712 000 111"
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  />
                </div>
                <div>
                  <label className="font-semibold text-ink">City</label>
                  <select
                    value={newAgentData.city}
                    onChange={(e) => setNewAgentData({ ...newAgentData, city: e.target.value })}
                    className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                  >
                    <option>Dar es Salaam</option>
                    <option>Zanzibar</option>
                    <option>Arusha</option>
                    <option>Mwanza</option>
                    <option>Dodoma</option>
                    <option>Tanga</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-ink">Initial Subscription Plan</label>
                <select
                  value={newAgentData.plan}
                  onChange={(e) => setNewAgentData({ ...newAgentData, plan: e.target.value })}
                  className="mt-1 h-9 w-full rounded border border-line px-2.5 outline-none focus:border-brand"
                >
                  <option value="free">Free (1 Listing)</option>
                  <option value="starter">Starter (10 Listings, 3 Boosts)</option>
                  <option value="professional">Professional (30 Listings, 10 Boosts)</option>
                  <option value="agency">Agency (100 Listings, 30 Boosts)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-ink">Agent Bio / Specialisation</label>
                <textarea
                  rows={2}
                  value={newAgentData.bio}
                  onChange={(e) => setNewAgentData({ ...newAgentData, bio: e.target.value })}
                  placeholder="Specialises in residential villas, title verification..."
                  className="mt-1 w-full rounded border border-line p-2 outline-none focus:border-brand"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddAgentModal(false)}
                  className="h-9 rounded border border-line px-4 font-semibold text-ink hover:bg-canvas"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-9 rounded bg-brand px-4 font-semibold text-paper hover:bg-brand-hover"
                >
                  Create Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </main>
  );
}
