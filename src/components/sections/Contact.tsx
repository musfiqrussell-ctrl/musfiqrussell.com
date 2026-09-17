import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Mail,
  Phone,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ExternalLink,
  Share2,
  Clock,
  MapPin,
} from 'lucide-react';
import { SiWhatsapp, SiMessenger } from 'react-icons/si';
import { ImoIcon } from './social/SocialIcon';

interface ContactProps {
  preselectedService?: string;
}

export const Contact: React.FC<ContactProps> = ({ preselectedService }) => {
  const { language, t } = useLanguage();
  const { profile, addMessage, socialLinks } = useData();
  const { isDay } = useTheme();

  const imoLink =
    socialLinks.find((s) => (s.icon || s.platform || '').toLowerCase().includes('imo'))?.url ||
    'https://s.imoim.net/Mw73sy';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: preselectedService || 'Graphic Design',
    budget: '৳১৫,০০০ - ৳৫০,০০০',
    message: '',
  });

  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const servicesList = [
    { labelBn: 'গ্রাফিক্স ডিজাইন (Graphic Design)', labelEn: 'Graphic Design' },
    { labelBn: 'ডিজিটাল বিজ্ঞাপন ও বুস্টিং (Digital Advertising)', labelEn: 'Digital Advertising' },
    { labelBn: 'ডকুমেন্ট কনসালটেন্সি (Document Consultancy)', labelEn: 'Document Consultancy' },
    { labelBn: 'ব্র্যান্ডিং ও লোগো ডিজাইন (Branding Suite)', labelEn: 'Branding Suite' },
    { labelBn: 'অন্যান্য জিজ্ঞাসা (General Inquiry)', labelEn: 'General Inquiry' },
  ];

  const budgetList = [
    '৳৫,০০০ - ৳১৫,০০০',
    '৳১৫,০০০ - ৳৫০,০০০',
    '৳৫০,০০০ - ৳১,০০,০০০',
    '৳১,০০,০০০+',
    'আলোচনা সাপেক্ষে (Negotiable)',
  ];

  const convertBengaliDigits = (val: string) => {
    const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return val.replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    const errors: { name?: string; phone?: string; email?: string; message?: string } = {};

    const trimmedName = formData.name.trim();
    const normalizedPhone = convertBengaliDigits(formData.phone).trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || trimmedName.length < 2) {
      errors.name = language === 'bn'
        ? 'অনুগ্রহ করে কমপক্ষে ২ অক্ষরের পূর্ণ নাম লিখুন।'
        : 'Please enter a valid full name (at least 2 characters).';
    }

    // Phone validation: allow digits, spaces, hyphens, plus
    const digitsOnly = normalizedPhone.replace(/[\s\-()]/g, '');
    const isValidBdMobile = /^(\+?880)?1[3-9]\d{8}$/.test(digitsOnly);
    const isValidInternational = /^\+?\d{10,15}$/.test(digitsOnly);

    if (!digitsOnly || (!isValidBdMobile && !isValidInternational)) {
      errors.phone = language === 'bn'
        ? 'অনুগ্রহ করে সঠিক মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX বা +8801XXXXXXXXX)।'
        : 'Please enter a valid phone number (e.g. 017XXXXXXXX or +8801XXXXXXXXX).';
    }

    // Validate email if provided
    if (trimmedEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email = language === 'bn'
          ? 'অনুগ্রহ করে একটি সঠিক ইমেইল অ্যাড্রেস লিখুন।'
          : 'Please enter a valid email address.';
      }
    }

    if (!trimmedMessage || trimmedMessage.length < 5) {
      errors.message = language === 'bn'
        ? 'অনুগ্রহ করে বার্তার বিবরণ একটু বিস্তারিত লিখুন (কমপক্ষে ৫ অক্ষর)।'
        : 'Please provide a little more detail in your message (at least 5 characters).';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage(
        language === 'bn'
          ? 'অনুগ্রহ করে নিচের চিহ্নিত ত্রুটিগুলো সংশোধন করুন।'
          : 'Please correct the highlighted fields below.'
      );
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    // Simulate reliable dispatch & persistent storage into messages state
    setTimeout(() => {
      addMessage({
        name: trimmedName,
        phone: normalizedPhone,
        email: trimmedEmail,
        service: formData.service,
        budget: formData.budget,
        message: trimmedMessage,
      });

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Graphic Design',
        budget: '৳১৫,০০০ - ৳৫০,০০০',
        message: '',
      });
    }, 600);
  };

  return (
    <section
      id="contact"
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
            <Mail className="w-3.5 h-3.5" />
            <span>{t('যোগাযোগ ও কোটেশন', 'Contact & Free Consultation')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'আপনার প্রজেক্ট নিয়ে কথা বলুন' : "Let's Build Your Project"}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'নতুন কাজ, বিজ্ঞাপনী প্রচারণা কিংবা ডকুমেন্ট সেবার জন্য সরাসরি যোগাযোগ করুন।',
              'Send your project details or reach out through direct phone and messaging channels.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Direct Contact Details & Social Links */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-7 rounded-2xl border shadow-xl space-y-6 ${
                isDay
                  ? 'bg-white border-slate-200'
                  : 'bg-[#12141a] border-zinc-800/90'
              }`}
            >
              <div>
                <h3
                  className={`text-xl font-bold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {t('সরাসরি যোগাযোগ', 'Direct Contacts')}
                </h3>
                <p className={`text-xs mt-1 ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                  {t('দ্রুত রেসপন্সের জন্য কল বা WhatsApp করতে পারেন।', 'Call or message for swift assistance.')}
                </p>
              </div>

              {/* Personal Phones */}
              <div className="space-y-4 text-xs">
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDay
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-zinc-900/80 border-zinc-800/80'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isDay
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-zinc-800 text-rose-500'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className={`text-[11px] uppercase tracking-wider font-bold block ${
                        isDay ? 'text-slate-400' : 'text-zinc-500'
                      }`}
                    >
                      {t('ব্যক্তিগত মোবাইল (Personal)', 'Personal Mobile')}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <a
                        href={`tel:${profile.primaryMobile}`}
                        className={`text-sm font-bold transition-colors ${
                          isDay ? 'text-slate-900 hover:text-rose-600' : 'text-white hover:text-rose-400'
                        }`}
                      >
                        {profile.primaryMobile}
                      </a>
                      <span className={isDay ? 'text-slate-300' : 'text-zinc-600'}>/</span>
                      <a
                        href={`tel:${profile.alternativeMobile}`}
                        className={`text-sm font-semibold transition-colors ${
                          isDay ? 'text-slate-700 hover:text-rose-600' : 'text-zinc-300 hover:text-rose-400'
                        }`}
                      >
                        {profile.alternativeMobile}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Business Office Phone */}
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDay
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-zinc-900/80 border-zinc-800/80'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isDay
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-zinc-800 text-rose-500'
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className={`text-[11px] uppercase tracking-wider font-bold block ${
                        isDay ? 'text-slate-400' : 'text-zinc-500'
                      }`}
                    >
                      {t('অফিস ও প্রতিষ্ঠান (Business)', 'Business Office Phone')}
                    </span>
                    <a
                      href={`tel:${profile.businessMobile}`}
                      className={`text-sm font-bold block mt-1 transition-colors ${
                        isDay ? 'text-slate-900 hover:text-rose-600' : 'text-white hover:text-rose-400'
                      }`}
                    >
                      {profile.businessMobile}
                    </a>
                    <span className={isDay ? 'text-[10px] text-slate-500' : 'text-[10px] text-zinc-500'}>
                      {t('কুতুবে রাব্বানী আইটি ও বুষ্টিং এজেন্সি', 'Qutube Rabbani IT & Boosting Agency')}
                    </span>
                  </div>
                </div>

                {/* Email Addresses */}
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 ${
                    isDay
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-zinc-900/80 border-zinc-800/80'
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg shrink-0 ${
                      isDay
                        ? 'bg-rose-50 text-rose-600'
                        : 'bg-zinc-800 text-rose-500'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className={`text-[11px] uppercase tracking-wider font-bold block ${
                        isDay ? 'text-slate-400' : 'text-zinc-500'
                      }`}
                    >
                      {t('ইমেইল অ্যাড্রেস', 'Email Inquiries')}
                    </span>
                    <a
                      href={`mailto:${profile.primaryEmail}`}
                      className={`text-xs font-semibold block mt-1 transition-colors ${
                        isDay ? 'text-slate-900 hover:text-rose-600' : 'text-white hover:text-rose-400'
                      }`}
                    >
                      {profile.primaryEmail}
                    </a>
                    <a
                      href={`mailto:${profile.businessEmail}`}
                      className={`text-xs block mt-0.5 transition-colors ${
                        isDay ? 'text-slate-500 hover:text-rose-600' : 'text-zinc-400 hover:text-rose-400'
                      }`}
                    >
                      {profile.businessEmail}
                    </a>
                  </div>
                </div>
              </div>

              {/* Instant Chat Buttons (WhatsApp, Messenger, IMO) */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 pt-2">
                <a
                  href={profile.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-2 sm:px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                >
                  <SiWhatsapp className="w-4 h-4 shrink-0" />
                  <span className="truncate">WhatsApp</span>
                </a>

                <a
                  href={profile.messengerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-3 px-2 sm:px-3 rounded-xl bg-[#0084FF] hover:bg-[#0073e6] text-white text-xs font-bold shadow-lg shadow-sky-950/40 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                >
                  <SiMessenger className="w-4 h-4 shrink-0" />
                  <span className="truncate">Messenger</span>
                </a>

                {imoLink && (
                  <a
                    href={imoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3 px-2 sm:px-3 rounded-xl bg-[#00AAFF] hover:bg-[#0095e0] text-white text-xs font-bold shadow-lg shadow-sky-950/40 transition-all hover:scale-[1.02] hover:-translate-y-0.5"
                  >
                    <ImoIcon className="w-4 h-4 shrink-0 text-white" />
                    <span className="truncate">IMO Chat</span>
                  </a>
                )}
              </div>

              {/* Social Media Hub Callout */}
              <div
                className={`pt-4 border-t ${
                  isDay ? 'border-slate-100' : 'border-zinc-800/80'
                }`}
              >
                <div
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    isDay
                      ? 'bg-slate-50 border-slate-200'
                      : 'bg-zinc-900/90 border-zinc-800'
                  }`}
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">
                      {t('১৬টি অফিশিয়াল প্ল্যাটফর্ম', '16 Official Channels')}
                    </span>
                    <p className={`text-xs font-semibold truncate mt-0.5 ${isDay ? 'text-slate-800' : 'text-zinc-200'}`}>
                      {t('সোশ্যাল মিডিয়া হাব ভিজিট করুন', 'Visit Animated Social Hub')}
                    </p>
                  </div>
                  <a
                    href="#social"
                    className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>{t('হাব দেখুন', 'Explore')}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div
              className={`p-7 sm:p-9 rounded-2xl border shadow-2xl ${
                isDay
                  ? 'bg-white border-slate-200'
                  : 'bg-[#12141a] border-zinc-800/90'
              }`}
            >
              <h3
                className={`text-xl font-bold tracking-tight mb-2 ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {t('বার্তা পাঠান / প্রজেক্ট ব্রিফ দিন', 'Send a Project Brief')}
              </h3>
              <p className={`text-xs mb-6 ${isDay ? 'text-slate-500' : 'text-zinc-400'}`}>
                {t(
                  'ফর্মটি পূরণ করে আপনার চাহিদার কথা জানান, দ্রুততম সময়ে আপনার সাথে যোগাযোগ করা হবে।',
                  'Fill out the form with your project requirements. We will review and respond promptly.'
                )}
              </p>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-3 animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-emerald-900 dark:text-white text-sm">
                      {t('আপনার বার্তাটি সফলভাবে গ্রহণ করা হয়েছে!', 'Your message has been sent successfully!')}
                    </h4>
                    <p className="mt-1 text-emerald-800 dark:text-emerald-200">
                      {t(
                        'ধন্যবাদ! মুশফিক রাসেল বা কুতুবে রাব্বানী টিম শীঘ্রই আপনার সাথে মোবাইল অথবা ইমেইলে যোগাযোগ করবে।',
                        'Thank you! Musfiq Russell or the support team will follow up via phone or email shortly.'
                      )}
                    </p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDay ? 'text-slate-700' : 'text-zinc-300'
                      }`}
                    >
                      {t('আপনার নাম', 'Full Name')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder={language === 'bn' ? 'যেমন: আরিফুল ইসলাম' : 'e.g. John Doe'}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                        fieldErrors.name
                          ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-500/5'
                          : isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p id="contact-name-error" role="alert" className="text-rose-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDay ? 'text-slate-700' : 'text-zinc-300'
                      }`}
                    >
                      {t('মোবাইল নম্বর', 'Phone Number')} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      required
                      aria-required="true"
                      aria-invalid={!!fieldErrors.phone}
                      aria-describedby={fieldErrors.phone ? 'contact-phone-error' : undefined}
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (fieldErrors.phone) setFieldErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="01XXXXXXXXX"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                        fieldErrors.phone
                          ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-500/5'
                          : isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p id="contact-phone-error" role="alert" className="text-rose-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDay ? 'text-slate-700' : 'text-zinc-300'
                      }`}
                    >
                      {t('ইমেইল অ্যাড্রেস', 'Email Address')}
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                        fieldErrors.email
                          ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-500/5'
                          : isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="contact-email-error" role="alert" className="text-rose-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className={`block text-xs font-semibold mb-1.5 ${
                        isDay ? 'text-slate-700' : 'text-zinc-300'
                      }`}
                    >
                      {t('কাঙ্ক্ষিত সেবা নির্বাচন করুন', 'Select Service')}
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors ${
                        isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900'
                          : 'bg-zinc-900 border-zinc-800 text-white'
                      }`}
                    >
                      {servicesList.map((s, i) => (
                        <option key={i} value={s.labelEn}>
                          {language === 'bn' ? s.labelBn : s.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-budget"
                    className={`block text-xs font-semibold mb-1.5 ${
                      isDay ? 'text-slate-700' : 'text-zinc-300'
                    }`}
                  >
                    {t('বাজেট পরিসীমা (Budget Range)', 'Estimated Budget')}
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border text-xs focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-colors ${
                      isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-900'
                        : 'bg-zinc-900 border-zinc-800 text-white'
                    }`}
                  >
                    {budgetList.map((b, i) => (
                      <option key={i} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className={`block text-xs font-semibold mb-1.5 ${
                      isDay ? 'text-slate-700' : 'text-zinc-300'
                    }`}
                  >
                    {t('প্রজেক্টের বিবরণ / বার্তা', 'Project Message & Requirements')}{' '}
                    <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder={
                      language === 'bn'
                        ? 'আপনার প্রতিষ্ঠানের নাম, কী ধরণের ডিজাইন বা অ্যাড ক্যাম্পেইন চান এবং সময়সীমা উল্লেখ করুন...'
                        : 'Describe your brand goals, target timeline, design expectations or ad requirements...'
                    }
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition-colors resize-none ${
                      fieldErrors.message
                        ? 'border-rose-500 ring-1 ring-rose-500 bg-rose-500/5'
                        : isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="contact-message-error" role="alert" className="text-rose-500 text-[11px] mt-1 font-medium flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" />
                      <span>{fieldErrors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-rose-950/50 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  id="contact-submit-btn"
                >
                  {isSubmitting ? (
                    <span>{t('পাঠানো হচ্ছে...', 'Sending...')}</span>
                  ) : (
                    <>
                      <span>{t('বার্তা পাঠান (Send Inquiry)', 'Submit Project Brief')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
