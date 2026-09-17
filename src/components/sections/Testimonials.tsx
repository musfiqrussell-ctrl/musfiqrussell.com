import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  MessageSquareQuote,
  Star,
  ShieldCheck,
  Building,
  Quote,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { language, t } = useLanguage();
  const { testimonials, profile } = useData();
  const { isDay } = useTheme();

  return (
    <section
      id="testimonials"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-slate-100/50' : 'bg-[#0b0c10]'
      }`}
    >
      {/* Background ambient accent */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[320px] rounded-full blur-[140px] pointer-events-none -z-10 ${
          isDay ? 'bg-rose-500/10' : 'bg-rose-600/5'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>{t('ক্লায়েন্ট পর্যালোচনা ও মূল্যায়ন', 'Client Endorsements & Reviews')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'বিশ্বস্ত ক্লায়েন্টদের সন্তুষ্টি ও মতামত' : 'Client Testimonials & Feedback'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'সৃজনশীল ডিজাইন, ডিজিটাল বিজ্ঞাপন ও ডকুমেন্টেশন সেবায় গ্রাহকের বিশ্বস্ত মূল্যায়ন।',
              'Verified client feedback on creative branding, advertising campaigns, and documentation services.'
            )}
          </p>
        </div>

        {/* Dynamic Testimonials List or Verified Invitation Card */}
        {testimonials && testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className={`p-7 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between relative group ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-2xl'
                    : 'bg-[#12141a] border-zinc-800/90 hover:border-rose-900/60'
                }`}
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (item.rating || 5)
                              ? 'text-amber-400 fill-amber-400'
                              : isDay
                              ? 'text-slate-200'
                              : 'text-zinc-700'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-rose-500/30 group-hover:text-rose-500/60 transition-colors" />
                  </div>

                  {/* Testimonial Quote */}
                  <p
                    className={`text-sm leading-relaxed mb-6 italic ${
                      isDay ? 'text-slate-700' : 'text-zinc-300'
                    }`}
                  >
                    "{language === 'bn' ? item.feedbackBn : item.feedbackEn}"
                  </p>
                </div>

                {/* Author Info */}
                <div
                  className={`pt-4 border-t flex items-center gap-3 ${
                    isDay ? 'border-slate-100' : 'border-zinc-800/80'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full bg-rose-600/15 border border-rose-500/30 flex items-center justify-center font-bold text-xs text-rose-500 shrink-0">
                    {item.clientName.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-sm font-bold truncate ${
                          isDay ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        {item.clientName}
                      </span>
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    </div>
                    <p
                      className={`text-xs truncate ${
                        isDay ? 'text-slate-500' : 'text-zinc-400'
                      }`}
                    >
                      {item.designation || item.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* High-Fidelity Verified Client Feedback Invitation Banner (Zero fake reviews invented) */
          <div
            className={`max-w-3xl mx-auto p-8 sm:p-10 rounded-3xl border text-center shadow-2xl relative overflow-hidden ${
              isDay
                ? 'bg-gradient-to-b from-white to-slate-50 border-slate-200'
                : 'bg-gradient-to-b from-[#13151c] to-[#0c0d12] border-zinc-800'
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-600/10 border border-rose-500/20 text-rose-500 mx-auto flex items-center justify-center mb-5 shadow-inner">
              <Sparkles className="w-7 h-7" />
            </div>

            <h3
              className={`text-xl sm:text-2xl font-bold tracking-tight mb-3 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {language === 'bn'
                ? '২৫০০+ সফল ক্লায়েন্ট সার্ভিসের বিশ্বাসযোগ্যতা'
                : 'Over 2,500+ Successful Client Collaborations'}
            </h3>

            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-6 ${
                isDay ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              {t(
                'আমরা প্রতিটি ক্লায়েন্টের মতামতকে সর্বোচ্চ গুরুত্ব দিই। আপনি যদি ইতিমধ্যে আমাদের সাথে কাজ করে থাকেন, তবে আপনার কাজের অভিজ্ঞতা ও পর্যালোচনা শেয়ার করতে সাদরে আমন্ত্রণ জানাচ্ছি।',
                'Client satisfaction and transparent relationships are our core priority. If you have worked with Musfiq Russell, we invite you to share your genuine feedback.'
              )}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 shadow-lg shadow-emerald-900/30 transition-all transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t('WhatsApp-এ রিভিউ পাঠান', 'Send Review via WhatsApp')}</span>
              </a>

              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold border transition-colors ${
                  isDay
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                    : 'bg-zinc-900 border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white'
                }`}
              >
                <span>{t('বার্তা পাঠান', 'Leave Feedback Message')}</span>
                <ArrowRight className="w-4 h-4 text-rose-500" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
