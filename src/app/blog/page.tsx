import Link from "next/link";

export default function ToolsPage() {
  return (
    <section className="space-y-4 py-10">
      <h1 className="text-3xl font-bold">Tools</h1>
      <p className="text-slate-400">A growing set of helpers for your next climb.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-[#232a3a] bg-gradient-to-b from-[#121622] to-[#171b2a] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
          <h3 className="text-lg font-semibold text-white">Item Builder</h3>
          <p className="mt-1 text-slate-300">Plan best-in-slot items from your components.</p>
          <button className="mt-3 rounded-xl border border-[#232a3a] bg-[#121622] px-4 py-2 text-white transition active:translate-y-px hover:bg-[#1a2236] hover:border-[#2a3550]">
            Open
          </button>
        </div>

        <div className="rounded-2xl border border-[#232a3a] bg-gradient-to-b from-[#121622] to-[#171b2a] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
          <h3 className="text-lg font-semibold text-white">Shop Odds</h3>
          <p className="mt-1 text-slate-300">Level-by-level chance of hitting your units.</p>
          <button className="mt-3 rounded-xl border border-[#232a3a] bg-[#121622] px-4 py-2 text-white transition active:translate-y-px hover:bg-[#1a2236] hover:border-[#2a3550]">
            Open
          </button>
        </div>

        <div className="rounded-2xl border border-[#232a3a] bg-gradient-to-b from-[#121622] to-[#171b2a] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
          <h3 className="text-lg font-semibold text-white">Meta Snapshot</h3>
          <p className="mt-1 text-slate-300">Quick view of currently strong comps.</p>
          <Link
            className="mt-3 inline-block rounded-xl border border-[#232a3a] bg-[#121622] px-4 py-2 text-white transition active:translate-y-px hover:bg-[#1a2236] hover:border-[#2a3550]"
            href="/blog"
          >
            See Latest
          </Link>
        </div>
      </div>
    </section>
  );
}
