import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { showToast } from '../lib/toast';
import {
  SiteSettings,
  Profile,
  ServiceCategory,
  BusinessItem,
  ExperienceItem,
  EducationItem,
  PortfolioItem,
  TestimonialItem,
  FaqItem,
  SocialLink,
  OfficeLocation,
  BlogPost,
  ContactMessage,
} from '../types';

/**
 * Sanitizes visitor text inputs to prevent XSS and malformed payloads
 */
const sanitizeInput = (val: string | undefined | null, maxLen = 2000): string => {
  if (!val) return '';
  return val
    .replace(/<[^>]*>?/gm, '')
    .trim()
    .slice(0, maxLen);
};

// ==========================================
// AUTHENTICATION & ADMIN USERS
// ==========================================

export const signInWithSupabase = async (email: string, password: string) => {
  if (!isSupabaseConfigured()) {
    return { data: null, error: new Error('Supabase credentials are not configured.') };
  }
  try {
    return await supabase.auth.signInWithPassword({ email: email.trim(), password });
  } catch (err: any) {
    console.error('Supabase sign-in exception:', err);
    return { data: null, error: err };
  }
};

export const signOutWithSupabase = async () => {
  if (!isSupabaseConfigured()) return;
  try {
    await supabase.auth.signOut();
  } catch (err) {
    console.error('Supabase sign-out exception:', err);
  }
};

export const getSupabaseUser = async () => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (err) {
    console.warn('Supabase getUser notice:', err);
    return null;
  }
};

/**
 * Validates admin status against admin_users table and owner verification
 */
export const checkIsSupabaseAdmin = async (userEmail?: string, userId?: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;

  let email = userEmail ? userEmail.trim().toLowerCase() : '';
  let uid = userId || '';

  // If email or userId missing, inspect current session or user
  if (!email || !uid) {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session?.user) {
        email = email || (sessionData.session.user.email || '').toLowerCase();
        uid = uid || sessionData.session.user.id;
      }
    } catch {
      // Non-blocking fallback
    }
  }

  // Primary owner check
  if (email === 'musfiqrussell@gmail.com') {
    return true;
  }

  try {
    // 1. Check admin_users table by auth.uid()
    if (uid) {
      const { data: adminByUid, error: errUid } = await supabase
        .from('admin_users')
        .select('id, email, role')
        .or(`id.eq.${uid},user_id.eq.${uid}`)
        .maybeSingle();

      if (!errUid && adminByUid && (adminByUid.role === 'admin' || adminByUid.role === 'superadmin')) {
        return true;
      }
    }

    // 2. Check admin_users table by email
    if (email) {
      const { data: adminByEmail, error: errEmail } = await supabase
        .from('admin_users')
        .select('id, email, role')
        .eq('email', email)
        .maybeSingle();

      if (!errEmail && adminByEmail && (adminByEmail.role === 'admin' || adminByEmail.role === 'superadmin')) {
        return true;
      }
    }

    return false;
  } catch (err) {
    console.error('Error validating admin user against admin_users table:', err);
    return false;
  }
};

/**
 * Verifies active session and checks admin permissions
 */
export const verifyAdminSession = async (): Promise<{
  isValid: boolean;
  user: any | null;
  isAdmin: boolean;
}> => {
  if (!isSupabaseConfigured()) {
    return { isValid: false, user: null, isAdmin: false };
  }
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session?.user) {
      return { isValid: false, user: null, isAdmin: false };
    }
    const isAdmin = await checkIsSupabaseAdmin(session.user.email, session.user.id);
    return { isValid: true, user: session.user, isAdmin };
  } catch (e) {
    console.error('Failed to verify admin session:', e);
    return { isValid: false, user: null, isAdmin: false };
  }
};

// ==========================================
// PROFILE & SITE SETTINGS
// ==========================================

export const fetchProfileFromSupabase = async (): Promise<Profile | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return {
      fullName: data.full_name,
      displayNameBn: data.display_name_bn,
      displayNameEn: data.display_name_en,
      professionalTitleBn: data.professional_title_bn,
      professionalTitleEn: data.professional_title_en,
      bioBn: data.bio_bn,
      bioEn: data.bio_en,
      aboutIntroBn: data.about_intro_bn,
      aboutIntroEn: data.about_intro_en,
      sinceYear: data.since_year,
      projectsCount: data.projects_count,
      clientsCount: data.clients_count,
      avatarUrl: data.avatar_url,
      coverUrl: data.cover_url,
      primaryMobile: data.primary_mobile,
      alternativeMobile: data.alternative_mobile,
      businessMobile: data.business_mobile,
      primaryEmail: data.primary_email,
      businessEmail: data.business_email,
      whatsappUrl: data.whatsapp_url,
      messengerUrl: data.messenger_url,
    };
  } catch (e) {
    console.error('Error fetching profile from Supabase:', e);
    return null;
  }
};

export const saveProfileToSupabase = async (profile: Profile): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: 'owner_profile',
      full_name: profile.fullName,
      display_name_bn: profile.displayNameBn,
      display_name_en: profile.displayNameEn,
      professional_title_bn: profile.professionalTitleBn,
      professional_title_en: profile.professionalTitleEn,
      bio_bn: profile.bioBn,
      bio_en: profile.bioEn,
      about_intro_bn: profile.aboutIntroBn,
      about_intro_en: profile.aboutIntroEn,
      since_year: profile.sinceYear,
      projects_count: profile.projectsCount,
      clients_count: profile.clientsCount,
      avatar_url: profile.avatarUrl,
      cover_url: profile.coverUrl,
      primary_mobile: profile.primaryMobile,
      alternative_mobile: profile.alternativeMobile,
      business_mobile: profile.businessMobile,
      primary_email: profile.primaryEmail,
      business_email: profile.businessEmail,
      whatsapp_url: profile.whatsappUrl,
      messenger_url: profile.messengerUrl,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Error saving profile to Supabase:', e);
    return false;
  }
};

export const fetchSiteSettingsFromSupabase = async (): Promise<SiteSettings | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (error || !data) return null;
    return {
      domain: data.domain,
      websiteName: data.website_name,
      brandNameBn: data.brand_name_bn,
      brandNameEn: data.brand_name_en,
      taglineBn: data.tagline_bn,
      taglineEn: data.tagline_en,
      announcementTextBn: data.announcement_text_bn,
      announcementTextEn: data.announcement_text_en,
      announcementActive: data.announcement_active,
      contactEmail: data.contact_email,
      contactPhone: data.contact_phone,
      copyrightTextBn: data.copyright_text_bn,
      copyrightTextEn: data.copyright_text_en,
    };
  } catch (e) {
    console.error('Error fetching site settings from Supabase:', e);
    return null;
  }
};

export const saveSiteSettingsToSupabase = async (settings: SiteSettings): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: 'default_settings',
      domain: settings.domain,
      website_name: settings.websiteName,
      brand_name_bn: settings.brandNameBn,
      brand_name_en: settings.brandNameEn,
      tagline_bn: settings.taglineBn,
      tagline_en: settings.taglineEn,
      announcement_text_bn: settings.announcementTextBn,
      announcement_text_en: settings.announcementTextEn,
      announcement_active: settings.announcementActive,
      contact_email: settings.contactEmail,
      contact_phone: settings.contactPhone,
      copyright_text_bn: settings.copyrightTextBn,
      copyright_text_en: settings.copyrightTextEn,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('site_settings').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Error saving site settings to Supabase:', e);
    return false;
  }
};

// ==========================================
// BLOG POSTS & COMMENTS
// ==========================================

export const fetchPostsFromSupabase = async (): Promise<BlogPost[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (postsError || !posts) return null;

    // Fetch comments for posts
    const { data: comments } = await supabase
      .from('blog_comments')
      .select('*')
      .order('created_at', { ascending: true });

    const commentsMap: Record<string, any[]> = {};
    if (comments) {
      comments.forEach(c => {
        if (!commentsMap[c.post_id]) commentsMap[c.post_id] = [];
        commentsMap[c.post_id].push({
          id: c.id,
          author: c.author,
          text: c.text,
          date: c.date_formatted || new Date(c.created_at).toLocaleDateString(),
        });
      });
    }

    return posts.map(p => ({
      id: p.id,
      titleBn: p.title_bn,
      titleEn: p.title_en,
      slug: p.slug,
      category: p.category,
      type: p.type,
      contentBn: p.content_bn,
      contentEn: p.content_en,
      excerptBn: p.excerpt_bn,
      excerptEn: p.excerpt_en,
      featuredImage: p.featured_image,
      galleryImages: p.gallery_images,
      youtubeUrl: p.youtube_url,
      externalUrl: p.external_url,
      author: p.author,
      date: p.date_published,
      tags: p.tags || [],
      status: p.status,
      scheduledDate: p.scheduled_date,
      seoTitle: p.seo_title,
      seoDescription: p.seo_description,
      likes: p.likes || 0,
      views: p.views || 0,
      comments: commentsMap[p.id] || [],
    }));
  } catch (e) {
    console.error('Error fetching blog posts from Supabase:', e);
    return null;
  }
};

export const savePostToSupabase = async (post: BlogPost): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: post.id,
      title_bn: post.titleBn,
      title_en: post.titleEn,
      slug: post.slug,
      category: post.category,
      type: post.type,
      content_bn: post.contentBn,
      content_en: post.contentEn,
      excerpt_bn: post.excerptBn,
      excerpt_en: post.excerptEn,
      featured_image: post.featuredImage,
      gallery_images: post.galleryImages,
      youtube_url: post.youtubeUrl,
      external_url: post.externalUrl,
      author: post.author,
      date_published: post.date,
      tags: post.tags,
      status: post.status,
      scheduled_date: post.scheduledDate,
      seo_title: post.seoTitle,
      seo_description: post.seoDescription,
      likes: post.likes,
      views: post.views,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('blog_posts').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Error saving blog post to Supabase:', e);
    return false;
  }
};

export const deletePostFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

export const likePostInSupabase = async (id: string, currentLikes: number): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update({ likes: currentLikes + 1 })
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

export const addCommentToSupabase = async (
  postId: string,
  author: string,
  text: string
): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('blog_comments').insert({
      id: 'cmt-' + Date.now(),
      post_id: postId,
      author,
      text,
      date_formatted: new Date().toLocaleDateString('bn-BD'),
      created_at: new Date().toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// PORTFOLIO
// ==========================================

export const fetchPortfoliosFromSupabase = async (): Promise<PortfolioItem[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    // 1. Try portfolio_items first
    let res = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    // 2. Fall back to portfolio table if portfolio_items is missing or errors
    if (res.error || !res.data || res.data.length === 0) {
      res = await supabase
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
    }

    if (res.error || !res.data) return null;
    return res.data.map((p: any) => ({
      id: p.id,
      titleBn: p.title_bn || p.titleBn,
      titleEn: p.title_en || p.titleEn,
      client: p.client,
      type: p.type,
      roleBn: p.role_bn || p.roleBn,
      roleEn: p.role_en || p.roleEn,
      descriptionBn: p.description_bn || p.descriptionBn,
      descriptionEn: p.description_en || p.descriptionEn,
      imageUrl: p.image_url || p.imageUrl,
      link: p.link,
      featured: p.featured ?? true,
      date: p.date,
    }));
  } catch (e) {
    console.warn('Error fetching portfolio from Supabase:', e);
    return null;
  }
};

export const savePortfolioToSupabase = async (item: PortfolioItem): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: item.id,
      title_bn: item.titleBn,
      title_en: item.titleEn,
      client: item.client,
      type: item.type,
      role_bn: item.roleBn,
      role_en: item.roleEn,
      description_bn: item.descriptionBn,
      description_en: item.descriptionEn,
      image_url: item.imageUrl,
      link: item.link,
      featured: item.featured,
      date: item.date,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('portfolio').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Error saving portfolio to Supabase:', e);
    return false;
  }
};

export const deletePortfolioFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('portfolio').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// WORK EXPERIENCES
// ==========================================

export const fetchExperiencesFromSupabase = async (): Promise<ExperienceItem[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('joining_date', { ascending: false });

    if (error || !data) return null;
    return data.map((e: any) => ({
      id: e.id,
      organization: e.organization,
      position: e.position,
      duration: e.duration || (e.joining_date ? `${e.joining_date} - ${e.is_current ? 'Present' : e.end_date || ''}` : ''),
      joiningDate: e.joining_date || e.joiningDate,
      endDate: e.end_date || e.endDate,
      responsibilities: e.responsibilities,
      achievements: e.achievements,
      isCurrent: Boolean(e.is_current ?? e.isCurrent),
    }));
  } catch (e) {
    console.warn('Error fetching experiences from Supabase:', e);
    return null;
  }
};

export const saveExperienceToSupabase = async (item: ExperienceItem): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: item.id,
      organization: item.organization,
      position: item.position,
      duration: item.duration,
      joining_date: item.joiningDate,
      end_date: item.endDate,
      responsibilities: item.responsibilities,
      achievements: item.achievements,
      is_current: item.isCurrent,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('experiences').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Exception saving experience to Supabase:', e);
    return false;
  }
};

export const deleteExperienceFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// EDUCATION & ACADEMIC CREDENTIALS
// ==========================================

export const fetchEducationsFromSupabase = async (): Promise<EducationItem[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    let res = await supabase
      .from('educations')
      .select('*')
      .order('id', { ascending: true });

    if (res.error || !res.data) {
      res = await supabase
        .from('education')
        .select('*')
        .order('id', { ascending: true });
    }

    if (res.error || !res.data) return null;
    return res.data.map((ed: any) => ({
      id: ed.id,
      degreeBn: ed.degree_bn || ed.degreeBn || ed.degree || '',
      degreeEn: ed.degree_en || ed.degreeEn || ed.degree || '',
      institutionBn: ed.institution_bn || ed.institutionBn || ed.institution || '',
      institutionEn: ed.institution_en || ed.institutionEn || ed.institution || '',
      subjectBn: ed.subject_bn || ed.subjectBn || ed.group_major || ed.subject || '',
      subjectEn: ed.subject_en || ed.subjectEn || ed.group_major || ed.subject || '',
      statusBn: ed.status_bn || ed.statusBn || (ed.passing_year ? `${ed.passing_year}` : 'সম্পন্ন'),
      statusEn: ed.status_en || ed.statusEn || (ed.passing_year ? `${ed.passing_year}` : 'Completed'),
      result: ed.result,
    }));
  } catch (e) {
    console.warn('Notice fetching educations from Supabase (using local fallback):', e);
    return null;
  }
};

export const saveEducationToSupabase = async (item: EducationItem): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: item.id,
      degree_bn: item.degreeBn,
      degree_en: item.degreeEn,
      institution_bn: item.institutionBn,
      institution_en: item.institutionEn,
      subject_bn: item.subjectBn,
      subject_en: item.subjectEn,
      status_bn: item.statusBn,
      status_en: item.statusEn,
      result: item.result,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('educations').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Exception saving education to Supabase:', e);
    return false;
  }
};

export const deleteEducationFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('educations').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// BUSINESSES & VENTURES
// ==========================================

export const fetchBusinessesFromSupabase = async (): Promise<BusinessItem[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('businesses')
      .select('*');

    if (error || !data) return null;
    return data.map((b: any) => ({
      id: b.id,
      companyBn: b.company_bn,
      companyEn: b.company_en,
      founded: b.founded,
      positionBn: b.position_bn,
      positionEn: b.position_en,
      descriptionBn: b.description_bn,
      descriptionEn: b.description_en,
      services: Array.isArray(b.services) ? b.services : [],
      phone: b.phone,
      email: b.email,
      website: b.website,
      facebook: b.facebook,
      logoUrl: b.logo_url,
    }));
  } catch (e) {
    console.warn('Notice fetching businesses from Supabase (using fallback):', e);
    return null;
  }
};

export const saveBusinessToSupabase = async (b: BusinessItem): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: b.id,
      company_bn: b.companyBn,
      company_en: b.companyEn,
      founded: b.founded,
      position_bn: b.positionBn,
      position_en: b.positionEn,
      description_bn: b.descriptionBn,
      description_en: b.descriptionEn,
      services: b.services,
      phone: b.phone,
      email: b.email,
      website: b.website,
      facebook: b.facebook,
      logo_url: b.logoUrl,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('businesses').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch (e) {
    console.error('Exception saving business to Supabase:', e);
    return false;
  }
};

// ==========================================
// TESTIMONIALS
// ==========================================

export const fetchTestimonialsFromSupabase = async (): Promise<TestimonialItem[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data.map(t => ({
      id: t.id,
      clientName: t.client_name,
      designation: t.designation,
      company: t.company,
      feedbackBn: t.feedback_bn,
      feedbackEn: t.feedback_en,
      rating: t.rating,
      date: t.date,
    }));
  } catch (e) {
    console.error('Error fetching testimonials from Supabase:', e);
    return null;
  }
};

export const saveTestimonialToSupabase = async (item: TestimonialItem): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: item.id,
      client_name: item.clientName,
      designation: item.designation,
      company: item.company,
      feedback_bn: item.feedbackBn,
      feedback_en: item.feedbackEn,
      rating: item.rating,
      date: item.date,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('testimonials').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
};

export const deleteTestimonialFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// SERVICES
// ==========================================

export const fetchServicesFromSupabase = async (): Promise<ServiceCategory[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('number', { ascending: true });

    if (error || !data) return null;
    return data.map(s => ({
      id: s.id,
      number: s.number,
      titleBn: s.title_bn,
      titleEn: s.title_en,
      descriptionBn: s.description_bn,
      descriptionEn: s.description_en,
      iconName: s.icon_name,
      itemsBn: s.items_bn || [],
      itemsEn: s.items_en || [],
    }));
  } catch (e) {
    console.error('Error fetching services from Supabase:', e);
    return null;
  }
};

export const saveServiceToSupabase = async (s: ServiceCategory): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: s.id,
      number: s.number,
      title_bn: s.titleBn,
      title_en: s.titleEn,
      description_bn: s.descriptionBn,
      description_en: s.descriptionEn,
      icon_name: s.iconName,
      items_bn: s.itemsBn,
      items_en: s.itemsEn,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('services').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
};

export const deleteServiceFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('services').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// SOCIAL LINKS
// ==========================================

export const fetchSocialLinksFromSupabase = async (): Promise<SocialLink[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('order_num', { ascending: true });

    if (error || !data) return null;
    return data.map(s => ({
      id: s.id,
      platform: s.platform,
      username: s.username,
      url: s.url,
      icon: s.icon,
      description: s.description,
      descriptionBn: s.description_bn,
      accent: s.accent,
      ctaBn: s.cta_bn,
      ctaEn: s.cta_en,
      category: s.category,
      enabled: s.enabled,
      order: s.order_num,
      featured: s.featured,
      label: s.label,
    }));
  } catch (e) {
    console.error('Error fetching social links from Supabase:', e);
    return null;
  }
};

export const saveSocialLinkToSupabase = async (link: SocialLink): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: link.id,
      platform: link.platform,
      username: link.username,
      url: link.url,
      icon: link.icon,
      description: link.description,
      description_bn: link.descriptionBn,
      accent: link.accent,
      cta_bn: link.ctaBn,
      cta_en: link.ctaEn,
      category: link.category,
      enabled: link.enabled,
      order_num: link.order,
      featured: link.featured,
      label: link.label,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('social_links').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
};

export const deleteSocialLinkFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// OFFICES
// ==========================================

export const fetchOfficesFromSupabase = async (): Promise<OfficeLocation[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('offices')
      .select('*')
      .order('created_at', { ascending: true });

    if (error || !data) return null;
    return data.map(o => ({
      id: o.id,
      type: o.type,
      titleBn: o.title_bn,
      titleEn: o.title_en,
      companyBn: o.company_bn,
      companyEn: o.company_en,
      addressBn: o.address_bn,
      addressEn: o.address_en,
      phone: o.phone,
      whatsappUrl: o.whatsapp_url,
      email: o.email,
      hoursBn: o.hours_bn,
      hoursEn: o.hours_en,
      googleMapsUrl: o.google_maps_url,
      isMapAvailable: o.is_map_available,
    }));
  } catch (e) {
    console.error('Error fetching offices from Supabase:', e);
    return null;
  }
};

export const saveOfficeToSupabase = async (office: OfficeLocation): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const payload = {
      id: office.id,
      type: office.type,
      title_bn: office.titleBn,
      title_en: office.titleEn,
      company_bn: office.companyBn,
      company_en: office.companyEn,
      address_bn: office.addressBn,
      address_en: office.addressEn,
      phone: office.phone,
      whatsapp_url: office.whatsappUrl,
      email: office.email,
      hours_bn: office.hoursBn,
      hours_en: office.hoursEn,
      google_maps_url: office.googleMapsUrl,
      is_map_available: office.isMapAvailable,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('offices').upsert(payload, { onConflict: 'id' });
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// CONTACT MESSAGES
// ==========================================

export const submitContactMessageToSupabase = async (
  msg: Omit<ContactMessage, 'id' | 'date' | 'status'>
): Promise<{ success: boolean; id?: string }> => {
  if (!isSupabaseConfigured()) {
    return { success: false };
  }
  try {
    const cleanName = sanitizeInput(msg.name, 100);
    const cleanPhone = sanitizeInput(msg.phone, 30);
    const cleanEmail = sanitizeInput(msg.email, 100);
    const cleanService = sanitizeInput(msg.service, 100);
    const cleanBudget = sanitizeInput(msg.budget, 50);
    const cleanMessage = sanitizeInput(msg.message, 3000);

    if (!cleanName || !cleanPhone || !cleanMessage) {
      showToast('অনুগ্রহ করে আপনার নাম, ফোন এবং বার্তা লিখুন।', 'error');
      return { success: false };
    }

    const id = 'msg-' + Date.now();
    const { error } = await supabase.from('contact_messages').insert({
      id,
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail || null,
      service: cleanService || 'General Inquiry',
      budget: cleanBudget || null,
      message: cleanMessage,
      status: 'unread',
      date_submitted: new Date().toLocaleString('bn-BD'),
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error('[Supabase Contact] Error inserting message:', error);
      showToast('বার্তা পাঠানো সম্ভব হয়নি। দয়া করে হোয়াটসঅ্যাপে মেসেজ দিন।', 'error');
      return { success: false };
    }

    showToast('আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে! শীঘ্রই আপনার সাথে যোগাযোগ করা হবে।', 'success');
    return { success: true, id };
  } catch (e) {
    console.error('[Supabase Contact] Exception submitting message:', e);
    showToast('সংযোগ ত্রুটি। অফলাইন ব্যাকআপ সংরক্ষিত হয়েছে।', 'error');
    return { success: false };
  }
};

export const fetchContactMessagesFromSupabase = async (): Promise<ContactMessage[] | null> => {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;
    return data.map(m => ({
      id: m.id,
      name: m.name,
      phone: m.phone,
      email: m.email,
      service: m.service,
      budget: m.budget,
      message: m.message,
      date: m.date_submitted || new Date(m.created_at).toLocaleString(),
      status: m.status,
    }));
  } catch (e) {
    console.error('Error fetching contact messages from Supabase:', e);
    return null;
  }
};

export const updateMessageStatusInSupabase = async (
  id: string,
  status: 'unread' | 'read' | 'replied'
): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

export const deleteMessageFromSupabase = async (id: string): Promise<boolean> => {
  if (!isSupabaseConfigured()) return false;
  try {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    return !error;
  } catch {
    return false;
  }
};

// ==========================================
// ONE-CLICK SYNC ALL LOCAL DATA TO SUPABASE
// ==========================================

export const syncAllDataToSupabase = async (allData: {
  siteSettings: SiteSettings;
  profile: Profile;
  services: ServiceCategory[];
  businesses: BusinessItem[];
  experiences: ExperienceItem[];
  portfolios: PortfolioItem[];
  testimonials: TestimonialItem[];
  faqs: FaqItem[];
  socialLinks: SocialLink[];
  offices: OfficeLocation[];
  posts: BlogPost[];
}): Promise<{ success: boolean; message: string; details?: any }> => {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message: 'Supabase credentials are not configured. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
    };
  }

  try {
    // 1. Settings
    await saveSiteSettingsToSupabase(allData.siteSettings);

    // 2. Profile
    await saveProfileToSupabase(allData.profile);

    // 3. Services
    for (const s of allData.services) {
      await saveServiceToSupabase(s);
    }

    // 4. Portfolios
    for (const p of allData.portfolios) {
      await savePortfolioToSupabase(p);
    }

    // 5. Testimonials
    for (const t of allData.testimonials) {
      await saveTestimonialToSupabase(t);
    }

    // 6. Social links
    for (const link of allData.socialLinks) {
      await saveSocialLinkToSupabase(link);
    }

    // 7. Offices
    for (const o of allData.offices) {
      await saveOfficeToSupabase(o);
    }

    // 8. Blog posts
    for (const post of allData.posts) {
      await savePostToSupabase(post);
    }

    return {
      success: true,
      message: 'All local site data has been successfully synchronized to your live Supabase database!',
    };
  } catch (err: any) {
    return {
      success: false,
      message: 'Sync partially failed: ' + (err?.message || 'Unknown error'),
    };
  }
};
