'use client';

import { useState } from 'react';
import { Clock, TrendingUp, Calendar, BarChart3, Search } from 'lucide-react';

export default function TimeTrackerPage() {
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

  // Demo data
  const demoStats = {
    totalHours: 248,
    totalDays: 10.3,
    thisMonth: 45,
    averagePerDay: 3.2,
    longestSession: 8.5,
    totalMatches: 532,
    averageMatchTime: 28,
    rankProgress: {
      bronze: 120,
      silver: 89,
      gold: 65,
      platinum: 42,
      diamond: 16
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            TFT <span className="tft-gold">Time Tracker</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Track how much time you've invested in TFT and see your gameplay patterns across different ranks and patches.
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
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze Playtime
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo Stats */}
        <div className="space-y-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="tft-card text-center">
              <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{demoStats.totalHours}</div>
              <div className="text-sm text-slate-400">Total Hours</div>
            </div>
            
            <div className="tft-card text-center">
              <Calendar className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{demoStats.totalDays}</div>
              <div className="text-sm text-slate-400">Total Days</div>
            </div>
            
            <div className="tft-card text-center">
              <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{demoStats.thisMonth}h</div>
              <div className="text-sm text-slate-400">This Month</div>
            </div>
            
            <div className="tft-card text-center">
              <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{demoStats.totalMatches}</div>
              <div className="text-sm text-slate-400">Total Matches</div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Time Breakdown */}
            <div className="tft-card">
              <h2 className="text-xl font-bold text-white mb-6">Time Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Average per day</span>
                  <span className="text-yellow-400 font-semibold">{demoStats.averagePerDay}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Longest session</span>
                  <span className="text-yellow-400 font-semibold">{demoStats.longestSession}h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Average match time</span>
                  <span className="text-yellow-400 font-semibold">{demoStats.averageMatchTime}m</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Est. matches per hour</span>
                  <span className="text-yellow-400 font-semibold">2.1</span>
                </div>
              </div>
            </div>

            {/* Rank Distribution */}
            <div className="tft-card">
              <h2 className="text-xl font-bold text-white mb-6">Time Spent by Rank</h2>
              <div className="space-y-4">
                {Object.entries(demoStats.rankProgress).map(([rank, hours]) => {
                  const percentage = (hours / demoStats.totalHours) * 100;
                  return (
                    <div key={rank}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-slate-300 capitalize">{rank}</span>
                        <span className="text-yellow-400 font-semibold">{hours}h</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Monthly Activity */}
          <div className="tft-card">
            <h2 className="text-xl font-bold text-white mb-6">Monthly Activity</h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div className="text-xs text-slate-400 text-center py-1">Mon</div>
              <div className="text-xs text-slate-400 text-center py-1">Tue</div>
              <div className="text-xs text-slate-400 text-center py-1">Wed</div>
              <div className="text-xs text-slate-400 text-center py-1">Thu</div>
              <div className="text-xs text-slate-400 text-center py-1">Fri</div>
              <div className="text-xs text-slate-400 text-center py-1">Sat</div>
              <div className="text-xs text-slate-400 text-center py-1">Sun</div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className={`h-6 rounded-sm ${
                      intensity > 0.7
                        ? 'bg-yellow-400'
                        : intensity > 0.4
                        ? 'bg-yellow-600'
                        : intensity > 0.1
                        ? 'bg-slate-600'
                        : 'bg-slate-800'
                    }`}
                    title={`${(intensity * 8).toFixed(1)} hours`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between mt-4 text-xs text-slate-400">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="h-3 w-3 bg-slate-800 rounded-sm" />
                <div className="h-3 w-3 bg-slate-600 rounded-sm" />
                <div className="h-3 w-3 bg-yellow-600 rounded-sm" />
                <div className="h-3 w-3 bg-yellow-400 rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Insights */}
          <div className="tft-card">
            <h2 className="text-xl font-bold text-white mb-6">Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-green-400 mb-2">Most Active Day</h3>
                <p className="text-green-300 text-sm">
                  Saturdays are your most active days with an average of 5.2 hours played.
                </p>
              </div>
              
              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-400 mb-2">Climbing Pattern</h3>
                <p className="text-blue-300 text-sm">
                  You spent the most time in Silver rank, suggesting strong fundamentals before advancing.
                </p>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-purple-400 mb-2">Session Length</h3>
                <p className="text-purple-300 text-sm">
                  Your average session is 3.2 hours, which is ideal for maintaining focus and performance.
                </p>
              </div>
              
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">Dedication Level</h3>
                <p className="text-yellow-300 text-sm">
                  You've played TFT for 248 hours this season - that's serious commitment to improvement!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-slate-800/30 rounded-2xl">
          <h3 className="text-xl font-bold text-white mb-4">Track Your Actual Playtime</h3>
          <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
            This demo shows sample data. To track your real playtime and get personalized insights, 
            enter your summoner name above and connect with the Riot API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="tft-button">
              Connect with Riot API
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Export Demo Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}