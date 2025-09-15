import Link from 'next/link';
import { Trophy, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-800/50 border-t border-slate-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Trophy className="h-6 w-6 text-slate-900" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">TFT Companion</h3>
                <p className="text-sm text-slate-400">Your Ultimate TFT Hub</p>
              </div>
            </div>
            <p className="text-slate-400 max-w-md">
              Track your matches, calculate odds, browse champions, and stay ahead of the meta with our comprehensive TFT tools and guides.
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-yellow-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h4 className="text-white font-semibold mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/tools/match-history" className="text-slate-400 hover:text-yellow-400 transition-colors">Match History</Link></li>
              <li><Link href="/tools/odds-calculator" className="text-slate-400 hover:text-yellow-400 transition-colors">Odds Calculator</Link></li>
              <li><Link href="/tools/time-tracker" className="text-slate-400 hover:text-yellow-400 transition-colors">Time Tracker</Link></li>
              <li><Link href="/traits-units" className="text-slate-400 hover:text-yellow-400 transition-colors">Traits & Units</Link></li>
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="text-white font-semibold mb-4">Content</h4>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-slate-400 hover:text-yellow-400 transition-colors">Blog</Link></li>
              <li><Link href="/search" className="text-slate-400 hover:text-yellow-400 transition-colors">Search</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © 2025 TFT Companion. Not affiliated with Riot Games.
          </p>
          <p className="text-slate-500 text-xs mt-2 md:mt-0">
            TFT Companion isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Teamfight Tactics.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;