import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { Award, Briefcase, Users, Calendar, TrendingUp, Shield } from 'lucide-react';

export const Statistics: React.FC = () => {
  const { language, t } = useLanguage();
  const { profile } = useData();
  const { isDay } = useTheme();

  const statItems = [
    {
      icon: Calendar,
      value: `${profile.sinceYear}+`,
      labelBn: 'সাল থেকে পথচলা',
      labelEn: 'Serving Since',
      subBn: 'ধারাবাহিক সৃষ্টিশীল কাজ',
      subEn: 'Continuous Creative Journey',
    },
    {
      icon: Briefcase,
      value: profile.projectsCount,
      labelBn: 'সফল প্রজেক্ট সম্পন্ন',
      labelEn: 'Successful Projects',
      subBn: 'ডিজাইন ও বিজ্ঞাপন ক্যাম্পেইন',
      subEn: 'Design & Ad Campaigns',
    },
    {
      icon: Users,
      value: profile.clientsCount,
      labelBn: 'সন্তুষ্ট ক্লায়েন্ট',
      labelEn: 'Satisfied Clients',
      subBn: 'দেশজুড়ে ব্যবসায়ী ও উদ্যোক্তা',
      subEn: 'Businesses & Entrepreneurs',
    },
    {
      icon: Award,
      value: '2x',
      labelBn: 'জাতীয় পর্যায়ের স্বীকৃতি',
      labelEn: 'National Recognitions',
      subBn: 'ফ্রিল্যান্সার ও কনসালটেন্ট অ্যাওয়ার্ড',
      subEn: 'Freelancer & Consultant Honors',
    },
  ];

  return (
    <section
      className={`py-10 border-y relative transition-colors duration-300 ${
        isDay
          ? 'bg-slate-100/70 border-slate-200'
          : 'bg-[#0d0e12]/60 border-zinc-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl border transition-all duration-300 shadow-xs group ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-md'
                    : 'bg-[#12141a] border-zinc-800/90 hover:border-rose-900/60'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2.5 rounded-xl transition-colors ${
                      isDay
                        ? 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white'
                        : 'bg-zinc-900 text-rose-400 group-hover:bg-rose-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`text-[10px] uppercase font-bold tracking-widest ${
                      isDay ? 'text-slate-400' : 'text-zinc-500'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {item.value}
                </div>
                <div
                  className={`text-sm font-bold mt-1 ${
                    isDay ? 'text-slate-800' : 'text-zinc-200'
                  }`}
                >
                  {language === 'bn' ? item.labelBn : item.labelEn}
                </div>
                <div
                  className={`text-xs mt-0.5 ${
                    isDay ? 'text-slate-500' : 'text-zinc-500'
                  }`}
                >
                  {language === 'bn' ? item.subBn : item.subEn}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
