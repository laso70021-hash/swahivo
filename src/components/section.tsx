import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("py-14 sm:py-16", className)}>
      <div className="site-container">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  to,
  linkLabel,
}: {
  title: string;
  to?: "/listings" | "/locations" | "/blog";
  linkLabel?: string;
}) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <h2 className="text-xl font-bold tracking-tight text-ink sm:text-[22px]">
        {title}
      </h2>
      {to ? (
        <Link
          to={to}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition-colors hover:text-brand"
        >
          {linkLabel}
          <ArrowRight className="size-4" />
        </Link>
      ) : null}
    </div>
  );
}

export function PageBanner({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image?: string;
}) {
  return (
    <div className="relative isolate overflow-hidden bg-ink">
      {image ? (
        <img
          src={image}
          alt=""
          className="absolute inset-0 size-full object-cover opacity-50"
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 to-ink/40" />
      <div className="site-container relative py-14 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight text-paper sm:text-4xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-2 max-w-xl text-sm text-paper/80 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
