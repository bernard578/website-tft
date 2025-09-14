import Link from "next/link";

export default function HomePage() {
  return (
    <section className="grid grid-cols-1 gap-6 py-12 md:grid-cols-[1.2fr,1fr] px-6 md:px-12">
      {/* Left: hero text */}
      <div>
        <h1 className="mb-3 text-4xl font-extrabold leading-tight md:text-5xl">
          Climb Faster in TFT
        </h1>
        <p className="mb-5 max-w-prose text-slate-300">
          Curated comps, patch highlights, and handy tools to help you win more
          lobbies. Built by and for Teamfight Tactics players.
        </p>

        <div className="mb-4 flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-block rounded-xl border border-[#232a3a] px-4 py-2 text-white"
            style={{
              background: "linear-gradient(180deg, #6aa2ff, #4c86f3)",
            }}
          >
            Open Tools
          </Link>

          <Link
            href="/blog"
            className="inline-block rounded-xl border border-[#232a3a] bg-[#121622] px-4 py-2 text-white transition active:translate-y-px hover:bg-[#1a2236] hover:border-[#2a3550]"
          >
            Read the Blog
          </Link>

          <Link
            href="/search"
            className="inline-block rounded-xl border border-[#232a3a] bg-[#1b2336] px-4 py-2 text-white transition active:translate-y-px hover:bg-[#232e4a] hover:border-[#334266]"
          >
            Search Players
          </Link>
        </div>

        <ul className="mt-4 grid max-w-xl gap-2 text-slate-200">
          <li>📈 Weekly meta snapshots</li>
          <li>🧮 Item & shop-odds helpers</li>
          <li>🗺️ Positioning checklists</li>
        </ul>
      </div>

      {/* Right: spotlight card */}
      <aside className="rounded-2xl border border-[#232a3a] bg-gradient-to-b from-[#121622] to-[#171b2a] p-5 shadow-[0_10px_24px_rgba(0,0,0,0.25)]">
        <h3 className="mb-1 text-xl font-semibold">Patch Spotlight</h3>
        <p className="mb-2 text-sm text-slate-400">
          Example content — replace with live data later.
        </p>
        <ul className="list-disc pl-5 text-sm leading-6">
          <li>
            <b>Bruiser/Challenger</b> comp up after AP nerfs.
          </li>
          <li>Early econ stronger — consider 2-streak starts.</li>
          <li>T3 carry re-rolls viable with strong augments.</li>
        </ul>
      </aside>
    </section>
  );
}
