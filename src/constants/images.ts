import profileAsset from '../assets/profile.jpg';
import company01Asset from '../assets/company-01.jpg';
import company02Asset from '../assets/company-02.jpg';

/**
 * Centralized Image Constants
 * Uses bundled high-resolution local assets with Google Drive & public fallbacks
 */

// Google Drive source IDs provided by user (for reference / remote fallback):
export const GOOGLE_DRIVE_PROFILE_URL = 'https://lh3.googleusercontent.com/d/1VCf1ljdE8NxMuQ3RMCazivtpvWCVrgfZ';
export const GOOGLE_DRIVE_COMPANY_01_URL = 'https://lh3.googleusercontent.com/d/1sOgn2bE158Rs1rGbsoNYPo0UFQneGSli';
export const GOOGLE_DRIVE_COMPANY_02_URL = 'https://lh3.googleusercontent.com/d/16HiVrbCkrVV-iWCYOCTC5-7TnOillpYE';

// Primary URLs: directly resolves to local bundled assets (no external network delay, guaranteed 200 OK)
export const PROFILE_IMAGE_URL = profileAsset || '/assets/profile.jpg';
export const COMPANY_01_LOGO_URL = company01Asset || '/assets/company-01.jpg';
export const COMPANY_02_LOGO_URL = company02Asset || '/assets/company-02.jpg';

export const PROJECT_IMAGE_01 = 'https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop';
export const PROJECT_IMAGE_02 = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop';
export const PROJECT_IMAGE_03 = 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1000&auto=format&fit=crop';

// Helper to provide clean fallback image with high-contrast elegant styling
export const getFallbackImage = (text: string, bgColor = '1e222d', textColor = 'e11d48'): string => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(text)}&background=${bgColor}&color=${textColor}&size=400&bold=true&font-size=0.35`;
};
