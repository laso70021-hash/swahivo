import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { PropertyCard } from "@/components/property-card";
import { getAgent, propertiesForAgent } from "@/lib/data";

export const Route = createFileRoute("/agents_/$id")({
  component: AgentPage,
});

function AgentPage() {
  const { id } = Route.useParams();
  const agent = getAgent(id);
  if (!agent) throw notFound();
  const listings = propertiesForAgent(agent.id);

  return (
    <main className="site-container py-10">
      <p className="text-sm text-muted">
        <Link to="/agents" className="hover:text-ink">
          Agents
        </Link>{" "}
        / {agent.name}
      </p>
      <div className="mt-6 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="rounded-xl border border-line bg-paper p-5 shadow-card">
          <img
            src={agent.photo}
            alt={agent.name}
            className="aspect-[3/4] w-full rounded-lg object-cover object-top"
          />
          <h1 className="mt-4 text-xl font-bold text-ink">{agent.name}</h1>
          <p className="text-sm text-muted">{agent.role}</p>
          <p className="mt-3 text-xs text-muted">
            Languages: {agent.languages.join(", ")}
          </p>
          <a
            href={`tel:${agent.phone}`}
            className="mt-4 flex items-center gap-2 text-sm font-medium text-ink"
          >
            <Phone className="size-4" /> {agent.phone}
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="mt-2 flex items-center gap-2 text-sm text-ink-soft"
          >
            <Mail className="size-4" /> {agent.email}
          </a>
        </aside>
        <div>
          <p className="max-w-2xl text-sm leading-relaxed text-ink-soft">
            {agent.bio}
          </p>
          <form
            className="mt-6 max-w-md space-y-3 rounded-xl border border-line bg-canvas p-5"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success(`Message sent to ${agent.name}.`);
              e.currentTarget.reset();
            }}
          >
            <h2 className="font-semibold text-ink">Contact {agent.name.split(" ")[0]}</h2>
            <input
              required
              placeholder="Your name"
              className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none"
            />
            <input
              required
              type="email"
              placeholder="Email"
              className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-sm outline-none"
            />
            <textarea
              required
              rows={4}
              placeholder="How can they help?"
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              className="h-11 rounded-lg bg-brand px-5 text-sm font-semibold text-paper hover:bg-brand-hover"
            >
              Send message
            </button>
          </form>
          <h2 className="mt-10 mb-5 text-xl font-bold text-ink">
            Listings by {agent.name.split(" ")[0]}
          </h2>
          {listings.length ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {listings.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">No listings at the moment.</p>
          )}
        </div>
      </div>
    </main>
  );
}
