export interface SiteConfig {
  title: string;
  tagline: string;
  description: string;
  author: string;
  bio: string;
  locale: string;
  site: string;
  social: {
    youtube: string;
    facebook: string;
    github: string;
    twitter?: string;
  };
  newsletter: {
    enabled: boolean;
    headline: string;
    subheadline: string;
  };
}

export const siteConfig: SiteConfig = {
  title: "Ethan Prompts Online",
  tagline: "Searchable notes for image and video workflows.",
  description: "A public archive of image and video workflows, with the prompts, settings, and numbered steps in one place.",
  author: "Ethan",
  bio: "Curating prompt engineering workflows & step-by-step guides for AI artists, creators, and visual storytellers.",
  locale: "en",
  site: "https://ethanprompts.online",
  social: {
    youtube: "",
    facebook: "https://www.facebook.com/ethanprompts.online",
    github: "",
  },
  newsletter: {
    enabled: true,
    headline: "Weekly AI Prompt Drops",
    subheadline: "Join 3,200+ creators receiving tested prompts, workflows & model parameter sheets every Saturday."
  }
};
