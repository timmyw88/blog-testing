import React from 'react';
import { X as CloseIcon } from 'lucide-react';
import { siteConfig } from '../data/site';
import { ActiveTab } from '../types/blog';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (cat: string | null) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  mobileOpen,
  onCloseMobile
}) => {
  // Navigation links from the repository (Header.astro / index.astro)
  const navItems = [
    {
      id: 'ARCHIVE',
      label: 'ARCHIVE',
      action: () => {
        onSelectTab('all');
        onSelectCategory(null);
      },
      isActive: activeTab === 'all' && !selectedCategory
    },
    {
      id: 'IMAGE',
      label: 'IMAGE',
      action: () => {
        onSelectTab('all');
        onSelectCategory('image');
      },
      isActive: selectedCategory === 'image'
    },
    {
      id: 'VIDEO',
      label: 'VIDEO',
      action: () => {
        onSelectTab('all');
        onSelectCategory('video');
      },
      isActive: selectedCategory === 'video'
    },
    {
      id: 'ABOUT',
      label: 'ABOUT',
      action: () => {
        onSelectTab('about');
        onSelectCategory(null);
      },
      isActive: activeTab === 'about'
    },
    {
      id: 'PRIVACY',
      label: 'PRIVACY',
      action: () => {
        onSelectTab('privacy');
        onSelectCategory(null);
      },
      isActive: activeTab === 'privacy'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Fixed Left Sidebar (Paperleaf design with Repository identity & links) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 lg:w-72 bg-white flex flex-col justify-between p-8 border-r border-[#ececec] overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Top Part */}
        <div className="flex flex-col text-right">
          {/* Mobile Close Button */}
          <div className="flex justify-start lg:hidden mb-4">
            <button
              onClick={onCloseMobile}
              className="p-1 text-neutral-500 hover:text-black"
              aria-label="Close menu"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Website Title & Tagline from Repository */}
          <div className="mb-8 text-right">
            <button
              onClick={() => {
                onSelectTab('all');
                onSelectCategory(null);
                onCloseMobile();
              }}
              className="w-full text-right font-bold text-2xl lg:text-[26px] tracking-tight text-[#111111] hover:text-[#d9534f] transition-colors focus:outline-none leading-tight"
            >
              {siteConfig.title}
            </button>
            <p className="text-xs text-[#777777] mt-1.5 font-normal leading-relaxed text-right">
              {siteConfig.tagline}
            </p>
          </div>

          {/* Repository Navigation Links with Paperleaf Hairline Divider Lines */}
          <nav className="mb-8 border-b border-[#e5e5e5]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  item.action();
                  onCloseMobile();
                }}
                className={`w-full text-right py-2.5 border-t border-[#e5e5e5] text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors block ${
                  item.isActive ? 'text-[#d9534f]' : 'text-[#222222] hover:text-[#d9534f]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Box - Hidden on mobile view, shown on desktop sidebar */}
          <div className="hidden lg:block mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search ..."
              className="w-full px-3 py-1.5 text-xs text-right border border-[#e0e0e0] rounded-none bg-white text-[#333] placeholder:text-[#999] focus:outline-none focus:border-[#222] transition-colors"
            />
          </div>

          {/* Social Links (Right Aligned) - Only Facebook link */}
          <div className="flex items-center justify-end gap-3 text-[#222] mb-8">
            <a
              href="https://www.facebook.com/ethanprompts.online"
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full border border-[#222] flex items-center justify-center text-xs hover:border-[#d9534f] hover:text-[#d9534f] transition-colors font-bold"
              aria-label="Facebook"
              title="Facebook"
            >
              f
            </a>
          </div>
        </div>

        {/* Footer (Right Aligned, Paperleaf style with repo name) */}
        <div className="text-right text-[10px] text-[#888888] leading-relaxed pt-6">
          <p>
            <span
              className="text-[#d9534f] cursor-pointer hover:underline"
              onClick={() => {
                onSelectTab('all');
                onSelectCategory(null);
              }}
            >
              {siteConfig.title}
            </span>{' '}
            © {new Date().getFullYear()}
          </p>
          <p className="mt-0.5">
            A public archive of image and video workflows.
          </p>
        </div>
      </aside>
    </>
  );
};
