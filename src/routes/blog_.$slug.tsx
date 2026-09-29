import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { blogPosts, getPost } from "@/lib/data";

export const Route = createFileRoute("/blog_/$slug")({ component: PostPage });

function PostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);
  if (!post) throw notFound();
  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="site-container py-10">
      <p className="text-sm text-muted">
        <Link to="/blog" className="hover:text-ink">
          Blog
        </Link>{" "}
        / {post.category}
      </p>
      <article className="mx-auto mt-6 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">
          {post.category}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {post.date} · {post.readMins} min read
        </p>
        <img
          src={post.image}
          alt=""
          className="mt-8 h-72 w-full rounded-2xl object-cover"
        />
        <div className="mt-8 space-y-4">
          {post.body.map((p) => (
            <p key={p.slice(0, 24)} className="text-[15px] leading-7 text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </article>
      <h2 className="mt-16 mb-5 text-xl font-bold text-ink">More from the journal</h2>
      <div className="grid gap-5 md:grid-cols-3">
        {others.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="overflow-hidden rounded-xl border border-line"
          >
            <img src={p.image} alt="" className="h-36 w-full object-cover" />
            <div className="p-4">
              <p className="font-semibold text-ink">{p.title}</p>
              <p className="mt-1 text-xs text-muted">{p.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
