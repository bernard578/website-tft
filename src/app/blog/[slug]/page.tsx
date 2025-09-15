import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, User, ArrowLeft, Share, BookOpen } from 'lucide-react';
import { getBlogPost, getLatestPosts } from '../posts';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPost(params.slug);
  const relatedPosts = getLatestPosts(3).filter(p => p.slug !== params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link href="/blog" className="inline-flex items-center text-yellow-400 hover:text-yellow-300 mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-slate-400 mb-6">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {post.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.readTime}
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <button className="flex items-center space-x-2 text-slate-400 hover:text-yellow-400 transition-colors">
              <Share className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none">
          <div className="tft-card">
            <div 
              className="text-slate-200 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content
                  .replace(/^# /gm, '<h1 class="text-3xl font-bold text-white mb-6 mt-8">')
                  .replace(/^## /gm, '<h2 class="text-2xl font-bold text-white mb-4 mt-6">')
                  .replace(/^### /gm, '<h3 class="text-xl font-bold text-yellow-400 mb-3 mt-4">')
                  .replace(/^\* /gm, '<li class="mb-2">')
                  .replace(/^\d+\. /gm, '<li class="mb-2 list-decimal">')
                  .replace(/\n\n/g, '</p><p class="mb-4">')
                  .replace(/^\*\*(.*?)\*\*/gm, '<strong class="text-yellow-400">$1</strong>')
              }}
            />
          </div>
        </article>

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-slate-800/50 rounded-lg border border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-slate-900" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{post.author}</h3>
              <p className="text-slate-400">
                Expert TFT player and strategist with years of experience in competitive play.
              </p>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                  <div className="tft-card group cursor-pointer">
                    <div className="flex items-center space-x-3 mb-3">
                      <BookOpen className="h-6 w-6 text-yellow-400" />
                      <div className="text-sm text-slate-400">
                        {relatedPost.readTime}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                      {relatedPost.excerpt.substring(0, 120)}...
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 text-center p-8 bg-gradient-to-r from-yellow-500/10 to-purple-600/10 rounded-2xl">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Climb?
          </h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Put these strategies into practice and start your climb to higher ranks. 
            Use our tools to track your progress and analyze your gameplay.
          </p>
          <Link href="/tools" className="tft-button inline-flex items-center">
            Explore TFT Tools
          </Link>
        </div>
      </div>
    </div>
  );
}