// src/app/blog/page.tsx
import Link from "next/link";
import { posts } from "./posts";

export const metadata = {
  title: "Blog | TFT Insights",
  description: "All TFT blog posts.",
};

export default function BlogIndexPage() {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <ul className="space-y-6">
        {sorted.map((post) => (
          <li
            key={post.slug}
            className="rounded border border-gray-200 p-4 hover:shadow-sm transition"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="block focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(post.date).toLocaleDateString()}
                {post.tags?.length ? (
                  <>
                    {" · "}
                    <span className="space-x-1">
                      {post.tags.map((t) => (
                        <span
                          key={t}
                          className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </>
                ) : null}
              </p>
              <p className="mt-3 text-gray-700">{post.description}</p>
              <span className="mt-3 inline-block text-blue-600">
                Read more →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
