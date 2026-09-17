import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SocialLink } from '../../../types';
import { SocialIcon } from './SocialIcon';

interface SocialCardProps {
  social: SocialLink;
  isDay: boolean;
  language: 'bn' | 'en';
}

export const SocialCard: React.FC<SocialCardProps> = ({ social, isDay, language }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchOrReducedMotion, setIsTouchOrReducedMotion] = useState(false);

  // Check touch devices or prefers-reduced-motion
  useEffect(() => {
    const isTouch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(hover: none)').matches);
    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsTouchOrReducedMotion(Boolean(isTouch || prefersReduced));
  }, []);

  // Motion values for magnetic cursor & 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for ultra-smooth easing
  const mouseXSpring = useSpring(x, { stiffness: 350, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 350, damping: 25 });

  // 3D tilt: max 4 degrees
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  // Magnetic cursor translation: max 6px
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-6px', '6px']);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-6px', '6px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouchOrReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalize coordinates to -0.5 to 0.5
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const ctaText = language === 'bn' ? social.ctaBn || 'যুক্ত হোন' : social.ctaEn || 'Follow Me';
  const descriptionText = language === 'bn' ? social.descriptionBn || social.description : social.description;

  const accentColor = social.accent || '#E11D48';

  // Dynamic box-shadow & border on hover using platform brand accent
  const hoverShadow = isHovered
    ? isDay
      ? `0 12px 24px -6px ${accentColor}25, 0 4px 12px -2px rgba(0,0,0,0.06)`
      : `0 14px 28px -6px ${accentColor}30, 0 0 16px -2px ${accentColor}20`
    : undefined;

  return (
    <motion.a
      ref={cardRef}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      id={`social-card-${social.id}`}
      aria-label={`Visit Musfiq Russell on ${social.platform} (${social.username})`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      style={{
        rotateX: isTouchOrReducedMotion ? 0 : rotateX,
        rotateY: isTouchOrReducedMotion ? 0 : rotateY,
        x: isTouchOrReducedMotion ? 0 : translateX,
        y: isTouchOrReducedMotion ? 0 : translateY,
        transformStyle: 'preserve-3d',
        boxShadow: hoverShadow,
        borderColor: isHovered ? accentColor : undefined,
      }}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 overflow-hidden select-none ${
        isDay
          ? isHovered
            ? 'bg-white border-slate-300 shadow-lg'
            : 'bg-white/90 border-slate-200/90 shadow-sm hover:border-slate-300'
          : isHovered
          ? 'bg-[#14161f] border-zinc-700 shadow-xl shadow-black/40'
          : 'bg-[#0f1117] border-zinc-800/90 hover:border-zinc-700'
      }`}
    >
      {/* Subtle Platform-Tint Ambient Glow Overlay */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: isHovered
            ? `radial-gradient(circle at 50% 0%, ${accentColor}12, transparent 70%)`
            : 'none',
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Top Header: Platform Brand Icon + Arrow CTA */}
      <div className="relative z-10 flex items-start justify-between gap-3 mb-3.5">
        {/* Brand Icon Badge */}
        <div
          className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 border ${
            isDay
              ? 'bg-slate-50 border-slate-200 text-slate-800'
              : 'bg-zinc-900 border-zinc-800 text-zinc-100'
          }`}
          style={{
            backgroundColor: isHovered ? `${accentColor}15` : undefined,
            borderColor: isHovered ? `${accentColor}40` : undefined,
            color: isHovered ? accentColor : undefined,
          }}
        >
          <SocialIcon name={social.icon || social.platform} className="w-5 h-5 sm:w-6 sm:h-6" isHovered={isHovered} />
        </div>

        {/* Action Link Arrow Icon */}
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 border ${
            isHovered
              ? 'translate-x-0.5 -translate-y-0.5'
              : 'opacity-60'
          } ${
            isDay
              ? isHovered
                ? 'bg-slate-100 text-slate-900 border-slate-300'
                : 'bg-transparent text-slate-400 border-transparent'
              : isHovered
              ? 'bg-zinc-800 text-white border-zinc-700'
              : 'bg-transparent text-zinc-500 border-transparent'
          }`}
          style={{
            color: isHovered ? accentColor : undefined,
            borderColor: isHovered ? `${accentColor}30` : undefined,
          }}
        >
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Middle Body: Platform Name + Handle */}
      <div className="relative z-10 flex-1 min-w-0 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <h4
            className={`text-sm sm:text-[15px] font-bold tracking-tight transition-colors duration-200 truncate ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {social.platform}
          </h4>
          {social.featured && (
            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
              Primary
            </span>
          )}
        </div>

        <p
          className={`text-xs font-mono font-medium truncate mt-0.5 transition-colors duration-200 ${
            isDay
              ? isHovered
                ? 'text-slate-900'
                : 'text-slate-500'
              : isHovered
              ? 'text-zinc-200'
              : 'text-zinc-400'
          }`}
        >
          {social.username}
        </p>

        {descriptionText && (
          <p
            className={`text-[11px] line-clamp-2 mt-1.5 leading-relaxed transition-colors duration-200 ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {descriptionText}
          </p>
        )}
      </div>

      {/* Bottom Footer: Dynamic Short CTA with animated indicator */}
      <div
        className={`relative z-10 pt-2.5 border-t flex items-center justify-between transition-colors duration-200 ${
          isDay ? 'border-slate-100' : 'border-zinc-800/80'
        }`}
      >
        <span
          className="text-xs font-semibold flex items-center gap-1.5 transition-all duration-200"
          style={{
            color: isHovered ? accentColor : isDay ? '#64748B' : '#A1A1AA',
          }}
        >
          <span>{ctaText}</span>
          <span
            className={`inline-block transition-transform duration-200 ${
              isHovered ? 'translate-x-1' : ''
            }`}
          >
            →
          </span>
        </span>

        {/* Small subtle status dot */}
        <span
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: isHovered ? accentColor : isDay ? '#CBD5E1' : '#3F3F46',
            boxShadow: isHovered ? `0 0 8px ${accentColor}` : 'none',
          }}
        />
      </div>
    </motion.a>
  );
};
