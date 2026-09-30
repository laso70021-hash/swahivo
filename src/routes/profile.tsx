import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  CheckCircle2,
  Globe,
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Save,
  Shield,
  Sparkles,
  User,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";
import { useLocations } from "@/lib/locations-store";
import { SUPER_ADMIN_EMAIL, useSession } from "@/lib/stores";
import { getUserProfileFn, updateUserProfileFn } from "@/lib/server-api";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

const avatarPresets = [
  "/images/agents/aisha.jpg",
  "/images/agents/daniel.jpg",
  "/images/agents/zahra.jpg",
  "/images/agents/omar.jpg",
  "/images/agents/neema.jpg",
  "/images/agents/jabari.jpg",
];

export function ProfilePage() {
  const user = useSession((s) => s.user);
  const updateUser = useSession((s) => s.updateUser);
  const logout = useSession((s) => s.logout);
  const navigate = useNavigate();
  const { cities } = useLocations();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("0771 888 881");
  const [city, setCity] = useState("Zanzibar");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState(avatarPresets[0]);
  const [agency, setAgency] = useState("");
  const [whatsapp, setWhatsapp] = useState("0771 888 881");
  const [languages, setLanguages] = useState<string[]>(["English", "Swahili"]);
  const [currency, setCurrency] = useState("TZS");
  const [emailInquiries, setEmailInquiries] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(true);

  const isAdmin =
    user && (user.role === "admin" || user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase());
  const isAgent = user && user.role === "agent";

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    setName(user.name || "");
    if (user.phone) setPhone(user.phone);

    void (async () => {
      try {
        const res = await getUserProfileFn({ data: { session: user } });
        if (res.user) {
          if (res.user.name) setName(res.user.name);
          if (res.user.phone) setPhone(res.user.phone);
          if (res.user.city) setCity(res.user.city);
          if (res.user.bio) setBio(res.user.bio);
          if (res.user.photo) setPhoto(res.user.photo);
        }
        if (res.agent) {
          if (res.agent.city) setCity(res.agent.city);
          if (res.agent.bio) setBio(res.agent.bio);
          if (res.agent.photo) setPhoto(res.agent.photo);
          if (res.agent.phone) setPhone(res.agent.phone);
          if (res.agent.languages && Array.isArray(res.agent.languages)) {
            setLanguages(res.agent.languages);
          }
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);

    try {
      await updateUserProfileFn({
        data: {
          session: user,
          profile: {
            name,
            phone,
            city,
            bio,
            photo,
            agency: agency || undefined,
            whatsapp: whatsapp || undefined,
            languages,
          },
        },
      });

      // Update client session store
      updateUser({
        name,
        phone,
      });

      toast.success("Profile settings updated successfully across Swahivo!");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  function toggleLanguage(lang: string) {
    setLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  }

  if (!user) {
    return (
      <main>
        <PageBanner
          title="User Profile"
          subtitle="Sign in to manage your profile and account settings."
          image="/images/properties/luxury-apt.jpg"
        />
        <div className="site-container py-16 text-center">
          <div className="mx-auto mb-4 grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
            <User className="size-6" />
          </div>
          <h2 className="text-xl font-bold text-ink">You are not logged in</h2>
          <p className="mt-2 text-sm text-muted">
            Please log in with your credentials to access your profile settings.
          </p>
          <Link
            to="/login"
            className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
          >
            Log in to Swahivo
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <PageBanner
        title="Profile Settings"
        subtitle="Manage your personal details, public profile, contact information, and site preferences."
        image="/images/locations/zanzibar.jpg"
      />

      <div className="site-container py-12">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* Sidebar Card */}
          <aside className="space-y-6">
            <div className="overflow-hidden rounded-2xl border border-line bg-paper p-6 text-center shadow-card">
              <div className="relative mx-auto size-24 overflow-hidden rounded-full border-2 border-brand/20">
                <img
                  src={photo || avatarPresets[0]}
                  alt={name || user.name}
                  className="size-full object-cover object-top"
                />
              </div>

              <h2 className="mt-4 text-lg font-bold text-ink">{name || user.name}</h2>
              <p className="text-xs text-muted">{user.email}</p>

              <div className="mt-3 flex justify-center">
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                    <Shield className="size-3" /> Super Administrator
                  </span>
                ) : isAgent ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                    <CheckCircle2 className="size-3" /> Licensed Agent
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink-soft">
                    Buyer / Standard User
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-2 border-t border-line pt-5 text-left">
                {isAdmin ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand transition-colors hover:bg-brand/5"
                  >
                    <Shield className="size-4" />
                    Admin Dashboard
                  </Link>
                ) : null}

                {isAgent ? (
                  <>
                    <Link
                      to="/agent/dashboard"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-600 transition-colors hover:bg-emerald-50"
                    >
                      <LayoutDashboard className="size-4" />
                      Agent Dashboard
                    </Link>
                    <Link
                      to="/agent/dashboard"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                    >
                      <Wallet className="size-4" />
                      Agent Wallet & Credits
                    </Link>
                  </>
                ) : null}

                <Link
                  to="/favorites"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                >
                  <Heart className="size-4" />
                  Saved Properties
                </Link>

                <Link
                  to="/add-listing"
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                >
                  <Building2 className="size-4" />
                  Submit New Listing
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    toast.success("Signed out successfully.");
                    navigate({ to: "/" });
                  }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-rose-600 transition-colors hover:bg-rose-50"
                >
                  <LogOut className="size-4" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Quick Support Badge */}
            <div className="rounded-2xl border border-line bg-canvas p-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                Swahivo Support & Contact
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                Main branch: Zanzibar. Reach our central support desk anytime:
              </p>
              <div className="mt-3 space-y-1.5 text-xs font-medium text-ink">
                <p className="flex items-center gap-2">
                  <Phone className="size-3.5 text-brand" /> 0771 888 881
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="size-3.5 text-brand" /> hello@swahivo.com
                </p>
              </div>
            </div>
          </aside>

          {/* Main Profile Form */}
          <div className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8">
            {loading ? (
              <div className="py-20 text-center text-sm text-muted">
                Loading profile settings...
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-8">
                {/* 1. Basic Personal Information */}
                <div>
                  <div className="flex items-center gap-2.5 border-b border-line pb-3">
                    <User className="size-5 text-brand" />
                    <div>
                      <h3 className="text-base font-bold text-ink">Personal Information</h3>
                      <p className="text-xs text-muted">
                        Controls how your identity appears on Swahivo, your listings, and inquiries.
                      </p>
                    </div>
                  </div>

                  {/* Avatar Picker */}
                  <div className="mt-5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-muted">
                      Profile Avatar / Photo
                    </label>
                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                      {avatarPresets.map((imgUrl) => (
                        <button
                          key={imgUrl}
                          type="button"
                          onClick={() => setPhoto(imgUrl)}
                          className={`size-12 overflow-hidden rounded-full border-2 transition-all ${
                            photo === imgUrl
                              ? "border-brand ring-2 ring-brand/30 scale-105"
                              : "border-line opacity-75 hover:opacity-100"
                          }`}
                        >
                          <img src={imgUrl} alt="" className="size-full object-cover object-top" />
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 max-w-md">
                      <input
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="Or enter custom avatar image URL"
                        className="h-10 w-full rounded-lg border border-line px-3 text-xs outline-none focus:border-brand"
                      />
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-ink">Full Name</label>
                      <input
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aisha Mwinyi"
                        className="mt-1 h-11 w-full rounded-lg border border-line px-3.5 text-sm outline-none focus:border-brand"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink">Email Address</label>
                      <input
                        disabled
                        value={user.email}
                        className="mt-1 h-11 w-full rounded-lg border border-line bg-canvas px-3.5 text-sm text-muted outline-none cursor-not-allowed"
                      />
                      <span className="mt-1 block text-[11px] text-muted">
                        Account email is locked to your authenticated login.
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink">
                        Phone Number (Display on listings & contact)
                      </label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="0771 888 881"
                          className="h-11 w-full rounded-lg border border-line pl-10 pr-3.5 text-sm outline-none focus:border-brand"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-ink">
                        Primary City / Location
                      </label>
                      <div className="relative mt-1">
                        <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="h-11 w-full rounded-lg border border-line pl-10 pr-3.5 text-sm outline-none focus:border-brand bg-paper"
                        >
                          {cities.map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-ink">Bio / About</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Brief description about your background, property portfolio, or experience."
                      className="mt-1 w-full rounded-lg border border-line p-3 text-sm outline-none focus:border-brand"
                    />
                  </div>
                </div>

                {/* 2. Agent / Business Details */}
                {(isAgent || isAdmin) && (
                  <div>
                    <div className="flex items-center gap-2.5 border-b border-line pb-3">
                      <Building2 className="size-5 text-emerald-600" />
                      <div>
                        <h3 className="text-base font-bold text-ink">
                          Agent & Brokerage Credentials
                        </h3>
                        <p className="text-xs text-muted">
                          These details are displayed on all your property listing pages and agent profile cards.
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-semibold text-ink">
                          Agency / Brokerage Name
                        </label>
                        <input
                          value={agency}
                          onChange={(e) => setAgency(e.target.value)}
                          placeholder="e.g. Swahivo Premier Realty"
                          className="mt-1 h-11 w-full rounded-lg border border-line px-3.5 text-sm outline-none focus:border-brand"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink">
                          Direct WhatsApp Number
                        </label>
                        <input
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="0771 888 881"
                          className="mt-1 h-11 w-full rounded-lg border border-line px-3.5 text-sm outline-none focus:border-brand"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-ink">
                        Spoken Languages
                      </label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {["English", "Swahili", "Arabic", "French", "German", "Italian"].map(
                          (lang) => {
                            const active = languages.includes(lang);
                            return (
                              <button
                                key={lang}
                                type="button"
                                onClick={() => toggleLanguage(lang)}
                                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                                  active
                                    ? "bg-emerald-600 text-paper"
                                    : "border border-line bg-canvas text-ink-soft hover:bg-line/40"
                                }`}
                              >
                                {active ? "✓ " : "+ "}
                                {lang}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Site & Notification Preferences */}
                <div>
                  <div className="flex items-center gap-2.5 border-b border-line pb-3">
                    <Globe className="size-5 text-ink-soft" />
                    <div>
                      <h3 className="text-base font-bold text-ink">Platform Preferences</h3>
                      <p className="text-xs text-muted">
                        Customize currency formatting and alert notifications.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-ink">
                        Default Currency
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="mt-1 h-11 w-full rounded-lg border border-line px-3.5 text-sm outline-none focus:border-brand bg-paper"
                      >
                        <option value="TZS">TZS — Tanzanian Shilling (TSh)</option>
                        <option value="USD">USD — US Dollar ($)</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={emailInquiries}
                        onChange={(e) => setEmailInquiries(e.target.checked)}
                        className="size-4 rounded border-line text-brand focus:ring-brand"
                      />
                      <span className="text-sm text-ink">
                        Send instant email notifications when new inquiries or leads arrive
                      </span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={promoAlerts}
                        onChange={(e) => setPromoAlerts(e.target.checked)}
                        className="size-4 rounded border-line text-brand focus:ring-brand"
                      />
                      <span className="text-sm text-ink">
                        Receive promotional reports, listing boost expiration reminders, and platform updates
                      </span>
                    </label>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-between border-t border-line pt-6">
                  <div className="text-xs text-muted">
                    Changes apply immediately to your account and listings.
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover disabled:opacity-50"
                  >
                    <Save className="size-4" />
                    {saving ? "Saving Changes..." : "Save Profile Settings"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
