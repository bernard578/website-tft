'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Search, Trophy, BarChart3, Clock, Users, BookOpen, Menu, X } from 'lucide-react';

const Header = () => {
  const [showBlogMenu, setShowBlogMenu] = useState(false);
  const [showToolsMenu, setShowToolsMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const blogTimeoutRef = useRef<NodeJS.Timeout>();
  const toolsTimeoutRef = useRef<NodeJS.Timeout>();

  const latestBlogPosts = [
    { title: "TFT Patch 15.4 Meta Guide", slug: "tft-patch-15-4", date: "2025-01-15" },
    { title: "Beginner's Guide to Rolling Odds", slug: "beginners-guide-rolling-odds", date: "2025-01-12" },
    { title: "Best Starter Items in TFT", slug: "best-starter-items", date: "2025-01-10" },
  ];

  const tools = [
    { name: "Odds Calculator", href: "/tools/odds-calculator", icon: BarChart3, description: "Calculate rolling probabilities" },
    { name: "Match History", href: "/tools/match-history", icon: Trophy, description: "View your recent matches" },
    { name: "Time Tracker", href: "/tools/time-tracker", icon: Clock, description: "Track time spent playing" },
  ];

  const handleBlogMouseEnter = () => {
    if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
    setShowBlogMenu(true);
  };

  const handleBlogMouseLeave = () => {
    blogTimeoutRef.current = setTimeout(() => setShowBlogMenu(false), 150);
  };

  const handleToolsMouseEnter = () => {
    if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    setShowToolsMenu(true);
  };

  const handleToolsMouseLeave = () => {
    toolsTimeoutRef.current = setTimeout(() => setShowToolsMenu(false), 150);
  };

  useEffect(() => {
    return () => {
      if (blogTimeoutRef.current) clearTimeout(blogTimeoutRef.current);
      if (toolsTimeoutRef.current) clearTimeout(toolsTimeoutRef.current);
    };
  }, []);

  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <header className="bg-slate-800/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-yellow-500 p-2 rounded-lg">
              <Trophy className="h-6 w-6 text-slate-900" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">TFT Companion</h1>
              <p className="text-xs text-slate-400">Your Ultimate TFT Hub</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Blog Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleBlogMouseEnter}
              onMouseLeave={handleBlogMouseLeave}
            >
              <Link 
                href="/blog" 
                className="flex items-center space-x-1 text-slate-300 hover:text-yellow-400 transition-colors font-medium"
              >
                <BookOpen className="h-4 w-4" />
                <span>Blog</span>
              </Link>
              
              {showBlogMenu && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 text-xs text-slate-400 uppercase tracking-wide font-semibold border-b border-slate-700">
                    Latest Posts
                  </div>
                  {latestBlogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="block px-4 py-3 hover:bg-slate-700 transition-colors group"
                    >
                      <h4 className="text-white group-hover:text-yellow-400 font-medium">{post.title}</h4>
                      <p className="text-xs text-slate-400 mt-1">{post.date}</p>
                    </Link>
                  ))}
                  <div className="border-t border-slate-700 mt-2">
                    <Link
                      href="/blog"
                      className="block px-4 py-2 text-yellow-400 hover:text-yellow-300 text-sm font-medium"
                    >
                      View All Posts →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Tools Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleToolsMouseEnter}
              onMouseLeave={handleToolsMouseLeave}
            >
              <Link 
                href="/tools" 
                className="flex items-center space-x-1 text-slate-300 hover:text-yellow-400 transition-colors font-medium"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Tools</span>
              </Link>
              
              {showToolsMenu && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2 z-50">
                  <div className="px-4 py-2 text-xs text-slate-400 uppercase tracking-wide font-semibold border-b border-slate-700">
                    TFT Tools
                  </div>
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors group"
                      >
                        <Icon className="h-4 w-4 text-yellow-400 mr-3" />
                        <div>
                          <h4 className="text-white group-hover:text-yellow-400 font-medium">{tool.name}</h4>
                          <p className="text-xs text-slate-400">{tool.description}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Traits & Units */}
            <Link 
              href="/traits-units" 
              className="flex items-center space-x-1 text-slate-300 hover:text-yellow-400 transition-colors font-medium"
            >
              <Users className="h-4 w-4" />
              <span>Traits & Units</span>
            </Link>

            {/* Search */}
            <Link 
              href="/search"
              className="flex items-center space-x-1 text-slate-300 hover:text-yellow-400 transition-colors font-medium"
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="text-slate-300 hover:text-yellow-400 transition-colors p-2"
              aria-label="Toggle mobile menu"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-slate-700 bg-slate-800/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Blog Section */}
              <div className="space-y-1">
                <Link 
                  href="/blog" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-slate-300 hover:text-yellow-400 hover:bg-slate-700 transition-colors"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Blog</span>
                </Link>
                <div className="pl-6 space-y-1">
                  {latestBlogPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={closeMobileMenu}
                      className="block px-3 py-2 rounded-md text-sm text-slate-400 hover:text-yellow-400 hover:bg-slate-700 transition-colors"
                    >
                      {post.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tools Section */}
              <div className="space-y-1">
                <Link 
                  href="/tools" 
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-slate-300 hover:text-yellow-400 hover:bg-slate-700 transition-colors"
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Tools</span>
                </Link>
                <div className="pl-6 space-y-1">
                  {tools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={closeMobileMenu}
                        className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-slate-400 hover:text-yellow-400 hover:bg-slate-700 transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                        <span>{tool.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Traits & Units */}
              <Link 
                href="/traits-units" 
                onClick={closeMobileMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-slate-300 hover:text-yellow-400 hover:bg-slate-700 transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Traits & Units</span>
              </Link>

              {/* Search */}
              <Link 
                href="/search"
                onClick={closeMobileMenu}
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-slate-300 hover:text-yellow-400 hover:bg-slate-700 transition-colors"
              >
                <Search className="h-5 w-5" />
                <span>Search</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;