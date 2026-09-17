import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';

export const Faq: React.FC = () => {
  const { language, t } = useLanguage();
  const { faqs, profile } = useData();
  const { isDay } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-zinc-50' : 'bg-zinc-950'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('সাধারণ জিজ্ঞাসা', 'Frequently Asked Questions')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'সচরাচর জিজ্ঞাসিত প্রশ্নোত্তর' : 'Frequently Asked Questions'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'সেবা গ্রহণ ও কাজের প্রক্রিয়া সংক্রান্ত জরুরি প্রশ্নের উত্তর।',
              'Clear answers to common questions about services, workflow, and collaboration.'
            )}
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question = language === 'bn' ? faq.questionBn : faq.questionEn;
            const answer = language === 'bn' ? faq.answerBn : faq.answerEn;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border overflow-hidden transition-all duration-200 shadow-md ${
                  isDay
                    ? 'bg-white border-slate-200'
                    : 'bg-[#12141a] border-zinc-800/90'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className={`w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none transition-colors ${
                    isDay ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/40'
                  }`}
                >
                  <span
                    className={`text-base sm:text-lg font-bold tracking-tight flex items-center gap-3 ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    <span className="text-rose-600 text-sm font-extrabold">0{idx + 1}.</span>
                    <span>{question}</span>
                  </span>
                  <div
                    className={`p-1 rounded-full shrink-0 ${
                      isDay ? 'bg-slate-100 text-slate-600' : 'bg-zinc-900 text-zinc-400'
                    }`}
                  >
                    {isOpen ? <ChevronUp className="w-5 h-5 text-rose-500" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {isOpen && (
                  <div
                    className={`px-6 pb-6 pt-2 text-sm leading-relaxed border-t animate-fadeIn ${
                      isDay
                        ? 'text-slate-700 border-slate-100'
                        : 'text-zinc-300 border-zinc-800/60'
                    }`}
                  >
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div
          className={`mt-12 p-6 rounded-2xl border text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm ${
            isDay
              ? 'bg-white border-slate-200'
              : 'bg-zinc-900/60 border-zinc-800'
          }`}
        >
          <div className="text-left">
            <h4
              className={`text-base font-bold ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {t('আরও কোনো প্রশ্ন বা বিশেষ পরামর্শ প্রয়োজন?', 'Have custom inquiries or specific questions?')}
            </h4>
            <p
              className={`text-xs mt-0.5 ${
                isDay ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              {t('সরাসরি আমার সাথে যোগাযোগ করুন অথবা WhatsApp-এ মেসেজ পাঠান।', 'Reach out directly or send a message on WhatsApp for instant assistance.')}
            </p>
          </div>

          <a
            href={profile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shrink-0 shadow-lg shadow-emerald-950/40"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('WhatsApp-এ প্রশ্ন করুন', 'Chat on WhatsApp')}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
