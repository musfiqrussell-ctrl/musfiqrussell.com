import React from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Palette,
  Megaphone,
  FileCheck,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { language, t } = useLanguage();
  const { services } = useData();
  const { isDay } = useTheme();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Palette':
        return Palette;
      case 'Megaphone':
        return Megaphone;
      case 'FileCheck':
      default:
        return FileCheck;
    }
  };

  const handleRequestService = (serviceTitle: string) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    const contactElem = document.querySelector('#contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-zinc-100/60' : 'bg-zinc-950'
      }`}
    >
      {/* Background radial accent */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[150px] pointer-events-none -z-10 ${
          isDay ? 'bg-rose-500/10' : 'bg-rose-600/5'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('মূল সেবাসমূহ', 'Core Services')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'আমার বিশেষায়িত সেবাসমূহ' : 'Specialized Services'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'গ্রাফিক্স ডিজাইন, টার্গেটেড বিজ্ঞাপন এবং ডকুমেন্ট কনসালটেন্সির সম্পূর্ণ পেশাদার সমাধান।',
              'Comprehensive solutions across graphic design, precision advertising, and document consultancy.'
            )}
          </p>
        </motion.div>

        {/* Staggered Entrance Container for Services Grid */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.14,
                delayChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {services.map((srv, idx) => {
            const IconComponent = getIcon(srv.iconName);
            const items = language === 'bn' ? srv.itemsBn : srv.itemsEn;
            const title = language === 'bn' ? srv.titleBn : srv.titleEn;

            return (
              <motion.div
                key={srv.id}
                variants={{
                  hidden: { opacity: 0, y: 32 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl border transition-all duration-300 ease-out shadow-xl group hover:-translate-y-2 ${
                  idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                } ${
                  isDay
                    ? 'bg-white border-zinc-200/90 hover:border-rose-500/50 hover:shadow-[0_10px_30px_-10px_rgba(244,63,94,0.25)]'
                    : 'bg-zinc-900 border-zinc-800/90 hover:border-rose-500/50 hover:shadow-[0_10px_30px_-10px_rgba(244,63,94,0.25)]'
                }`}
              >
                <div>
                  {/* Category Icon Container - Direct clean start without serial labels */}
                  <div className="flex items-center mb-5">
                    <div
                      className={`p-3.5 rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-1 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.35)] ${
                        isDay
                          ? 'bg-rose-50 text-rose-600 border-rose-100 group-hover:bg-rose-600 group-hover:text-white'
                          : 'bg-zinc-900 text-rose-500 border-zinc-800 group-hover:bg-rose-600 group-hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 transition-transform duration-300" />
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight mb-2.5 ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {title}
                  </h3>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-6 ${
                      isDay ? 'text-slate-600' : 'text-zinc-400'
                    }`}
                  >
                    {language === 'bn' ? srv.descriptionBn : srv.descriptionEn}
                  </p>

                  {/* Checklist of Included Services */}
                  <div className="space-y-2.5 mb-8">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block mb-2 ${
                        isDay ? 'text-slate-400' : 'text-zinc-500'
                      }`}
                    >
                      {t('অন্তর্ভুক্ত সেবাসমূহ:', 'Included Services:')}
                    </span>
                    {items.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2.5 text-xs ${
                          isDay ? 'text-slate-700' : 'text-zinc-300'
                        }`}
                      >
                        <CheckCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mandatory CTA button on every card */}
                <button
                  type="button"
                  onClick={() => handleRequestService(title)}
                  className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 min-h-[44px] rounded-xl text-xs font-bold transition-all duration-200 shadow-md ${
                    isDay
                      ? 'bg-slate-900 text-white hover:bg-rose-600 shadow-slate-900/10'
                      : 'bg-zinc-900 hover:bg-rose-600 text-white border border-zinc-700/80 hover:border-rose-500'
                  }`}
                >
                  <span>{t('সেবা নিতে যোগাযোগ করুন', 'Request Service')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-rose-400 group-hover:text-white group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
