import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Phone,
  Mail,
  MapPin,
  ArrowUpRight,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { SocialIcon } from '../sections/social/SocialIcon';

interface FooterProps {
  onNavigateToAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToAdmin }) => {
  const { language, t } = useLanguage();
  const { profile, siteSettings, businesses, socialLinks } = useData();
  const { isDay } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="main-footer"
      className={`border-t pt-16 pb-12 transition-colors duration-300 ${
        isDay
          ? 'bg-zinc-100/80 border-zinc-200 text-zinc-600'
          : 'bg-zinc-950 border-zinc-800/80 text-zinc-400'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b ${
            isDay ? 'border-zinc-200' : 'border-zinc-800/60'
          }`}
        >
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-900/30 border border-rose-400/30 p-0.5 overflow-hidden shrink-0">
                <img
                  src="/assets/profile.png"
                  alt="মুশফিক রাসেল - Musfiq Russell"
                  className="w-full h-full object-cover object-top rounded-full"
                  loading="lazy"
                  width={40}
                  height={40}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fallback-badge') as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <span className="fallback-badge hidden tracking-tighter font-extrabold text-base">MR</span>
              </div>
              <div>
                <h3
                  className={`text-lg font-bold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  মুশফিক রাসেল - Musfiq Russell
                </h3>
                <p className="text-xs text-rose-600 font-semibold">
                  {language === 'bn' ? 'গ্রাফিক্স ডিজাইনার | বিজ্ঞাপন বিশেষজ্ঞ | ডকুমেন্ট কনসালটেন্ট' : 'Graphics Designer | Advertising Expert | Document Consultant'}
                </p>
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed max-w-md ${
                isDay ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              "{language === 'bn' ? profile.bioBn : profile.bioEn}"
            </p>

            <div className="pt-2">
              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-2 ${
                  isDay ? 'text-slate-700' : 'text-zinc-300'
                }`}
              >
                {t('সামাজিক যোগাযোগ মাধ্যম', 'Connect on Social Platforms')}
              </p>
              <div className="grid grid-cols-8 gap-2 sm:gap-2.5 max-w-fit">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center transition-all duration-200 shrink-0 hover:scale-110 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-rose-500/50 ${
                      isDay
                        ? 'bg-white hover:bg-slate-100 text-slate-700 hover:text-rose-600 border-slate-200/90 shadow-xs'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border-zinc-800/80'
                    }`}
                    title={`${s.platform} (${s.username})`}
                    aria-label={s.platform}
                  >
                    <SocialIcon name={s.icon || s.platform} className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                ))}
              </div>
              <div className="mt-3">
                <a
                  href="#social"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 hover:text-rose-400 transition-colors"
                >
                  <span>{t('সম্পূর্ণ সোশ্যাল হাব দেখুন (১৬টি প্ল্যাটফর্ম)', 'Explore Full Social Hub (16 Platforms)')}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className={`text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {t('কুইক লিংক', 'Quick Links')}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('হোম', 'Home')}</a>
              </li>
              <li>
                <a href="#about" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('পরিচিতি', 'About')}</a>
              </li>
              <li>
                <a href="#services" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('সেবাসমূহ', 'Services')}</a>
              </li>
              <li>
                <a href="#portfolio" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('পোর্টফোলিও', 'Portfolio')}</a>
              </li>
              <li>
                <a href="#experience" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('অভিজ্ঞতা', 'Experience')}</a>
              </li>
              <li>
                <a href="#social" className={`transition-colors font-medium ${isDay ? 'hover:text-rose-600 text-slate-800' : 'hover:text-white text-zinc-300'}`}>{t('সোশ্যাল হাব', 'Social Hub')}</a>
              </li>
              <li>
                <a href="#testimonials" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('ক্লায়েন্ট রিভিউ', 'Testimonials')}</a>
              </li>
              <li>
                <a href="#blog" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('ব্লগ ও আপডেট', 'Blog & Updates')}</a>
              </li>
              <li>
                <a href="#faq" className={`transition-colors ${isDay ? 'hover:text-rose-600 text-slate-700' : 'hover:text-white text-zinc-400'}`}>{t('সাধারণ প্রশ্নোত্তর', 'FAQs')}</a>
              </li>
            </ul>
          </div>

          {/* Our Ventures */}
          <div>
            <h4
              className={`text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {t('আমাদের প্রতিষ্ঠান', 'Our Ventures')}
            </h4>
            <ul className="space-y-3 text-sm">
              {businesses.map((biz) => (
                <li key={biz.id} className="space-y-1">
                  <p
                    className={`font-medium ${
                      isDay ? 'text-slate-900' : 'text-zinc-200'
                    }`}
                  >
                    {language === 'bn' ? biz.companyBn : biz.companyEn}
                  </p>
                  <p
                    className={`text-xs ${
                      isDay ? 'text-slate-500' : 'text-zinc-500'
                    }`}
                  >
                    {t('প্রতিষ্ঠিত', 'Founded')}: {biz.founded}
                  </p>
                  {biz.website && (
                    <a
                      href={biz.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium"
                    >
                      <span>{t('ওয়েবসাইট ভিজিট', 'Visit Website')}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contacts */}
          <div>
            <h4
              className={`text-sm font-bold uppercase tracking-wider mb-4 border-l-2 border-rose-500 pl-2 ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {t('যোগাযোগ তথ্য', 'Contact Information')}
            </h4>
            <div
              className={`space-y-2.5 text-xs ${
                isDay ? 'text-slate-700' : 'text-zinc-300'
              }`}
            >
              <div>
                <span className={`block text-[11px] font-medium ${isDay ? 'text-slate-400' : 'text-zinc-500'}`}>
                  {t('ব্যক্তিগত মোবাইল:', 'Personal Mobile:')}
                </span>
                <a href={`tel:${profile.primaryMobile}`} className="hover:text-rose-600 font-semibold">{profile.primaryMobile}</a>
                <span className="mx-1 opacity-50">,</span>
                <a href={`tel:${profile.alternativeMobile}`} className="hover:text-rose-600">{profile.alternativeMobile}</a>
              </div>
              <div>
                <span className={`block text-[11px] font-medium ${isDay ? 'text-slate-400' : 'text-zinc-500'}`}>
                  {t('অফিস / প্রাতিষ্ঠানিক যোগাযোগ:', 'Business Office:')}
                </span>
                <a href={`tel:${profile.businessMobile}`} className="hover:text-rose-600 font-semibold">{profile.businessMobile}</a>
              </div>
              <div>
                <span className={`block text-[11px] font-medium ${isDay ? 'text-slate-400' : 'text-zinc-500'}`}>
                  {t('ইমেইল:', 'Email:')}
                </span>
                <a href={`mailto:${profile.primaryEmail}`} className="hover:text-rose-600 block">{profile.primaryEmail}</a>
                <a href={`mailto:${profile.businessEmail}`} className={`hover:text-rose-600 block ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>{profile.businessEmail}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div
          className={`pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
            isDay ? 'text-slate-500' : 'text-zinc-500'
          }`}
        >
          <div>
            <p>
              © {currentYear}{' '}
              <span className={`font-semibold ${isDay ? 'text-slate-800' : 'text-zinc-300'}`}>
                মুশফিক রাসেল - Musfiq Russell
              </span>
              . {t('সর্বস্বত্ব সংরক্ষিত।', 'All Rights Reserved.')}
            </p>
            <p className={`text-[11px] mt-0.5 ${isDay ? 'text-slate-400' : 'text-zinc-600'}`}>
              {t('সহযোগী প্রতিষ্ঠান: কুতুবে রাব্বানী আইটি সলিউশন ও কুতুবে রাব্বানী বুষ্টিং এজেন্সি।', 'Affiliated with Qutube Rabbani IT Solution & Qutube Rabbani Boosting Agency.')}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className={isDay ? 'text-slate-400' : 'text-zinc-600'}>musfiqrussell.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
