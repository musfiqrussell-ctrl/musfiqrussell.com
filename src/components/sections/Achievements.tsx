import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Trophy, Award, ShieldCheck, Sparkles, Star } from 'lucide-react';

export const Achievements: React.FC = () => {
  const { language, t } = useLanguage();
  const { achievements, notableClients } = useData();
  const { isDay } = useTheme();

  return (
    <section
      id="achievements"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-zinc-50' : 'bg-zinc-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>{t('স্বীকৃতি ও সম্মাননা', 'Honors & Recognitions')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'জাতীয় স্বীকৃতি ও অর্জনের মাইলফলক' : 'Awards & Notable Recognitions'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'উচ্চমানের কাজের স্বীকৃতিস্বরূপ সরকারি ও প্রাতিষ্ঠানিক পুরস্কার অর্জন।',
              'Distinguished national honors for exceptional contributions in freelancing and consultancy.'
            )}
          </p>
        </div>

        {/* 2 Achievements Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`relative p-7 rounded-2xl border transition-all duration-300 shadow-xl overflow-hidden group ${
                isDay
                  ? 'bg-white border-rose-200/80 hover:border-rose-400'
                  : 'bg-[#12141a] border-rose-900/40 hover:border-rose-600/70'
              }`}
            >
              {/* Subtle background glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl transition-all ${
                  isDay
                    ? 'bg-rose-500/10 group-hover:bg-rose-500/15'
                    : 'bg-rose-600/10 group-hover:bg-rose-600/20'
                }`}
              />

              <div className="flex items-start justify-between gap-4 mb-4">
                <div
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isDay
                      ? 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white'
                      : 'bg-zinc-900 text-rose-500 border-zinc-800 group-hover:bg-rose-600 group-hover:text-white'
                  }`}
                >
                  <Award className="w-7 h-7" />
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold border ${
                    isDay
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-rose-950/60 border-rose-800/60 text-rose-300'
                  }`}
                >
                  {ach.year}
                </span>
              </div>

              <h3
                className={`text-xl font-extrabold tracking-tight mb-2 ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {language === 'bn' ? ach.titleBn : ach.titleEn}
              </h3>

              <div
                className={`pt-2 border-t flex items-center gap-2 text-xs font-semibold ${
                  isDay ? 'border-slate-100 text-slate-700' : 'border-zinc-800 text-zinc-300'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>
                  {t('স্বীকৃতি প্রদানকারী:', 'Awarded by:')}{' '}
                  <strong className="text-rose-600 font-bold">
                    {language === 'bn' ? ach.recognitionBn : ach.recognitionEn}
                  </strong>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Notable Clients Strip (Item 12 in requirements) */}
        <div
          className={`mt-12 pt-12 border-t ${
            isDay ? 'border-slate-200' : 'border-zinc-800/80'
          }`}
        >
          <div className="text-center mb-8">
            <span
              className={`text-xs uppercase font-bold tracking-widest block mb-1 ${
                isDay ? 'text-slate-400' : 'text-zinc-500'
              }`}
            >
              {t('বিশ্বস্ত প্রতিষ্ঠানসমূহ', 'Trusted By Industry Leaders')}
            </span>
            <h3
              className={`text-xl font-bold ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {t('যাদের সাথে কাজের সুযোগ হয়েছে', 'Notable Client Partnerships')}
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {notableClients.map((client) => (
              <div
                key={client.id}
                className={`p-4 sm:p-5 rounded-2xl border text-center transition-all duration-300 flex flex-col items-center justify-between group shadow-xs hover:-translate-y-1 hover:shadow-md ${
                  isDay
                    ? 'bg-white border-slate-200/90 hover:border-rose-300 hover:shadow-slate-200/50'
                    : 'bg-[#12141a] border-zinc-800/80 hover:border-zinc-700 hover:shadow-rose-950/20'
                }`}
              >
                {/* Brand Logo Container */}
                <div className="w-full h-16 sm:h-18 flex items-center justify-center p-2.5 rounded-xl bg-white border border-slate-200/80 dark:border-zinc-700/60 shadow-xs mb-3.5 transition-transform duration-300 group-hover:scale-[1.02]">
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="h-10 sm:h-12 max-w-[130px] w-auto object-contain"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="text-base font-bold text-slate-800">
                      {client.name}
                    </div>
                  )}
                </div>

                {/* Company Name & Role */}
                <div className="w-full">
                  <h4
                    className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                      isDay
                        ? 'text-slate-900 group-hover:text-rose-600'
                        : 'text-white group-hover:text-rose-400'
                    }`}
                  >
                    {client.name}
                  </h4>
                  <p
                    className={`text-[11px] sm:text-xs mt-1 font-medium leading-snug line-clamp-2 ${
                      isDay ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    {language === 'bn' ? client.categoryBn : client.categoryEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
