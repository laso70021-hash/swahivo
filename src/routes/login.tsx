import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Home, Shield, LayoutDashboard, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SUPER_ADMIN_EMAIL, useSession } from "@/lib/stores";
import { resolveUserSessionFn } from "@/lib/server-api";

export const Route = createFileRoute("/login")({ component: LoginPage });

export function LoginPage() {
  const user = useSession((s) => s.user);
  const login = useSession((s) => s.login);
  const logout = useSession((s) => s.logout);
  const updateUser = useSession((s) => s.updateUser);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const isAdmin =
    user && (user.role === "admin" || user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase());
  const isAgent = user && user.role === "agent";

  async function handleLogin(targetEmail: string, targetName?: string) {
    setLoading(true);
    try {
      // 1. Client session store update
      login(targetEmail, targetName);

      // 2. Server-side verification & DB synchronization
      const serverUser = await resolveUserSessionFn({
        data: { email: targetEmail, name: targetName },
      });

      if (serverUser) {
        updateUser({
          id: serverUser.id,
          role: serverUser.role,
          agentId: serverUser.agentId,
        });
      }

      toast.success(
        targetEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()
          ? "Welcome, Super Administrator!"
          : "Logged in successfully.",
      );

      if (targetEmail.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase()) {
        navigate({ to: "/admin/dashboard" });
      } else if (serverUser?.role === "agent") {
        navigate({ to: "/agent/dashboard" });
      } else {
        navigate({ to: "/" });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to log in";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  if (user) {
    return (
      <main className="site-container flex min-h-[60vh] items-center py-16">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-line bg-paper p-8 text-center shadow-card">
          <div className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-brand/10 text-brand">
            {isAdmin ? <Shield className="size-6" /> : isAgent ? <LayoutDashboard className="size-6 text-emerald-600" /> : <CheckCircle2 className="size-6 text-emerald-600" />}
          </div>
          <h1 className="text-2xl font-bold text-ink">Welcome, {user.name}</h1>
          <p className="mt-1 text-sm text-muted">{user.email}</p>
          <div className="mt-2">
            {isAdmin ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand">
                <Shield className="size-3" /> Super Administrator
              </span>
            ) : isAgent ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-600">
                <LayoutDashboard className="size-3" /> Licensed Agent
              </span>
            ) : (
              <span className="inline-flex items-center rounded-full bg-canvas px-3 py-1 text-xs font-medium text-ink-soft">
                Buyer / Standard User
              </span>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            {isAdmin ? (
              <Link
                to="/admin/dashboard"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover"
              >
                <Shield className="size-4" />
                Go to Admin Dashboard
              </Link>
            ) : null}

            {isAgent ? (
              <Link
                to="/agent/dashboard"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-paper hover:bg-emerald-700"
              >
                <LayoutDashboard className="size-4" />
                Go to Agent Dashboard
              </Link>
            ) : null}

            <Link
              to="/add-listing"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-line bg-canvas px-5 text-sm font-semibold text-ink hover:bg-line/40"
            >
              Add a listing
            </Link>

            <button
              type="button"
              onClick={() => {
                logout();
                toast.success("Signed out.");
              }}
              className="h-11 rounded-lg border border-line px-5 text-sm font-semibold text-muted hover:text-ink"
            >
              Sign out
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="grid min-h-[calc(100dvh-72px)] lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <img
          src="/images/hero.jpg"
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-x-0 bottom-0 p-10 text-paper">
          <p className="text-2xl font-bold">Find your place in Tanzania.</p>
          <p className="mt-2 max-w-sm text-sm text-paper/80">
            Access client listings, agent monetization tools, and verified real estate.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-brand text-paper">
              <Home className="size-4" />
            </span>
            <span className="text-lg font-bold">Swahivo</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-ink">Sign in</h1>
          <p className="mt-1 text-sm text-muted">
            Enter your credentials or choose a test account below.
          </p>

          {/* Quick Demo Switcher Cards */}
          <div className="mt-6 rounded-xl border border-line bg-canvas p-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-muted">
              Quick Role Sign-in:
            </p>
            <div className="mt-2.5 grid gap-2">
              <button
                type="button"
                onClick={() => handleLogin(SUPER_ADMIN_EMAIL, "Super Administrator")}
                className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2 text-left text-xs font-medium text-ink transition-colors hover:border-brand hover:bg-brand/5"
              >
                <div className="flex items-center gap-2">
                  <Shield className="size-3.5 text-brand" />
                  <div>
                    <span className="font-semibold text-brand">Admin Account</span>
                    <span className="block text-[11px] text-muted">{SUPER_ADMIN_EMAIL}</span>
                  </div>
                </div>
                <span className="rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand">Admin</span>
              </button>

              <button
                type="button"
                onClick={() => handleLogin("aisha@swahivo.com", "Aisha Mwinyi")}
                className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2 text-left text-xs font-medium text-ink transition-colors hover:border-emerald-600 hover:bg-emerald-50/50"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="size-3.5 text-emerald-600" />
                  <div>
                    <span className="font-semibold text-emerald-700">Agent Aisha Mwinyi</span>
                    <span className="block text-[11px] text-muted">aisha@swahivo.com (Dar es Salaam)</span>
                  </div>
                </div>
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">Agent</span>
              </button>

              <button
                type="button"
                onClick={() => handleLogin("daniel@swahivo.com", "Daniel Msuya")}
                className="flex items-center justify-between rounded-lg border border-line bg-paper px-3 py-2 text-left text-xs font-medium text-ink transition-colors hover:border-emerald-600 hover:bg-emerald-50/50"
              >
                <div className="flex items-center gap-2">
                  <LayoutDashboard className="size-3.5 text-emerald-600" />
                  <div>
                    <span className="font-semibold text-emerald-700">Agent Daniel Msuya</span>
                    <span className="block text-[11px] text-muted">daniel@swahivo.com (Zanzibar)</span>
                  </div>
                </div>
                <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-600">Agent</span>
              </button>
            </div>
          </div>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-line" />
            <span className="text-xs uppercase tracking-wider text-muted">Or custom account</span>
            <div className="h-px flex-1 bg-line" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin(email, name);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-ink">
                Full Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Amina Hassan"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Email Address
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
              {email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase() ? (
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-brand">
                  <Shield className="size-3" /> Recognized Super Administrator account
                </p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Password
              </label>
              <input
                required
                type="password"
                defaultValue="swahivo123"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-paper transition-colors hover:bg-brand-hover disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
