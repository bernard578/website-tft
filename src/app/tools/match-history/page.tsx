'use client';

import { useState } from 'react';
import { Search, Trophy, Users, Zap, Clock, TrendingUp } from 'lucide-react';

export default function MatchHistoryPage() {
  const [summonerName, setSummonerName] = useState('');
  const [region, setRegion] = useState('na1');
  const [loading, setLoading] = useState(false);

  const regions = [
    { value: 'na1', label: 'North America' },
    { value: 'euw1', label: 'Europe West' },
    { value: 'eun1', label: 'Europe Nordic & East' },
    { value: 'kr', label: 'Korea' },
    { value: 'jp1', label: 'Japan' },
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summonerName.trim()) return;
    
    setLoading(true);
    // TODO: Implement Riot API integration
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            TFT <span className="tft-gold">Match History</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            View detailed stats from your recent matches including placements, units, traits, and augments.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="summoner" className="block text-sm font-medium text-slate-300 mb-2">
                  Summoner Name
                </label>
                <input
                  type="text"
                  id="summoner"
                  value={summonerName}
                  onChange={(e) => setSummonerName(e.target.value)}
                  placeholder="Enter your summoner name..."
                  className="tft-input w-full"
                  required
                />
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-slate-300 mb-2">
                  Region
                </label>
                <select
                  id="region"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  className="tft-input"
                >
                  {regions.map((r) => (
                    <option key={r.value} value={r.value} className="bg-slate-800">
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="tft-button w-full sm:w-auto flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-900 mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search Matches
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Match Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Matches</h2>
          
          {/* Sample Match Cards */}
          {[1, 2, 3, 4, 5].map((match) => (
            <div key={match} className="tft-card">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Match Info */}
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${
                      match <= 4 ? 'text-yellow-400' : 'text-slate-400'
                    }`}>
                      #{match}
                    </div>
                    <div className="text-xs text-slate-400">PLACEMENT</div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <Trophy className={`h-6 w-6 ${
                      match <= 4 ? 'text-yellow-400' : 'text-slate-400'
                    }`} />
                    <div>
                      <div className="text-white font-semibold">Ranked TFT</div>
                      <div className="text-sm text-slate-400">2 hours ago</div>
                    </div>
                  </div>
                </div>

                {/* Match Details */}
                <div className="flex flex-col sm:flex-row gap-6 flex-1">
                  {/* Units */}
                  <div className="flex-1">
                    <div className="text-sm text-slate-400 mb-2">Final Board</div>
                    <div className="flex flex-wrap gap-2">
                      {['Azir', 'Xerath', 'Nasus', 'Renekton', 'K\'Sante', 'Skarner', 'Kog\'Maw'].map((unit, i) => (
                        <div key={i} className="bg-slate-700 text-xs px-2 py-1 rounded text-white">
                          {unit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Traits */}
                  <div className="flex-1">
                    <div className="text-sm text-slate-400 mb-2">Active Traits</div>
                    <div className="flex flex-wrap gap-2">
                      {['Shurima (7)', 'Invoker (2)', 'Sentinel (2)'].map((trait, i) => (
                        <div key={i} className="bg-yellow-600 text-xs px-2 py-1 rounded text-slate-900 font-medium">
                          {trait}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="text-right">
                    <div className="flex items-center justify-end space-x-4 text-sm">
                      <div className="flex items-center text-slate-400">
                        <Clock className="h-4 w-4 mr-1" />
                        28:45
                      </div>
                      <div className="flex items-center text-slate-400">
                        <Users className="h-4 w-4 mr-1" />
                        Level 9
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-slate-800/30 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Want to track your actual matches?</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            This is a demo version. To view your real match history, we need to integrate with Riot's API. 
            Enter your summoner name above to see how it will work!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="tft-button">
              Connect with Riot API
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              View Demo Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}