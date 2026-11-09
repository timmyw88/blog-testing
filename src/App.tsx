import React, { useState, useEffect } from 'react';
import { POSTS } from './data/posts';
import { Post, ActiveTab } from './types/blog';
import { siteConfig } from './data/site';
import { Sidebar } from './components/Sidebar';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { AboutView } from './components/AboutView';
import { PrivacyView } from './components/PrivacyView';
import { Menu, Filter } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Saved Bookmarked Posts
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('paperleaf_saved');
        return stored ? JSON.parse(stored) : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('paperleaf_saved', JSON.stringify(updated));
      return updated;
    });
  };

  // Mobile drawer state
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle URL hash for deep linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#post/')) {
        const slug = decodeURIComponent(hash.replace('#post/', ''));
        const found = POSTS.find((p) => p.slug === slug || p.id === slug);
        if (found) {
          setSelectedPost(found);
          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          return;
        }
      } else if (hash === '#about') {
        setActiveTab('about');
        setSelectedPost(null);
      } else if (hash === '#privacy') {
        setActiveTab('privacy');
        setSelectedPost(null);
      } else {
        setSelectedPost(null);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openDetail = (post: Post) => {
    setSelectedPost(post);
    window.location.hash = `post/${post.slug}`;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  const closeDetail = () => {
    setSelectedPost(null);
    history.pushState(null, '', window.location.pathname);
  };

  // Filter posts
  const filteredPosts = POSTS.filter((post) => {
    if (selectedCategory === 'image' && post.category !== 'image') return false;
    if (selectedCategory === 'video' && post.category !== 'video') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.positivePrompt.toLowerCase().includes(q) ||
        post.tool.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const getRelatedPosts = (current: Post) => {
    return POSTS.filter((p) => p.id !== current.id).slice(0, 2);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f2f2f2] text-[#222222]">
      {/* Paperleaf Sidebar with Repository Identity & Links */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setSelectedPost(null);
          setSelectedCategory(null);
          if (tab === 'about') window.location.hash = 'about';
          else if (tab === 'privacy') window.location.hash = 'privacy';
          else history.pushState(null, '', window.location.pathname);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <div className="lg:hidden sticky top-0 z-30 bg-white border-b border-[#e5e5e5] px-4 py-2.5 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setActiveTab('all');
              setSelectedPost(null);
              setSelectedCategory(null);
            }}
            className="font-bold text-base sm:text-lg tracking-tight text-[#111] truncate shrink-0"
          >
            {siteConfig.title}
          </button>
          <div className="flex items-center gap-2 flex-1 justify-end max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ..."
              className="w-full max-w-[170px] sm:max-w-[220px] px-2.5 py-1 text-xs text-right border border-[#e0e0e0] rounded-none bg-white text-[#333] placeholder:text-[#999] focus:outline-none focus:border-[#222] transition-colors"
            />
            <button
              onClick={() => setMobileOpen(true)}
              className="p-1.5 text-neutral-700 hover:text-black shrink-0"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-8 lg:p-10">
          {selectedPost ? (
            /* Post Detail / Single Story View */
            <PostDetail
              key={selectedPost.id}
              post={selectedPost}
              onBack={closeDetail}
              onSelectPost={openDetail}
              relatedPosts={getRelatedPosts(selectedPost)}
            />
          ) : activeTab === 'about' ? (
            /* About View */
            <div className="bg-white p-8 sm:p-12 shadow-[0_1px_4px_rgba(0,0,0,0.06)] max-w-4xl mx-auto">
              <AboutView
                onBrowseTutorials={() => {
                  setActiveTab('all');
                  history.pushState(null, '', window.location.pathname);
                }}
              />
            </div>
          ) : activeTab === 'privacy' ? (
            /* Privacy View */
            <div className="bg-white p-8 sm:p-12 shadow-[0_1px_4px_rgba(0,0,0,0.06)] max-w-4xl mx-auto">
              <PrivacyView
                onBack={() => {
                  setActiveTab('all');
                  history.pushState(null, '', window.location.pathname);
                }}
              />
            </div>
          ) : (
            /* Paperleaf Masonry Grid View */
            <div>
              {/* Search or category filter status banner */}
              {(searchQuery || selectedCategory) && (
                <div className="mb-6 flex items-center justify-between bg-white px-5 py-3 border border-[#e0e0e0] shadow-xs">
                  <span className="text-xs text-[#555]">
                    {searchQuery
                      ? `Searching for "${searchQuery}" (${filteredPosts.length} ${filteredPosts.length === 1 ? 'tutorial' : 'tutorials'})`
                      : selectedCategory
                      ? `Filter: ${selectedCategory.toUpperCase()}`
                      : ''}
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setActiveTab('all');
                    }}
                    className="text-xs font-semibold text-[#d9534f] hover:underline"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              {filteredPosts.length === 0 ? (
                <div className="py-20 text-center bg-white p-8 shadow-xs max-w-md mx-auto">
                  <div className="w-10 h-10 bg-neutral-100 text-neutral-500 mx-auto flex items-center justify-center mb-3">
                    <Filter className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-[#111] mb-1">
                    No Tutorials Match
                  </h3>
                  <p className="text-xs text-neutral-500 mb-4">
                    Nothing in the archive matches those search terms.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory(null);
                      setActiveTab('all');
                    }}
                    className="px-4 py-2 bg-[#d9534f] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Show All Tutorials
                  </button>
                </div>
              ) : (
                /* The Paperleaf Masonry Grid with Repository Posts */
                <div className="paperleaf-grid">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onOpenDetail={openDetail}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
