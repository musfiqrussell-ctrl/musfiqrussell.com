import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { PortfolioItem } from '../../types';
import {
  Layers,
  Sparkles,
  ExternalLink,
  Eye,
  X,
  ArrowRight,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

export const Portfolio: React.FC = () => {
  const { language, t } = useLanguage();
  const { portfolios } = useData();
  const { isDay } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const filterCategories = [
    { key: 'All', labelBn: 'সকল প্রজেক্ট', labelEn: 'All Work' },
    { key: 'Advertising', labelBn: 'ডিজিটাল অ্যাডস', labelEn: 'Advertising' },
    { key: 'Graphic Design', labelBn: 'গ্রাফিক্স ডিজাইন', labelEn: 'Graphic Design' },
    { key: 'Branding', labelBn: 'ব্র্যান্ডিং', labelEn: 'Branding' },
    { key: 'Document Consultancy', labelBn: 'ডকুমেন্ট কনসালটেন্সি', labelEn: 'Document Consultancy' },
  ];

  const filteredPortfolios =
    activeFilter === 'All'
      ? portfolios
      : portfolios.filter((p) => p.type === activeFilter);

  return (
    <section
      id="portfolio"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-zinc-100/50' : 'bg-zinc-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{t('কাজের নমুনা', 'Featured Portfolio')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'সফল কাজের পোর্টফোলিও' : 'Featured Client Work'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'ব্র্যান্ড ক্যাম্পেইন, ক্রিয়েটিভ ভিজ্যুয়াল ও কনসালটেন্সির কিছু বাস্তব উদাহরণ।',
              'Real client campaigns, brand creatives, and advertising case studies.'
            )}
          </p>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterCategories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                activeFilter === cat.key
                  ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                  : isDay
                  ? 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-50 border border-slate-200 shadow-xs'
                  : 'bg-zinc-900/90 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((item) => {
            const title = language === 'bn' ? item.titleBn : item.titleEn;
            const role = language === 'bn' ? item.roleBn : item.roleEn;
            const desc = language === 'bn' ? item.descriptionBn : item.descriptionEn;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className={`group cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg hover:-translate-y-1 ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-xl'
                    : 'bg-[#12141a] border-zinc-800/80 hover:border-rose-600/60'
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.portfolio-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null}

                  {/* Fallback Display if image missing or fails */}
                  <div className={`portfolio-fallback ${item.imageUrl ? 'hidden' : 'flex'} flex-col items-center justify-center p-4 text-center select-none`}>
                    <div className="w-12 h-12 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-extrabold text-sm mb-2 shadow-inner">
                      {item.client.substring(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-zinc-300 line-clamp-1">{item.client}</span>
                    <span className="text-[10px] text-zinc-500">{item.type}</span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-rose-300 text-[11px] font-semibold border border-rose-500/30">
                      {item.type}
                    </span>
                  </div>

                  {/* Hover Overlay Icon */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                    <div className="p-3 rounded-full bg-rose-600 text-white shadow-xl">
                      <Eye className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-semibold text-rose-600">{item.client}</span>
                      <span className={isDay ? 'text-slate-500' : 'text-zinc-400'}>{role}</span>
                    </div>

                    <h3
                      className={`text-base font-bold tracking-tight transition-colors ${
                        isDay
                          ? 'text-slate-900 group-hover:text-rose-600'
                          : 'text-white group-hover:text-rose-400'
                      }`}
                    >
                      {title}
                    </h3>

                    {desc && (
                      <p
                        className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                          isDay ? 'text-slate-600' : 'text-zinc-400'
                        }`}
                      >
                        {desc}
                      </p>
                    )}
                  </div>

                  <div
                    className={`pt-4 mt-3 border-t flex items-center justify-between text-xs font-semibold transition-colors ${
                      isDay
                        ? 'border-slate-100 text-slate-500 group-hover:text-slate-900'
                        : 'border-zinc-800/80 text-zinc-400 group-hover:text-white'
                    }`}
                  >
                    <span>{t('বিস্তারিত দেখুন', 'View Details')}</span>
                    <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div
              className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-[#12141a] border-zinc-700 text-white'
              }`}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDay
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-semibold border ${
                    isDay
                      ? 'bg-rose-50 border-rose-200 text-rose-700'
                      : 'bg-rose-950/60 border-rose-800/50 text-rose-300'
                  }`}
                >
                  <span>{selectedProject.type}</span>
                  <span>•</span>
                  <span>{selectedProject.client}</span>
                </div>

                <h3
                  className={`text-2xl font-bold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'bn' ? selectedProject.titleBn : selectedProject.titleEn}
                </h3>

                <div
                  className={`rounded-xl overflow-hidden aspect-video border flex items-center justify-center ${
                    isDay ? 'bg-slate-100 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  {selectedProject.imageUrl ? (
                    <img
                      src={selectedProject.imageUrl}
                      alt={selectedProject.titleEn}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          const fallback = parent.querySelector('.modal-portfolio-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null}
                  <div className={`modal-portfolio-fallback ${selectedProject.imageUrl ? 'hidden' : 'flex'} flex-col items-center justify-center p-6 text-center`}>
                    <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 font-extrabold text-xl mb-2">
                      {selectedProject.client.substring(0, 2).toUpperCase()}
                    </div>
                    <span className={`text-sm font-bold ${isDay ? 'text-slate-800' : 'text-white'}`}>{selectedProject.client}</span>
                    <span className="text-xs text-rose-500">{selectedProject.type}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-2 text-xs">
                  <div
                    className={`p-3 rounded-lg border ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    <span className={isDay ? 'text-slate-500 block' : 'text-zinc-500 block'}>
                      {t('ক্লায়েন্ট:', 'Client:')}
                    </span>
                    <span
                      className={`font-bold mt-0.5 block ${
                        isDay ? 'text-slate-900' : 'text-zinc-200'
                      }`}
                    >
                      {selectedProject.client}
                    </span>
                  </div>
                  <div
                    className={`p-3 rounded-lg border ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900 border-zinc-800'
                    }`}
                  >
                    <span className={isDay ? 'text-slate-500 block' : 'text-zinc-500 block'}>
                      {t('ভূমিকা:', 'Role:')}
                    </span>
                    <span className="font-bold text-rose-600 mt-0.5 block">
                      {language === 'bn' ? selectedProject.roleBn : selectedProject.roleEn}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-sm leading-relaxed ${
                    isDay ? 'text-slate-700' : 'text-zinc-300'
                  }`}
                >
                  <p>
                    {language === 'bn' ? selectedProject.descriptionBn : selectedProject.descriptionEn}
                  </p>
                </div>

                <div
                  className={`pt-4 border-t flex items-center justify-between gap-3 ${
                    isDay ? 'border-slate-200' : 'border-zinc-800'
                  }`}
                >
                  <a
                    href="#contact"
                    onClick={() => setSelectedProject(null)}
                    className="w-full text-center py-3 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-900/30 transition-colors"
                  >
                    {t('অনুরূপ প্রজেক্টের জন্য যোগাযোগ করুন', 'Request Similar Project')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
