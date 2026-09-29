import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";

export const Route = createFileRoute("/contact")({ component: ContactPage });

const offices = [
  {
    city: "Dar es Salaam",
    address: "Plot 14, Haile Selassie Road, Masaki",
    phone: "+255 22 266 4100",
    image: "/images/locations/dar-es-salaam.jpg",
  },
  {
    city: "Zanzibar",
    address: "Malindi, Stone Town",
    phone: "+255 24 223 1188",
    image: "/images/locations/zanzibar.jpg",
  },
  {
    city: "Arusha",
    address: "Njiro, near the Clock Tower road",
    phone: "+255 27 250 4410",
    image: "/images/locations/arusha.jpg",
  },
];

function ContactPage() {
  return (
    <main>
      <PageBanner
        title="Contact"
        subtitle="Visit a desk, call an agent, or send a note — we reply within one working day."
        image="/images/locations/zanzibar.jpg"
      />
      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
        <form
          className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Thanks — we will get back to you shortly.");
            e.currentTarget.reset();
          }}
        >
          <h2 className="text-xl font-bold text-ink">Send a message</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <label className="text-sm font-medium">
              Name
              <input
                required
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
              />
            </label>
            <label className="text-sm font-medium">
              Email
              <input
                required
                type="email"
                className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
              />
            </label>
          </div>
          <label className="mt-4 block text-sm font-medium">
            Subject
            <input
              required
              className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-ink"
            />
          </label>
          <label className="mt-4 block text-sm font-medium">
            Message
            <textarea
              required
              rows={6}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-ink"
            />
          </label>
          <button
            type="submit"
            className="mt-5 h-11 rounded-lg bg-brand px-6 text-sm font-semibold text-paper hover:bg-brand-hover"
          >
            Send message
          </button>
        </form>

        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-canvas p-6">
            <p className="inline-flex items-center gap-2 text-sm text-ink">
              <Phone className="size-4 text-brand" /> +255 22 266 4100
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink">
              <Mail className="size-4 text-brand" /> hello@swahivo.com
            </p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-ink">
              <MapPin className="size-4 text-brand" /> Open Mon–Sat, 8:00–18:00 EAT
            </p>
          </div>
          {offices.map((o) => (
            <article
              key={o.city}
              className="overflow-hidden rounded-xl border border-line bg-paper shadow-card"
            >
              <img src={o.image} alt="" className="h-32 w-full object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-ink">{o.city}</h3>
                <p className="mt-1 text-sm text-muted">{o.address}</p>
                <p className="mt-1 text-sm text-ink-soft">{o.phone}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
