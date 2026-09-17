import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Briefcase, Building, CheckCircle2, Clock } from 'lucide-react';

export const Experience: React.FC = () => {
  const { language, t } = useLanguage();
  const { experiences } = useData();
  const { isDay } = useTheme();

  return (
    <section
      id="experience"
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
            <Briefcase className="w-3.5 h-3.5" />
            <span>{t('পেশাদার ক্যারিয়ার', 'Professional Career')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'কাজের অভিজ্ঞতা ও কর্মজীবন' : 'Professional Work Experience'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'বিভিন্ন শীর্ষস্থানীয় কর্পোরেট ও বাণিজ্যিক প্রতিষ্ঠানে পেশাদার দায়িত্ব পালন।',
              'Proven track record across leading corporate and enterprise organizations.'
            )}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              className={`relative p-6 sm:p-7 rounded-2xl border transition-all duration-300 shadow-md group hover:-translate-y-1 hover:shadow-xl ${
                isDay
                  ? 'bg-white border-slate-200/90 hover:border-rose-400/80 hover:shadow-slate-200/60'
                  : 'bg-[#12141a] border-zinc-800/90 hover:border-rose-500/50 hover:shadow-rose-950/20'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3.5">
                  <div
                    className={`p-3 rounded-xl border transition-all duration-300 shrink-0 ${
                      isDay
                        ? 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600'
                        : 'bg-zinc-900 text-rose-400 border-zinc-800 group-hover:bg-rose-600 group-hover:text-white group-hover:border-rose-600'
                    }`}
                  >
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold tracking-tight ${
                        isDay ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {exp.organization}
                    </h3>
                    <p className="text-sm font-semibold tracking-wide text-rose-600 dark:text-rose-400 mt-0.5">
                      {exp.position}
                    </p>
                  </div>
                </div>

                <div
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border self-start sm:self-auto shrink-0 ${
                    isDay
                      ? 'bg-slate-50 text-slate-700 border-slate-200/90'
                      : 'bg-zinc-900/90 text-zinc-300 border-zinc-800'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span className="font-semibold">
                    {exp.duration || (exp.joiningDate
                      ? `${exp.joiningDate} - ${exp.endDate || t('বর্তমান', 'Present')}`
                      : t('যথাযথ দায়িত্ব পালন', 'Corporate Role'))}
                  </span>
                </div>
              </div>

              {exp.responsibilities ? (
                <div
                  className={`mt-4 pt-3.5 border-t flex items-start gap-2.5 text-xs sm:text-sm ${
                    isDay
                      ? 'border-slate-100 text-slate-700'
                      : 'border-zinc-800/80 text-zinc-300'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">
                    <span className={isDay ? 'text-slate-500 font-medium' : 'text-zinc-400 font-medium'}>
                      {t('প্রধান দায়িত্ব:', 'Primary Responsibility:')}{' '}
                    </span>
                    <strong className={isDay ? 'text-slate-900 font-bold' : 'text-zinc-100 font-bold'}>
                      {exp.responsibilities}
                    </strong>
                  </span>
                </div>
              ) : (
                <div
                  className={`mt-3 pt-3 border-t text-xs italic ${
                    isDay
                      ? 'border-slate-100 text-slate-400'
                      : 'border-zinc-800/80 text-zinc-500'
                  }`}
                >
                  {t('কার্যক্রম ও প্রকল্প সংক্রান্ত বিস্তারিত বিবরণ সংরক্ষিত।', 'Role details & responsibilities documented.')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
