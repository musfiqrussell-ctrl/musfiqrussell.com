import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Building2,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Sparkles,
  Share2,
  CheckCircle,
} from 'lucide-react';
import { BusinessItem } from '../../types';

interface BusinessCardProps {
  biz: BusinessItem;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ biz }) => {
  const { language, t } = useLanguage();
  const { isDay } = useTheme();
  const [imgError, setImgError] = useState(false);
  const isIt = biz.id === 'it-solution';

  return (
    <div
      className={`p-7 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${
        isDay
          ? 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-2xl'
          : 'bg-[#12141a] border-zinc-800/90 hover:border-rose-700/50'
      }`}
    >
      <div>
        {/* Top bar with Logo & Founded */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {/* Logo Container */}
            <div
              className={`w-16 h-16 rounded-xl border p-1 flex items-center justify-center overflow-hidden shrink-0 ${
                isDay
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-zinc-900 border-zinc-700/80'
              }`}
            >
              {!imgError ? (
                <img
                  src={biz.logoUrl}
                  alt={biz.companyEn}
                  className="w-full h-full object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div
                  className={`w-full h-full rounded-lg flex items-center justify-center font-black text-sm ${
                    isDay
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-rose-950/60 text-rose-400'
                  }`}
                >
                  {isIt ? 'QR IT' : 'QR BA'}
                </div>
              )}
            </div>

            <div>
              <h3
                className={`text-xl font-bold tracking-tight ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {language === 'bn' ? biz.companyBn : biz.companyEn}
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-600 font-semibold mt-0.5">
                <span>{language === 'bn' ? biz.positionBn : biz.positionEn}</span>
              </div>
            </div>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-lg border text-xs font-semibold shrink-0 ${
              isDay
                ? 'bg-slate-100 border-slate-200 text-slate-700'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            <span>{t('প্রতিষ্ঠিত', 'Est.')} {biz.founded}</span>
          </div>
        </div>

        {/* Description */}
        <p
          className={`text-xs sm:text-sm leading-relaxed mb-6 ${
            isDay ? 'text-slate-700' : 'text-zinc-300'
          }`}
        >
          {language === 'bn' ? biz.descriptionBn : biz.descriptionEn}
        </p>

        {/* Services tags */}
        <div className="mb-6">
          <span
            className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
              isDay ? 'text-slate-400' : 'text-zinc-500'
            }`}
          >
            {t('সেবাসমূহ:', 'Key Offerings:')}
          </span>
          <div className="flex flex-wrap gap-2">
            {biz.services.map((item, idx) => (
              <span
                key={idx}
                className={`px-2.5 py-1 rounded-md border text-[11px] flex items-center gap-1.5 ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-zinc-900/90 border-zinc-800 text-zinc-300'
                }`}
              >
                <CheckCircle className="w-3 h-3 text-rose-500" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Contact & Link Details */}
      <div
        className={`pt-4 border-t space-y-3 ${
          isDay ? 'border-slate-200' : 'border-zinc-800/80'
        }`}
      >
        <div
          className={`flex flex-wrap items-center justify-between gap-3 text-xs ${
            isDay ? 'text-slate-600' : 'text-zinc-400'
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-rose-500" />
            <a
              href={`tel:${biz.phone}`}
              className={`font-medium ${isDay ? 'hover:text-rose-600' : 'hover:text-white'}`}
            >
              {biz.phone}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <a
              href={`mailto:${biz.email}`}
              className={isDay ? 'hover:text-rose-600' : 'hover:text-white'}
            >
              {biz.email}
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          {biz.website && (
            <a
              href={biz.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-lg border text-xs font-semibold transition-colors ${
                isDay
                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white'
                  : 'bg-zinc-900 hover:bg-zinc-800 border-zinc-700 text-white'
              }`}
            >
              <span>{t('অফিশিয়াল ওয়েবসাইট', 'Official Website')}</span>
              <ExternalLink className="w-3.5 h-3.5 text-rose-400" />
            </a>
          )}

          {biz.facebook && (
            <a
              href={biz.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-lg border text-xs font-semibold transition-colors ${
                isDay
                  ? 'bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700'
                  : 'bg-blue-950/40 hover:bg-blue-900/50 border-blue-800/60 text-blue-300'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{t('ফেসবুক পেজ', 'Facebook Page')}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Businesses: React.FC = () => {
  const { language, t } = useLanguage();
  const { businesses } = useData();
  const { isDay } = useTheme();

  return (
    <section
      id="businesses"
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
            <Building2 className="w-3.5 h-3.5" />
            <span>{t('আমাদের প্রতিষ্ঠানসমূহ', 'Our Business Ventures')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'নেতৃত্ব ও সহযোগী প্রতিষ্ঠান' : 'Ventures Under Leadership'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'মুশফিক রাসেলের তত্ত্বাবধানে পরিচালিত দুটি আধুনিক ও নির্ভরযোগ্য সেবা প্রতিষ্ঠান।',
              'Two dynamic client-focused service ventures operating under Musfiq Russell’s leadership.'
            )}
          </p>
        </div>

        {/* 2 Businesses Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {businesses.map((biz) => (
            <BusinessCard key={biz.id} biz={biz} />
          ))}
        </div>
      </div>
    </section>
  );
};
