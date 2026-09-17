import React from 'react';
import {
  SiFacebook,
  SiInstagram,
  SiX,
  SiYoutube,
  SiTiktok,
  SiWhatsapp,
  SiMessenger,
  SiLinktree,
  SiBehance,
  SiFiverr,
  SiThreads,
  SiTelegram,
  SiPinterest,
} from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { Globe } from 'lucide-react';

interface SocialIconProps {
  name: string;
  className?: string;
  isHovered?: boolean;
}

// Custom authentic IMO SVG brand icon matching official design specifications
export interface ImoIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  variant?: 'currentColor' | 'brand' | 'filled';
}

export const ImoIcon: React.FC<ImoIconProps> = ({
  className = 'w-5 h-5',
  variant = 'currentColor',
  ...props
}) => {
  if (variant === 'filled') {
    return (
      <svg
        viewBox="0 0 48 48"
        className={`shrink-0 object-contain ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        {/* Authentic IMO Filled Speech Bubble in Cyan Brand Color */}
        <path
          d="M24 5.5C13.8 5.5 5.5 13.5 5.5 23.5c0 4.4 1.6 8.5 4.3 11.6l-2.8 6.4c-.3.8.4 1.6 1.2 1.3l7.4-3.1c2.6 1.1 5.4 1.8 8.4 1.8 10.2 0 18.5-8 18.5-18S34.2 5.5 24 5.5z"
          fill="#00AAFF"
        />
        {/* Crisp White 'imo' Lowercase Typography */}
        <g fill="#FFFFFF">
          <circle cx="10.8" cy="16.2" r="1.7" />
          <rect x="9.6" y="20.2" width="2.4" height="7.8" rx="1.2" />
          <path d="M16 28V20.2h2.2v1.1c.6-.9 1.6-1.3 2.8-1.3 1.4 0 2.4.7 2.9 1.7.7-1 1.8-1.7 3.2-1.7 2.1 0 3.5 1.3 3.5 3.6V28h-2.5v-4.7c0-1.3-.7-2-1.8-2-1.1 0-1.8.8-1.8 2V28h-2.5v-4.7c0-1.3-.7-2-1.8-2-1.1 0-1.8.8-1.8 2V28H16z" />
          <path d="M34 20c-2.6 0-4.4 1.9-4.4 4.1s1.8 4.1 4.4 4.1 4.4-1.9 4.4-4.1-1.8-4.1-4.4-4.1zm0 6.1c-1.3 0-2.1-.9-2.1-2s.8-2 2.1-2 2.1.9 2.1 2-.8 2-2.1 2z" />
        </g>
      </svg>
    );
  }

  if (variant === 'brand') {
    return (
      <svg
        viewBox="0 0 48 48"
        className={`shrink-0 object-contain ${className}`}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        {...props}
      >
        {/* Outline Speech Bubble in IMO Cyan */}
        <path
          d="M24 5.5C13.8 5.5 5.5 13.5 5.5 23.5c0 4.4 1.6 8.5 4.3 11.6l-2.8 6.4c-.3.8.4 1.6 1.2 1.3l7.4-3.1c2.6 1.1 5.4 1.8 8.4 1.8 10.2 0 18.5-8 18.5-18S34.2 5.5 24 5.5z"
          fill="none"
          stroke="#00AAFF"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* IMO Lowercase Letters in Cyan */}
        <g fill="#00AAFF">
          <circle cx="10.8" cy="16.2" r="1.7" />
          <rect x="9.6" y="20.2" width="2.4" height="7.8" rx="1.2" />
          <path d="M16 28V20.2h2.2v1.1c.6-.9 1.6-1.3 2.8-1.3 1.4 0 2.4.7 2.9 1.7.7-1 1.8-1.7 3.2-1.7 2.1 0 3.5 1.3 3.5 3.6V28h-2.5v-4.7c0-1.3-.7-2-1.8-2-1.1 0-1.8.8-1.8 2V28h-2.5v-4.7c0-1.3-.7-2-1.8-2-1.1 0-1.8.8-1.8 2V28H16z" />
          <path d="M34 20c-2.6 0-4.4 1.9-4.4 4.1s1.8 4.1 4.4 4.1 4.4-1.9 4.4-4.1-1.8-4.1-4.4-4.1zm0 6.1c-1.3 0-2.1-.9-2.1-2s.8-2 2.1-2 2.1.9 2.1 2-.8 2-2.1 2z" />
        </g>
      </svg>
    );
  }

  // Standard currentColor rendering: seamlessly adapts to tile color, dark/light themes, and hover transitions
  return (
    <svg
      viewBox="0 0 48 48"
      className={`shrink-0 object-contain ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      {/* Authentic Outline Speech Bubble inheriting currentColor */}
      <path
        d="M24 5.5C13.8 5.5 5.5 13.5 5.5 23.5c0 4.4 1.6 8.5 4.3 11.6l-2.8 6.4c-.3.8.4 1.6 1.2 1.3l7.4-3.1c2.6 1.1 5.4 1.8 8.4 1.8 10.2 0 18.5-8 18.5-18S34.2 5.5 24 5.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Centered 'imo' Lowercase Typography inheriting currentColor */}
      <g fill="currentColor">
        <circle cx="10.8" cy="16.2" r="1.7" />
        <rect x="9.6" y="20.2" width="2.4" height="7.8" rx="1.2" />
        <path d="M16 28V20.2h2.2v1.1c.6-.9 1.6-1.3 2.8-1.3 1.4 0 2.4.7 2.9 1.7.7-1 1.8-1.7 3.2-1.7 2.1 0 3.5 1.3 3.5 3.6V28h-2.5v-4.7c0-1.3-.7-2-1.8-2-1.1 0-1.8.8-1.8 2V28h-2.5v-4.7c0-1.3-.7-2-1.8-2-1.1 0-1.8.8-1.8 2V28H16z" />
        <path d="M34 20c-2.6 0-4.4 1.9-4.4 4.1s1.8 4.1 4.4 4.1 4.4-1.9 4.4-4.1-1.8-4.1-4.4-4.1zm0 6.1c-1.3 0-2.1-.9-2.1-2s.8-2 2.1-2 2.1.9 2.1 2-.8 2-2.1 2z" />
      </g>
    </svg>
  );
};

export const SocialIcon: React.FC<SocialIconProps> = ({ name, className = 'w-5 h-5', isHovered = false }) => {
  const normalized = (name || '').toLowerCase().trim();

  // Distinct animation classes per platform when hovered
  let animationClass = 'transition-transform duration-300 ease-out';

  if (isHovered) {
    switch (normalized) {
      case 'instagram':
        // subtle scale + slight rotation + glow
        animationClass += ' scale-110 rotate-[-6deg]';
        break;
      case 'facebook':
      case 'facebook (personal)':
      case 'facebook page':
        // scale + floating upward
        animationClass += ' scale-110 -translate-y-1';
        break;
      case 'linkedin':
        // scale + upward movement
        animationClass += ' scale-110 -translate-y-1.5';
        break;
      case 'x':
      case 'x (twitter)':
      case 'twitter':
        // subtle rotation + scale
        animationClass += ' scale-110 rotate-[12deg]';
        break;
      case 'youtube':
        // play-button pulse
        animationClass += ' scale-115 animate-pulse';
        break;
      case 'tiktok':
        // subtle vertical movement / glow
        animationClass += ' scale-110 -translate-y-1';
        break;
      case 'whatsapp':
        // gentle pulse
        animationClass += ' scale-110 animate-pulse';
        break;
      case 'messenger':
        // subtle floating animation
        animationClass += ' scale-110 -translate-y-1.5';
        break;
      case 'telegram':
        // paper-plane tilt / slide
        animationClass += ' scale-110 translate-x-1 -translate-y-1 rotate-[10deg]';
        break;
      case 'pinterest':
        // subtle scale + pulse
        animationClass += ' scale-115';
        break;
      case 'behance':
        // elegant scale
        animationClass += ' scale-112';
        break;
      case 'fiverr':
        // subtle floating effect
        animationClass += ' scale-110 -translate-y-1';
        break;
      case 'threads':
        // slight rotation
        animationClass += ' scale-110 rotate-[-8deg]';
        break;
      case 'linktree':
        // subtle scale
        animationClass += ' scale-112';
        break;
      case 'imo':
      case 'imo chat':
      case 'imochat':
      case 'imo-chat':
      case 'imo messenger':
      case 'imoim':
        // subtle floating effect
        animationClass += ' scale-110 -translate-y-1';
        break;
      default:
        animationClass += ' scale-110';
        break;
    }
  }

  const iconElement = (() => {
    switch (normalized) {
      case 'facebook':
      case 'facebook (personal)':
      case 'facebook page':
        return <SiFacebook className={className} />;
      case 'instagram':
        return <SiInstagram className={className} />;
      case 'linkedin':
        return <FaLinkedinIn className={className} />;
      case 'x':
      case 'x (twitter)':
      case 'twitter':
        return <SiX className={className} />;
      case 'youtube':
        return <SiYoutube className={className} />;
      case 'tiktok':
        return <SiTiktok className={className} />;
      case 'whatsapp':
        return <SiWhatsapp className={className} />;
      case 'messenger':
        return <SiMessenger className={className} />;
      case 'linktree':
        return <SiLinktree className={className} />;
      case 'behance':
        return <SiBehance className={className} />;
      case 'fiverr':
        return <SiFiverr className={className} />;
      case 'threads':
        return <SiThreads className={className} />;
      case 'telegram':
        return <SiTelegram className={className} />;
      case 'pinterest':
        return <SiPinterest className={className} />;
      case 'imo':
      case 'imo chat':
      case 'imochat':
      case 'imo-chat':
      case 'imo messenger':
      case 'imoim':
        return <ImoIcon className={className} />;
      default:
        return <Globe className={className} />;
    }
  })();

  return <span className={`inline-flex items-center justify-center ${animationClass}`}>{iconElement}</span>;
};
