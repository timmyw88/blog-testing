import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Sparkles, Layers, Video, Image as ImageIcon } from 'lucide-react';
import { Post } from '../types/blog';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectPost
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredPosts = trimmed
    ? posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(trimmed) ||
          post.summary.toLowerCase().includes(trimmed) ||
          post.positivePrompt.toLowerCase().includes(trimmed) ||
          post.tool.toLowerCase().includes(trimmed) ||
          post.tags.some((t) => t.toLowerCase().includes(trimmed))
        );
      })
    : posts.slice(0, 4); // show recent 4 if empty

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#181a20] rounded-2xl border border-[#ded8cb] dark:border-[#2b303c] shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#e8e2d4] dark:border-[#262b35] bg-[#faf8f4] dark:bg-[#15171c]">
          <Search className="w-5 h-5 text-[#234d43] dark:text-[#42a88e] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tutorials, prompts, tools (e.g. ChatGPT, vision board)..."
            className="w-full bg-transparent text-sm sm:text-base text-[#1c1915] dark:text-[#f3efe6] placeholder-[#887e71] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md hover:bg-[#e8e2d4] dark:hover:bg-[#252a35] text-[#736a5f]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2 py-1 rounded bg-[#efe9dc] dark:bg-[#252a35] text-[#595044] dark:text-[#b4aca0] hover:text-[#1c1915]"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#807669] dark:text-[#7f786d]">
            {trimmed ? `Search Results (${filteredPosts.length})` : 'Popular Workflows'}
          </div>

          {filteredPosts.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#736a5f] dark:text-[#90887c]">
              No prompts found matching "{query}". Try searching for "ChatGPT", "Portrait", "Video", or "Prompt".
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onSelectPost(post);
                  onClose();
                }}
                className="group p-3 rounded-xl hover:bg-[#f5f1e8] dark:hover:bg-[#20242c] cursor-pointer transition-colors border border-transparent hover:border-[#ded8cb] dark:hover:border-[#2b303c] flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#e8e2d4] dark:bg-[#252a35] shrink-0">
                    <img
                      src={post.cover}
                      alt={post.coverAlt}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-[11px] text-[#7e7467] dark:text-[#90887c] mb-0.5">
                      <span className="font-semibold text-[#234d43] dark:text-[#52c2a5]">
                        {post.tool}
                      </span>
                      <span>·</span>
                      <span>{post.category}</span>
                      <span>·</span>
                      <span>{post.readTime || '3 min'}</span>
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#1c1915] dark:text-[#f3efe6] truncate group-hover:text-[#234d43] dark:group-hover:text-[#42a88e]">
                      {post.title}
                    </h4>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-[#8a8073] group-hover:text-[#234d43] dark:group-hover:text-[#42a88e] group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-2.5 bg-[#f5f1e8] dark:bg-[#15171c] border-t border-[#e8e2d4] dark:border-[#262b35] text-[11px] text-[#7e7467] dark:text-[#888176] flex items-center justify-between">
          <span>Search in titles, prompts, settings & tools</span>
          <div className="flex items-center gap-2">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-white dark:bg-[#20242c] border border-[#d6cfbe] dark:border-[#383e4c] rounded font-mono text-[10px]">
              ↵ to select
            </kbd>
          </div>
        </div>
      </div>
    </div>
  );
};
