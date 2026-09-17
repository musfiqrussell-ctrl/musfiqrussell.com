export type Language = 'bn' | 'en';
export type ThemeMode = 'day' | 'night';

export interface SiteSettings {
  domain: string;
  websiteName: string;
  brandNameBn: string;
  brandNameEn: string;
  taglineBn: string;
  taglineEn: string;
  announcementTextBn: string;
  announcementTextEn: string;
  announcementActive: boolean;
  contactEmail: string;
  contactPhone: string;
  copyrightTextBn: string;
  copyrightTextEn: string;
}

export interface Profile {
  fullName: string;
  displayNameBn: string;
  displayNameEn: string;
  professionalTitleBn: string;
  professionalTitleEn: string;
  bioBn: string;
  bioEn: string;
  aboutIntroBn: string;
  aboutIntroEn: string;
  sinceYear: string;
  projectsCount: string;
  clientsCount: string;
  avatarUrl: string;
  coverUrl?: string;
  primaryMobile: string;
  alternativeMobile: string;
  businessMobile: string;
  primaryEmail: string;
  businessEmail: string;
  whatsappUrl: string;
  messengerUrl: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  iconName: string;
  itemsBn: string[];
  itemsEn: string[];
}

export interface BusinessItem {
  id: string;
  companyBn: string;
  companyEn: string;
  founded: string;
  positionBn: string;
  positionEn: string;
  descriptionBn: string;
  descriptionEn: string;
  services: string[];
  phone: string;
  email: string;
  website?: string;
  facebook: string;
  logoUrl: string;
}

export type Business = BusinessItem;

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  duration?: string;
  joiningDate?: string;
  endDate?: string;
  responsibilities?: string;
  achievements?: string;
  isCurrent?: boolean;
}

export interface EducationItem {
  id: string;
  degreeBn: string;
  degreeEn: string;
  institutionBn: string;
  institutionEn: string;
  subjectBn: string;
  subjectEn: string;
  statusBn: string;
  statusEn: string;
  result?: string;
}

export interface CertificationItem {
  id: string;
  titleBn: string;
  titleEn: string;
  tools: string[];
  highlight?: string;
}

export interface CourseItem {
  id: string;
  titleBn: string;
  titleEn: string;
}

export interface AchievementItem {
  id: string;
  titleBn: string;
  titleEn: string;
  year: string;
  recognitionBn: string;
  recognitionEn: string;
}

export interface NotableClient {
  id: string;
  name: string;
  logo?: string;
  categoryBn: string;
  categoryEn: string;
}

export interface PortfolioItem {
  id: string;
  titleBn: string;
  titleEn: string;
  client: string;
  type: 'Graphic Design' | 'Advertising' | 'Branding' | 'Document Consultancy' | 'Other';
  roleBn: string;
  roleEn: string;
  descriptionBn?: string;
  descriptionEn?: string;
  imageUrl?: string;
  link?: string;
  featured: boolean;
  date?: string;
}

export interface TestimonialItem {
  id: string;
  clientName: string;
  designation: string;
  company: string;
  feedbackBn: string;
  feedbackEn: string;
  rating: number;
  date: string;
}

export interface FaqItem {
  id: string;
  questionBn: string;
  questionEn: string;
  answerBn: string;
  answerEn: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  description?: string;
  descriptionBn?: string;
  accent: string;
  ctaBn?: string;
  ctaEn?: string;
  category: 'primary' | 'professional' | 'creative' | 'direct';
  enabled?: boolean;
  order?: number;
  featured?: boolean;
  label?: string;
}

export interface OfficeLocation {
  id: string;
  type: 'head' | 'branch';
  titleBn: string;
  titleEn: string;
  companyBn: string;
  companyEn: string;
  addressBn: string;
  addressEn: string;
  phone: string;
  whatsappUrl: string;
  email: string;
  hoursBn: string;
  hoursEn: string;
  googleMapsUrl?: string;
  isMapAvailable: boolean;
}

export interface BlogPost {
  id: string;
  titleBn: string;
  titleEn: string;
  slug: string;
  category: string;
  type: 'text' | 'image' | 'gallery' | 'video' | 'youtube' | 'link' | 'announcement';
  contentBn: string;
  contentEn: string;
  excerptBn: string;
  excerptEn: string;
  featuredImage?: string;
  galleryImages?: string[];
  youtubeUrl?: string;
  externalUrl?: string;
  author: string;
  date: string;
  tags: string[];
  status: 'published' | 'draft' | 'scheduled';
  scheduledDate?: string;
  seoTitle?: string;
  seoDescription?: string;
  likes: number;
  views: number;
  comments: Array<{
    id: string;
    author: string;
    text: string;
    date: string;
  }>;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}
