import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Sparkles, Share2, Layers, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SocialCard } from './social/SocialCard';
import { FeaturedSocialPills } from './social/FeaturedSocialPills';
import { FloatingBackground } from './social/FloatingBackground';

interface SocialHubProps {
  isDay: boolean;
  language: 'bn' | 'en';
}

type FilterCategory = 'all' | 'primary' | 'direct' | 'creative' | 'professional';

export const SocialHub: React.FC<SocialHubProps> = ({ isDay, language }) => {
  const { socialLinks } = useData();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  // Filter only enabled social links and sort by order
  const activeLinks = useMemo(() => {
    return (socialLinks || [])
      .filter((link) => link.enabled !== false)
      .sort((a, b) => (a.order || 99) - (b.order || 99));
  }, [socialLinks]);

  // Apply category filtering
  const filteredLinks = useMemo(() => {
    if (activeFilter === 'all') return activeLinks;
    return activeLinks.filter((link) => link.category === activeFilter);
  }, [activeLinks, activeFilter]);

  const filterTabs: { id: FilterCategory; labelBn: string; labelEn: string; icon?: React.ElementType }[] = [
    { id: 'all', labelBn: 'সকল প্ল্যাটফর্ম (১৬)', labelEn: 'All Platforms (16)' },
    { id: 'direct', labelBn: 'সরাসরি যোগাযোগ', labelEn: 'Direct Chat', icon: MessageSquare },
    { id: 'creative', labelBn: 'ক্রিয়েটিভ ও পোর্টফোলিও', labelEn: 'Creative & Media', icon: Layers },
    { id: 'professional', labelBn: 'প্রফেশনাল নেটওয়ার্ক', labelEn: 'Professional', icon: Share2 },
  ];

  return (
    <section
      id="social"
      className={`relative py-20 md:py-28 overflow-hidden transition-colors duration-500 scroll-mt-24 ${
        isDay ? 'bg-slate-50/70 text-slate-900' : 'bg-[#090a0f] text-white'
      }`}
    >
      {/* Decorative Ambient Background & Floating Particles */}
      <FloatingBackground isDay={isDay} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 border bg-rose-500/10 text-rose-500 border-rose-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? 'সোশ্যাল মিডিয়া হাব' : 'Social Media Hub'}</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            {language === 'bn' ? (
              <>
                ডিজিটাল দুনিয়ায়{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600">
                  আমার সাথে যুক্ত থাকুন
                </span>
              </>
            ) : (
              <>
                Connect With Me{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-red-600">
                  Across Platforms
                </span>
              </>
            )}
          </h2>

          {/* Subtitle & Description */}
          <p
            className={`text-sm sm:text-base md:text-lg leading-relaxed ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {language === 'bn'
              ? 'আমার কাজ, আপডেট, ডিজাইন, বিজ্ঞাপন ও পেশাগত কার্যক্রম সম্পর্কে জানতে আপনার পছন্দের প্ল্যাটফর্মে আমাকে অনুসরণ করুন।'
              : 'Follow along for creative showcases, branding insights, tech thoughts, and direct collaborative opportunities across verified channels.'}
          </p>
        </motion.div>

        {/* Featured Primary Buttons (WhatsApp, Messenger, Facebook) */}
        <FeaturedSocialPills isDay={isDay} language={language} />

        {/* Category Filter Pills */}
        <div className="flex items-center justify-between flex-wrap gap-2 mb-8 pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 ${
                    isActive
                      ? isDay
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-white text-zinc-950 font-bold shadow-sm'
                      : isDay
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                      : 'bg-zinc-900/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div
            className={`text-xs font-mono hidden sm:flex items-center gap-1.5 ${
              isDay ? 'text-slate-400' : 'text-zinc-500'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>
              {language === 'bn'
                ? `প্রদর্শিত: ${filteredLinks.length}টি প্ল্যাটফর্ম`
                : `Showing: ${filteredLinks.length} platforms`}
            </span>
          </div>
        </div>

        {/* Responsive Grid of Social Media Cards */}
        {/* Mobile: 2 cols | Tablet: 3 cols | Desktop: 4 cols */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
        >
          {filteredLinks.map((social) => (
            <SocialCard
              key={social.id}
              social={social}
              isDay={isDay}
              language={language}
            />
          ))}
        </motion.div>

        {/* End of Section CTA Card (Requirement 22) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className={`mt-14 sm:mt-18 p-6 sm:p-8 rounded-3xl border text-center relative overflow-hidden shadow-lg ${
            isDay
              ? 'bg-gradient-to-b from-white to-slate-100/90 border-slate-200'
              : 'bg-gradient-to-b from-[#12141c] to-[#0c0d13] border-zinc-800 shadow-black/60'
          }`}
        >
          {/* Subtle accent line at top */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-80" />

          <div className="max-w-xl mx-auto">
            <h3
              className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {language === 'bn' ? 'আপনার প্রজেক্ট নিয়ে কথা বলতে চান?' : "Want to discuss your project?"}
            </h3>

            <p
              className={`text-xs sm:text-sm mb-6 ${
                isDay ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              {language === 'bn'
                ? "Let's create something impactful together. সরাসরি আলোচনা বা পরামর্শের জন্য মেসেজ দিন।"
                : "Let's create something impactful together. Reach out directly via inquiry form or chat."}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all duration-300 shadow-lg shadow-rose-600/25 hover:shadow-rose-600/40 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
            >
              <span>{language === 'bn' ? 'আমার সাথে যোগাযোগ করুন' : 'Get In Touch With Me'}</span>
              <span className="text-base">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
