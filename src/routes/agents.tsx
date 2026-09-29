import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { agents } from "@/lib/data";

export const Route = createFileRoute("/agents")({ component: AgentsPage });

function AgentsPage() {
  return (
    <main>
      <PageBanner
        title="Our Agents"
        subtitle="Local specialists across Dar es Salaam, Zanzibar, Arusha, Mwanza, Dodoma and Tanga."
        image="/images/locations/dar-es-salaam.jpg"
      />
      <div className="site-container grid gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Link
            key={agent.id}
            to="/agents/$id"
            params={{ id: agent.id }}
            className="overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow] duration-200 hover:shadow-card-hover"
          >
            <img
              src={agent.photo}
              alt={agent.name}
              className="h-56 w-full object-cover object-top"
            />
            <div className="p-5">
              <h2 className="text-lg font-bold text-ink">{agent.name}</h2>
              <p className="mt-1 text-sm text-muted">{agent.role}</p>
              <p className="mt-3 text-xs font-medium text-brand">
                {agent.listings} active listings
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
