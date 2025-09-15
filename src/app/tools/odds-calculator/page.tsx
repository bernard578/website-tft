'use client';

import { useState, useMemo } from 'react';
import { BarChart3, Calculator, Info, TrendingUp } from 'lucide-react';

// TFT rolling odds data (hardcoded as per requirements)
const ROLLING_ODDS = {
  2: [100, 0, 0, 0, 0],
  3: [75, 25, 0, 0, 0],
  4: [55, 30, 15, 0, 0],
  5: [45, 33, 20, 2, 0],
  6: [35, 35, 25, 5, 0],
  7: [19, 30, 35, 15, 1],
  8: [16, 20, 35, 25, 4],
  9: [9, 15, 30, 30, 16],
  10: [5, 10, 20, 40, 25],
  11: [1, 2, 12, 50, 35]
};

const UNIT_COSTS = ['1-cost', '2-cost', '3-cost', '4-cost', '5-cost'];

export default function OddsCalculatorPage() {
  const [selectedLevel, setSelectedLevel] = useState(7);
  const [rolls, setRolls] = useState(10);
  const [targetCost, setTargetCost] = useState(4);

  // Calculate probability of hitting at least 1 unit of target cost in X rolls
  const calculateHitProbability = useMemo(() => {
    const oddsAtLevel = ROLLING_ODDS[selectedLevel as keyof typeof ROLLING_ODDS];
    const singleRollOdds = oddsAtLevel[targetCost - 1] / 100;
    const missOdds = 1 - singleRollOdds;
    const hitProbability = (1 - Math.pow(missOdds, rolls)) * 100;
    return hitProbability.toFixed(1);
  }, [selectedLevel, rolls, targetCost]);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            TFT <span className="tft-gold">Rolling Odds Calculator</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Calculate rolling probabilities and optimize your reroll strategy with interactive charts and probability analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calculator Controls */}
          <div className="xl:col-span-1">
            <div className="tft-card sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-yellow-400" />
                Probability Calculator
              </h2>

              <div className="space-y-6">
                {/* Level Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">
                    Player Level: {selectedLevel}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="11"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(Number(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1">
                    <span>2</span>
                    <span>11</span>
                  </div>
                </div>

                {/* Number of Rolls */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Number of Rolls
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={rolls}
                    onChange={(e) => setRolls(Number(e.target.value))}
                    className="tft-input w-full"
                  />
                </div>

                {/* Target Unit Cost */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Target Unit Cost
                  </label>
                  <select
                    value={targetCost}
                    onChange={(e) => setTargetCost(Number(e.target.value))}
                    className="tft-input w-full"
                  >
                    {UNIT_COSTS.map((cost, index) => (
                      <option key={cost} value={index + 1} className="bg-slate-800">
                        {cost}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Result */}
                <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">
                      {calculateHitProbability}%
                    </div>
                    <div className="text-sm text-slate-300">
                      Chance to hit at least 1 {UNIT_COSTS[targetCost - 1]} unit
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      in {rolls} rolls at level {selectedLevel}
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-300">
                      <div className="font-medium mb-1">How it works:</div>
                      <div className="text-blue-200 text-xs">
                        This calculator uses TFT's official rolling odds table. Each roll has independent probability based on your level.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts and Tables */}
          <div className="xl:col-span-2 space-y-8">
            {/* Rolling Odds Table */}
            <div className="tft-card">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <BarChart3 className="mr-2 h-5 w-5 text-yellow-400" />
                Rolling Odds by Level
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Level</th>
                      {UNIT_COSTS.map((cost) => (
                        <th key={cost} className="text-center py-3 px-4 text-slate-300 font-medium">
                          {cost}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(ROLLING_ODDS).map(([level, odds]) => (
                      <tr
                        key={level}
                        className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                          selectedLevel === Number(level) ? 'bg-yellow-500/10 border-yellow-500/30' : ''
                        }`}
                      >
                        <td className="py-3 px-4 font-medium text-white">
                          Level {level}
                        </td>
                        {odds.map((odd, index) => (
                          <td
                            key={index}
                            className={`text-center py-3 px-4 ${
                              selectedLevel === Number(level) && targetCost === index + 1
                                ? 'text-yellow-400 font-bold'
                                : odd > 0
                                ? 'text-white'
                                : 'text-slate-500'
                            }`}
                          >
                            {odd}%
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Visual Chart (Placeholder) */}
            <div className="tft-card">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-yellow-400" />
                Probability Visualization
              </h2>
              
              <div className="grid grid-cols-5 gap-4 mb-6">
                {UNIT_COSTS.map((cost, index) => {
                  const currentOdds = ROLLING_ODDS[selectedLevel as keyof typeof ROLLING_ODDS][index];
                  const height = Math.max(currentOdds * 2, 4); // Scale for visibility
                  
                  return (
                    <div key={cost} className="text-center">
                      <div className="bg-slate-700 rounded-lg overflow-hidden h-32 flex items-end justify-center mb-2">
                        <div
                          className={`w-full transition-all duration-500 rounded-t ${
                            targetCost === index + 1 ? 'bg-yellow-400' : 'bg-slate-500'
                          }`}
                          style={{ height: `${height}%`, minHeight: '4px' }}
                        />
                      </div>
                      <div className="text-xs text-slate-400">{cost}</div>
                      <div className={`text-sm font-medium ${
                        targetCost === index + 1 ? 'text-yellow-400' : 'text-white'
                      }`}>
                        {currentOdds}%
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center text-sm text-slate-400">
                Rolling odds at level {selectedLevel}
              </div>
            </div>

            {/* Strategy Tips */}
            <div className="tft-card">
              <h2 className="text-xl font-bold text-white mb-6">Rolling Strategy Tips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-2">When to Roll</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Level 7 for 4-cost carries</li>
                    <li>• Level 8 for 5-cost units</li>
                    <li>• Above 50 gold when stable</li>
                    <li>• When you need specific upgrades</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-400 mb-2">Gold Management</h3>
                  <ul className="space-y-2 text-sm text-slate-300">
                    <li>• Maintain 50+ gold for interest</li>
                    <li>• Roll down when health is low</li>
                    <li>• Consider your comp strength</li>
                    <li>• Plan your power spikes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}