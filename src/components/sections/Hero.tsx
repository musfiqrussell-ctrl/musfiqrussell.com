import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  ArrowRight,
  Phone,
  MessageCircle,
  Send,
  Layers,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Trophy,
} from 'lucide-react';

const OFFICIAL_AWARD_LOGOS = [
  {
    name: 'ICT Division',
    url: 'https://vzkpetdgnhufjiosanmj.supabase.co/storage/v1/object/public/media/ICT%20DIVISION.jpg',
    fallback: '/assets/logos/ict-division.jpg',
  },
  {
    name: 'DoICT',
    url: 'https://vzkpetdgnhufjiosanmj.supabase.co/storage/v1/object/public/media/DoICT.jpg',
    fallback: '/assets/logos/doict.jpg',
  },
  {
    name: 'Freelancer Bangladesh',
    url: 'https://vzkpetdgnhufjiosanmj.supabase.co/storage/v1/object/public/media/Freelancer%20Bangladesh.jpg',
    fallback: '/assets/logos/freelancer-bangladesh.jpg',
  },
];

const CAROUSEL_INTERVAL_MS = 2800;

export const Hero: React.FC = () => {
  const { language, t } = useLanguage();
  const { profile } = useData();
  const { isDay } = useTheme();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentLogoIndex, setCurrentLogoIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Auto-slide carousel through official logos
  useEffect(() => {
    if (isCarouselPaused) return;
    const timer = setInterval(() => {
      setCurrentLogoIndex((prev) => (prev + 1) % OFFICIAL_AWARD_LOGOS.length);
    }, CAROUSEL_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isCarouselPaused]);

  // Reset image states when profile avatar URL updates
  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [profile.avatarUrl]);

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden transition-colors duration-300 scroll-mt-24"
    >
      {/* Subtle background ambient glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isDay ? 'bg-rose-400/15' : 'bg-rose-600/10'
        }`}
      />
      <div
        className={`absolute -top-10 -right-10 w-[350px] h-[350px] rounded-full blur-[120px] pointer-events-none -z-10 ${
          isDay ? 'bg-slate-300/30' : 'bg-zinc-700/10'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Verified badge */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs shadow-xs transition-colors ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-700'
                  : 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span className="font-semibold text-rose-600">
                {language === 'bn' ? 'পেশাদার ব্র্যান্ড ও গ্রাফিক্স সমাধান' : 'Professional Brand & Graphic Solutions'}
              </span>
              <span className={isDay ? 'text-slate-300' : 'text-zinc-600'}>•</span>
              <span className={isDay ? 'text-slate-500' : 'text-zinc-400'}>
                {language === 'bn' ? '২০১৯ থেকে সক্রিয়' : 'Active Since 2019'}
              </span>
            </div>

            {/* Main Headings */}
            <div className="space-y-2">
              <h1
                className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] transition-colors ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                <span className={`block ${isDay ? 'text-slate-900' : 'text-zinc-200'}`}>
                  মুশফিক রাসেল - Musfiq Russell
                </span>
                <span className="text-gradient-red text-xl sm:text-3xl lg:text-4xl font-bold mt-1.5 block">
                  Muhammad Musfiqur Rahman Russell
                </span>
              </h1>

              {/* Professional Title */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-sm sm:text-base font-semibold">
                <span
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    isDay
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-zinc-900 border-zinc-800 text-rose-300'
                  }`}
                >
                  {language === 'bn' ? 'গ্রাফিক্স ডিজাইনার' : 'Graphics Designer'}
                </span>
                <span className={isDay ? 'text-slate-300' : 'text-zinc-600'}>•</span>
                <span
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    isDay
                      ? 'bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-200'
                  }`}
                >
                  {language === 'bn' ? 'বিজ্ঞাপন বিশেষজ্ঞ' : 'Advertising Expert'}
                </span>
                <span className={isDay ? 'text-slate-300' : 'text-zinc-600'}>•</span>
                <span
                  className={`px-3 py-1 rounded-lg border transition-colors ${
                    isDay
                      ? 'bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                  }`}
                >
                  {language === 'bn' ? 'ডকুমেন্ট কনসালটেন্ট' : 'Document Consultant'}
                </span>
              </div>
            </div>

            {/* Brand Bio / Statement */}
            <blockquote
              className={`border-l-4 border-rose-600 pl-4 py-2 text-base sm:text-lg font-medium italic max-w-2xl mx-auto lg:mx-0 rounded-r-lg transition-colors ${
                isDay
                  ? 'bg-slate-100/90 text-slate-800 shadow-xs'
                  : 'bg-zinc-900/40 text-zinc-300'
              }`}
            >
              "{language === 'bn' ? profile.bioBn : profile.bioEn}"
            </blockquote>

            {/* Key Statistics Cards */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2 max-w-xl mx-auto lg:mx-0">
              <div
                className={`p-3.5 rounded-xl border text-center shadow-xs transition-colors ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-[#13151b] border-zinc-800/80 text-white'
                }`}
              >
                <div
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {profile.sinceYear}+
                </div>
                <div className={`text-xs mt-0.5 ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                  {t('সাল থেকে অভিজ্ঞতা', 'Years Experience')}
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border text-center shadow-xs transition-colors ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-[#13151b] border-zinc-800/80 text-white'
                }`}
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 tracking-tight">
                  {profile.projectsCount}
                </div>
                <div className={`text-xs mt-0.5 ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                  {t('সফল প্রজেক্ট', 'Completed Projects')}
                </div>
              </div>

              <div
                className={`p-3.5 rounded-xl border text-center shadow-xs transition-colors ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900'
                    : 'bg-[#13151b] border-zinc-800/80 text-white'
                }`}
              >
                <div
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {profile.clientsCount}
                </div>
                <div className={`text-xs mt-0.5 ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                  {t('সন্তুষ্ট ক্লায়েন্ট', 'Satisfied Clients')}
                </div>
              </div>
            </div>

            {/* Primary and Secondary CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-xl shadow-rose-900/40 hover:shadow-rose-900/60 transition-all duration-200 transform hover:-translate-y-0.5"
                id="hero-primary-cta"
              >
                <span>{t('আমার সাথে কাজ করুন', 'Work With Me')}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portfolio"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                  isDay
                    ? 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700/80'
                }`}
                id="hero-secondary-cta"
              >
                <Layers className="w-4 h-4 text-rose-500" />
                <span>{t('Portfolio দেখুন', 'View Portfolio')}</span>
              </a>
            </div>

            {/* Secondary Direct Contact Fast Triggers */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs">
              <span className={`font-semibold ${isDay ? 'text-slate-600' : 'text-zinc-400'}`}>
                {t('তাৎক্ষণিক যোগাযোগ:', 'Quick Contact:')}
              </span>

              <a
                href={`tel:${profile.primaryMobile}`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-colors font-medium ${
                  isDay
                    ? 'bg-white hover:bg-slate-100 border-slate-300 text-slate-800'
                    : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-rose-500" />
                <span>{t('কল করুন', 'Call')} ({profile.primaryMobile})</span>
              </a>

              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-emerald-700 dark:text-emerald-400 font-semibold transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={profile.messengerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0084FF]/15 hover:bg-[#0084FF]/25 border border-[#0084FF]/40 text-sky-700 dark:text-sky-400 font-semibold transition-colors"
              >
                <Send className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                <span>Messenger</span>
              </a>
            </div>
          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-rose-600 via-zinc-800 to-red-600 opacity-40 blur-lg group-hover:opacity-80 transition duration-1000"></div>

              <div
                className={`relative rounded-2xl border overflow-hidden shadow-2xl p-3 transition-colors ${
                  isDay
                    ? 'bg-white border-slate-200'
                    : 'bg-[#12141a] border-zinc-800/90'
                }`}
              >
                {/* Profile Photo Container */}
                <div
                  className={`relative aspect-[4/4.8] rounded-xl overflow-hidden flex items-center justify-center ${
                    isDay
                      ? 'bg-gradient-to-b from-slate-100 to-slate-200'
                      : 'bg-gradient-to-b from-[#1c202a] to-[#0d0f14]'
                  }`}
                >
                  {!imageError ? (
                    <img
                      src="/assets/profile.jpg"
                      alt={profile.fullName || 'মুশফিক রাসেল - Musfiq Russell'}
                      className={`w-full h-full object-cover object-top transition-all duration-500 ${
                        imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                      }`}
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      loading="eager"
                    />
                  ) : (
                    /* High-fidelity fallback illustration if image url is unavailable */
                    <div
                      className={`w-full h-full flex flex-col items-center justify-center p-6 text-center ${
                        isDay
                          ? 'bg-gradient-to-b from-rose-50 via-slate-100 to-slate-200'
                          : 'bg-gradient-to-b from-rose-950/40 via-zinc-900 to-black'
                      }`}
                    >
                      <div className="w-24 h-24 rounded-full overflow-hidden shadow-xl border-4 border-rose-400/30 mb-4 shrink-0 bg-rose-600/20">
                        <img
                          src="https://vzkpetdgnhufjiosanmj.supabase.co/storage/v1/object/public/media/Profile_Photo.png"
                          alt={profile.fullName || 'মুশফিক রাসেল - Musfiq Russell'}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            const localFallback = '/assets/profile.png';
                            if (!e.currentTarget.src.endsWith(localFallback)) {
                              e.currentTarget.src = localFallback;
                            }
                          }}
                        />
                      </div>
                      <h3 className={`text-xl font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        Muhammad Musfiqur Rahman Russell
                      </h3>
                      <p className="text-xs text-rose-600 font-semibold mt-1">মুশফিক রাসেল - Musfiq Russell</p>
                      <p className={`text-xs mt-3 max-w-xs ${isDay ? 'text-slate-600' : 'text-zinc-400'}`}>
                        Graphics Designer | Advertising Expert | Document Consultant
                      </p>
                    </div>
                  )}

                  {/* Profile overlay badge */}
                  <div
                    className={`absolute bottom-3 left-3 right-3 p-3 rounded-xl backdrop-blur-md border flex items-center justify-between shadow-lg ${
                      isDay
                        ? 'bg-white/95 border-slate-200 text-slate-900'
                        : 'bg-black/85 border-white/10 text-white'
                    }`}
                  >
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 transition-colors duration-200 ${
                          isDay ? 'text-emerald-600' : 'text-rose-500'
                        }`}
                      />
                      <div className="flex flex-col">
                        <span
                          className={`text-xs font-bold leading-snug ${
                            isDay ? 'text-slate-900' : 'text-white'
                          }`}
                        >
                          মুশফিক রাসেল - Musfiq Russell
                        </span>
                        <span
                          className={`text-[11px] font-medium leading-tight ${
                            isDay ? 'text-slate-500' : 'text-zinc-400'
                          }`}
                        >
                          Managing Director & Founder
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold border transition-colors duration-200 whitespace-nowrap shadow-xs ${
                          isDay
                            ? 'bg-emerald-50 border-emerald-500/30 text-emerald-700'
                            : 'bg-rose-500/10 border-rose-500/30 text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/30 dark:text-rose-400'
                        }`}
                      >
                        {t('ভেরিফাইড এক্সপার্ট', 'Verified Pro')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Official Recognition & Award Strip - Side-by-Side Layout */}
                <div
                  className={`mt-3 px-3 py-2 rounded-xl border flex items-center justify-between gap-2.5 transition-colors ${
                    isDay
                      ? 'bg-slate-50/95 border-slate-200 shadow-xs'
                      : 'bg-zinc-900/80 border-zinc-800/90 shadow-xs'
                  }`}
                >
                  {/* Left Column: Vertical stack of credentials and award */}
                  <div className="flex flex-col justify-center min-w-0 flex-1">
                    {/* Line 1: Checkmark icon + Govt credential */}
                    <div className="flex items-center gap-1.5 min-w-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span
                        className={`text-[11px] sm:text-xs font-semibold leading-tight truncate ${
                          isDay ? 'text-slate-800' : 'text-zinc-200'
                        }`}
                      >
                        {t('গণপ্রজাতন্ত্রী বাংলাদেশ সরকার | BESIS', 'Govt. of Bangladesh | BESIS')}
                      </span>
                    </div>

                    {/* Line 2: Trophy icon + Award title */}
                    <div className="flex items-center gap-1.5 min-w-0 mt-1">
                      <Trophy className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-[10.5px] sm:text-[11px] font-bold text-rose-600 dark:text-rose-400 leading-tight truncate">
                        {t('ফ্রিলান্সার অ্যাওয়ার্ড বিজয়ী - ২০২৩', 'Freelancer Award Winner - 2023')}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Dynamic Horizontal Auto-Sliding Logo Carousel */}
                  <div
                    className="flex flex-col items-center justify-center shrink-0 pl-1"
                    onMouseEnter={() => setIsCarouselPaused(true)}
                    onMouseLeave={() => setIsCarouselPaused(false)}
                  >
                    <div
                      className={`relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg border overflow-hidden flex items-center justify-center p-1 transition-colors shadow-xs cursor-pointer ${
                        isDay
                          ? 'bg-white border-slate-200 shadow-slate-100 hover:border-slate-300'
                          : 'bg-zinc-800/90 border-zinc-700/70 shadow-black/30 hover:border-zinc-600'
                      }`}
                      onClick={() => setCurrentLogoIndex((prev) => (prev + 1) % OFFICIAL_AWARD_LOGOS.length)}
                      title={`${OFFICIAL_AWARD_LOGOS[currentLogoIndex].name} (${currentLogoIndex + 1}/${OFFICIAL_AWARD_LOGOS.length})`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                          key={currentLogoIndex}
                          initial={{ x: 16, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -16, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <img
                            src={OFFICIAL_AWARD_LOGOS[currentLogoIndex].url}
                            alt={OFFICIAL_AWARD_LOGOS[currentLogoIndex].name}
                            referrerPolicy="no-referrer"
                            className="h-[20px] sm:h-[22px] w-auto aspect-square object-contain rounded-xs select-none"
                            loading="lazy"
                            onError={(e) => {
                              const fallback = OFFICIAL_AWARD_LOGOS[currentLogoIndex].fallback;
                              if (fallback && !e.currentTarget.src.endsWith(fallback)) {
                                e.currentTarget.src = fallback;
                              }
                            }}
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Subtle red progress bar tracking slide transition timing */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-rose-500/15 overflow-hidden">
                        <motion.div
                          key={`progress-${currentLogoIndex}-${isCarouselPaused}`}
                          initial={{ width: '0%' }}
                          animate={{ width: isCarouselPaused ? '0%' : '100%' }}
                          transition={{
                            duration: isCarouselPaused ? 0 : CAROUSEL_INTERVAL_MS / 1000,
                            ease: 'linear',
                          }}
                          className="h-full bg-rose-600 dark:bg-rose-500"
                        />
                      </div>
                    </div>

                    {/* Interactive Carousel Indicator Dots */}
                    <div className="flex items-center gap-1 mt-1">
                      {OFFICIAL_AWARD_LOGOS.map((logo, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentLogoIndex(idx)}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            idx === currentLogoIndex
                              ? 'w-2.5 bg-rose-500'
                              : isDay
                              ? 'w-1 bg-slate-300 hover:bg-slate-400'
                              : 'w-1 bg-zinc-700 hover:bg-zinc-600'
                          }`}
                          title={logo.name}
                          aria-label={`Show ${logo.name}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
