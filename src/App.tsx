import React, { useState, useEffect } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { FloatingActions } from './components/layout/FloatingActions';

import { Hero } from './components/sections/Hero';
import { Statistics } from './components/sections/Statistics';
import { About } from './components/sections/About';
import { Services } from './components/sections/Services';
import { Businesses } from './components/sections/Businesses';
import { Portfolio } from './components/sections/Portfolio';
import { Experience } from './components/sections/Experience';
import { Education } from './components/sections/Education';
import { Achievements } from './components/sections/Achievements';
import { Testimonials } from './components/sections/Testimonials';
import { Blog } from './components/sections/Blog';
import { Faq } from './components/sections/Faq';
import { Offices } from './components/sections/Offices';
import { SocialHub } from './components/sections/SocialHub';
import { Contact } from './components/sections/Contact';
import { CallToAction } from './components/sections/CallToAction';
import { AdminPanel } from './components/admin/AdminPanel';
import { StructuredData } from './components/seo/StructuredData';
import { ToastContainer } from './components/ui/ToastContainer';

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hash === '#admin' ||
    window.location.pathname === '/admin' ||
    window.location.pathname.startsWith('/admin/')
  );
}

function MainWebsite() {
  const { isDay } = useTheme();
  const { language } = useLanguage();
  const [isAdminView, setIsAdminView] = useState<boolean>(checkIsAdminRoute);
  const [selectedService, setSelectedService] = useState<string>('Graphic Design');

  useEffect(() => {
    const handleNavigation = () => {
      setIsAdminView(checkIsAdminRoute());
    };
    window.addEventListener('hashchange', handleNavigation);
    window.addEventListener('popstate', handleNavigation);
    return () => {
      window.removeEventListener('hashchange', handleNavigation);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, []);

  const openAdmin = () => {
    window.location.hash = 'admin';
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAdmin = () => {
    if (window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/');
    } else {
      window.location.hash = '';
    }
    setIsAdminView(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
  };

  if (isAdminView) {
    return <AdminPanel onBackToSite={closeAdmin} />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 overflow-x-hidden ${
        isDay ? 'bg-zinc-50 text-zinc-900' : 'bg-zinc-950 text-zinc-100'
      }`}
    >
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header / Navigation */}
      <Navbar onNavigateToAdmin={openAdmin} />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero />

        {/* 4. Statistics Strip */}
        <Statistics />

        {/* 5. About Section */}
        <About />

        {/* 6. Services (3 primary categories + service cards) */}
        <Services onSelectService={handleSelectService} />

        {/* 7. Businesses (Qutube Rabbani IT Solution & Boosting Agency) */}
        <Businesses />

        {/* 8. Featured Portfolio */}
        <Portfolio />

        {/* 9. Experience Timeline */}
        <Experience />

        {/* 10. Education, Certifications & Courses */}
        <Education />

        {/* 11 & 12. Achievements & Notable Clients */}
        <Achievements />

        {/* 13. Verified Client Reviews & Testimonials */}
        <Testimonials />

        {/* 14. Blog & Updates */}
        <Blog />

        {/* 14. FAQ Accordion */}
        <Faq />

        {/* 15. Physical Office Branches */}
        <Offices />

        {/* 16. Premium Animated Social Media Hub */}
        <SocialHub isDay={isDay} language={language} />

        {/* 17. Contact Form & Direct Inquiries */}
        <Contact preselectedService={selectedService} />

        {/* 18. Final Call To Action Banner */}
        <CallToAction />
      </main>

      {/* 18. Footer */}
      <Footer onNavigateToAdmin={openAdmin} />

      {/* Floating Fast Action Controls (WhatsApp, Messenger, Back to Top) */}
      <FloatingActions />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <DataProvider>
          <StructuredData />
          <MainWebsite />
          <ToastContainer />
        </DataProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
