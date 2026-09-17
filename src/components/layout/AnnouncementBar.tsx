import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Sparkles, Phone, MessageCircle } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const { language } = useLanguage();
  const { siteSettings, profile } = useData();
  const { isDay } = useTheme();

  if (!siteSettings.announcementActive) return null;

  return (
    <div
      className={`border-b py-2 px-4 text-xs transition-colors duration-200 ${
        isDay
          ? 'bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 border-rose-200/80 text-slate-800'
          : 'bg-gradient-to-r from-[#12141a] via-[#1a0f14] to-[#12141a] border-rose-900/30 text-zinc-300'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
          </span>
          <span
            className={`font-semibold flex items-center gap-1 ${
              isDay ? 'text-rose-700' : 'text-rose-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 inline text-rose-500" />
            {language === 'bn' ? siteSettings.announcementTextBn : siteSettings.announcementTextEn}
          </span>
        </div>

        <div
          className={`flex items-center gap-4 text-[11px] font-medium ${
            isDay ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          <a
            href={`tel:${profile.primaryMobile}`}
            className="hover:text-rose-600 transition-colors flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-rose-500" />
            <span>{profile.primaryMobile}</span>
          </a>
          <span className={isDay ? 'text-slate-300' : 'text-zinc-600'}>|</span>
          <a
            href={profile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-emerald-500 transition-colors flex items-center gap-1 ${
              isDay ? 'text-emerald-700' : 'text-emerald-400/90'
            }`}
          >
            <MessageCircle className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
