import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { ArrowRight, MessageCircle, Phone, Sparkles } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const { language, t } = useLanguage();
  const { profile } = useData();
  const { isDay } = useTheme();

  return (
    <section
      className={`py-20 relative overflow-hidden transition-colors duration-300 ${
        isDay
          ? 'bg-gradient-to-b from-slate-50 via-rose-50/50 to-slate-100'
          : 'bg-gradient-to-b from-[#090a0d] via-[#150e13] to-[#08090b]'
      }`}
    >
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-rose-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold shadow-lg ${
            isDay
              ? 'bg-white border-rose-200 text-rose-700'
              : 'bg-rose-950/70 border-rose-800/60 text-rose-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span>{t('ব্র্যান্ড গ্রোথ পার্টনারশিপ', 'Elevate Your Brand')}</span>
        </div>

        <h2
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight max-w-4xl mx-auto px-2 sm:px-4 ${
            isDay ? 'text-slate-900' : 'text-white'
          }`}
        >
          {language === 'bn'
            ? 'আপনার ব্যবসাকে দিন আধুনিক ও আকর্ষণীয় রূপ'
            : 'Give Your Business A Modern, High-Converting Presence'}
        </h2>

        <p
          className={`text-base sm:text-lg max-w-2xl mx-auto font-medium ${
            isDay ? 'text-slate-700' : 'text-zinc-300'
          }`}
        >
          "{language === 'bn' ? profile.bioBn : profile.bioEn}"
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-2xl shadow-rose-900/50 hover:shadow-rose-900/70 transition-all duration-200 transform hover:-translate-y-0.5"
            id="cta-bottom-primary"
          >
            <span>{t('আজই যোগাযোগ করুন', 'Get Started Today')}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={profile.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-sm font-bold transition-all duration-200 border ${
              isDay
                ? 'bg-white hover:bg-emerald-50 text-emerald-700 border-emerald-300 shadow-sm'
                : 'bg-zinc-900 hover:bg-zinc-800 text-emerald-400 border-emerald-500/40 hover:border-emerald-500'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('WhatsApp-এ সরাসরি কথা বলুন', 'Chat on WhatsApp')}</span>
          </a>
        </div>

        <div
          className={`pt-4 flex items-center justify-center gap-2 text-xs ${
            isDay ? 'text-slate-500' : 'text-zinc-500'
          }`}
        >
          <Phone className="w-3 h-3 text-rose-500" />
          <span>{t('জরুরি প্রয়োজনে সরাসরি কল করুন:', 'Direct Emergency Line:')}</span>
          <a
            href={`tel:${profile.primaryMobile}`}
            className={`font-semibold transition-colors ${
              isDay ? 'text-slate-800 hover:text-rose-600' : 'text-zinc-300 hover:text-white'
            }`}
          >
            {profile.primaryMobile}
          </a>
        </div>
      </div>
    </section>
  );
};
