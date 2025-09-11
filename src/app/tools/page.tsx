import Link from "next/link";

export default function ToolsPage() {
  return (
    <section className="py-10 space-y-4">
      <h1 className="text-3xl font-bold">Tools</h1>
      <p className="text-slate-400">A growing set of helpers for your next climb.</p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card">
          <h3 className="text-lg font-semibold">Item Builder</h3>
          <p className="mt-1 text-slate-300">Plan best-in-slot items from your components.</p>
          <button className="btn mt-3">Open</button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Shop Odds</h3>
          <p className="mt-1 text-slate-300">Level-by-level chance of hitting your units.</p>
          <button className="btn mt-3">Open</button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold">Meta Snapshot</h3>
          <p className="mt-1 text-slate-300">Quick view of currently strong comps.</p>
          <Link className="btn mt-3" href="/blog">See Latest</Link>
        </div>
      </div>
    </section>
  );
}
