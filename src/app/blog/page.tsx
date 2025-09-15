import Link from 'next/link';
import { Calendar, Clock, User, ArrowRight, TrendingUp, BookOpen } from 'lucide-react';
import { blogPosts } from './posts';

const categories = ['All', 'Meta', 'Guides', 'Strategies', 'Patches'];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            TFT <span className="tft-gold">Blog & Guides</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Stay updated with the latest meta, strategies, and tips from TFT experts. 
            Learn advanced tactics to climb the ranked ladder.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                category === 'All'
                  ? 'bg-yellow-500 text-slate-900'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6 text-yellow-400" />
            Featured Guide
          </h2>
          
          <Link href={`/blog/${blogPosts[0].slug}`}>
            <div className="tft-card group cursor-pointer overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="lg:order-2">
                  <div className="aspect-video bg-slate-700 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-yellow-400" />
                  </div>
                </div>
                <div className="lg:order-1 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {blogPosts[0].date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {blogPosts[0].readTime}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {blogPosts[0].author}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {blogPosts[0].title}
                  </h3>
                  
                  <p className="text-slate-300 text-lg mb-6 group-hover:text-slate-200 transition-colors">
                    {blogPosts[0].excerpt}
                  </p>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {blogPosts[0].tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-yellow-400 text-lg font-medium group-hover:text-yellow-300">
                    Read Full Guide 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <article className="tft-card group cursor-pointer h-full flex flex-col">
                <div className="aspect-video bg-slate-700 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-yellow-400" />
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-slate-400 group-hover:text-slate-300 transition-colors mb-4 flex-grow">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-slate-600 text-xs rounded text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-yellow-400 text-sm font-medium group-hover:text-yellow-300">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-yellow-500/10 to-purple-600/10 rounded-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            Never Miss a Guide
          </h2>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest TFT strategies, meta updates, and pro tips delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email..."
              className="tft-input flex-1"
            />
            <button className="tft-button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}