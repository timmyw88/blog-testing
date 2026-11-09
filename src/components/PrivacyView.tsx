import React from "react";
import { ArrowLeft, Shield } from "lucide-react";

interface PrivacyViewProps {
  onBack: () => void;
}

export const PrivacyView: React.FC<PrivacyViewProps> = ({ onBack }) => {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-8 py-10">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-[#595044] dark:text-[#a0978b] hover:text-[#234d43] dark:hover:text-[#42a88e] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO ARCHIVE</span>
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#234d43] dark:text-[#52c2a5] uppercase tracking-wider mb-2">
          <Shield className="w-4 h-4" />
          <span>Legal & Privacy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
          Privacy Policy
        </h1>
        <p className="text-xs text-[#786f62] dark:text-[#90887c]">
          Last updated: 7 November 2026
        </p>
      </div>

      <div className="space-y-6 text-sm text-[#423a31] dark:text-[#d0c9be] leading-relaxed">
        <section className="p-6 rounded-2xl bg-white dark:bg-[#191c22] border border-[#e8e2d4] dark:border-[#262b35] shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
            About this website
          </h2>
          <p className="mb-2">
            Ethan Prompts Online, available at{" "}
            <strong className="text-[#234d43] dark:text-[#52c2a5]">
              ethanprompts.online
            </strong>
            , is a tutorial website operated from Malaysia.
          </p>
          <p>
            The website provides tutorials, copyable prompts, and embedded
            YouTube videos. It does not currently offer visitor accounts,
            contact forms, or subscriptions, and does not use site analytics or
            Google AdSense.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-[#191c22] border border-[#e8e2d4] dark:border-[#262b35] shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
            Hosting and technical information
          </h2>
          <p className="mb-2">
            When you visit, your browser sends technical information needed to
            request and display website content.
          </p>
          <p>
            Hosting providers may log and store visitors' IP addresses for
            security purposes under their own standard privacy policies.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-[#191c22] border border-[#e8e2d4] dark:border-[#262b35] shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
            Search and copying prompts
          </h2>
          <p>
            Website search and filters work entirely within your browser rather
            than sending your search terms to a website search server. Copy
            buttons place the selected prompt text directly on your device's
            clipboard.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-[#191c22] border border-[#e8e2d4] dark:border-[#262b35] shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
            Embedded YouTube videos
          </h2>
          <p className="mb-2">
            This website uses YouTube's Privacy Enhanced Mode through{" "}
            <code className="px-1.5 py-0.5 rounded bg-[#f0ebd9] dark:bg-[#252a35] font-mono text-xs">
              youtube-nocookie.com
            </code>
            . This reduces certain personalisation uses but does not mean that
            no information is processed.
          </p>
          <p>
            Loading an embedded player may connect your browser to Google or
            YouTube before you press Play.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-white dark:bg-[#191c22] border border-[#e8e2d4] dark:border-[#262b35] shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
            External websites and AI tools
          </h2>
          <p className="mb-2">
            Tutorials may link to external websites and AI tools (such as
            ChatGPT, Midjourney, Runway, or Flux). Their privacy policies apply
            when you use those services.
          </p>
          <p>
            This website does not store your photos. If you upload a photo to an
            AI model, you provide that photo directly to that third-party
            service.
          </p>
        </section>

        <section className="p-6 rounded-2xl bg-[#f2ede2] dark:bg-[#1c2027] border border-[#dfd8c8] dark:border-[#292f3c]">
          <h2 className="font-serif text-lg font-bold text-[#1c1915] dark:text-[#f3efe6] mb-2">
            Questions and contact
          </h2>
          <p>
            For privacy questions or requests concerning information held by the
            website operator, contact:{" "}
            <a
              href="mailto:j.video217@gmail.com"
              className="text-[#234d43] dark:text-[#52c2a5] underline"
            >
              j.video217@gmail.com
            </a>
          </p>
        </section>
      </div>
    </article>
  );
};
