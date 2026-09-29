import { createFileRoute, Link } from "@tanstack/react-router";
import { PageBanner } from "@/components/section";
import { blogPosts } from "@/lib/data";

export const Route = createFileRoute("/blog")({ component: BlogPage });

function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <main>
      <PageBanner
        title="Swahivo Journal"
        subtitle="Market notes, neighbourhood guides, and practical advice for buyers, renters, and sellers."
        image="/images/blog/tips.jpg"
      />
      <div className="site-container py-12">
        {featured ? (
          <Link
            to="/blog/$slug"
            params={{ slug: featured.slug }}
            className="grid overflow-hidden rounded-2xl border border-line bg-paper shadow-card md:grid-cols-2"
          >
            <img
              src={featured.image}
              alt=""
              className="h-64 w-full object-cover md:h-full"
            />
            <div className="p-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                {featured.category}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-ink">{featured.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {featured.excerpt}
              </p>
              <p className="mt-4 text-xs text-muted">
                {featured.date} · {featured.readMins} min read
              </p>
            </div>
          </Link>
        ) : null}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="overflow-hidden rounded-xl border border-line bg-paper shadow-card transition-[box-shadow] hover:shadow-card-hover"
            >
              <div className="relative aspect-[16/10]">
                <img src={post.image} alt="" className="size-full object-cover" />
                <span className="absolute left-3 top-3 rounded-md bg-paper px-2 py-1 text-[11px] font-semibold">
                  {post.category}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-ink">{post.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <p className="mt-3 text-xs text-muted">
                  {post.date} · {post.readMins} min read
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
