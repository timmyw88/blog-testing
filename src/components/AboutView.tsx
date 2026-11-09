import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { siteConfig } from '../data/site';

interface AboutViewProps {
  onBrowseTutorials: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBrowseTutorials }) => {
  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6 pb-4 border-b border-neutral-100 flex items-center justify-between">
        <button
          onClick={onBrowseTutorials}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-[#d9534f] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to archive</span>
        </button>
      </div>

      <h1 className="font-bold text-3xl sm:text-4xl text-[#111111] mb-6 tracking-tight">
        About {siteConfig.title}
      </h1>

      <div className="space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
        <p>
          <strong>{siteConfig.title}</strong> is a practical resource for learning how to
          create images and videos with AI. It brings together the prompts,
          steps, and tips from my Facebook and YouTube tutorials in one
          easy-to-search place.
        </p>

        <h2 className="font-bold text-xl sm:text-2xl text-[#111111] pt-4">
          From watching to creating
        </h2>
        <p>
          A short video can show you what is possible, but following along
          is easier when you have the instructions in front of you. This
          website gives you a place to revisit a tutorial, copy its prompts,
          and work through the process at your own pace.
        </p>

        <h2 className="font-bold text-xl sm:text-2xl text-[#111111] pt-4">
          What you’ll find here
        </h2>
        <ul className="list-disc list-inside space-y-1.5 pl-2 text-neutral-800">
          <li>Practical tutorials for AI image and video creation.</li>
          <li>Ready-to-copy prompts you can try and adapt.</li>
          <li>Step-by-step instructions and relevant tool settings.</li>
          <li>Video walkthroughs and examples of the creative process.</li>
        </ul>

        <h2 className="font-bold text-xl sm:text-2xl text-[#111111] pt-4">
          Experiment and make it your own
        </h2>
        <p>
          These tutorials are starting points for your own creativity.
          Try changing a style, subject, or composition to explore different
          results. You do not need to get everything right on the first attempt.
        </p>
        <p>
          AI results can vary, even with the same prompt. Features and access
          may also change as tools are updated. Always check generated text,
          dates, and other details before publishing or printing your work.
          Use photos and other materials you have permission to use, and
          follow the terms of the AI tool you choose.
        </p>

        <h2 className="font-bold text-xl sm:text-2xl text-[#111111] pt-4">
          Start exploring
        </h2>
        <p>
          <button
            onClick={onBrowseTutorials}
            className="text-[#d9534f] font-semibold underline hover:no-underline"
          >
            Browse the tutorials
          </button>{' '}
          to find something you would like to create, then follow the steps and make it your own.
        </p>
      </div>
    </article>
  );
};
