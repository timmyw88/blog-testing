import React, { useState } from 'react';
import { Copy, Check, Play } from 'lucide-react';
import { Post } from '../types/blog';

interface PostCardProps {
  post: Post;
  onOpenDetail: (post: Post) => void;
  isSaved?: boolean;
  onToggleSave?: (postId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onOpenDetail
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(post.positivePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      onClick={() => onOpenDetail(post)}
      className="paperleaf-card group bg-white shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 cursor-pointer overflow-hidden flex flex-col"
    >
      {/* Cover Image Container */}
      <div className="relative w-full bg-[#eaeaea] overflow-hidden">
        <img
          src={post.cover}
          alt={post.coverAlt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.currentTarget as HTMLElement).style.display = 'none';
          }}
        />

        {/* Video Icon Badge if post has video */}
        {post.videoUrl && (
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 text-white flex items-center gap-1.5 text-[11px] font-medium">
            <Play className="w-3 h-3 fill-current" />
            <span>Video</span>
          </div>
        )}

        {/* Prompt Copy on Hover */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 bg-white/95 text-[#222] hover:text-[#d9534f] text-[10px] font-semibold tracking-wider uppercase shadow-xs flex items-center gap-1"
            title="Copy prompt"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Prompt'}</span>
          </button>
        </div>
      </div>

      {/* Card Content (Exact Paperleaf style) */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Post Title */}
          <h2 className="font-bold text-lg sm:text-[19px] text-[#111111] group-hover:text-[#d9534f] transition-colors leading-[1.3] mb-3">
            {post.title}
          </h2>

          {/* Post Excerpt with Paperleaf '»' sign-off */}
          <p className="text-xs text-[#555555] leading-[1.65] font-normal">
            {post.summary}
          </p>
        </div>
      </div>
    </article>
  );
};
