'use client';

import { useState, useMemo } from 'react';
import { Search, Users, Zap, Star, Filter, X } from 'lucide-react';

// Sample TFT data (this would normally come from an API or database)
const sampleUnits = [
  {
    id: 1,
    name: 'Azir',
    cost: 5,
    traits: ['Shurima', 'Strategist', 'Emperor'],
    ability: 'Summons multiple Sand Soldiers that attack nearby enemies',
    image: 'azir.jpg'
  },
  {
    id: 2,
    name: 'Jinx',
    cost: 4,
    traits: ['Punk', 'Rebel', 'Marksman'],
    ability: 'Fires a rocket that deals massive AoE damage',
    image: 'jinx.jpg'
  },
  {
    id: 3,
    name: 'Garen',
    cost: 1,
    traits: ['Demacia', 'Warden'],
    ability: 'Spins to deal damage and gain damage reduction',
    image: 'garen.jpg'
  },
  {
    id: 4,
    name: 'Xerath',
    cost: 4,
    traits: ['Shurima', 'Sorcerer'],
    ability: 'Channels to unleash devastating magical blasts',
    image: 'xerath.jpg'
  },
  {
    id: 5,
    name: 'Nasus',
    cost: 3,
    traits: ['Shurima', 'Juggernaut'],
    ability: 'Grows stronger with each enemy death nearby',
    image: 'nasus.jpg'
  },
  {
    id: 6,
    name: 'Vi',
    cost: 2,
    traits: ['Punk', 'Pit Fighter', 'Bruiser'],
    ability: 'Charges through enemies, dealing damage and stunning',
    image: 'vi.jpg'
  }
];

const sampleTraits = [
  {
    name: 'Shurima',
    description: 'Shurima champions gain Attack Speed and their spells Shred enemies.',
    tiers: [
      { count: 3, bonus: '15% Attack Speed, spells Shred 15% Armor for 5 seconds' },
      { count: 5, bonus: '30% Attack Speed, spells Shred 25% Armor for 5 seconds' },
      { count: 7, bonus: '50% Attack Speed, spells Shred 40% Armor for 5 seconds' },
      { count: 9, bonus: '75% Attack Speed, spells Shred 40% Armor and reduce healing by 50%' }
    ]
  },
  {
    name: 'Punk',
    description: 'Punk champions gain Health and deal bonus damage based on missing Health.',
    tiers: [
      { count: 2, bonus: '+200 Health, +2% damage per 1% missing Health' },
      { count: 4, bonus: '+400 Health, +4% damage per 1% missing Health' },
      { count: 6, bonus: '+650 Health, +6% damage per 1% missing Health' }
    ]
  },
  {
    name: 'Demacia',
    description: 'Demacia champions gain Armor and Magic Resist.',
    tiers: [
      { count: 3, bonus: '+25 Armor and Magic Resist' },
      { count: 6, bonus: '+55 Armor and Magic Resist' },
      { count: 9, bonus: '+100 Armor and Magic Resist, +25% damage' }
    ]
  }
];

export default function TraitsUnitsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'units' | 'traits'>('units');
  const [costFilter, setCostFilter] = useState<number[]>([]);
  const [traitFilter, setTraitFilter] = useState<string[]>([]);

  // Get unique traits and costs for filters
  const uniqueTraits = useMemo(() => {
    const traits = new Set();
    sampleUnits.forEach(unit => unit.traits.forEach(trait => traits.add(trait)));
    return Array.from(traits) as string[];
  }, []);

  const uniqueCosts = useMemo(() => {
    return [...new Set(sampleUnits.map(unit => unit.cost))].sort();
  }, []);

  // Filter units based on search and filters
  const filteredUnits = useMemo(() => {
    return sampleUnits.filter(unit => {
      const matchesSearch = unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.traits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCost = costFilter.length === 0 || costFilter.includes(unit.cost);
      
      const matchesTrait = traitFilter.length === 0 || 
        traitFilter.some(trait => unit.traits.includes(trait));
      
      return matchesSearch && matchesCost && matchesTrait;
    });
  }, [searchTerm, costFilter, traitFilter]);

  // Filter traits based on search
  const filteredTraits = useMemo(() => {
    return sampleTraits.filter(trait =>
      trait.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trait.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleCostFilter = (cost: number) => {
    setCostFilter(prev => 
      prev.includes(cost) 
        ? prev.filter(c => c !== cost)
        : [...prev, cost]
    );
  };

  const toggleTraitFilter = (trait: string) => {
    setTraitFilter(prev =>
      prev.includes(trait)
        ? prev.filter(t => t !== trait)
        : [...prev, trait]
    );
  };

  const clearFilters = () => {
    setCostFilter([]);
    setTraitFilter([]);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            TFT <span className="tft-gold">Traits & Units</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Browse all champions, traits, and their synergies. Search, filter, and discover optimal team compositions.
          </p>
        </div>

        {/* Search and Tabs */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search units or traits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="tft-input w-full pl-10"
              />
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setSelectedTab('units')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedTab === 'units'
                    ? 'bg-yellow-500 text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Users className="inline h-4 w-4 mr-2" />
                Units
              </button>
              <button
                onClick={() => setSelectedTab('traits')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  selectedTab === 'traits'
                    ? 'bg-yellow-500 text-slate-900'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Zap className="inline h-4 w-4 mr-2" />
                Traits
              </button>
            </div>
          </div>

          {/* Filters (only for units) */}
          {selectedTab === 'units' && (
            <div className="tft-card mb-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Cost Filter */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Filter by Cost:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uniqueCosts.map((cost) => (
                      <button
                        key={cost}
                        onClick={() => toggleCostFilter(cost)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          costFilter.includes(cost)
                            ? 'bg-yellow-500 text-slate-900'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {cost} <Star className="inline h-3 w-3 ml-1" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Trait Filter */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-300">Filter by Trait:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {uniqueTraits.slice(0, 6).map((trait) => (
                      <button
                        key={trait}
                        onClick={() => toggleTraitFilter(trait)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          traitFilter.includes(trait)
                            ? 'bg-yellow-500 text-slate-900'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        {trait}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(costFilter.length > 0 || traitFilter.length > 0) && (
                  <div className="flex items-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center px-3 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {selectedTab === 'units' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit) => (
              <div key={unit.id} className="tft-card group hover:scale-105 transition-transform">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center">
                    <Users className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-white">{unit.name}</h3>
                      <div className="flex items-center">
                        {Array.from({ length: unit.cost }).map((_, i) => (
                          <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {unit.traits.map((trait) => (
                        <span
                          key={trait}
                          className="px-2 py-1 bg-slate-600 text-xs rounded text-slate-200"
                        >
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {unit.ability}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {filteredTraits.map((trait) => (
              <div key={trait.name} className="tft-card">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{trait.name}</h3>
                  <p className="text-slate-300">{trait.description}</p>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-3">Trait Bonuses</h4>
                  {trait.tiers.map((tier, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div className="bg-yellow-500 text-slate-900 font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">
                        {tier.count}
                      </div>
                      <p className="text-slate-200 text-sm">{tier.bonus}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {((selectedTab === 'units' && filteredUnits.length === 0) ||
          (selectedTab === 'traits' && filteredTraits.length === 0)) && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-400 mb-2">
              No {selectedTab} found
            </h3>
            <p className="text-slate-500">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {/* Stats Footer */}
        <div className="mt-16 text-center p-8 bg-slate-800/30 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">60+</div>
              <div className="text-slate-400">Total Champions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-slate-400">Unique Traits</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-slate-400">Possible Synergies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}