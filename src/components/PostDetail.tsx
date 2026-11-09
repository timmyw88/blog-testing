import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Copy,
  Check,
  Share2,
  Sliders,
  CheckCircle2,
  Lightbulb,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Post } from "../types/blog";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  isSaved?: boolean;
  onToggleSave?: (postId: string) => void;
  onSelectPost: (post: Post) => void;
  relatedPosts: Post[];
}

export function getYoutubeEmbed(url?: string): string | null {
  if (!url) return null;
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    let id = "";
    if (host === "youtu.be") {
      id = parsed.pathname.split("/").filter(Boolean)[0] ?? "";
    } else if (parsed.pathname === "/watch") {
      id = parsed.searchParams.get("v") ?? "";
    } else {
      const match = parsed.pathname.match(
        /^\/(?:embed|shorts|live)\/([^/?#]+)/,
      );
      id = match?.[1] ?? "";
    }
    if (!id || id.length < 5) return null;
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
  } catch {
    return null;
  }
}

export const PostDetail: React.FC<PostDetailProps> = ({
  post,
  onBack,
  onSelectPost,
  relatedPosts,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [post.id]);

  const embedUrl = getYoutubeEmbed(post.videoUrl);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(post.positivePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: post.title,
          text: post.summary,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const wordCount = post.positivePrompt.trim().split(/\s+/).length;
  const charCount = post.positivePrompt.length;

  return (
    <article className="max-w-4xl mx-auto bg-white p-6 sm:p-10 lg:p-12 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
      {/* Top Nav inside Detail */}
      <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-100">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-[#d9534f] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to archive</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-200 text-xs font-medium text-neutral-700 hover:border-black transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shared ? "Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <header className="mb-8">
        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#d9534f] uppercase tracking-widest mb-3">
          <span>{post.tool}</span>
          <span aria-hidden="true">·</span>
          <span>
            {post.category === "video" ? "Video Workflow" : "Image Prompt"}
          </span>
          {post.model && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-400">{post.model}</span>
            </>
          )}
        </div>

        <h1 className="font-bold text-2xl sm:text-4xl text-[#111] leading-tight tracking-tight mb-4">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed mb-6">
          {post.summary}
        </p>

        <div className="flex items-center gap-3 text-xs text-neutral-400 pt-4 border-t border-neutral-100">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime || "3 min read"}</span>
          <span>·</span>
          <span className="text-[#d9534f] font-medium">Verified Workflow</span>
        </div>
      </header>

      {/* Featured Media: YouTube Video or Cover Photo */}
      <div className="mb-10 bg-neutral-100 overflow-hidden">
        {embedUrl ? (
          <div className="relative aspect-video w-full">
            <iframe
              src={embedUrl}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0"
            />
          </div>
        ) : (
          <div className="relative aspect-16/10 w-full overflow-hidden">
            <img
              src={post.cover}
              alt={post.coverAlt}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
        <div className="p-3 text-xs text-neutral-500 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <span>{post.coverAlt}</span>
          {post.videoUrl && (
            <a
              href={post.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-[#d9534f] hover:underline"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* PROMPT RECIPE BLOCK */}
      <section className="mb-10 border border-neutral-200 bg-neutral-50">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 bg-white border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d9534f]" />
            <h2 className="font-bold text-sm text-[#111] uppercase tracking-wider">
              Prompt
            </h2>
            <span className="text-xs text-neutral-400">
              ({wordCount} words)
            </span>
          </div>

          <button
            onClick={handleCopyPrompt}
            className={`flex items-center gap-1.5 px-4 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${
              copiedPrompt
                ? "bg-emerald-600 text-white"
                : "bg-[#d9534f] hover:bg-[#c9302c] text-white"
            }`}
          >
            {copiedPrompt ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
          </button>
        </div>

        <div className="p-5">
          <pre className="font-mono text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap select-all overflow-x-auto bg-white p-4 border border-neutral-200">
            <code>{post.positivePrompt}</code>
          </pre>
        </div>

        {post.negativePrompt && (
          <div className="px-5 pb-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-700 mb-1">
              Negative / Exclusions
            </h3>
            <pre className="font-mono text-xs text-red-900 bg-red-50 p-3 border border-red-200 whitespace-pre-wrap">
              <code>{post.negativePrompt}</code>
            </pre>
          </div>
        )}
      </section>

      {/* STEP-BY-STEP INSTRUCTIONS */}
      <section className="mb-10">
        <h2 className="font-bold text-xl text-[#111] mb-4">
          Step-by-Step Instructions
        </h2>

        <div className="space-y-3">
          {post.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 bg-neutral-50 border border-neutral-200 flex items-start gap-3"
            >
              <div className="w-6 h-6 bg-[#d9534f] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm text-[#111] mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SETTINGS TABLE */}
      {post.settings && post.settings.length > 0 && (
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Sliders className="w-4 h-4 text-[#d9534f]" />
            <h2 className="font-bold text-lg text-[#111]">
              Recommended Settings
            </h2>
          </div>

          <table className="w-full text-left text-xs border border-neutral-200">
            <thead className="bg-neutral-100 border-b border-neutral-200 font-semibold text-neutral-700">
              <tr>
                <th className="py-2.5 px-4 w-1/3">Parameter</th>
                <th className="py-2.5 px-4">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              {post.settings.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50">
                  <td className="py-2.5 px-4 font-semibold text-neutral-800">
                    {item.key}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-neutral-600">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* PRO TIPS */}
      {post.tips && post.tips.length > 0 && (
        <section className="mb-10 p-5 bg-[#fff8f0] border border-[#f5dfc6]">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-600" />
            <h2 className="font-bold text-sm text-[#111] uppercase tracking-wider">
              Pro Tips
            </h2>
          </div>
          <ul className="space-y-1.5 text-xs text-neutral-700 list-disc list-inside">
            {post.tips.map((tip, idx) => (
              <li key={idx} className="leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="pt-8 border-t border-neutral-200">
          <h2 className="font-bold text-lg text-[#111] mb-4">Related Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <a
                key={related.id}
                href={`#post/${related.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSelectPost(related);
                }}
                className="group p-3 border border-neutral-200 bg-white hover:border-[#d9534f] cursor-pointer transition-colors flex gap-3 items-center text-inherit no-underline"
              >
                <div className="w-16 h-16 bg-neutral-100 shrink-0 overflow-hidden">
                  <img
                    src={related.cover}
                    alt={related.coverAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold text-[#d9534f] uppercase tracking-wider mb-0.5">
                    {related.tool}
                  </p>
                  <h3 className="font-bold text-xs text-[#111] group-hover:text-[#d9534f] truncate leading-snug">
                    {related.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
