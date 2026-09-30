import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Building2, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { PageBanner } from "@/components/section";
import { submitContactMessageFn } from "@/lib/server-api";

export const Route = createFileRoute("/contact")({ component: ContactPage });

const offices = [
  {
    city: "Zanzibar",
    branchType: "Main Branch",
    isMain: true,
    isComingSoon: false,
    address: "Malindi, Stone Town, Zanzibar",
    phone: "0771 888 881",
    email: "hello@swahivo.com",
    image: "/images/locations/zanzibar.jpg",
    description: "Swahivo Headquarters & Executive Operations Desk",
  },
  {
    city: "Dar es Salaam",
    branchType: "Branch Office",
    isMain: false,
    isComingSoon: true,
    address: "Plot 14, Haile Selassie Road, Masaki, Dar es Salaam",
    phone: "0771 888 881",
    email: "hello@swahivo.com",
    image: "/images/locations/dar-es-salaam.jpg",
    description: "Commercial capital advisory hub — Coming Soon",
  },
  {
    city: "Arusha",
    branchType: "Branch Office",
    isMain: false,
    isComingSoon: true,
    address: "Njiro, Clock Tower Area, Arusha",
    phone: "0771 888 881",
    email: "hello@swahivo.com",
    image: "/images/locations/arusha.jpg",
    description: "Northern Circuit safari & residential hub — Coming Soon",
  },
];

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    try {
      await submitContactMessageFn({
        data: {
          name,
          email,
          phone: phone || undefined,
          subject,
          message,
          recipient_email: "hello@swahivo.com",
        },
      });

      toast.success(
        "Thank you! Your message has been sent to hello@swahivo.com. We reply within one business day.",
      );
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to send message";
      toast.error(msg);
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <PageBanner
        title="Contact Swahivo"
        subtitle="Visit our main desk in Zanzibar, call our helpline, or send an inquiry directly to hello@swahivo.com."
        image="/images/locations/zanzibar.jpg"
      />

      <div className="site-container grid gap-10 py-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Contact Form */}
        <div className="rounded-2xl border border-line bg-paper p-6 shadow-card sm:p-8">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <h2 className="text-xl font-bold text-ink">Send a message</h2>
              <p className="mt-1 text-xs text-muted">
                All messages are sent directly to{" "}
                <span className="font-semibold text-brand">hello@swahivo.com</span>.
              </p>
            </div>
            <div className="grid size-10 place-items-center rounded-full bg-brand/10 text-brand">
              <Mail className="size-5" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-ink">Your Name</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Salma Salim"
                  className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">Your Email</label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="salma@example.com"
                  className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-ink">Phone / WhatsApp</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0771 888 881"
                  className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">Subject</label>
                <input
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Property inquiry, partnership, or viewing"
                  className="mt-1 h-11 w-full rounded-lg border border-line px-3 text-sm outline-none focus:border-brand"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your inquiry or property details here..."
                className="mt-1 w-full rounded-lg border border-line p-3 text-sm outline-none focus:border-brand"
              />
            </div>

            <div className="rounded-xl border border-line bg-canvas p-3 text-xs text-muted">
              Destination: <strong className="text-ink">hello@swahivo.com</strong> • Phone:{" "}
              <strong className="text-ink">0771 888 881</strong> • Response time: under 24 hours.
            </div>

            <button
              type="submit"
              disabled={sending}
              className="inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-paper transition-colors hover:bg-brand-hover disabled:opacity-50"
            >
              <Send className="size-4" />
              {sending ? "Sending..." : "Send Message to hello@swahivo.com"}
            </button>
          </form>
        </div>

        {/* Office Branches & Direct Info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-line bg-canvas p-6 shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
              Central Contact Desk
            </h3>
            <div className="mt-4 space-y-3">
              <p className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="grid size-8 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Phone className="size-4" />
                </span>
                <span>0771 888 881</span>
              </p>
              <p className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="grid size-8 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Mail className="size-4" />
                </span>
                <span>hello@swahivo.com</span>
              </p>
              <p className="flex items-center gap-3 text-sm font-medium text-ink">
                <span className="grid size-8 place-items-center rounded-lg bg-brand/10 text-brand">
                  <Clock className="size-4" />
                </span>
                <span>Mon–Sat, 8:00 – 18:00 EAT (Stone Town Time)</span>
              </p>
            </div>
          </div>

          <h3 className="pt-2 text-base font-bold text-ink">Office Locations & Branches</h3>

          {offices.map((o) => (
            <article
              key={o.city}
              className={`overflow-hidden rounded-xl border bg-paper shadow-card transition-all ${
                o.isMain ? "border-brand/40 ring-1 ring-brand/20" : "border-line"
              }`}
            >
              <div className="relative h-32 w-full overflow-hidden">
                <img src={o.image} alt={o.city} className="size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
                <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between text-paper">
                  <span className="text-base font-bold">{o.city}</span>
                  {o.isMain ? (
                    <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-paper">
                      Main Branch
                    </span>
                  ) : o.isComingSoon ? (
                    <span className="rounded-full bg-amber-500/90 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-paper">
                      Coming Soon
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Building2 className="size-4 text-brand" />
                  <span className="text-xs font-bold uppercase tracking-wider text-ink">
                    {o.branchType}
                  </span>
                  {o.isComingSoon && (
                    <span className="text-xs font-semibold text-amber-600">— Coming Soon</span>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted">{o.description}</p>
                <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-soft">
                  <MapPin className="size-3.5 text-muted" />
                  {o.address}
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-brand">
                  <Phone className="size-3.5" />
                  {o.phone}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
