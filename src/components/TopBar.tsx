import React from 'react';
import { Menu, Search, LayoutGrid, List, Bookmark, X, Sparkles } from 'lucide-react';
import { ActiveTab, ViewMode } from '../types/blog';

interface TopBarProps {
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  viewMode: ViewMode;
  onToggleViewMode: (mode: ViewMode) => void;
  selectedTool: string | null;
  onClearTool: () => void;
  savedCount: number;
  totalResults: number;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMobileMenu,
  onOpenSearch,
  activeTab,
  onSelectTab,
  viewMode,
  onToggleViewMode,
  selectedTool,
  onClearTool,
  savedCount,
  totalResults
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#fbf9f5]/90 dark:bg-[#121417]/90 backdrop-blur-md border-b border-[#e8e2d4] dark:border-[#22262e] px-4 sm:px-8 py-3.5 transition-colors">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + View Title / Filter Pills */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg bg-[#efe9dc] dark:bg-[#1f2229] hover:bg-[#e4dcce] text-[#2c2621] dark:text-[#f3efe6] transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Category Tabs (Desktop / Tablet) */}
          <div className="hidden sm:flex items-center gap-1.5 p-1 bg-[#efe9dc] dark:bg-[#1c1f26] rounded-xl border border-[#dfd8c8] dark:border-[#2a2f3a]">
            <button
              onClick={() => onSelectTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'all' && !selectedTool
                  ? 'bg-white dark:bg-[#282d38] text-[#1c1915] dark:text-[#f3efe6] shadow-2xs font-semibold'
                  : 'text-[#695f53] dark:text-[#9c9487] hover:text-[#1c1915] dark:hover:text-[#f3efe6]'
              }`}
            >
              All Prompts
            </button>
            <button
              onClick={() => onSelectTab('image')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'image'
                  ? 'bg-white dark:bg-[#282d38] text-[#1c1915] dark:text-[#f3efe6] shadow-2xs font-semibold'
                  : 'text-[#695f53] dark:text-[#9c9487] hover:text-[#1c1915] dark:hover:text-[#f3efe6]'
              }`}
            >
              Image
            </button>
            <button
              onClick={() => onSelectTab('video')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'video'
                  ? 'bg-white dark:bg-[#282d38] text-[#1c1915] dark:text-[#f3efe6] shadow-2xs font-semibold'
                  : 'text-[#695f53] dark:text-[#9c9487] hover:text-[#1c1915] dark:hover:text-[#f3efe6]'
              }`}
            >
              Video
            </button>
          </div>

          {/* Active Tool Badge with Clear Button */}
          {selectedTool && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#234d43]/10 dark:bg-[#2d6255]/20 border border-[#234d43]/30 dark:border-[#42a88e]/40 rounded-lg text-xs text-[#1c433a] dark:text-[#7ae4c5]">
              <span>Tool: <strong>{selectedTool}</strong></span>
              <button
                onClick={onClearTool}
                className="hover:text-red-500 transition-colors ml-0.5"
                title="Remove tool filter"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Result Count Indicator */}
          <span className="hidden md:inline-block text-xs text-[#7e7467] dark:text-[#888175] ml-1">
            {totalResults} {totalResults === 1 ? 'workflow' : 'workflows'}
          </span>
        </div>

        {/* Right: Search + Layout Grid/List Switcher + Saved Prompts */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/80 dark:bg-[#1c1f26] border border-[#ded8cb] dark:border-[#2a2f3a] text-xs text-[#635a4f] dark:text-[#a0988c] hover:border-[#234d43] transition-colors"
            title="Search workflows"
          >
            <Search className="w-3.5 h-3.5 text-[#7a7063]" />
            <span className="hidden md:inline">Search</span>
            <kbd className="hidden lg:inline text-[10px] px-1 bg-[#f0ebd9] dark:bg-[#15171b] rounded text-[#807669] dark:text-[#736c61]">
              ⌘K
            </kbd>
          </button>

          {/* Saved Prompts Button */}
          <button
            onClick={() => onSelectTab('saved')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              activeTab === 'saved'
                ? 'bg-[#234d43] border-[#234d43] text-white'
                : 'bg-white/80 dark:bg-[#1c1f26] border-[#ded8cb] dark:border-[#2a2f3a] text-[#423a31] dark:text-[#d0c9be] hover:border-[#234d43]'
            }`}
            title="View saved prompts"
          >
            <Bookmark className={`w-3.5 h-3.5 ${activeTab === 'saved' ? 'fill-current text-white' : ''}`} />
            <span className="hidden sm:inline">Saved</span>
            {savedCount > 0 && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                activeTab === 'saved' ? 'bg-white/20 text-white' : 'bg-[#e2dcce] dark:bg-[#282d38] text-[#332e27]'
              }`}>
                {savedCount}
              </span>
            )}
          </button>

          {/* View Mode Toggle (Masonry vs List) */}
          <div className="hidden sm:flex items-center p-0.5 bg-[#efe9dc] dark:bg-[#1c1f26] rounded-lg border border-[#dfd8c8] dark:border-[#2a2f3a]">
            <button
              onClick={() => onToggleViewMode('masonry')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'masonry'
                  ? 'bg-white dark:bg-[#282d38] text-[#1c1915] dark:text-white shadow-2xs'
                  : 'text-[#7e7467] dark:text-[#888175] hover:text-[#1c1915]'
              }`}
              title="Masonry Grid View (Paperleaf signature)"
              aria-label="Masonry Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onToggleViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-[#282d38] text-[#1c1915] dark:text-white shadow-2xs'
                  : 'text-[#7e7467] dark:text-[#888175] hover:text-[#1c1915]'
              }`}
              title="Compact List View"
              aria-label="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
