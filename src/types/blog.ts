export type Category = 'image' | 'video';

export interface Step {
  title: string;
  body: string;
}

export interface Setting {
  key: string;
  value: string;
}

export interface PostResult {
  src: string;
  alt: string;
  caption?: string;
  kind?: 'image' | 'video';
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  updated?: string;
  tool: string;
  model?: string;
  category: Category;
  tags: string[];
  draft?: boolean;
  example?: boolean;
  featured?: boolean;
  cover: string;
  coverAlt: string;
  videoUrl?: string;
  steps: Step[];
  positivePrompt: string;
  negativePrompt?: string;
  settings?: Setting[];
  tips?: string[];
  results?: PostResult[];
  readTime?: string;
}

export type ViewMode = 'masonry' | 'list';
export type ActiveTab = 'all' | 'image' | 'video' | 'saved' | 'about' | 'privacy';
