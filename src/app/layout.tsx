import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "TFTPage",
  description: "Teamfight Tactics landing page with blog and tools.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur">
          <nav className="mx-auto flex h-16 max-w-[1024px] items-center gap-4 px-5">
            <Link
              href="/"
              className="rounded-xl bg-gradient-to-r from-[#121622] to-transparent px-3 py-1.5 text-lg font-extrabold tracking-tight text-white"
            >
              TFTPage
            </Link>

            <div className="ml-auto" />
            <ul className="flex list-none items-center gap-1">
              <li>
                <Link
                  href="/blog"
                  className="rounded-xl px-3 py-2 text-white hover:bg-[#121622]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="rounded-xl px-3 py-2 text-white hover:bg-[#121622]"
                >
                  Tools
                </Link>
              </li>
            </ul>
          </nav>
        </header>

        {/* Main */}
        <main className="mx-auto max-w-[1024px] px-5">{children}</main>

        {/* Footer */}
        <footer className="mt-12 border-t border-white/10 py-8 text-slate-400">
          <div className="mx-auto max-w-[1024px] px-5">
            © {new Date().getFullYear()} TFTPage — Unofficial TFT fan site.
          </div>
        </footer>
      </body>
    </html>
  );
}
