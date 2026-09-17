import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  CheckCircle2,
  Sparkles,
  Award,
  Clock,
  Compass,
  FileCheck2,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

export const About: React.FC = () => {
  const { language, t } = useLanguage();
  const { profile } = useData();
  const { isDay } = useTheme();

  const coreStrengths = [
    {
      titleBn: 'সৃজনশীল ভিজ্যুয়াল ব্র্যান্ডিং',
      titleEn: 'Creative Visual Branding',
      descBn: 'লোগো, সোশ্যাল ক্রিয়েটিভ ও ব্যানার ডিজাইনের মাধ্যমে অনন্য ব্র্যান্ড স্বকীয়তা তৈরি।',
      descEn: 'Distinctive brand identity through high-impact logos, banners, and social creatives.',
    },
    {
      titleBn: 'টার্গেটেড ডিজিটাল অ্যাডভার্টাইজিং',
      titleEn: 'Targeted Digital Advertising',
      descBn: 'মেটা ও গুগল অ্যাডের আধুনিক কৌশল ও অডিয়েন্স রিসার্চের মাধ্যমে সেলস বৃদ্ধি।',
      descEn: 'Scaling revenue via precision audience research and high-converting ad funnels.',
    },
    {
      titleBn: 'অফিশিয়াল ডকুমেন্ট কনসালটেন্সি',
      titleEn: 'Official Document Advisory',
      descBn: 'পাসপোর্ট ও এনআইডি সেবা ও সরকারি অনলাইন প্রসেসিংয়ে নির্ভুল পরামর্শ ও সহায়তা।',
      descEn: 'Reliable guidance for passport, NID correction, and government documentation.',
    },
    {
      titleBn: 'গ্রাহক সন্তুষ্টি ও ধারাবাহিক আস্থা',
      titleEn: 'Client Satisfaction & Trust',
      descBn: '২৫০০+ ক্লায়েন্টের সাথে সফল কাজের অভিজ্ঞতা ও দীর্ঘমেয়াদী পেশাদার সম্পর্ক।',
      descEn: 'Long-term professional partnerships built on trust with 2500+ satisfied clients.',
    },
  ];

  return (
    <section
      id="about"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-zinc-50' : 'bg-zinc-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-4xl mx-auto mb-14 px-2"
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('পরিচিতি ও দর্শন', 'About & Vision')}</span>
          </div>
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            {language === 'bn' ? (
              <>
                <span className="text-red-500">মুশফিক রাসেল - Musfiq Russell</span>{' '}
                <span className={isDay ? 'text-slate-900' : 'text-white'}>সম্পর্কে জানুন</span>
              </>
            ) : (
              <>
                <span className={isDay ? 'text-slate-900' : 'text-white'}>About</span>{' '}
                <span className="text-red-500">মুশফিক রাসেল - Musfiq Russell</span>
              </>
            )}
          </h2>
          <p
            className={`mt-3 text-base leading-relaxed ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {language === 'bn' ? profile.bioBn : profile.bioEn}
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Bio and Story */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl border shadow-xl space-y-4 transition-colors ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-[#12141a] border-zinc-800/90 text-white'
              }`}
            >
              <div
                className={`flex items-center gap-3.5 pb-3 border-b ${
                  isDay ? 'border-slate-200' : 'border-zinc-800'
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-rose-500 shrink-0 shadow-md">
                  <img
                    src="/assets/profile.jpg"
                    alt={profile.fullName || 'মুশফিক রাসেল - Musfiq Russell'}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {profile.fullName}
                  </h3>
                  <p className="text-xs text-rose-600 font-semibold">মুশফিক রাসেল - Musfiq Russell</p>
                </div>
              </div>

              <p
                className={`text-base leading-relaxed ${
                  isDay ? 'text-slate-700' : 'text-zinc-300'
                }`}
              >
                {language === 'bn' ? profile.aboutIntroBn : profile.aboutIntroEn}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div
                  className={`p-3.5 rounded-xl border ${
                    isDay
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-zinc-900/90 border-zinc-800/80'
                  }`}
                >
                  <div className={`text-xs font-medium ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                    {t('পেশাদার পদবী', 'Professional Title')}
                  </div>
                  <div className="text-sm font-semibold text-rose-600 mt-1">
                    {language === 'bn' ? profile.professionalTitleBn : profile.professionalTitleEn}
                  </div>
                </div>

                <div
                  className={`p-3.5 rounded-xl border ${
                    isDay
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-zinc-900/90 border-zinc-800/80'
                  }`}
                >
                  <div className={`text-xs font-medium ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                    {t('কর্মক্ষেত্র ও অভিজ্ঞতা', 'Track Record')}
                  </div>
                  <div className={`text-sm font-bold mt-1 ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {profile.sinceYear}+ {t('সাল থেকে', 'Since')} ({profile.projectsCount} {t('প্রজেক্ট', 'Projects')})
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md shadow-rose-900/30 transition-all"
                >
                  <span>{t('আমার সাথে কাজ করুন', 'Work With Me')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${profile.primaryMobile}`}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all ${
                    isDay
                      ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                      : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <span>{t('কল করুন:', 'Call:')} {profile.primaryMobile}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Core Strengths Cards */}
          <div className="lg:col-span-5 space-y-4">
            {coreStrengths.map((st, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`p-5 rounded-xl border transition-all duration-200 flex items-start gap-4 shadow-xs ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-rose-300 shadow-sm'
                    : 'bg-[#12141a] border-zinc-800/80 hover:border-rose-900/50'
                }`}
              >
                <div
                  className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isDay ? 'bg-rose-50 text-rose-600' : 'bg-zinc-900 text-rose-500'
                  }`}
                >
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {language === 'bn' ? st.titleBn : st.titleEn}
                  </h4>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isDay ? 'text-slate-600' : 'text-zinc-400'
                    }`}
                  >
                    {language === 'bn' ? st.descBn : st.descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
