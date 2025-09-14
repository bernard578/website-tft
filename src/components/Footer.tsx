export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0f111a] py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm text-slate-400">
          © {new Date().getFullYear()} <span className="font-semibold">TFT Climber</span>. Built for TFT players.
        </p>

        <div className="flex gap-4 text-sm text-slate-400">
          <a href="/about" className="hover:text-slate-200 transition">
            About
          </a>
          <a href="/privacy" className="hover:text-slate-200 transition">
            Privacy
          </a>
          <a href="/contact" className="hover:text-slate-200 transition">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
