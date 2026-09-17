import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  Navigation,
  Building,
} from 'lucide-react';

export const Offices: React.FC = () => {
  const { language, t } = useLanguage();
  const { offices } = useData();
  const { isDay } = useTheme();

  return (
    <section
      id="offices"
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
            <MapPin className="w-3.5 h-3.5" />
            <span>{t('অফিস ঠিকানা', 'Office Locations')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'সরাসরি সেবা গ্রহণের ঠিকানা' : 'Our Physical Office Branches'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'নারায়ণগঞ্জ ও ভোলায় অবস্থিত আমাদের স্থায়ী কার্যালয়ে সরাসরি যোগাযোগ করতে পারেন।',
              'Visit our registered physical locations in Narayanganj and Bhola for in-person consultations.'
            )}
          </p>
        </div>

        {/* 2 Offices Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {offices.map((office) => {
            const isHead = office.type === 'head';
            const title = language === 'bn' ? office.titleBn : office.titleEn;
            const company = language === 'bn' ? office.companyBn : office.companyEn;
            const address = language === 'bn' ? office.addressBn : office.addressEn;
            const hours = language === 'bn' ? office.hoursBn : office.hoursEn;

            return (
              <div
                key={office.id}
                className={`p-7 rounded-2xl border transition-all duration-300 shadow-xl flex flex-col justify-between ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-2xl'
                    : 'bg-[#12141a] border-zinc-800/90 hover:border-rose-700/50'
                }`}
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        isHead
                          ? isDay
                            ? 'bg-rose-50 border-rose-200 text-rose-700'
                            : 'bg-rose-950/70 border-rose-800 text-rose-300'
                          : isDay
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {title}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        isDay ? 'text-slate-500' : 'text-zinc-500'
                      }`}
                    >
                      {company}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight mb-3 ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {company}
                  </h3>

                  {/* Physical Address */}
                  <div
                    className={`p-4 rounded-xl border mb-6 flex items-start gap-3 ${
                      isDay
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-zinc-900/80 border-zinc-800/80'
                    }`}
                  >
                    <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span
                        className={`text-[11px] uppercase tracking-wider block font-bold ${
                          isDay ? 'text-slate-400' : 'text-zinc-500'
                        }`}
                      >
                        {t('ঠিকানা', 'Address')}
                      </span>
                      <p
                        className={`text-xs sm:text-sm mt-0.5 leading-relaxed ${
                          isDay ? 'text-slate-800 font-medium' : 'text-zinc-200'
                        }`}
                      >
                        {address}
                      </p>
                    </div>
                  </div>

                  {/* Timings & Contacts */}
                  <div
                    className={`space-y-3 mb-6 text-xs ${
                      isDay ? 'text-slate-700' : 'text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 opacity-60 shrink-0" />
                      <span>
                        <strong className={isDay ? 'text-slate-500' : 'text-zinc-400'}>
                          {t('সেবার সময়:', 'Office Hours:')}
                        </strong>{' '}
                        {hours}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>
                        <strong className={isDay ? 'text-slate-500' : 'text-zinc-400'}>
                          {t('মোবাইল:', 'Phone:')}
                        </strong>{' '}
                        <a
                          href={`tel:${office.phone}`}
                          className={`font-semibold transition-colors ${
                            isDay ? 'text-slate-900 hover:text-rose-600' : 'text-white hover:text-rose-400'
                          }`}
                        >
                          {office.phone}
                        </a>
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 opacity-60 shrink-0" />
                      <span>
                        <strong className={isDay ? 'text-slate-500' : 'text-zinc-400'}>
                          {t('ইমেইল:', 'Email:')}
                        </strong>{' '}
                        <a
                          href={`mailto:${office.email}`}
                          className={`transition-colors ${
                            isDay ? 'text-slate-900 hover:text-rose-600' : 'text-white hover:text-rose-400'
                          }`}
                        >
                          {office.email}
                        </a>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action buttons */}
                <div
                  className={`pt-4 border-t flex flex-wrap items-center gap-3 ${
                    isDay ? 'border-slate-100' : 'border-zinc-800/80'
                  }`}
                >
                  <a
                    href={office.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                      isDay
                        ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
                        : 'bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-500/30 text-emerald-400'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  {office.isMapAvailable && office.googleMapsUrl && (
                    <a
                      href={office.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors shadow-md shadow-rose-900/30"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>{t('গুগল ম্যাপে দেখুন', 'Open Google Maps')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {!office.isMapAvailable && (
                    <span
                      className={`text-[11px] italic py-2 ${
                        isDay ? 'text-slate-500' : 'text-zinc-500'
                      }`}
                    >
                      {t('পাসপোর্ট অফিস সংলগ্ন সোনালী মার্কেট', 'Located at Sonali Market adjacent to Passport Office')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
