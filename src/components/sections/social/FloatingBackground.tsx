import React, { useEffect, useState } from 'react';
import {
  SiFacebook,
  SiInstagram,
  SiWhatsapp,
  SiYoutube,
  SiBehance,
} from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa6';
import { ImoIcon } from './SocialIcon';

interface FloatingBackgroundProps {
  isDay: boolean;
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ isDay }) => {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPrefersReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
  }, []);

  if (prefersReduced) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden="true">
      {/* Soft Ambient Radial Gradient Orbs */}
      <div
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 transition-opacity duration-700 ${
          isDay ? 'bg-rose-200' : 'bg-rose-950/40'
        }`}
      />
      <div
        className={`absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-3xl opacity-15 transition-opacity duration-700 ${
          isDay ? 'bg-blue-200' : 'bg-red-950/30'
        }`}
      />
      <div
        className={`absolute -bottom-24 left-1/3 w-80 h-80 rounded-full blur-3xl opacity-10 transition-opacity duration-700 ${
          isDay ? 'bg-amber-100' : 'bg-zinc-800'
        }`}
      />

      {/* Subtle Floating Ambient Platform Logos (Desktop Only, Opacity 4-6%) */}
      <div className="hidden lg:block">
        {/* Floating Brand Mark 1: Facebook */}
        <div
          className="absolute top-16 left-[5%] opacity-[0.04] dark:opacity-[0.06] text-[#1877F2] animate-bounce"
          style={{ animationDuration: '9s', animationTimingFunction: 'ease-in-out' }}
        >
          <SiFacebook className="w-20 h-20" />
        </div>

        {/* Floating Brand Mark 2: Instagram */}
        <div
          className="absolute top-36 right-[8%] opacity-[0.04] dark:opacity-[0.06] text-[#E4405F] animate-bounce"
          style={{ animationDuration: '12s', animationDelay: '1.5s', animationTimingFunction: 'ease-in-out' }}
        >
          <SiInstagram className="w-24 h-24" />
        </div>

        {/* Floating Brand Mark 3: WhatsApp */}
        <div
          className="absolute bottom-28 left-[8%] opacity-[0.04] dark:opacity-[0.06] text-[#25D366] animate-bounce"
          style={{ animationDuration: '11s', animationDelay: '3s', animationTimingFunction: 'ease-in-out' }}
        >
          <SiWhatsapp className="w-20 h-20" />
        </div>

        {/* Floating Brand Mark 4: YouTube */}
        <div
          className="absolute bottom-16 right-[6%] opacity-[0.04] dark:opacity-[0.06] text-[#FF0000] animate-bounce"
          style={{ animationDuration: '13s', animationDelay: '2s', animationTimingFunction: 'ease-in-out' }}
        >
          <SiYoutube className="w-24 h-24" />
        </div>

        {/* Floating Brand Mark 5: Behance */}
        <div
          className="absolute top-1/2 left-[2%] opacity-[0.03] dark:opacity-[0.05] text-[#0057FF] animate-bounce"
          style={{ animationDuration: '14s', animationDelay: '4s', animationTimingFunction: 'ease-in-out' }}
        >
          <SiBehance className="w-16 h-16" />
        </div>

        {/* Floating Brand Mark 6: LinkedIn */}
        <div
          className="absolute top-2/3 right-[3%] opacity-[0.03] dark:opacity-[0.05] text-[#0A66C2] animate-bounce"
          style={{ animationDuration: '10s', animationDelay: '2.5s', animationTimingFunction: 'ease-in-out' }}
        >
          <FaLinkedin className="w-16 h-16" />
        </div>

        {/* Floating Brand Mark 7: IMO */}
        <div
          className="absolute top-1/4 right-[2%] opacity-[0.035] dark:opacity-[0.055] text-[#00AAFF] animate-bounce"
          style={{ animationDuration: '12.5s', animationDelay: '3.5s', animationTimingFunction: 'ease-in-out' }}
        >
          <ImoIcon className="w-16 h-16" />
        </div>
      </div>

      {/* Decorative Subtle Dot Grid Matrix */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: isDay
            ? 'radial-gradient(#0f172a 1px, transparent 1px)'
            : 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
