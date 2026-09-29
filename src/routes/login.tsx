import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Home } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/lib/stores";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  const user = useSession((s) => s.user);
  const login = useSession((s) => s.login);
  const logout = useSession((s) => s.logout);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  if (user) {
    return (
      <main className="site-container flex min-h-[60vh] items-center py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-line bg-paper p-8 text-center shadow-card">
          <h1 className="text-2xl font-bold text-ink">Welcome back, {user.name}</h1>
          <p className="mt-2 text-sm text-muted">{user.email}</p>
          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/add-listing"
              className="inline-flex h-11 items-center rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover"
            >
              Add a listing
            </Link>
            <button
              type="button"
              onClick={() => {
                logout();
                toast.success("Signed out.");
              }}
              className="h-11 rounded-lg border border-line px-5 text-sm font-semibold"
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
            Save homes, list a property, and pick up where you left off.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        <form
          className="w-full max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            login(email, name);
            toast.success("You are in.");
            navigate({ to: "/" });
          }}
        >
          <div className="mb-8 flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-brand text-paper">
              <Home className="size-4" />
            </span>
            <span className="text-lg font-bold">Swahivo</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-ink">Log in</h1>
          <p className="mt-2 text-sm text-muted">
            Demo access — any email works. Nothing is sent to a server.
          </p>
          <label className="mt-8 block text-sm font-medium">
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Amina Hassan"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Password
            <input
              required
              type="password"
              defaultValue="swahivo"
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <button
            type="submit"
            className="mt-6 h-11 w-full rounded-lg bg-brand text-sm font-semibold text-paper hover:bg-brand-hover"
          >
            Continue
          </button>
        </form>
      </div>
    </main>
  );
}
