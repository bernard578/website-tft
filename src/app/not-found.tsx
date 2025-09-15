import Link from 'next/link';
import { Home, Search, BookOpen, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-yellow-400 mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-slate-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/" className="tft-button w-full inline-flex items-center justify-center">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
          
          <div className="flex gap-4">
            <Link href="/blog" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center justify-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Browse Guides
            </Link>
            
            <Link href="/search" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors inline-flex items-center justify-center">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Link>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Popular Pages</h3>
          <div className="space-y-2 text-left">
            <Link href="/tools/odds-calculator" className="block text-yellow-400 hover:text-yellow-300 transition-colors">
              → Odds Calculator
            </Link>
            <Link href="/tools/match-history" className="block text-yellow-400 hover:text-yellow-300 transition-colors">
              → Match History
            </Link>
            <Link href="/traits-units" className="block text-yellow-400 hover:text-yellow-300 transition-colors">
              → Traits & Units
            </Link>
            <Link href="/blog/tft-patch-15-4" className="block text-yellow-400 hover:text-yellow-300 transition-colors">
              → Latest Meta Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}