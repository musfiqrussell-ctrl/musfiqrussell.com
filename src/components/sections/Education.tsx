import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { GraduationCap, Award, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

export const Education: React.FC = () => {
  const { language, t } = useLanguage();
  const { educations, certifications, courses } = useData();
  const { isDay } = useTheme();

  return (
    <section
      id="education"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-slate-100/50' : 'bg-[#0c0d12]'
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
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('শিক্ষাগত যোগ্যতা ও দক্ষতা', 'Education & Certifications')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'শিক্ষা, সার্টিফিকেট ও কোর্সসমূহ' : 'Academic & Professional Credentials'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'উচ্চশিক্ষা এবং আধুনিক ডিজিটাল ডিজাইন ও মার্কেটিং প্রযুক্তিতে বিশেষায়িত দক্ষতা।',
              'Higher academic background combined with advanced digital design and advertising skillsets.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formal Education Card */}
          <div
            className={`p-7 rounded-2xl border shadow-xl flex flex-col justify-between ${
              isDay
                ? 'bg-white border-slate-200'
                : 'bg-[#12141a] border-zinc-800/90'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-xl border ${
                    isDay
                      ? 'bg-rose-50 text-rose-600 border-rose-100'
                      : 'bg-zinc-900 text-rose-500 border-zinc-800'
                  }`}
                >
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold tracking-tight ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {t('প্রাতিষ্ঠানিক শিক্ষা', 'Formal Education')}
                  </h3>
                  <p className={isDay ? 'text-xs text-slate-500' : 'text-xs text-zinc-500'}>
                    {t('বিশ্ববিদ্যালয় পর্যায়ের ডিগ্রি', 'University Degree')}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className={`p-5 rounded-xl border space-y-3 ${
                      isDay
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-zinc-900/80 border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                          isDay
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-rose-950/70 border-rose-800/60 text-rose-300'
                        }`}
                      >
                        {language === 'bn' ? edu.degreeBn : edu.degreeEn}
                      </span>
                      <span
                        className={`text-[11px] font-semibold ${
                          isDay ? 'text-emerald-600' : 'text-emerald-400'
                        }`}
                      >
                        {language === 'bn' ? edu.statusBn : edu.statusEn}
                      </span>
                    </div>

                    <div>
                      <h4
                        className={`text-base font-bold ${
                          isDay ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {language === 'bn' ? edu.institutionBn : edu.institutionEn}
                      </h4>
                      <p className={`text-xs mt-1 ${isDay ? 'text-slate-600' : 'text-zinc-400'}`}>
                        {t('বিষয়:', 'Major:')}{' '}
                        <span className={`font-semibold ${isDay ? 'text-slate-900' : 'text-zinc-200'}`}>
                          {language === 'bn' ? edu.subjectBn : edu.subjectEn}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-6 pt-4 border-t text-xs ${
                isDay ? 'border-slate-200 text-slate-500' : 'border-zinc-800 text-zinc-500'
              }`}
            >
              {t('ধারাবাহিক জ্ঞানচর্চা ও সমাজকল্যাণমূলক বিষয়ের সাথে সম্পৃক্ততা।', 'Commitment to community service and social welfare discipline.')}
            </div>
          </div>

          {/* Professional Certifications */}
          <div
            className={`p-7 rounded-2xl border shadow-xl flex flex-col justify-between ${
              isDay
                ? 'bg-white border-slate-200'
                : 'bg-[#12141a] border-zinc-800/90'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-xl border ${
                    isDay
                      ? 'bg-rose-50 text-rose-600 border-rose-100'
                      : 'bg-zinc-900 text-rose-500 border-zinc-800'
                  }`}
                >
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold tracking-tight ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {t('প্রফেশনাল সার্টিফিকেশন', 'Certifications')}
                  </h3>
                  <p className={isDay ? 'text-xs text-slate-500' : 'text-xs text-zinc-500'}>
                    {t('পেশাদার স্কিল স্বীকৃতি', 'Specialized Credentials')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className={`p-4 rounded-xl border ${
                      isDay
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-zinc-900/80 border-zinc-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4
                        className={`text-sm font-bold ${
                          isDay ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {language === 'bn' ? cert.titleBn : cert.titleEn}
                      </h4>
                      {cert.highlight && (
                        <span className="text-[10px] text-rose-600 font-semibold">
                          {cert.highlight}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {cert.tools.map((tool, i) => (
                        <span
                          key={i}
                          className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            isDay
                              ? 'bg-slate-200/80 text-slate-800'
                              : 'bg-zinc-800 text-zinc-300'
                          }`}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-6 pt-4 border-t text-xs ${
                isDay ? 'border-slate-200 text-slate-500' : 'border-zinc-800 text-zinc-500'
              }`}
            >
              {t('অ্যাডোবি ফটোশপ, ইলাস্ট্রেটর ও ফিগমাতে উন্নত কাজের দক্ষতা।', 'Hands-on mastery in Adobe Photoshop, Illustrator & Figma.')}
            </div>
          </div>

          {/* Professional Training Courses */}
          <div
            className={`p-7 rounded-2xl border shadow-xl flex flex-col justify-between ${
              isDay
                ? 'bg-white border-slate-200'
                : 'bg-[#12141a] border-zinc-800/90'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-xl border ${
                    isDay
                      ? 'bg-rose-50 text-rose-600 border-rose-100'
                      : 'bg-zinc-900 text-rose-500 border-zinc-800'
                  }`}
                >
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3
                    className={`text-lg font-bold tracking-tight ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {t('সম্পন্নকৃত ট্রেনিং কোর্সসমূহ', 'Training Courses')}
                  </h3>
                  <p className={isDay ? 'text-xs text-slate-500' : 'text-xs text-zinc-500'}>
                    {t('উন্নত প্রফেশনাল ট্রেনিং', 'Advanced Hands-on Training')}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className={`p-4 rounded-xl border flex items-center gap-3 ${
                      isDay
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-zinc-900/80 border-zinc-800/80'
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <h4
                        className={`text-sm font-bold ${
                          isDay ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {language === 'bn' ? course.titleBn : course.titleEn}
                      </h4>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          isDay ? 'text-slate-500' : 'text-zinc-400'
                        }`}
                      >
                        {t('প্রাকটিক্যাল স্কিল ডেভেলপমেন্ট', 'Practical Skill Development')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className={`mt-6 pt-4 border-t text-xs ${
                isDay ? 'border-slate-200 text-slate-500' : 'border-zinc-800 text-zinc-500'
              }`}
            >
              {t('ডিজিটাল বিজ্ঞাপনের ট্র্যাকিং ও পিক্সেল সেটআপে বিশেষ দক্ষতা।', 'Specialization in Pixel tracking, conversion events & creative edits.')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
