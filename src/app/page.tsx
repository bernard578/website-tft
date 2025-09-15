'use client';

import Link from 'next/link';
import { Trophy, BarChart3, Clock, Users, BookOpen, TrendingUp, Star, ArrowRight } from 'lucide-react';

const features = [
  {
    name: 'Match History',
    description: 'Track your recent TFT matches with detailed stats, placements, and unit compositions.',
    icon: Trophy,
    href: '/tools/match-history',
    color: 'text-blue-400'
  },
  {
    name: 'Odds Calculator',
    description: 'Calculate rolling probabilities and optimize your reroll strategy with interactive charts.',
    icon: BarChart3,
    href: '/tools/odds-calculator',
    color: 'text-green-400'
  },
  {
    name: 'Time Tracker',
    description: 'See how much time you\'ve invested in climbing the TFT ladder.',
    icon: Clock,
    href: '/tools/time-tracker',
    color: 'text-purple-400'
  },
  {
    name: 'Traits & Units',
    description: 'Browse all champions, traits, and their synergies with our comprehensive database.',
    icon: Users,
    href: '/traits-units',
    color: 'text-orange-400'
  }
];

const latestBlogPosts = [
  {
    title: 'TFT Patch 15.4 Meta Guide',
    excerpt: 'Complete breakdown of the strongest compositions and strategies for the current patch.',
    date: '2025-01-15',
    slug: 'tft-patch-15-4',
    readTime: '8 min read'
  },
  {
    title: 'Beginner\'s Guide to Rolling Odds',
    excerpt: 'Learn when to roll, when to level, and how to optimize your gold management.',
    date: '2025-01-12',
    slug: 'beginners-guide-rolling-odds',
    readTime: '6 min read'
  },
  {
    title: 'Best Starter Items in TFT',
    excerpt: 'Master the art of item management with our comprehensive guide to starting items.',
    date: '2025-01-10',
    slug: 'best-starter-items',
    readTime: '5 min read'
  }
];

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Master <span className="tft-gold">Teamfight Tactics</span> with Data
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-12">
            Track your matches, calculate rolling odds, browse champions, and stay ahead of the meta with our comprehensive TFT tools and guides.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools/match-history" className="tft-button inline-flex items-center">
              <Trophy className="mr-2 h-5 w-5" />
              Check Match History
            </Link>
            <Link href="/tools/odds-calculator" className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200 hover:scale-105 inline-flex items-center">
              <BarChart3 className="mr-2 h-5 w-5" />
              Calculate Odds
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Everything You Need to Climb</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Comprehensive tools and insights to help you understand the game better and improve your TFT gameplay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.name} href={feature.href}>
                  <div className="tft-card group cursor-pointer h-full">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg bg-slate-700 group-hover:bg-slate-600 transition-colors`}>
                        <Icon className={`h-6 w-6 ${feature.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                          {feature.name}
                        </h3>
                        <p className="text-slate-400 group-hover:text-slate-300 transition-colors">
                          {feature.description}
                        </p>
                        <div className="flex items-center mt-4 text-yellow-400 text-sm font-medium">
                          Try it now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">50,000+</div>
              <div className="text-slate-400">Matches Analyzed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-slate-400">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-slate-400">Real-time Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Latest Guides & Strategies</h2>
              <p className="text-slate-400 text-lg">
                Stay updated with the latest meta, strategies, and tips from TFT experts.
              </p>
            </div>
            <Link href="/blog" className="text-yellow-400 hover:text-yellow-300 font-medium flex items-center">
              View all posts <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article className="tft-card group cursor-pointer h-full">
                  <div className="flex items-center space-x-2 text-sm text-slate-400 mb-3">
                    <BookOpen className="h-4 w-4" />
                    <span>{post.readTime}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 group-hover:text-slate-300 transition-colors mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-yellow-400 text-sm font-medium">
                    Read more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-500/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Climb the Ladder?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of players who are already using TFT Companion to improve their gameplay and climb to higher ranks.
          </p>
          <Link href="/tools/match-history" className="tft-button inline-flex items-center text-lg px-8 py-3">
            <Trophy className="mr-2 h-5 w-5" />
            Start Analyzing Your Games
          </Link>
        </div>
      </section>
    </div>
  );
}