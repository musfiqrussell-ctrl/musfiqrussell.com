import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Menu,
  X,
  Globe,
  ArrowRight,
  Briefcase,
  Layers,
  Sun,
  Moon,
  Phone,
  Home,
  User,
  Building2,
  Award,
  GraduationCap,
  Trophy,
  BookOpen,
  HelpCircle,
  MapPin,
  Share2,
  Mail,
  ChevronRight,
  ChevronDown,
  MessageCircle,
  MessageSquareQuote,
} from 'lucide-react';

interface NavbarProps {
  onOpenContactModal?: () => void;
  onNavigateToAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContactModal, onNavigateToAdmin }) => {
  const { language, toggleLanguage, t } = useLanguage();
  const { profile } = useData();
  const { theme, isDay, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScrollActive = () => {
      const scrollPos = window.scrollY + 140;
      const ids = [
        'contact',
        'social',
        'faq',
        'testimonials',
        'achievements',
        'education',
        'offices',
        'blog',
        'experience',
        'portfolio',
        'businesses',
        'services',
        'about',
        'home',
      ];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScrollActive, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollActive);
  }, []);

  // Close desktop dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('#nav-more-dropdown-container')) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setMoreDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Primary links shown directly on desktop navbar
  const primaryNavLinks = [
    { href: '#about', labelBn: 'পরিচিতি', labelEn: 'About', icon: User },
    { href: '#services', labelBn: 'সেবাসমূহ', labelEn: 'Services', icon: Briefcase },
    { href: '#businesses', labelBn: 'প্রতিষ্ঠান', labelEn: 'Ventures', icon: Building2 },
    { href: '#portfolio', labelBn: 'পোর্টফোলিও', labelEn: 'Portfolio', icon: Layers },
    { href: '#experience', labelBn: 'অভিজ্ঞতা', labelEn: 'Experience', icon: Award },
    { href: '#blog', labelBn: 'ব্লগ', labelEn: 'Blog', icon: BookOpen },
    { href: '#offices', labelBn: 'অফিস', labelEn: 'Offices', icon: MapPin },
  ];

  // Secondary links placed in sleek "More" dropdown on desktop
  const dropdownNavLinks = [
    { href: '#education', labelBn: 'শিক্ষা ও দক্ষতা', labelEn: 'Credentials', icon: GraduationCap },
    { href: '#achievements', labelBn: 'অর্জন ও ক্লায়েন্ট', labelEn: 'Honors & Clients', icon: Trophy },
    { href: '#testimonials', labelBn: 'ক্লায়েন্ট মতামত', labelEn: 'Testimonials', icon: MessageSquareQuote },
    { href: '#faq', labelBn: 'সাধারণ প্রশ্নোত্তর', labelEn: 'FAQ', icon: HelpCircle },
    { href: '#social', labelBn: 'সোশ্যাল মিডিয়া হাব', labelEn: 'Social Hub', icon: Share2 },
  ];

  // Full array for mobile slide-in drawer
  const navLinks = [
    { href: '#home', labelBn: 'হোম', labelEn: 'Home', icon: Home },
    ...primaryNavLinks,
    ...dropdownNavLinks,
    { href: '#contact', labelBn: 'যোগাযোগ', labelEn: 'Contact', icon: Mail },
  ];

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-xl ${
        scrolled
          ? isDay
            ? 'bg-white/95 border-b border-zinc-200/90 shadow-sm py-2.5'
            : 'bg-zinc-950/95 border-b border-zinc-800/80 shadow-lg shadow-black/40 py-2.5'
          : isDay
          ? 'bg-white/80 border-b border-zinc-200/60 shadow-xs py-3.5'
          : 'bg-zinc-950/80 border-b border-zinc-800/60 shadow-lg py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#home"
          onClick={(e) => handleScrollTo(e, '#home')}
          className="flex items-center gap-3 group focus:outline-none"
          id="nav-brand-logo"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white font-bold shadow-lg shadow-rose-900/30 group-hover:scale-105 transition-transform duration-300 border border-rose-400/30 p-0.5 overflow-hidden shrink-0">
            <img
              src="/assets/profile.png"
              alt="মুশফিক রাসেল - Musfiq Russell"
              className="w-full h-full object-cover object-top rounded-full"
              loading="eager"
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
            <div
              className={`text-base sm:text-lg font-bold tracking-tight flex items-center gap-1.5 transition-colors whitespace-nowrap ${
                isDay ? 'text-zinc-900' : 'text-white'
              }`}
            >
              <span>মুশফিক রাসেল - Musfiq Russell</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block"></span>
            </div>
            <p
              className={`text-[11px] font-medium line-clamp-1 transition-colors ${
                isDay ? 'text-zinc-500' : 'text-zinc-400'
              }`}
            >
              {language === 'bn' ? 'গ্রাফিক্স ও বিজ্ঞাপন বিশেষজ্ঞ' : 'Creative & Ad Specialist'}
            </p>
          </div>
        </a>

        {/* Desktop Navigation Links (Responsive on lg & xl screens: 1024px+) */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1" aria-label="Main Navigation">
          {primaryNavLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? isDay
                      ? 'bg-rose-50 text-rose-600 font-bold shadow-xs'
                      : 'bg-rose-500/15 text-rose-400 font-bold border border-rose-500/30'
                    : isDay
                    ? 'text-zinc-700 hover:text-rose-600 hover:bg-zinc-100'
                    : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                }`}
              >
                {language === 'bn' ? link.labelBn : link.labelEn}
                {isActive && (
                  <motion.span
                    layoutId="activeNavUnderline"
                    className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-rose-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* More Dropdown */}
          <div className="relative" id="nav-more-dropdown-container">
            {(() => {
              const isDropdownActive = dropdownNavLinks.some((l) => l.href === activeSection);
              return (
                <button
                  type="button"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  className={`relative px-2.5 xl:px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1 cursor-pointer ${
                    isDropdownActive
                      ? isDay
                        ? 'bg-rose-50 text-rose-600 font-bold shadow-xs'
                        : 'bg-rose-500/15 text-rose-400 font-bold border border-rose-500/30'
                      : isDay
                      ? 'text-zinc-700 hover:text-rose-600 hover:bg-zinc-100'
                      : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                  } ${moreDropdownOpen ? (isDay ? 'bg-zinc-100 text-rose-600' : 'bg-zinc-800 text-rose-400') : ''}`}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>{t('আরও', 'More')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
                  {isDropdownActive && (
                    <motion.span
                      layoutId="activeNavUnderline"
                      className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-rose-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })()}

            <AnimatePresence>
              {moreDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className={`absolute right-0 mt-2 w-52 rounded-xl border shadow-xl py-1.5 z-50 backdrop-blur-xl ${
                    isDay
                      ? 'bg-white/95 border-zinc-200 text-zinc-800 shadow-zinc-900/10'
                      : 'bg-zinc-900/95 border-zinc-800 text-zinc-100 shadow-black/60'
                  }`}
                >
                  {dropdownNavLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link.href)}
                        className={`flex items-center gap-2.5 px-3.5 py-2 text-xs font-medium whitespace-nowrap transition-colors ${
                          isActive
                            ? isDay
                              ? 'bg-rose-50 text-rose-600 font-bold'
                              : 'bg-rose-500/20 text-rose-400 font-bold'
                            : isDay
                            ? 'hover:bg-rose-50 hover:text-rose-600 text-zinc-700'
                            : 'hover:bg-zinc-800/80 hover:text-rose-400 text-zinc-300'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-rose-500' : 'text-rose-500/80'}`} />
                        <span>{language === 'bn' ? link.labelBn : link.labelEn}</span>
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right CTAs and Actions for Desktop (lg+) */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Day / Night Theme Toggle */}
          <button
            id="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDay ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              isDay
                ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60'
            }`}
            title={isDay ? t('নাইট মোড অন করুন', 'Switch to Night Mode') : t('ডে মোড অন করুন', 'Switch to Day Mode')}
          >
            {isDay ? (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-600" />
                <span>{t('নাইট', 'Night')}</span>
              </>
            ) : (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('ডে', 'Day')}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            id="lang-toggle-btn"
            onClick={toggleLanguage}
            aria-label="Switch Language"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              isDay
                ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                : 'bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 border border-zinc-700/60'
            }`}
            title="Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Secondary CTA: Portfolio */}
          <a
            href="#portfolio"
            onClick={(e) => handleScrollTo(e, '#portfolio')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              isDay
                ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300'
                : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 border border-zinc-700/50'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-rose-500" />
            <span>{t('পোর্টফোলিও', 'Portfolio')}</span>
          </a>

          {/* Primary CTA: Contact for Work */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-md shadow-rose-900/40 hover:shadow-rose-900/60 transition-all duration-200"
            id="nav-primary-cta"
          >
            <span>{t('যোগাযোগ', 'Hire Me')}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile & Tablet Navigation Controls (< lg: 1024px) */}
        <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
          {/* Quick Hire Me on Tablet / Mobile */}
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, '#contact')}
            className="hidden sm:inline-flex items-center justify-center gap-1 px-3 py-2 min-h-[44px] rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 shadow-sm transition-all"
          >
            <span>{t('যোগাযোগ', 'Hire Me')}</span>
          </a>

          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={isDay ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isDay
                ? 'bg-zinc-100 text-zinc-800 border border-zinc-300'
                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
            }`}
          >
            {isDay ? <Moon className="w-4 h-4 text-indigo-600" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Mobile Language Button */}
          <button
            onClick={toggleLanguage}
            aria-label="Toggle Language"
            className={`flex items-center justify-center gap-1 px-2.5 py-2 min-h-[44px] rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              isDay
                ? 'bg-zinc-100 text-zinc-800 border border-zinc-300'
                : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'bn' ? 'EN' : 'বাংলা'}</span>
          </button>

          {/* Mobile Menu Hamburger Toggle Button */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg transition-colors cursor-pointer ${
              isDay ? 'text-zinc-800 hover:bg-zinc-100' : 'text-zinc-300 hover:text-white hover:bg-zinc-800'
            }`}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-rose-500" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Mobile & Tablet Navigation Modal / Drawer */}
      {/* Position: fixed; inset: 0; z-index: 9999 ensures no parent container clipping */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div
            id="mobile-nav-modal-root"
            className="fixed inset-0 z-[9999] flex justify-end overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            {/* Backdrop: Full viewport coverage with smooth blur and dismiss tap */}
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed inset-0 w-screen h-screen bg-black/70 backdrop-blur-sm cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Drawer with Full Available Viewport Height (h-full / h-screen) */}
            <motion.aside
              key="mobile-nav-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              id="mobile-navigation-drawer"
              aria-label="Mobile Navigation Drawer"
              className={`relative z-10 w-full sm:w-[390px] max-w-full sm:max-w-md h-full h-screen max-h-screen flex flex-col shadow-2xl border-l backdrop-blur-2xl ${
                isDay
                  ? 'bg-white/98 border-zinc-200 text-zinc-900 shadow-zinc-900/20'
                  : 'bg-zinc-950/98 border-zinc-800 text-zinc-100 shadow-black/80'
              }`}
            >
              {/* Sticky Drawer Header */}
              <div
                className={`p-4 sm:p-5 flex items-center justify-between border-b shrink-0 sticky top-0 z-20 backdrop-blur-xl ${
                  isDay ? 'border-zinc-200/90 bg-white/95' : 'border-zinc-800/80 bg-zinc-950/95'
                }`}
              >
                <a
                  href="#home"
                  onClick={(e) => handleScrollTo(e, '#home')}
                  className="flex items-center gap-3 group focus:outline-none active:scale-[0.98] transition-transform"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white font-bold shadow-md text-sm border border-rose-400/30 p-0.5 overflow-hidden shrink-0">
                    <img
                      src="/assets/profile.png"
                      alt="মুশফিক রাসেল - Musfiq Russell"
                      className="w-full h-full object-cover object-top rounded-full"
                      loading="lazy"
                      width={36}
                      height={36}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.parentElement?.querySelector('.fallback-badge') as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <span className="fallback-badge hidden text-xs font-bold">MR</span>
                  </div>
                  <div className="leading-tight">
                    <span className="font-bold text-sm block tracking-tight">
                      মুশফিক রাসেল - Musfiq Russell
                    </span>
                    <span
                      className={`text-[11px] block font-medium ${
                        isDay ? 'text-zinc-500' : 'text-zinc-400'
                      }`}
                    >
                      {t('মেনু ও ন্যাভিগেশন', 'Navigation Menu')}
                    </span>
                  </div>
                </a>

                {/* Close Button ('X' icon) */}
                <button
                  type="button"
                  id="mobile-drawer-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    isDay
                      ? 'text-zinc-600 hover:text-zinc-950 bg-zinc-100 hover:bg-zinc-200 border-zinc-200'
                      : 'text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border-zinc-800'
                  }`}
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Full Height Scrollable Navigation Content (overflow-y-auto) */}
              <div
                className="flex-1 h-full overflow-y-auto overscroll-contain px-4 py-4 space-y-4 pb-28 scroll-smooth scrollbar-thin"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                {/* Quick Preferences Bar (Theme & Language) */}
                <div
                  className={`p-1.5 rounded-xl border flex items-center justify-between text-xs ${
                    isDay ? 'border-zinc-200 bg-zinc-50/80' : 'border-zinc-800/80 bg-zinc-900/60'
                  }`}
                >
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-semibold transition-all active:scale-[0.98] cursor-pointer ${
                      isDay
                        ? 'bg-white text-zinc-800 border border-zinc-200 shadow-xs'
                        : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    {isDay ? (
                      <>
                        <Moon className="w-3.5 h-3.5 text-indigo-600" />
                        <span>{t('নাইট মোড', 'Night Mode')}</span>
                      </>
                    ) : (
                      <>
                        <Sun className="w-3.5 h-3.5 text-amber-400" />
                        <span>{t('ডে মোড', 'Day Mode')}</span>
                      </>
                    )}
                  </button>

                  <div className="w-px h-6 bg-zinc-700/40 mx-1.5" />

                  <button
                    type="button"
                    onClick={toggleLanguage}
                    className={`flex-1 min-h-[44px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-lg font-semibold transition-all active:scale-[0.98] cursor-pointer ${
                      isDay
                        ? 'bg-white text-zinc-800 border border-zinc-200 shadow-xs'
                        : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5 text-rose-500" />
                    <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
                  </button>
                </div>

                {/* Section Header */}
                <div className="flex items-center justify-between px-1 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                      {t('ন্যাভিগেশন লিংকসমূহ', 'Navigation Links')}
                    </span>
                  </div>
                  <span className={`text-[10px] font-medium ${isDay ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {navLinks.length} {t('টি সেকশন', 'Sections')}
                  </span>
                </div>

                {/* Navigation Links List */}
                <nav className="space-y-1" aria-label="Mobile Navigation Links">
                  {navLinks.map((link, index) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.02 + index * 0.015, duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <a
                          href={link.href}
                          onClick={(e) => handleScrollTo(e, link.href)}
                          className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between group transition-all active:scale-[0.98] ${
                            isActive
                              ? isDay
                                ? 'bg-rose-50 text-rose-600 border border-rose-200/80 shadow-xs'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/25 shadow-xs'
                              : isDay
                              ? 'text-zinc-700 hover:text-rose-600 hover:bg-zinc-100/90 border border-transparent'
                              : 'text-zinc-300 hover:text-white hover:bg-zinc-900/90 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {/* Active Indicator Bar / Dot */}
                            {isActive ? (
                              <span className="w-1 h-4 rounded-full bg-gradient-to-b from-rose-500 to-red-600 shrink-0 shadow-xs shadow-rose-500/50" />
                            ) : (
                              <span className="w-1 h-4 rounded-full bg-transparent shrink-0" />
                            )}

                            {/* Icon Container */}
                            <span
                              className={`p-1.5 rounded-lg border transition-all ${
                                isActive
                                  ? 'bg-rose-600 text-white border-rose-500 shadow-xs'
                                  : isDay
                                  ? 'bg-zinc-100 group-hover:bg-rose-50 text-zinc-600 group-hover:text-rose-600 border-zinc-200 group-hover:border-rose-200'
                                  : 'bg-zinc-900 group-hover:bg-rose-950/40 text-zinc-400 group-hover:text-rose-400 border-zinc-800 group-hover:border-rose-800/40'
                              }`}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </span>

                            <span className={isActive ? 'font-bold' : 'font-medium'}>
                              {language === 'bn' ? link.labelBn : link.labelEn}
                            </span>
                          </div>

                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-all ${
                              isActive
                                ? 'text-rose-500 translate-x-0.5 opacity-100'
                                : 'text-zinc-500 opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:text-rose-500'
                            }`}
                          />
                        </a>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* Footer CTAs inside drawer */}
                <div className={`border-t pt-3.5 space-y-2.5 ${isDay ? 'border-zinc-200' : 'border-zinc-800/80'}`}>
                  {/* Primary Contact Button */}
                  <a
                    href="#contact"
                    onClick={(e) => handleScrollTo(e, '#contact')}
                    className="w-full text-center py-3 min-h-[44px] rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 via-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 shadow-lg shadow-rose-900/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    <span>{t('কাজের জন্য যোগাযোগ করুন', 'Hire Me / Request Service')}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Direct Mobile & WhatsApp Call */}
                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${profile.primaryMobile}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2.5 px-2.5 min-h-[44px] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all active:scale-[0.98] ${
                        isDay
                          ? 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">{t('কল করুন', 'Call')}</span>
                    </a>

                    <a
                      href={profile.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`py-2.5 px-2.5 min-h-[44px] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all active:scale-[0.98] ${
                        isDay
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-emerald-950/40 border-emerald-800 text-emerald-400 hover:bg-emerald-900/60'
                      }`}
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="truncate">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
