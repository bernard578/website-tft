import Link from 'next/link';
import { Trophy, BarChart3, Clock, TrendingUp, Calculator, Search } from 'lucide-react';

const tools = [
  {
    name: 'Match History',
    description: 'View detailed stats from your recent TFT matches including placements, units, traits, and augments.',
    icon: Trophy,
    href: '/tools/match-history',
    color: 'text-blue-400',
    features: ['Last 20 matches', 'Unit compositions', 'Trait analysis', 'Placement tracking']
  },
  {
    name: 'Odds Calculator',
    description: 'Calculate rolling probabilities and optimize your reroll strategy with interactive visualizations.',
    icon: BarChart3,
    href: '/tools/odds-calculator',
    color: 'text-green-400',
    features: ['Rolling odds by level', 'Interactive charts', 'Unit cost probability', 'Shop simulation']
  },
  {
    name: 'Time Tracker',
    description: 'Track how much time you\'ve invested in TFT and see your gameplay patterns over time.',
    icon: Clock,
    href: '/tools/time-tracker',
    color: 'text-purple-400',
    features: ['Total playtime', 'Hours per patch', 'Rank progression', 'Activity patterns']
  }
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-6">
            TFT <span className="tft-gold">Tools & Analytics</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Comprehensive tools to analyze your gameplay, optimize your strategies, and climb the TFT ladder more effectively.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.name} href={tool.href}>
                <div className="tft-card group cursor-pointer h-full">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg bg-slate-700 group-hover:bg-slate-600 transition-colors`}>
                      <Icon className={`h-6 w-6 ${tool.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors mb-6">
                    {tool.description}
                  </p>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300 mb-2">Features:</div>
                    {tool.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <div className="flex items-center text-yellow-400 text-sm font-medium group-hover:text-yellow-300">
                      Launch Tool 
                      <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Additional Tools Section */}
        <div className="bg-slate-800/30 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">More Tools Coming Soon</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-white">Meta Tracker</h3>
                <p className="text-sm text-slate-400">Track composition popularity and win rates across ranks</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg">
              <Calculator className="h-8 w-8 text-yellow-400" />
              <div>
                <h3 className="font-semibold text-white">Damage Calculator</h3>
                <p className="text-sm text-slate-400">Calculate optimal item builds and damage outputs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Access</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/traits-units" className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Browse Traits & Units
            </Link>
            <Link href="/blog" className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors">
              Read Latest Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}