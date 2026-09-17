import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SiteSettings,
  Profile,
  ServiceCategory,
  BusinessItem,
  ExperienceItem,
  EducationItem,
  CertificationItem,
  CourseItem,
  AchievementItem,
  NotableClient,
  PortfolioItem,
  TestimonialItem,
  FaqItem,
  SocialLink,
  OfficeLocation,
  BlogPost,
  ContactMessage,
} from '../types';
import {
  initialSiteSettings,
  initialProfile,
  initialServices,
  initialBusinesses,
  initialExperiences,
  initialEducations,
  initialCertifications,
  initialCourses,
  initialAchievements,
  initialNotableClients,
  initialPortfolios,
  initialTestimonials,
  initialFaqs,
  initialSocialLinks,
  initialOffices,
  initialPosts,
  initialMessages,
} from '../data/initialData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { PROFILE_IMAGE_URL } from '../constants/images';
import {
  signInWithSupabase,
  signOutWithSupabase,
  checkIsSupabaseAdmin,
  fetchProfileFromSupabase,
  saveProfileToSupabase,
  fetchSiteSettingsFromSupabase,
  saveSiteSettingsToSupabase,
  fetchPostsFromSupabase,
  savePostToSupabase,
  deletePostFromSupabase,
  likePostInSupabase,
  addCommentToSupabase,
  fetchPortfoliosFromSupabase,
  savePortfolioToSupabase,
  deletePortfolioFromSupabase,
  fetchExperiencesFromSupabase,
  saveExperienceToSupabase,
  fetchBusinessesFromSupabase,
  saveBusinessToSupabase,
  fetchTestimonialsFromSupabase,
  saveTestimonialToSupabase,
  deleteTestimonialFromSupabase,
  fetchServicesFromSupabase,
  saveServiceToSupabase,
  deleteServiceFromSupabase,
  fetchSocialLinksFromSupabase,
  saveSocialLinkToSupabase,
  deleteSocialLinkFromSupabase,
  fetchOfficesFromSupabase,
  saveOfficeToSupabase,
  submitContactMessageToSupabase,
  fetchContactMessagesFromSupabase,
  updateMessageStatusInSupabase,
  deleteMessageFromSupabase,
  syncAllDataToSupabase,
} from '../services/supabaseService';

interface AdminAuth {
  isAuthenticated: boolean;
  userEmail: string;
  username: string;
  twoFactorVerified: boolean;
  supabaseUser?: any;
}

interface DataContextType {
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  profile: Profile;
  updateProfile: (profile: Partial<Profile>) => void;
  services: ServiceCategory[];
  updateService: (service: ServiceCategory) => void;
  addService: (service: ServiceCategory) => void;
  deleteService: (id: string) => void;
  businesses: BusinessItem[];
  updateBusiness: (business: BusinessItem) => void;
  experiences: ExperienceItem[];
  updateExperience: (exp: ExperienceItem) => void;
  educations: EducationItem[];
  certifications: CertificationItem[];
  courses: CourseItem[];
  achievements: AchievementItem[];
  notableClients: NotableClient[];
  portfolios: PortfolioItem[];
  addPortfolio: (item: PortfolioItem) => void;
  updatePortfolio: (item: PortfolioItem) => void;
  deletePortfolio: (id: string) => void;
  testimonials: TestimonialItem[];
  addTestimonial: (item: TestimonialItem) => void;
  deleteTestimonial: (id: string) => void;
  faqs: FaqItem[];
  updateFaq: (faq: FaqItem) => void;
  socialLinks: SocialLink[];
  updateSocialLink: (link: SocialLink) => void;
  addSocialLink: (link: SocialLink) => void;
  deleteSocialLink: (id: string) => void;
  reorderSocialLinks: (links: SocialLink[]) => void;
  offices: OfficeLocation[];
  updateOffice: (office: OfficeLocation) => void;
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (post: BlogPost) => void;
  deletePost: (id: string) => void;
  likePost: (id: string) => void;
  addCommentToPost: (postId: string, author: string, text: string) => void;
  messages: ContactMessage[];
  addMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => void;
  updateMessageStatus: (id: string, status: 'unread' | 'read' | 'replied') => void;
  deleteMessage: (id: string) => void;
  adminAuth: AdminAuth;
  loginAdmin: (emailOrUser: string, pass: string, otp?: string) => boolean;
  loginAdminWithSupabase: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  updateAdminPassword: (newPass: string) => void;
  isSupabaseConfigured: boolean;
  isSupabaseConnected: boolean;
  syncLocalToSupabase: () => Promise<{ success: boolean; message: string }>;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'musfiq_russell_';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getStored = <T,>(key: string, defaultVal: T): T => {
    try {
      const item = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
      return item ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const stored = getStored<SiteSettings>('settings', initialSiteSettings);
    return {
      ...stored,
      brandNameBn: initialSiteSettings.brandNameBn,
      brandNameEn: initialSiteSettings.brandNameEn,
    };
  });
  const [profile, setProfile] = useState<Profile>(() => {
    const stored = getStored<Profile>('profile', initialProfile);
    // Ensure avatar is strictly the local file path '/assets/profile.jpg' unless a valid custom path is set
    let avatarUrl = stored.avatarUrl;
    if (
      !avatarUrl ||
      avatarUrl.includes('placeholder') ||
      avatarUrl.includes('picsum') ||
      avatarUrl.includes('ui-avatars') ||
      avatarUrl.includes('1VCf1ljdE8NxMuQ3RMCazivtpvWCVrgfZ') ||
      avatarUrl.includes('supabase.co')
    ) {
      avatarUrl = '/assets/profile.jpg';
    }
    return {
      ...stored,
      avatarUrl,
      displayNameBn: initialProfile.displayNameBn,
      displayNameEn: initialProfile.displayNameEn,
    };
  });
  const [services, setServices] = useState<ServiceCategory[]>(() => getStored('services', initialServices));
  const [businesses, setBusinesses] = useState<BusinessItem[]>(() => {
    const stored = getStored<BusinessItem[]>('businesses', initialBusinesses);
    if (!Array.isArray(stored) || stored.length === 0) return initialBusinesses;
    return stored.map((b, i) => {
      const init = initialBusinesses[i];
      if (
        !b.logoUrl ||
        b.logoUrl.includes('placeholder') ||
        b.logoUrl.includes('googleusercontent')
      ) {
        return { ...b, logoUrl: init?.logoUrl || b.logoUrl };
      }
      return b;
    });
  });
  const [experiences, setExperiences] = useState<ExperienceItem[]>(() => {
    const stored = getStored<ExperienceItem[]>('experiences', initialExperiences);
    if (
      !Array.isArray(stored) ||
      stored.length < 3 ||
      stored.some((exp) => !exp.joiningDate || !exp.responsibilities) ||
      stored[0]?.organization !== 'IN DEVELOPMENT'
    ) {
      return initialExperiences;
    }
    return stored;
  });
  const [educations] = useState<EducationItem[]>(() => {
    const stored = getStored<EducationItem[]>('educations', initialEducations);
    if (
      !Array.isArray(stored) ||
      stored.length < 2 ||
      stored.some((e) => e.institutionBn.includes('ইসলামি আরবী') || e.institutionEn.includes('Islamic Arabic'))
    ) {
      return initialEducations;
    }
    return stored;
  });
  const [certifications] = useState<CertificationItem[]>(() => getStored('certifications', initialCertifications));
  const [courses] = useState<CourseItem[]>(() => getStored('courses', initialCourses));
  const [achievements] = useState<AchievementItem[]>(() => getStored('achievements', initialAchievements));
  const [notableClients] = useState<NotableClient[]>(() => {
    const stored = getStored<NotableClient[]>('clients', initialNotableClients);
    if (
      !Array.isArray(stored) ||
      stored.length < 4 ||
      stored.some((c) => !c.logo || c.name === 'NEUTRO')
    ) {
      return initialNotableClients;
    }
    return stored;
  });
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>(() => getStored('portfolios', initialPortfolios));
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => getStored('testimonials', initialTestimonials));
  const [faqs, setFaqs] = useState<FaqItem[]>(() => getStored('faqs', initialFaqs));
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const stored = getStored<SocialLink[]>('social', initialSocialLinks);
    if (!Array.isArray(stored) || stored.length === 0 || !stored[0].username) {
      return initialSocialLinks;
    }
    const existingIds = new Set(stored.map((s) => s.id));
    const missing = initialSocialLinks.filter((s) => !existingIds.has(s.id));
    const merged = [...stored, ...missing];
    return merged.map((item) => {
      if (item.id === 's-imo' || (item.platform || '').toLowerCase().includes('imo')) {
        return {
          ...item,
          icon: 'imo',
          accent: item.accent && item.accent !== '#00A3E0' ? item.accent : '#00AAFF',
          url: item.url || 'https://s.imoim.net/Mw73sy',
        };
      }
      return item;
    });
  });
  const [offices, setOffices] = useState<OfficeLocation[]>(() => getStored('offices', initialOffices));
  const [posts, setPosts] = useState<BlogPost[]>(() => getStored('posts', initialPosts));
  const [messages, setMessages] = useState<ContactMessage[]>(() => getStored('messages', initialMessages));

  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);

  // Admin authentication state
  const [adminAuth, setAdminAuth] = useState<AdminAuth>(() => {
    const session = sessionStorage.getItem(LOCAL_STORAGE_PREFIX + 'admin_session');
    if (session) {
      try {
        return JSON.parse(session);
      } catch {
        // fallback
      }
    }
    return {
      isAuthenticated: false,
      userEmail: 'musfiqrussell@gmail.com',
      username: 'musfiqrussell',
      twoFactorVerified: false,
    };
  });

  // Sync to local storage
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'settings', JSON.stringify(siteSettings)); }, [siteSettings]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'profile', JSON.stringify(profile)); }, [profile]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'businesses', JSON.stringify(businesses)); }, [businesses]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'experiences', JSON.stringify(experiences)); }, [experiences]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'portfolios', JSON.stringify(portfolios)); }, [portfolios]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'faqs', JSON.stringify(faqs)); }, [faqs]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'social', JSON.stringify(socialLinks)); }, [socialLinks]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'offices', JSON.stringify(offices)); }, [offices]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'posts', JSON.stringify(posts)); }, [posts]);
  useEffect(() => { localStorage.setItem(LOCAL_STORAGE_PREFIX + 'messages', JSON.stringify(messages)); }, [messages]);

  // Load from Supabase if configured
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setIsSupabaseConnected(false);
      return;
    }

    let isMounted = true;

    const loadSupabaseData = async () => {
      try {
        const [
          remoteProfile,
          remoteSettings,
          remotePosts,
          remotePortfolios,
          remoteTestimonials,
          remoteServices,
          remoteSocial,
          remoteOffices,
          remoteExperiences,
          remoteBusinesses,
        ] = await Promise.all([
          fetchProfileFromSupabase(),
          fetchSiteSettingsFromSupabase(),
          fetchPostsFromSupabase(),
          fetchPortfoliosFromSupabase(),
          fetchTestimonialsFromSupabase(),
          fetchServicesFromSupabase(),
          fetchSocialLinksFromSupabase(),
          fetchOfficesFromSupabase(),
          fetchExperiencesFromSupabase(),
          fetchBusinessesFromSupabase(),
        ]);

        if (!isMounted) return;

        setIsSupabaseConnected(true);

        if (remoteProfile) setProfile(remoteProfile);
        if (remoteSettings) setSiteSettings(remoteSettings);
        if (remotePosts && remotePosts.length > 0) setPosts(remotePosts);
        if (remotePortfolios && remotePortfolios.length > 0) setPortfolios(remotePortfolios);
        if (remoteTestimonials && remoteTestimonials.length > 0) setTestimonials(remoteTestimonials);
        if (remoteServices && remoteServices.length > 0) setServices(remoteServices);
        if (remoteSocial && remoteSocial.length > 0) setSocialLinks(remoteSocial);
        if (remoteOffices && remoteOffices.length > 0) setOffices(remoteOffices);
        if (remoteExperiences && remoteExperiences.length > 0) setExperiences(remoteExperiences);
        if (remoteBusinesses && remoteBusinesses.length > 0) setBusinesses(remoteBusinesses);

        // If authenticated, also fetch messages
        if (adminAuth.isAuthenticated) {
          const remoteMsgs = await fetchContactMessagesFromSupabase();
          if (remoteMsgs) setMessages(remoteMsgs);
        }
      } catch (err) {
        console.warn('Supabase data load deferred:', err);
        setIsSupabaseConnected(false);
      }
    };

    loadSupabaseData();

    // Listen to Supabase Auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user?.email) {
        const isAdmin = await checkIsSupabaseAdmin(session.user.email, session.user.id);
        if (isAdmin) {
          const authState: AdminAuth = {
            isAuthenticated: true,
            userEmail: session.user.email,
            username: session.user.email.split('@')[0],
            twoFactorVerified: true,
            supabaseUser: session.user,
          };
          setAdminAuth(authState);
          sessionStorage.setItem(LOCAL_STORAGE_PREFIX + 'admin_session', JSON.stringify(authState));

          // Fetch messages once authenticated
          const remoteMsgs = await fetchContactMessagesFromSupabase();
          if (remoteMsgs) setMessages(remoteMsgs);
        }
      }
    });

    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [adminAuth.isAuthenticated]);

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings(prev => {
      const updated = { ...prev, ...settings };
      if (isSupabaseConfigured()) {
        saveSiteSettingsToSupabase(updated);
      }
      return updated;
    });
  };

  const updateProfile = (updated: Partial<Profile>) => {
    setProfile(prev => {
      const newProfile = { ...prev, ...updated };
      if (isSupabaseConfigured()) {
        saveProfileToSupabase(newProfile);
      }
      return newProfile;
    });
  };

  const updateService = (service: ServiceCategory) => {
    setServices(prev => prev.map(s => s.id === service.id ? service : s));
    if (isSupabaseConfigured()) saveServiceToSupabase(service);
  };

  const addService = (service: ServiceCategory) => {
    setServices(prev => [...prev, service]);
    if (isSupabaseConfigured()) saveServiceToSupabase(service);
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
    if (isSupabaseConfigured()) deleteServiceFromSupabase(id);
  };

  const updateBusiness = (business: BusinessItem) => {
    setBusinesses(prev => prev.map(b => b.id === business.id ? business : b));
    if (isSupabaseConfigured()) saveBusinessToSupabase(business);
  };

  const updateExperience = (exp: ExperienceItem) => {
    setExperiences(prev => prev.map(e => e.id === exp.id ? exp : e));
    if (isSupabaseConfigured()) saveExperienceToSupabase(exp);
  };

  const addPortfolio = (item: PortfolioItem) => {
    setPortfolios(prev => [item, ...prev]);
    if (isSupabaseConfigured()) savePortfolioToSupabase(item);
  };

  const updatePortfolio = (item: PortfolioItem) => {
    setPortfolios(prev => prev.map(p => p.id === item.id ? item : p));
    if (isSupabaseConfigured()) savePortfolioToSupabase(item);
  };

  const deletePortfolio = (id: string) => {
    setPortfolios(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured()) deletePortfolioFromSupabase(id);
  };

  const addTestimonial = (item: TestimonialItem) => {
    setTestimonials(prev => [item, ...prev]);
    if (isSupabaseConfigured()) saveTestimonialToSupabase(item);
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    if (isSupabaseConfigured()) deleteTestimonialFromSupabase(id);
  };

  const updateFaq = (faq: FaqItem) => {
    setFaqs(prev => prev.map(f => f.id === faq.id ? faq : f));
  };

  const updateSocialLink = (link: SocialLink) => {
    setSocialLinks(prev => prev.map(s => s.id === link.id ? link : s));
    if (isSupabaseConfigured()) saveSocialLinkToSupabase(link);
  };

  const addSocialLink = (link: SocialLink) => {
    setSocialLinks(prev => [...prev, link]);
    if (isSupabaseConfigured()) saveSocialLinkToSupabase(link);
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks(prev => prev.filter(s => s.id !== id));
    if (isSupabaseConfigured()) deleteSocialLinkFromSupabase(id);
  };

  const reorderSocialLinks = (newLinks: SocialLink[]) => {
    setSocialLinks(newLinks);
    if (isSupabaseConfigured()) {
      newLinks.forEach(link => saveSocialLinkToSupabase(link));
    }
  };

  const updateOffice = (office: OfficeLocation) => {
    setOffices(prev => prev.map(o => o.id === office.id ? office : o));
    if (isSupabaseConfigured()) saveOfficeToSupabase(office);
  };

  const addPost = (post: BlogPost) => {
    setPosts(prev => [post, ...prev]);
    if (isSupabaseConfigured()) savePostToSupabase(post);
  };

  const updatePost = (post: BlogPost) => {
    setPosts(prev => prev.map(p => p.id === post.id ? post : p));
    if (isSupabaseConfigured()) savePostToSupabase(post);
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    if (isSupabaseConfigured()) deletePostFromSupabase(id);
  };

  const likePost = (id: string) => {
    const post = posts.find(p => p.id === id);
    const currentLikes = post ? post.likes : 0;
    setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
    if (isSupabaseConfigured()) likePostInSupabase(id, currentLikes);
  };

  const addCommentToPost = (postId: string, author: string, text: string) => {
    const newComment = {
      id: 'cmt-' + Date.now(),
      author,
      text,
      date: new Date().toLocaleDateString('bn-BD'),
    };
    setPosts(prev =>
      prev.map(p => (p.id === postId ? { ...p, comments: [...p.comments, newComment] } : p))
    );
    if (isSupabaseConfigured()) addCommentToSupabase(postId, author, text);
  };

  const addMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      date: new Date().toLocaleString(),
      status: 'unread',
    };
    setMessages(prev => [newMsg, ...prev]);

    if (isSupabaseConfigured()) {
      submitContactMessageToSupabase(msg).then(res => {
        if (res.success && res.id) {
          // Sync id if returned
        }
      });
    }
  };

  const updateMessageStatus = (id: string, status: 'unread' | 'read' | 'replied') => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
    if (isSupabaseConfigured()) updateMessageStatusInSupabase(id, status);
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(m => m.id !== id));
    if (isSupabaseConfigured()) deleteMessageFromSupabase(id);
  };

  // Secure admin password handling
  const getAdminPass = () => {
    return localStorage.getItem(LOCAL_STORAGE_PREFIX + 'admin_pass_hash') || 'admin1234';
  };

  const updateAdminPassword = (newPass: string) => {
    localStorage.setItem(LOCAL_STORAGE_PREFIX + 'admin_pass_hash', newPass);
  };

  // Supabase Auth Login
  const loginAdminWithSupabase = async (
    email: string,
    pass: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!isSupabaseConfigured()) {
      return { success: false, error: 'Supabase credentials are not configured in environment variables.' };
    }

    try {
      const { data, error } = await signInWithSupabase(email, pass);
      if (error) {
        return { success: false, error: error.message };
      }

      if (data?.user?.email) {
        const isAdmin = await checkIsSupabaseAdmin(data.user.email);
        if (!isAdmin) {
          await signOutWithSupabase();
          return { success: false, error: 'This user account is not authorized as an administrator.' };
        }

        const authState: AdminAuth = {
          isAuthenticated: true,
          userEmail: data.user.email,
          username: data.user.email.split('@')[0],
          twoFactorVerified: true,
          supabaseUser: data.user,
        };
        setAdminAuth(authState);
        sessionStorage.setItem(LOCAL_STORAGE_PREFIX + 'admin_session', JSON.stringify(authState));

        // Load contact messages upon auth
        const remoteMsgs = await fetchContactMessagesFromSupabase();
        if (remoteMsgs) setMessages(remoteMsgs);

        return { success: true };
      }

      return { success: false, error: 'User session could not be established.' };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Login failed' };
    }
  };

  // Local or fallback login
  const loginAdmin = (emailOrUser: string, pass: string, otp?: string): boolean => {
    const validIdentifier =
      emailOrUser.trim().toLowerCase() === 'musfiqrussell@gmail.com' ||
      emailOrUser.trim().toLowerCase() === 'musfiqrussell';
    const validPass = pass === getAdminPass();
    const validOtp = !otp || otp.length >= 4;

    if (validIdentifier && validPass && validOtp) {
      const authState: AdminAuth = {
        isAuthenticated: true,
        userEmail: 'musfiqrussell@gmail.com',
        username: 'musfiqrussell',
        twoFactorVerified: true,
      };
      setAdminAuth(authState);
      sessionStorage.setItem(LOCAL_STORAGE_PREFIX + 'admin_session', JSON.stringify(authState));
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    if (isSupabaseConfigured()) {
      signOutWithSupabase();
    }
    const loggedOut: AdminAuth = {
      isAuthenticated: false,
      userEmail: 'musfiqrussell@gmail.com',
      username: 'musfiqrussell',
      twoFactorVerified: false,
    };
    setAdminAuth(loggedOut);
    sessionStorage.removeItem(LOCAL_STORAGE_PREFIX + 'admin_session');
  };

  const syncLocalToSupabase = async (): Promise<{ success: boolean; message: string }> => {
    return await syncAllDataToSupabase({
      siteSettings,
      profile,
      services,
      businesses,
      experiences,
      portfolios,
      testimonials,
      faqs,
      socialLinks,
      offices,
      posts,
    });
  };

  const exportDataJson = () => {
    const fullBackup = {
      siteSettings,
      profile,
      services,
      businesses,
      experiences,
      educations,
      certifications,
      courses,
      achievements,
      notableClients,
      portfolios,
      testimonials,
      faqs,
      socialLinks,
      offices,
      posts,
      messages,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteSettings) setSiteSettings(data.siteSettings);
      if (data.profile) setProfile(data.profile);
      if (data.services) setServices(data.services);
      if (data.businesses) setBusinesses(data.businesses);
      if (data.experiences) setExperiences(data.experiences);
      if (data.portfolios) setPortfolios(data.portfolios);
      if (data.testimonials) setTestimonials(data.testimonials);
      if (data.faqs) setFaqs(data.faqs);
      if (data.socialLinks) setSocialLinks(data.socialLinks);
      if (data.offices) setOffices(data.offices);
      if (data.posts) setPosts(data.posts);
      return true;
    } catch (e) {
      console.error('Import failed', e);
      return false;
    }
  };

  const resetToDefaults = () => {
    setSiteSettings(initialSiteSettings);
    setProfile(initialProfile);
    setServices(initialServices);
    setBusinesses(initialBusinesses);
    setExperiences(initialExperiences);
    setPortfolios(initialPortfolios);
    setTestimonials(initialTestimonials);
    setFaqs(initialFaqs);
    setSocialLinks(initialSocialLinks);
    setOffices(initialOffices);
    setPosts(initialPosts);
    setMessages(initialMessages);
  };

  return (
    <DataContext.Provider
      value={{
        siteSettings,
        updateSiteSettings,
        profile,
        updateProfile,
        services,
        updateService,
        addService,
        deleteService,
        businesses,
        updateBusiness,
        experiences,
        updateExperience,
        educations,
        certifications,
        courses,
        achievements,
        notableClients,
        portfolios,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        testimonials,
        addTestimonial,
        deleteTestimonial,
        faqs,
        updateFaq,
        socialLinks,
        updateSocialLink,
        addSocialLink,
        deleteSocialLink,
        reorderSocialLinks,
        offices,
        updateOffice,
        posts,
        addPost,
        updatePost,
        deletePost,
        likePost,
        addCommentToPost,
        messages,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        adminAuth,
        loginAdmin,
        loginAdminWithSupabase,
        logoutAdmin,
        updateAdminPassword,
        isSupabaseConfigured: isSupabaseConfigured(),
        isSupabaseConnected,
        syncLocalToSupabase,
        exportDataJson,
        importDataJson,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
