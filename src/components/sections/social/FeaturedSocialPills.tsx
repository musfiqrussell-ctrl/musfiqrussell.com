import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SiWhatsapp, SiMessenger, SiFacebook } from 'react-icons/si';
import { ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface FeaturedSocialPillsProps {
  isDay: boolean;
  language: 'bn' | 'en';
}

export const FeaturedSocialPills: React.FC<FeaturedSocialPillsProps> = ({ isDay, language }) => {
  const [hoveredPlatform, setHoveredPlatform] = useState<string | null>(null);

  const featured = [
    {
      id: 'wa-featured',
      platform: 'WhatsApp',
      icon: SiWhatsapp,
      handle: '+880 1315-461200',
      tagBn: 'তাৎক্ষণিক রেসপন্স',
      tagEn: 'Fast Response',
      ctaBn: 'WhatsApp করুন',
      ctaEn: 'Chat on WhatsApp',
      url: 'https://wa.link/717iwz',
      brandColor: '#25D366',
      badgeIcon: Zap,
    },
    {
      id: 'msg-featured',
      platform: 'Messenger',
      icon: SiMessenger,
      handle: 'm.me/MusfiqRussell',
      tagBn: 'লাইভ মেসেজিং',
      tagEn: 'Direct Inbox',
      ctaBn: 'Messenger করুন',
      ctaEn: 'Message on Messenger',
      url: 'https://m.me/MusfiqRussell',
      brandColor: '#0084FF',
      badgeIcon: Sparkles,
    },
    {
      id: 'fb-featured',
      platform: 'Facebook',
      icon: SiFacebook,
      handle: '/MusfiqRussell',
      tagBn: 'অফিশিয়াল প্রোফাইল',
      tagEn: 'Official Profile',
      ctaBn: 'Facebook-এ যুক্ত হোন',
      ctaEn: 'Connect on Facebook',
      url: 'https://www.facebook.com/MusfiqRussell',
      brandColor: '#1877F2',
      badgeIcon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
      {featured.map((item) => {
        const isHovered = hoveredPlatform === item.id;
        const IconComponent = item.icon;
        const BadgeIcon = item.badgeIcon;

        return (
          <motion.a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            id={`featured-${item.id}`}
            aria-label={`${item.platform} - ${item.ctaEn}`}
            onMouseEnter={() => setHoveredPlatform(item.id)}
            onMouseLeave={() => setHoveredPlatform(null)}
            onFocus={() => setHoveredPlatform(item.id)}
            onBlur={() => setHoveredPlatform(null)}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={`group relative p-5 sm:p-6 rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shadow-md ${
              isDay
                ? isHovered
                  ? 'bg-white border-slate-300 shadow-xl'
                  : 'bg-white border-slate-200 hover:border-slate-300'
                : isHovered
                ? 'bg-[#151722] border-zinc-700 shadow-xl shadow-black/50'
                : 'bg-[#11131a] border-zinc-800 hover:border-zinc-700'
            }`}
            style={{
              boxShadow: isHovered
                ? `0 14px 28px -6px ${item.brandColor}30, 0 0 16px -2px ${item.brandColor}20`
                : undefined,
              borderColor: isHovered ? item.brandColor : undefined,
            }}
          >
            {/* Top row: Brand Icon + Status tag */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 border shadow-sm"
                style={{
                  backgroundColor: isHovered ? `${item.brandColor}20` : isDay ? '#F8FAFC' : '#181B24',
                  borderColor: isHovered ? `${item.brandColor}50` : isDay ? '#E2E8F0' : '#27272A',
                  color: item.brandColor,
                }}
              >
                <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
              </div>

              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
                style={{
                  backgroundColor: `${item.brandColor}12`,
                  borderColor: `${item.brandColor}30`,
                  color: item.brandColor,
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: item.brandColor }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: item.brandColor }}
                  />
                </span>
                <BadgeIcon className="w-3 h-3 ml-0.5" />
                <span>{language === 'bn' ? item.tagBn : item.tagEn}</span>
              </div>
            </div>

            {/* Middle: Title & Handle */}
            <div className="mb-5">
              <h3
                className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {item.platform}
              </h3>
              <p
                className={`text-xs sm:text-sm font-mono mt-0.5 transition-colors ${
                  isDay ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                {item.handle}
              </p>
            </div>

            {/* Bottom Button: High prominence */}
            <div
              className="w-full py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-300 text-white shadow-sm"
              style={{
                backgroundColor: item.brandColor,
                boxShadow: isHovered ? `0 4px 14px 0 ${item.brandColor}50` : undefined,
              }}
            >
              <span>{language === 'bn' ? item.ctaBn : item.ctaEn}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </motion.a>
        );
      })}
    </div>
  );
};
