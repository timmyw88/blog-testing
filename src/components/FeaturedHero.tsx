import React, { useState } from 'react';
import { Sparkles, Play, Copy, Check, ArrowRight, Bookmark } from 'lucide-react';
import { Post } from '../types/blog';

interface FeaturedHeroProps {
  post: Post;
  onOpenDetail: (post: Post) => void;
  isSaved: boolean;
  onToggleSave: (postId: string) => void;
}

export const FeaturedHero: React.FC<FeaturedHeroProps> = ({
  post,
  onOpenDetail,
  isSaved,
  onToggleSave
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(post.positivePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      onClick={() => onOpenDetail(post)}
      className="mb-10 rounded-3xl bg-white dark:bg-[#181a20] border border-[#e5dfd3] dark:border-[#272c36] hover:border-[#234d43] dark:hover:border-[#42a88e] transition-all duration-300 cursor-pointer overflow-hidden shadow-sm hover:shadow-xl group"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        {/* Left Editorial Content (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
          <div>
            {/* Kicker & Meta */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.8 rounded-md bg-[#234d43] text-white text-[11px] font-semibold tracking-wider uppercase">
                Featured Guide
              </span>
              <span className="text-xs text-[#7e7467] dark:text-[#90887c]">
                {post.tool} · {post.readTime || '3 min'}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1c1915] dark:text-[#f3efe6] group-hover:text-[#234d43] dark:group-hover:text-[#42a88e] transition-colors leading-[1.2] tracking-tight mb-3">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-[#595044] dark:text-[#b4aca0] leading-relaxed mb-6 max-w-xl">
              {post.summary}
            </p>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-[#f0ebd9] dark:border-[#242933] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(post);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#234d43] hover:bg-[#1c3f37] dark:bg-[#2d6255] dark:hover:bg-[#387a6a] text-white font-medium text-xs sm:text-sm transition-colors shadow-xs"
              >
                <span>Read Full Tutorial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-colors ${
                  copied
                    ? 'bg-[#d7f1e6] dark:bg-[#1a382f] border-emerald-400 text-[#0d5944] dark:text-[#7ae4c5]'
                    : 'bg-[#faf8f4] dark:bg-[#20242c] border-[#ded8cb] dark:border-[#313745] text-[#38322a] dark:text-[#d0c9be] hover:border-[#234d43]'
                }`}
                title="Copy prompt"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Prompt Copied!' : 'Copy Prompt'}</span>
              </button>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(post.id);
              }}
              className={`p-2 rounded-xl border hover:bg-[#f0ebd9] dark:hover:bg-[#252a35] transition-colors ${
                isSaved ? 'text-amber-600 border-amber-300 dark:border-amber-700' : 'text-[#7e7467] border-[#ded8cb] dark:border-[#2b303c]'
              }`}
              title={isSaved ? 'Saved' : 'Save workflow'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Media (5 cols) */}
        <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-[#e8e2d4] dark:bg-[#20242c] overflow-hidden">
          <img
            src={post.cover}
            alt={post.coverAlt}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700 ease-out"
            referrerPolicy="no-referrer"
          />
          {post.videoUrl && (
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/10 transition-colors">
              <div className="w-14 h-14 rounded-full bg-white/95 dark:bg-[#181a20]/95 text-[#234d43] dark:text-[#42a88e] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
