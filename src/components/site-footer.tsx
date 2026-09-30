import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Facebook, Home, Instagram, Linkedin, Twitter } from "lucide-react";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-footer text-paper">
      <div className="site-container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <Link to="/" className="inline-flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-brand text-paper">
              <Home className="size-4" strokeWidth={2.4} />
            </span>
            <span className="text-lg font-bold">Swahivo</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-footer-muted">
            Your trusted partner in finding, buying, renting and selling
            properties across Zanzibar & Tanzania.
          </p>
          <div className="mt-4 space-y-1 text-xs text-footer-muted">
            <p>
              <strong className="text-paper/90">Main Branch:</strong> Stone Town, Zanzibar
            </p>
            <p>
              <strong className="text-paper/90">Branches (Coming Soon):</strong> Dar es Salaam, Arusha
            </p>
            <p>
              <strong className="text-paper/90">Phone:</strong>{" "}
              <a href="tel:0771888881" className="hover:text-paper">
                0771 888 881
              </a>
            </p>
            <p>
              <strong className="text-paper/90">Email:</strong>{" "}
              <a href="mailto:hello@swahivo.com" className="hover:text-paper">
                hello@swahivo.com
              </a>
            </p>
          </div>
          <div className="mt-5 flex gap-3 text-footer-muted">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-paper">
              <Facebook className="size-4" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-paper">
              <Instagram className="size-4" />
            </a>
            <a href="https://x.com" aria-label="X" className="hover:text-paper">
              <Twitter className="size-4" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-paper">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick Links</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/" className="text-sm text-footer-muted hover:text-paper">
                Home
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{}} className="text-sm text-footer-muted hover:text-paper">
                Listings
              </Link>
            </li>
            <li>
              <Link to="/agents" className="text-sm text-footer-muted hover:text-paper">
                Agents
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-sm text-footer-muted hover:text-paper">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm text-footer-muted hover:text-paper">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Property Types</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/listings" search={{ type: "apartment" }} className="text-sm text-footer-muted hover:text-paper">
                Apartments
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ type: "house" }} className="text-sm text-footer-muted hover:text-paper">
                Houses
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ type: "villa" }} className="text-sm text-footer-muted hover:text-paper">
                Villas
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ type: "plot" }} className="text-sm text-footer-muted hover:text-paper">
                Plots
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ type: "commercial" }} className="text-sm text-footer-muted hover:text-paper">
                Commercial
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Support</h3>
          <ul className="mt-4 space-y-2.5">
            <li>
              <Link to="/faq" className="text-sm text-footer-muted hover:text-paper">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="text-sm text-footer-muted hover:text-paper">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-footer-muted hover:text-paper">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-sm text-footer-muted hover:text-paper">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/ticket" className="text-sm text-footer-muted hover:text-paper">
                Submit a Ticket
              </Link>
            </li>
            <li>
              <a
                href="https://mail.hostinger.com/0/mailboxes/INBOX/1?p=1&c=all"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-hover font-semibold"
              >
                Staff Mail ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Newsletter</h3>
          <p className="mt-4 text-sm leading-relaxed text-footer-muted">
            Subscribe to get the latest property updates and news.
          </p>
          <form
            className="mt-4 flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (!email.trim()) return;
              toast.success("You are on the list.");
              setEmail("");
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-11 rounded-lg border border-white/15 bg-transparent px-3 text-sm text-paper outline-none placeholder:text-footer-muted focus:border-white/40"
            />
            <button
              type="submit"
              className="h-11 rounded-lg bg-brand text-sm font-semibold text-paper transition-colors hover:bg-brand-hover"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-footer-muted flex flex-wrap items-center justify-center gap-4">
        <span>© 2024 Swahivo. All Rights Reserved.</span>
        <span>•</span>
        <a
          href="https://mail.hostinger.com/0/mailboxes/INBOX/1?p=1&c=all"
          target="_blank"
          rel="noopener noreferrer"
          className="text-footer-muted hover:text-paper underline"
        >
          Staff Webmail (Hostinger)
        </a>
      </div>
    </footer>
  );
}
