import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { SiWhatsapp, SiMessenger } from 'react-icons/si';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { ImoIcon } from '../sections/social/SocialIcon';

export const FloatingActions: React.FC = () => {
  const { t } = useLanguage();
  const { isDay } = useTheme();
  const { profile, socialLinks } = useData();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const imoLink =
    socialLinks.find((s) => (s.icon || s.platform || '').toLowerCase().includes('imo'))?.url ||
    'https://s.imoim.net/Mw73sy';

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Floating direct contact and navigation"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 pointer-events-none select-none"
    >
      {/* Back to Top Button with Smooth Motion */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="back-to-top"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            onClick={scrollToTop}
            id="back-to-top-btn"
            aria-label="Back to Top"
            className={`pointer-events-auto min-w-[44px] min-h-[44px] p-2.5 sm:p-3 rounded-full shadow-lg transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-rose-500 border flex items-center justify-center ${
              isDay
                ? 'bg-white text-slate-800 hover:bg-slate-50 border-slate-200 shadow-slate-900/10'
                : 'bg-[#151720] text-zinc-300 hover:text-white hover:bg-zinc-800 border-zinc-700 shadow-black/50'
            }`}
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* IMO Floating Button */}
      {imoLink && (
        <div className="relative group pointer-events-auto">
          <a
            href={imoLink}
            target="_blank"
            rel="noopener noreferrer"
            id="floating-imo-btn"
            aria-label="Chat with Musfiq Russell on IMO"
            className="relative flex items-center justify-center min-w-[44px] min-h-[44px] p-3 sm:px-3.5 sm:py-2.5 rounded-full bg-[#00AAFF] text-white shadow-lg shadow-sky-500/30 hover:shadow-sky-500/50 hover:bg-[#0095e0] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00AAFF]"
          >
            <ImoIcon className="w-5 h-5 text-white shrink-0" />
            <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
              IMO
            </span>
          </a>

          {/* Hover Tooltip (Desktop) */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center pointer-events-none">
            <div className="bg-zinc-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
              {t('IMO-তে যোগাযোগ করুন', 'Chat on IMO')}
            </div>
          </div>
        </div>
      )}

      {/* Messenger Floating Button */}
      {profile.messengerUrl && (
        <a
          href={profile.messengerUrl}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-messenger-btn"
          aria-label="Message Musfiq Russell on Facebook Messenger"
          className="pointer-events-auto group relative flex items-center justify-center min-w-[44px] min-h-[44px] p-3 sm:px-3.5 sm:py-2.5 rounded-full bg-[#0084FF] text-white shadow-lg shadow-sky-600/30 hover:shadow-sky-600/50 hover:bg-[#0073e6] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0084FF]"
        >
          <SiMessenger className="w-5 h-5 text-white shrink-0" />
          <span className="hidden sm:inline-block max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold pl-0 group-hover:pl-2">
            Messenger
          </span>
        </a>
      )}

      {/* WhatsApp Floating Button with soft radar pulse and tooltip */}
      {profile.whatsappUrl && (
        <div className="relative group pointer-events-auto">
          {/* Soft radar pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />

          <a
            href={profile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="floating-whatsapp-btn"
            aria-label="Chat with Musfiq Russell on WhatsApp"
            className="relative flex items-center gap-2 min-h-[44px] px-3.5 py-3 sm:px-4 sm:py-3 rounded-full bg-[#25D366] text-white shadow-xl shadow-emerald-600/40 hover:shadow-emerald-600/60 hover:bg-[#20ba59] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366]"
          >
            <SiWhatsapp className="w-5 h-5 text-white shrink-0" />
            <span className="font-bold text-xs sm:text-sm tracking-tight">
              {t('WhatsApp করুন', 'WhatsApp')}
            </span>
          </a>

          {/* Hover Tooltip (Desktop) */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden md:group-hover:flex items-center pointer-events-none">
            <div className="bg-zinc-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-lg whitespace-nowrap shadow-xl border border-zinc-700">
              {t('WhatsApp-এ যোগাযোগ করুন', 'Chat on WhatsApp')}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
