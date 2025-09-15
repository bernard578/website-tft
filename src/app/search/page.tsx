'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Users, BarChart3, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { blogPosts } from '../blog/posts';

// Sample data for tools and guides
const tools = [
  {
    name: 'Match History',
    description: 'View detailed stats from your recent TFT matches',
    href: '/tools/match-history',
    type: 'tool'
  },
  {
    name: 'Odds Calculator',
    description: 'Calculate rolling probabilities and optimize your strategy',
    href: '/tools/odds-calculator',
    type: 'tool'
  },
  {
    name: 'Time Tracker',
    description: 'Track how much time you\'ve invested in TFT',
    href: '/tools/time-tracker',
    type: 'tool'
  },
  {
    name: 'Traits & Units',
    description: 'Browse all champions, traits, and their synergies',
    href: '/traits-units',
    type: 'tool'
  }
];

const sampleUnits = [
  { name: 'Azir', traits: ['Shurima', 'Strategist'], cost: 5, type: 'unit' },
  { name: 'Jinx', traits: ['Punk', 'Rebel'], cost: 4, type: 'unit' },
  { name: 'Garen', traits: ['Demacia', 'Warden'], cost: 1, type: 'unit' },
  { name: 'Xerath', traits: ['Shurima', 'Sorcerer'], cost: 4, type: 'unit' },
];

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'blog' | 'tools' | 'units'>('all');

  // Combine all searchable content
  const allContent = useMemo(() => [
    ...blogPosts.map(post => ({
      ...post,
      type: 'blog' as const,
      href: `/blog/${post.slug}`
    })),
    ...tools,
    ...sampleUnits.map(unit => ({
      ...unit,
      href: '/traits-units',
      description: `${unit.cost}-cost unit with ${unit.traits.join(', ')} traits`
    }))
  ], []);

  // Filter content based on search term and selected filter
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    // Apply type filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'units') {
        filtered = filtered.filter(item => item.type === 'unit');
      } else {
        filtered = filtered.filter(item => item.type === selectedFilter);
      }
    }

    // Apply search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item => {
        const searchableText = [
          item.name || item.title,
          item.description || item.excerpt,
          ...(item.type === 'blog' ? item.tags || [] : []),
          ...(item.type === 'unit' ? item.traits || [] : [])
        ].join(' ').toLowerCase();
        
        return searchableText.includes(term);
      });
    }

    return filtered;
  }, [allContent, searchTerm, selectedFilter]);

  const filterCounts = useMemo(() => {
    const counts = { all: allContent.length, blog: 0, tools: 0, units: 0 };
    allContent.forEach(item => {
      if (item.type === 'blog') counts.blog++;
      else if (item.type === 'tool') counts.tools++;
      else if (item.type === 'unit') counts.units++;
    });
    return counts;
  }, [allContent]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'blog': return BookOpen;
      case 'tool': return BarChart3;
      case 'unit': return Users;
      default: return Search;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'blog': return 'Blog Post';
      case 'tool': return 'Tool';
      case 'unit': return 'Unit';
      default: return 'Content';
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="tft-gold">Search</span> TFT Companion
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Find guides, tools, champions, traits, and everything you need to improve your TFT gameplay.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search for guides, tools, champions, traits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="tft-input w-full pl-12 pr-4 py-4 text-lg"
              autoFocus
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedFilter === 'all'
                ? 'bg-yellow-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>All ({filterCounts.all})</span>
          </button>
          
          <button
            onClick={() => setSelectedFilter('blog')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedFilter === 'blog'
                ? 'bg-yellow-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Guides ({filterCounts.blog})</span>
          </button>
          
          <button
            onClick={() => setSelectedFilter('tools')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedFilter === 'tools'
                ? 'bg-yellow-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <BarChart3 className="h-4 w-4" />
            <span>Tools ({filterCounts.tools})</span>
          </button>
          
          <button
            onClick={() => setSelectedFilter('units')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedFilter === 'units'
                ? 'bg-yellow-500 text-slate-900'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Units ({filterCounts.units})</span>
          </button>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-slate-400">
            {searchTerm ? (
              <>Found <span className="text-yellow-400 font-semibold">{filteredContent.length}</span> results for "<span className="text-white">{searchTerm}</span>"</>
            ) : (
              <>Showing <span className="text-yellow-400 font-semibold">{filteredContent.length}</span> items</>
            )}
          </p>
        </div>

        {/* Search Results */}
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map((item, index) => {
              const Icon = getIcon(item.type);
              return (
                <Link key={`${item.type}-${index}`} href={item.href}>
                  <div className="tft-card group cursor-pointer h-full">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className="bg-slate-700 p-2 rounded-lg group-hover:bg-slate-600 transition-colors">
                        <Icon className="h-5 w-5 text-yellow-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                            {getTypeLabel(item.type)}
                          </span>
                          {item.type === 'blog' && 'readTime' in item && (
                            <span className="text-xs text-slate-500">{item.readTime}</span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors mb-2">
                          {item.name || item.title}
                        </h3>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors text-sm">
                          {item.description || item.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-4 pt-3 border-t border-slate-700">
                      {item.type === 'blog' && 'date' in item && (
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {item.date}
                          </div>
                          {item.author && (
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              {item.author}
                            </div>
                          )}
                        </div>
                      )}
                      
                      {item.type === 'unit' && 'traits' in item && (
                        <div className="flex flex-wrap gap-1">
                          {item.traits?.map((trait, i) => (
                            <span key={i} className="text-xs bg-slate-600 px-2 py-1 rounded text-slate-300">
                              {trait}
                            </span>
                          ))}
                        </div>
                      )}

                      {item.type === 'blog' && 'tags' in item && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags?.slice(0, 3).map((tag, i) => (
                            <span key={i} className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-end mt-3">
                        <div className="flex items-center text-yellow-400 text-sm font-medium group-hover:text-yellow-300">
                          {item.type === 'blog' ? 'Read' : item.type === 'tool' ? 'Use Tool' : 'View'} 
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-slate-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-slate-400 mb-4">
              {searchTerm ? 'No results found' : 'Start your search'}
            </h3>
            <p className="text-slate-500 max-w-md mx-auto">
              {searchTerm 
                ? `Try adjusting your search terms or browse our ${selectedFilter === 'all' ? 'content' : selectedFilter} to find what you're looking for.`
                : 'Type in the search box above to find guides, tools, champions, and more.'
              }
            </p>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-8">Popular Searches</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Meta Guide', 'Rolling Odds', 'Best Items', 'Shurima', 'Positioning', 'Climbing Tips'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchTerm(term)}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white rounded-lg transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}