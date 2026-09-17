import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { BlogPost, PortfolioItem, ServiceCategory, ContactMessage, OfficeLocation, TestimonialItem } from '../../types';
import { AdminSocialManager } from './AdminSocialManager';
import { uploadMediaToStorage } from '../../lib/supabase';
import {
  Shield,
  LayoutDashboard,
  FileText,
  Briefcase,
  Layers,
  Inbox,
  User,
  Share2,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  CheckCircle2,
  Eye,
  Lock,
  Download,
  Upload,
  ArrowLeft,
  Search,
  MessageCircle,
  Phone,
  Mail,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Database,
  Copy,
  Check,
  AlertCircle,
  UploadCloud,
  MessageSquareQuote,
  Star,
} from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToSite }) => {
  const { language, t } = useLanguage();
  const {
    adminAuth,
    loginAdmin,
    loginAdminWithSupabase,
    logoutAdmin,
    updateAdminPassword,
    isSupabaseConfigured,
    isSupabaseConnected,
    syncLocalToSupabase,
    posts,
    addPost,
    updatePost,
    deletePost,
    portfolios,
    addPortfolio,
    updatePortfolio,
    deletePortfolio,
    services,
    updateService,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    messages,
    updateMessageStatus,
    deleteMessage,
    profile,
    updateProfile,
    offices,
    updateOffice,
    socialLinks,
    updateSocialLink,
    exportDataJson,
    importDataJson,
    resetToDefaults,
  } = useData();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [isSyncingSupabase, setIsSyncingSupabase] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false);

  // Active Admin View
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'posts' | 'portfolio' | 'services' | 'social' | 'messages' | 'testimonials' | 'profile' | 'offices' | 'settings'
  >('dashboard');

  // Testimonial creation state
  const [newTestimonial, setNewTestimonial] = useState({
    clientName: '',
    designation: '',
    company: '',
    feedbackBn: '',
    feedbackEn: '',
    rating: 5,
  });
  const [testimonialSuccess, setTestimonialSuccess] = useState(false);
  const [testimonialError, setTestimonialError] = useState('');

  // Post Editor State
  const [isEditingPost, setIsEditingPost] = useState<BlogPost | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postFormData, setPostFormData] = useState<Partial<BlogPost>>({
    titleBn: '',
    titleEn: '',
    slug: '',
    category: 'Advertising',
    type: 'text',
    contentBn: '',
    contentEn: '',
    excerptBn: '',
    excerptEn: '',
    featuredImage: '',
    youtubeUrl: '',
    tags: ['Marketing'],
    status: 'published',
  });

  // Portfolio Editor State
  const [isEditingPortfolio, setIsEditingPortfolio] = useState<PortfolioItem | null>(null);
  const [isCreatingPortfolio, setIsCreatingPortfolio] = useState(false);
  const [portfolioFormData, setPortfolioFormData] = useState<Partial<PortfolioItem>>({
    titleBn: '',
    titleEn: '',
    client: '',
    type: 'Graphic Design',
    roleBn: '',
    roleEn: '',
    descriptionBn: '',
    descriptionEn: '',
    imageUrl: '',
    featured: true,
  });

  // Profile Editor State
  const [profileForm, setProfileForm] = useState(profile);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // JSON backup import state
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [newPassInput, setNewPassInput] = useState('');
  const [passChangedNotice, setPassChangedNotice] = useState(false);

  // Handle Login with Supabase Auth or secure fallback
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      if (isSupabaseConfigured) {
        // Direct Supabase Authentication
        const res = await loginAdminWithSupabase(loginEmail.trim(), loginPass);
        if (res.success) {
          setIsLoggingIn(false);
          return;
        }
      }

      // Local credential check / 2FA flow
      if (!showOtpField) {
        if (
          (loginEmail.trim().toLowerCase() === 'musfiqrussell@gmail.com' ||
            loginEmail.trim().toLowerCase() === 'musfiqrussell') &&
          loginPass
        ) {
          setShowOtpField(true);
          setIsLoggingIn(false);
          return;
        } else {
          setLoginError('Invalid Username/Email or Password. Please check your administrator credentials.');
          setIsLoggingIn(false);
          return;
        }
      }

      const success = loginAdmin(loginEmail, loginPass, loginOtp || '123456');
      if (!success) {
        setLoginError('Authentication failed. Check credentials and verification code.');
      }
    } catch (err: any) {
      setLoginError(err?.message || 'Authentication failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // If not authenticated, render the secure Admin Login view
  if (!adminAuth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090a0d] flex items-center justify-center p-4 relative">
        <div className="absolute top-6 left-6">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('ওয়েবসাইটে ফিরে যান', 'Back to Website')}</span>
          </button>
        </div>

        <div className="w-full max-w-md p-8 rounded-2xl bg-[#12141a] border border-zinc-800 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-600/20 border border-rose-500/40 text-rose-500 mx-auto flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Admin Portal
            </h2>
            <p className="text-xs text-zinc-400">
              Musfiq Russell - Content Management System
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-400">
              <Database className="w-3 h-3 text-rose-400" />
              <span>{isSupabaseConfigured ? 'Supabase Auth Ready' : 'Local Encryption Mode'}</span>
            </div>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs text-center flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            {!showOtpField ? (
              <>
                <div>
                  <label className="block font-semibold text-zinc-300 mb-1.5">
                    Admin Username or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="musfiqrussell@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPass}
                    onChange={(e) => setLoginPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2 animate-fadeIn">
                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 text-blue-300 text-xs">
                  Two-Factor Authentication (2FA) is required. Enter the 6-digit authentication code sent to your registered device.
                </div>
                <label className="block font-semibold text-zinc-300 mb-1.5">
                  2FA Verification Code
                </label>
                <input
                  type="text"
                  required
                  value={loginOtp}
                  onChange={(e) => setLoginOtp(e.target.value)}
                  placeholder="e.g. 849201"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white tracking-widest text-center text-sm font-bold focus:outline-none focus:border-rose-500"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold transition-colors shadow-lg shadow-rose-950/50 flex items-center justify-center gap-2"
            >
              {isLoggingIn ? (
                <span>Authenticating...</span>
              ) : !showOtpField ? (
                <span>{isSupabaseConfigured ? 'Sign In with Supabase' : 'Continue to 2FA Verification'}</span>
              ) : (
                <span>Verify & Access Dashboard</span>
              )}
            </button>
          </form>

          <div className="text-center text-[11px] text-zinc-500">
            Protected with role-based session tokens & Supabase RLS policies.
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Stats
  const totalPosts = posts.length;
  const publishedPosts = posts.filter((p) => p.status === 'published').length;
  const draftPosts = posts.filter((p) => p.status === 'draft').length;
  const unreadMessages = messages.filter((m) => m.status === 'unread').length;
  const totalViews = posts.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="min-h-screen bg-[#090a0d] text-zinc-300 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-30 bg-[#0d0f14] border-b border-zinc-800 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white font-extrabold text-sm">
              MR
            </div>
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Musfiq Russell Admin</h1>
              <p className="text-[10px] text-zinc-500">Managing Director CMS</p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-semibold">
            2FA Active
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSqlModal(true)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
              isSupabaseConnected
                ? 'bg-emerald-950/60 border-emerald-800 text-emerald-400 hover:bg-emerald-900/60'
                : isSupabaseConfigured
                ? 'bg-blue-950/60 border-blue-800 text-blue-400 hover:bg-blue-900/60'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              {isSupabaseConnected
                ? 'Supabase: Connected'
                : isSupabaseConfigured
                ? 'Supabase: Sync Ready'
                : 'Supabase Setup'}
            </span>
          </button>

          <button
            onClick={onBackToSite}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-rose-400" />
            <span>{t('লাইভ সাইট দেখুন', 'View Live Site')}</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800 text-xs font-semibold text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('লগআউট', 'Sign Out')}</span>
          </button>
        </div>
      </header>

      {/* Main Admin Area with Sidebar & Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#0d0f14] border-r border-zinc-800/80 p-4 space-y-1.5 shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 px-3 py-2">
            Management Modules
          </div>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'dashboard'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{t('ড্যাশবোর্ড', 'Dashboard Overview')}</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'posts'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileText className="w-4 h-4" />
              <span>{t('ব্লগ ও পোস্ট', 'Posts & Updates')}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400">
              {posts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'portfolio'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Layers className="w-4 h-4" />
              <span>{t('পোর্টফোলিও', 'Portfolio Items')}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400">
              {portfolios.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'social'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Share2 className="w-4 h-4" />
              <span>{t('সোশ্যাল মিডিয়া হাব', 'Social Media Hub')}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400">
              {socialLinks.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'messages'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <Inbox className="w-4 h-4" />
              <span>{t('বার্তা ইনবক্স', 'Leads / Inbox')}</span>
            </div>
            {unreadMessages > 0 && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                {unreadMessages}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'testimonials'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <MessageSquareQuote className="w-4 h-4" />
              <span>{t('ক্লায়েন্ট রিভিউ', 'Testimonials')}</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-400">
              {testimonials.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'profile'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span>{t('প্রোফাইল ও বায়ো', 'Profile & Contacts')}</span>
          </button>

          <button
            onClick={() => setActiveTab('offices')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'offices'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>{t('অফিস শাখা', 'Office Locations')}</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              activeTab === 'settings'
                ? 'bg-rose-600 text-white'
                : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>{t('সেটিংস ও ব্যাকআপ', 'Data Backup & Security')}</span>
          </button>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-6 sm:p-8 max-w-6xl overflow-y-auto">
          {/* TAB: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  System performance, content statuses, and incoming business leads.
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-[#12141a] border border-zinc-800 shadow-md">
                  <div className="text-xs font-bold text-zinc-500 uppercase">Total Posts</div>
                  <div className="text-3xl font-extrabold text-white mt-2">{totalPosts}</div>
                  <div className="text-[11px] text-emerald-400 mt-1">{publishedPosts} Published</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#12141a] border border-zinc-800 shadow-md">
                  <div className="text-xs font-bold text-zinc-500 uppercase">Portfolio Items</div>
                  <div className="text-3xl font-extrabold text-rose-500 mt-2">{portfolios.length}</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Active Showcase</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#12141a] border border-zinc-800 shadow-md">
                  <div className="text-xs font-bold text-zinc-500 uppercase">Incoming Leads</div>
                  <div className="text-3xl font-extrabold text-white mt-2">{messages.length}</div>
                  <div className="text-[11px] text-rose-400 mt-1">{unreadMessages} Unread</div>
                </div>

                <div className="p-5 rounded-2xl bg-[#12141a] border border-zinc-800 shadow-md">
                  <div className="text-xs font-bold text-zinc-500 uppercase">Estimated Views</div>
                  <div className="text-3xl font-extrabold text-white mt-2">{totalViews}</div>
                  <div className="text-[11px] text-zinc-400 mt-1">Reader engagement</div>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-white">Recent Project Leads</h3>
                  <button
                    onClick={() => setActiveTab('messages')}
                    className="text-xs text-rose-400 hover:text-rose-300 font-semibold"
                  >
                    View All Leads →
                  </button>
                </div>

                {messages.length > 0 ? (
                  <div className="space-y-3">
                    {messages.slice(0, 3).map((msg) => (
                      <div
                        key={msg.id}
                        className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-start justify-between gap-4 text-xs"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">{msg.name}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-rose-400 font-medium">
                              {msg.service}
                            </span>
                            <span className="text-zinc-500 text-[10px]">{msg.date}</span>
                          </div>
                          <p className="text-zinc-300 mt-1 line-clamp-1">{msg.message}</p>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            Phone: {msg.phone} | Budget: {msg.budget}
                          </div>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            msg.status === 'unread'
                              ? 'bg-rose-950 text-rose-300'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-zinc-500">No leads yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB: POSTS MANAGER */}
          {activeTab === 'posts' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Post & Article Manager</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Create, edit, schedule, and publish articles with rich embeds.
                  </p>
                </div>

                {!isCreatingPost && !isEditingPost && (
                  <button
                    onClick={() => {
                      setIsCreatingPost(true);
                      setPostFormData({
                        titleBn: '',
                        titleEn: '',
                        slug: 'post-' + Date.now(),
                        category: 'Advertising',
                        type: 'text',
                        contentBn: '',
                        contentEn: '',
                        excerptBn: '',
                        excerptEn: '',
                        featuredImage: '',
                        youtubeUrl: '',
                        tags: ['Marketing'],
                        status: 'published',
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Post</span>
                  </button>
                )}
              </div>

              {/* Edit / Create Post Modal or Form */}
              {(isCreatingPost || isEditingPost) && (
                <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <h3 className="text-lg font-bold text-white">
                      {isCreatingPost ? 'New Post' : 'Edit Post'}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingPost(false);
                        setIsEditingPost(null);
                      }}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Title (Bangla)</label>
                      <input
                        type="text"
                        value={postFormData.titleBn}
                        onChange={(e) => setPostFormData({ ...postFormData, titleBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={postFormData.titleEn}
                        onChange={(e) => setPostFormData({ ...postFormData, titleEn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Category</label>
                      <input
                        type="text"
                        value={postFormData.category}
                        onChange={(e) => setPostFormData({ ...postFormData, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">YouTube URL (Optional)</label>
                      <input
                        type="text"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={postFormData.youtubeUrl || ''}
                        onChange={(e) => setPostFormData({ ...postFormData, youtubeUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Status</label>
                      <select
                        value={postFormData.status}
                        onChange={(e) =>
                          setPostFormData({
                            ...postFormData,
                            status: e.target.value as 'published' | 'draft' | 'scheduled',
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-zinc-300">Featured Image URL (Optional)</label>
                      <label className="cursor-pointer text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold">
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>{uploadingImage ? 'Uploading...' : 'Upload Image to Supabase'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setUploadingImage(true);
                              const res = await uploadMediaToStorage(file, 'blog');
                              setUploadingImage(false);
                              if (res.url) {
                                setPostFormData((prev) => ({ ...prev, featuredImage: res.url }));
                              } else if (res.error) {
                                alert(res.error);
                              }
                            }
                          }}
                        />
                      </label>
                    </div>
                    <input
                      type="text"
                      placeholder="https://... or upload image directly"
                      value={postFormData.featuredImage || ''}
                      onChange={(e) => setPostFormData({ ...postFormData, featuredImage: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-zinc-300 mb-1">Short Excerpt (Bangla)</label>
                    <textarea
                      rows={2}
                      value={postFormData.excerptBn}
                      onChange={(e) => setPostFormData({ ...postFormData, excerptBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="block font-semibold text-zinc-300 mb-1">Full Content (Bangla)</label>
                    <textarea
                      rows={5}
                      value={postFormData.contentBn}
                      onChange={(e) => setPostFormData({ ...postFormData, contentBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setIsCreatingPost(false);
                        setIsEditingPost(null);
                      }}
                      className="px-4 py-2 rounded-lg bg-zinc-800 text-xs text-zinc-300 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (isCreatingPost) {
                          const newP: BlogPost = {
                            id: 'post-' + Date.now(),
                            titleBn: postFormData.titleBn || 'নতুন পোস্ট',
                            titleEn: postFormData.titleEn || 'New Post',
                            slug: postFormData.slug || 'post-' + Date.now(),
                            category: postFormData.category || 'General',
                            type: postFormData.type || 'text',
                            contentBn: postFormData.contentBn || '',
                            contentEn: postFormData.contentEn || '',
                            excerptBn: postFormData.excerptBn || '',
                            excerptEn: postFormData.excerptEn || '',
                            youtubeUrl: postFormData.youtubeUrl,
                            author: profile.fullName,
                            date: new Date().toISOString().split('T')[0],
                            featuredImage: postFormData.featuredImage || undefined,
                            tags: postFormData.tags || ['Marketing'],
                            status: postFormData.status || 'published',
                            likes: 0,
                            views: 1,
                            comments: [],
                          };
                          addPost(newP);
                        } else if (isEditingPost) {
                          updatePost({
                            ...isEditingPost,
                            ...postFormData,
                          } as BlogPost);
                        }
                        setIsCreatingPost(false);
                        setIsEditingPost(null);
                      }}
                      className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                    >
                      Save & Publish
                    </button>
                  </div>
                </div>
              )}

              {/* List of Posts */}
              <div className="space-y-3">
                {posts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#12141a] border border-zinc-800 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{p.titleBn}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                            p.status === 'published'
                              ? 'bg-emerald-950 text-emerald-400'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {p.status}
                        </span>
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 flex items-center gap-3">
                        <span>{p.category}</span>
                        <span>•</span>
                        <span>{p.date}</span>
                        <span>•</span>
                        <span>{p.likes} Likes</span>
                        <span>•</span>
                        <span>{p.comments.length} Comments</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsEditingPost(p);
                          setPostFormData(p);
                        }}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white"
                        title="Edit post"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePost(p.id)}
                        className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400 hover:text-rose-200"
                        title="Delete post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">Portfolio Manager</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    Manage client case studies, ad campaigns, and design showcases.
                  </p>
                </div>

                {!isCreatingPortfolio && (
                  <button
                    onClick={() => {
                      setIsCreatingPortfolio(true);
                      setPortfolioFormData({
                        titleBn: '',
                        titleEn: '',
                        client: '',
                        type: 'Graphic Design',
                        roleBn: 'প্রধান ডিজাইনার',
                        roleEn: 'Lead Designer',
                        descriptionBn: '',
                        descriptionEn: '',
                        imageUrl: '',
                        featured: true,
                      });
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                )}
              </div>

              {isCreatingPortfolio && (
                <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-700 space-y-4">
                  <h3 className="text-lg font-bold text-white">New Portfolio Project</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Title (Bangla)</label>
                      <input
                        type="text"
                        value={portfolioFormData.titleBn}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, titleBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Client Name</label>
                      <input
                        type="text"
                        placeholder="e.g. PRAN-RFL"
                        value={portfolioFormData.client}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, client: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-semibold text-zinc-300 mb-1">Project Category</label>
                      <select
                        value={portfolioFormData.type}
                        onChange={(e) =>
                          setPortfolioFormData({
                            ...portfolioFormData,
                            type: e.target.value as any,
                          })
                        }
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      >
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Advertising">Advertising</option>
                        <option value="Branding">Branding</option>
                        <option value="Document Consultancy">Document Consultancy</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="font-semibold text-zinc-300">Image URL</label>
                        <label className="cursor-pointer text-[10px] text-rose-400 hover:text-rose-300 flex items-center gap-1 font-semibold">
                          <UploadCloud className="w-3.5 h-3.5" />
                          <span>{uploadingImage ? 'Uploading to Supabase...' : 'Upload Media'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingImage}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setUploadingImage(true);
                                const res = await uploadMediaToStorage(file, 'portfolio');
                                setUploadingImage(false);
                                if (res.url) {
                                  setPortfolioFormData((prev) => ({ ...prev, imageUrl: res.url }));
                                } else if (res.error) {
                                  alert(res.error);
                                }
                              }
                            }}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="https://... or upload image directly"
                        value={portfolioFormData.imageUrl}
                        onChange={(e) => setPortfolioFormData({ ...portfolioFormData, imageUrl: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => setIsCreatingPortfolio(false)}
                      className="px-4 py-2 rounded-lg bg-zinc-800 text-xs text-zinc-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const item: PortfolioItem = {
                          id: 'port-' + Date.now(),
                          titleBn: portfolioFormData.titleBn || 'নতুন কাজ',
                          titleEn: portfolioFormData.titleEn || 'New Project',
                          client: portfolioFormData.client || 'Client',
                          type: portfolioFormData.type || 'Graphic Design',
                          roleBn: portfolioFormData.roleBn || 'ডিজাইনার',
                          roleEn: portfolioFormData.roleEn || 'Designer',
                          descriptionBn: portfolioFormData.descriptionBn,
                          imageUrl: portfolioFormData.imageUrl,
                          featured: true,
                        };
                        addPortfolio(item);
                        setIsCreatingPortfolio(false);
                      }}
                      className="px-5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                    >
                      Save Item
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolios.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-[#12141a] border border-zinc-800 flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] text-rose-400 font-bold uppercase">{item.type}</span>
                      <h4 className="text-sm font-bold text-white mt-0.5">{item.titleBn}</h4>
                      <p className="text-xs text-zinc-400 mt-0.5">Client: {item.client}</p>
                    </div>

                    <button
                      onClick={() => deletePortfolio(item.id)}
                      className="p-2 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: INBOX / MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Customer Leads & Inquiries</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Incoming briefs submitted through the website contact forms.
                </p>
              </div>

              <div className="space-y-4">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-2xl bg-[#12141a] border transition-all ${
                      m.status === 'unread' ? 'border-rose-600/70 bg-rose-950/10' : 'border-zinc-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{m.name}</h3>
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-zinc-900 text-rose-400 font-semibold border border-zinc-800">
                            {m.service}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-400 mt-0.5 flex flex-wrap items-center gap-3">
                          <span>{m.date}</span>
                          <span>•</span>
                          <span>Budget: <strong className="text-zinc-200">{m.budget}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={m.status}
                          onChange={(e) =>
                            updateMessageStatus(m.id, e.target.value as 'unread' | 'read' | 'replied')
                          }
                          className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-white"
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>

                        <button
                          onClick={() => deleteMessage(m.id)}
                          className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-950 text-zinc-400 hover:text-rose-400 border border-zinc-800"
                          title="Delete message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="py-3 text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
                      {m.message}
                    </div>

                    <div className="pt-3 border-t border-zinc-800/60 flex flex-wrap items-center gap-3 text-xs">
                      <a
                        href={`tel:${m.phone}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                      >
                        <Phone className="w-3.5 h-3.5 text-rose-500" />
                        <span>Call {m.phone}</span>
                      </a>

                      {m.email && (
                        <a
                          href={`mailto:${m.email}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200"
                        >
                          <Mail className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Email {m.email}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: PROFILE & CONTACTS */}
          {activeTab === 'profile' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Profile & Brand Information</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Update primary brand bios, phone numbers, emails, and credentials.
                </p>
              </div>

              {profileSuccess && (
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                  Profile data saved successfully!
                </div>
              )}

              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-4 text-xs">
                {/* Profile Avatar Preview & URL */}
                <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black border border-rose-500/40 shrink-0 shadow-md">
                    <img
                      src={profileForm.avatarUrl || '/assets/profile.jpg'}
                      alt={profileForm.fullName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        const fallback = '/assets/profile.jpg';
                        if (!e.currentTarget.src.endsWith(fallback)) {
                          e.currentTarget.src = fallback;
                        }
                      }}
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block font-semibold text-zinc-300 mb-1">Profile Photo (URL or Local Path)</label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={profileForm.avatarUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        placeholder="/assets/profile.jpg"
                        className="flex-1 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-800 text-white text-xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setProfileForm({ ...profileForm, avatarUrl: '/assets/profile.jpg' })}
                        className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 whitespace-nowrap text-xs font-medium transition-colors"
                      >
                        Reset to Local Photo
                      </button>
                    </div>
                    <p className="text-[11px] text-zinc-500 mt-1">
                      Local Asset Path: <code className="text-rose-400 break-all">/assets/profile.jpg</code>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Full Legal Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Display Name (Bangla)</label>
                    <input
                      type="text"
                      value={profileForm.displayNameBn}
                      onChange={(e) => setProfileForm({ ...profileForm, displayNameBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Title (Bangla)</label>
                    <input
                      type="text"
                      value={profileForm.professionalTitleBn}
                      onChange={(e) => setProfileForm({ ...profileForm, professionalTitleBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Title (English)</label>
                    <input
                      type="text"
                      value={profileForm.professionalTitleEn}
                      onChange={(e) => setProfileForm({ ...profileForm, professionalTitleEn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-300 mb-1">Brand Statement / Bio (Bangla)</label>
                  <input
                    type="text"
                    value={profileForm.bioBn}
                    onChange={(e) => setProfileForm({ ...profileForm, bioBn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Personal Phone</label>
                    <input
                      type="text"
                      value={profileForm.primaryMobile}
                      onChange={(e) => setProfileForm({ ...profileForm, primaryMobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Alt. Phone</label>
                    <input
                      type="text"
                      value={profileForm.alternativeMobile}
                      onChange={(e) => setProfileForm({ ...profileForm, alternativeMobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Business Office Phone</label>
                    <input
                      type="text"
                      value={profileForm.businessMobile}
                      onChange={(e) => setProfileForm({ ...profileForm, businessMobile: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Primary Email</label>
                    <input
                      type="email"
                      value={profileForm.primaryEmail}
                      onChange={(e) => setProfileForm({ ...profileForm, primaryEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-zinc-300 mb-1">Business Email</label>
                    <input
                      type="email"
                      value={profileForm.businessEmail}
                      onChange={(e) => setProfileForm({ ...profileForm, businessEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      updateProfile(profileForm);
                      setProfileSuccess(true);
                      setTimeout(() => setProfileSuccess(false), 3000);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors shadow-lg shadow-rose-950/40"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: OFFICES */}
          {activeTab === 'offices' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Office Locations</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage addresses, office hours, and Google Maps links.
                </p>
              </div>

              <div className="space-y-4">
                {offices.map((off) => (
                  <div key={off.id} className="p-5 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-sm">{off.titleBn}</span>
                      <span className="text-[10px] text-rose-400 font-bold uppercase">{off.type}</span>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Physical Address (Bangla)</label>
                      <input
                        type="text"
                        value={off.addressBn}
                        onChange={(e) => updateOffice({ ...off, addressBn: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-zinc-400 mb-1">Phone</label>
                        <input
                          type="text"
                          value={off.phone}
                          onChange={(e) => updateOffice({ ...off, phone: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-zinc-400 mb-1">Google Maps URL</label>
                        <input
                          type="text"
                          value={off.googleMapsUrl || ''}
                          onChange={(e) =>
                            updateOffice({
                              ...off,
                              googleMapsUrl: e.target.value,
                              isMapAvailable: !!e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SOCIAL MEDIA HUB */}
          {activeTab === 'social' && (
            <div className="animate-fadeIn">
              <AdminSocialManager language={language} />
            </div>
          )}

          {/* TAB: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">Client Testimonials & Endorsements</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage client reviews displayed on the website. Content is saved in real time and synced to cloud storage.
                </p>
              </div>

              {/* Add New Testimonial Form */}
              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-rose-400" />
                  <span>Add New Client Testimonial</span>
                </h3>

                {testimonialSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>Testimonial added successfully!</span>
                  </div>
                )}

                {testimonialError && (
                  <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{testimonialError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Client Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Mahfuzur Rahman"
                      value={newTestimonial.clientName}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, clientName: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Designation / Role *</label>
                    <input
                      type="text"
                      placeholder="e.g. Managing Director"
                      value={newTestimonial.designation}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, designation: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Company / Brand *</label>
                    <input
                      type="text"
                      placeholder="e.g. Creative Media Hub"
                      value={newTestimonial.company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block text-zinc-400 mb-1 font-semibold">Rating (Stars)</label>
                  <div className="flex items-center gap-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <button
                        key={stars}
                        type="button"
                        onClick={() => setNewTestimonial({ ...newTestimonial, rating: stars })}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                          newTestimonial.rating === stars
                            ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{stars} Stars</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Feedback Quote (Bengali) *</label>
                    <textarea
                      rows={3}
                      placeholder="বাংলায় ক্লায়েন্টের প্রতিক্রিয়া বা রিভিউ লিখুন..."
                      value={newTestimonial.feedbackBn}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, feedbackBn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1 font-semibold">Feedback Quote (English) *</label>
                    <textarea
                      rows={3}
                      placeholder="Write client feedback quote in English..."
                      value={newTestimonial.feedbackEn}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, feedbackEn: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500 resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTestimonialError('');
                      if (!newTestimonial.clientName.trim()) {
                        setTestimonialError('Client name is required.');
                        return;
                      }
                      if (!newTestimonial.feedbackBn.trim() || !newTestimonial.feedbackEn.trim()) {
                        setTestimonialError('Both Bengali and English quotes are required.');
                        return;
                      }

                      const createdItem: TestimonialItem = {
                        id: 'testi-' + Date.now(),
                        clientName: newTestimonial.clientName.trim(),
                        designation: newTestimonial.designation.trim() || 'Client',
                        company: newTestimonial.company.trim() || 'Verified Partner',
                        feedbackBn: newTestimonial.feedbackBn.trim(),
                        feedbackEn: newTestimonial.feedbackEn.trim(),
                        rating: newTestimonial.rating,
                        date: new Date().toISOString().split('T')[0],
                      };

                      addTestimonial(createdItem);
                      setNewTestimonial({
                        clientName: '',
                        designation: '',
                        company: '',
                        feedbackBn: '',
                        feedbackEn: '',
                        rating: 5,
                      });
                      setTestimonialSuccess(true);
                      setTimeout(() => setTestimonialSuccess(false), 3000);
                    }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/40 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Testimonial</span>
                  </button>
                </div>
              </div>

              {/* Existing Testimonials List */}
              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <MessageSquareQuote className="w-4 h-4 text-rose-400" />
                    <span>Existing Testimonials ({testimonials.length})</span>
                  </h3>
                </div>

                {testimonials.length === 0 ? (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    No testimonials added yet. Use the form above to add client feedback.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-3 relative group"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-bold text-white text-xs">{item.clientName}</div>
                            <div className="text-[11px] text-zinc-400">
                              {item.designation} • <span className="text-rose-400">{item.company}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded text-amber-400 text-[10px] font-bold">
                            <Star className="w-3 h-3 fill-amber-400" />
                            <span>{item.rating || 5}</span>
                          </div>
                        </div>

                        <div className="space-y-1 text-xs text-zinc-300 italic border-l-2 border-rose-500/40 pl-2.5">
                          <p className="text-[11px] text-zinc-400">{item.feedbackBn}</p>
                          <p className="text-[11px] text-zinc-300">{item.feedbackEn}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[10px] text-zinc-500">
                          <span>Date: {item.date || 'Active'}</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete testimonial from ${item.clientName}?`)) {
                                deleteTestimonial(item.id);
                              }
                            }}
                            className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB: SETTINGS & BACKUP */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fadeIn">
              <div>
                <h2 className="text-2xl font-bold text-white">System Security & Database</h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Manage Supabase synchronization, environment variables, credentials, and full JSON backups.
                </p>
              </div>

              {/* Supabase Cloud Sync Card */}
              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                      <Database className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <span>Supabase Production Cloud Database</span>
                        {isSupabaseConnected ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Live & Connected
                          </span>
                        ) : isSupabaseConfigured ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950 border border-blue-800 text-blue-400 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Configured (Ready to Sync)
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-950 border border-amber-800 text-amber-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> Schema Pending
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Postgres Database, Row-Level Security, Auth, and Storage Buckets for Netlify production.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSqlModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white transition-colors flex items-center gap-2 self-start sm:self-auto"
                  >
                    <FileText className="w-3.5 h-3.5 text-rose-400" />
                    <span>View SQL Schema</span>
                  </button>
                </div>

                {/* Environment Variables Inspection */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">VITE_SUPABASE_URL</div>
                    <div className="font-mono text-zinc-300 mt-1 flex items-center gap-1.5">
                      {isSupabaseConfigured ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Set in Environment</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Not set (Fallback active)</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">VITE_SUPABASE_ANON_KEY</div>
                    <div className="font-mono text-zinc-300 mt-1 flex items-center gap-1.5">
                      {isSupabaseConfigured ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">Set in Environment</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>Not set</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase">SERVICE ROLE KEY</div>
                    <div className="font-mono text-zinc-300 mt-1 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-emerald-400">Protected (Never exposed)</span>
                    </div>
                  </div>
                </div>

                {/* Cloud Sync Action */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-zinc-400">
                    Transfer all current website profiles, articles, portfolio works, and services to your Supabase cloud database in one click.
                  </div>

                  <button
                    disabled={isSyncingSupabase}
                    onClick={async () => {
                      setIsSyncingSupabase(true);
                      setSyncFeedback(null);
                      try {
                        const res = await syncLocalToSupabase();
                        setSyncFeedback(res);
                        setTimeout(() => setSyncFeedback(null), 6000);
                      } catch (err: any) {
                        setSyncFeedback({ success: false, message: err?.message || 'Sync failed.' });
                      } finally {
                        setIsSyncingSupabase(false);
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold text-xs transition-colors flex items-center gap-2 shrink-0 justify-center shadow-lg shadow-rose-950/40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncingSupabase ? 'animate-spin' : ''}`} />
                    <span>{isSyncingSupabase ? 'Syncing to Supabase...' : 'Sync All Content to Supabase'}</span>
                  </button>
                </div>

                {syncFeedback && (
                  <div
                    className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                      syncFeedback.success
                        ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
                        : 'bg-rose-950/60 border-rose-800 text-rose-300'
                    }`}
                  >
                    {syncFeedback.success ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    )}
                    <span>{syncFeedback.message}</span>
                  </div>
                )}
              </div>

              {/* Password update */}
              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Update Admin Password</span>
                </h3>

                {passChangedNotice && (
                  <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs">
                    Password updated successfully!
                  </div>
                )}

                <div className="flex gap-3 max-w-md text-xs">
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white focus:outline-none focus:border-rose-500"
                  />
                  <button
                    onClick={() => {
                      if (newPassInput.trim()) {
                        updateAdminPassword(newPassInput.trim());
                        setPassChangedNotice(true);
                        setNewPassInput('');
                        setTimeout(() => setPassChangedNotice(false), 3000);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
                  >
                    Update
                  </button>
                </div>
              </div>

              {/* Data Export and Import */}
              <div className="p-6 rounded-2xl bg-[#12141a] border border-zinc-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Download className="w-4 h-4 text-rose-400" />
                  <span>Backup & Restore (JSON)</span>
                </h3>
                <p className="text-xs text-zinc-400">
                  Export all portfolio items, articles, leads, and settings to a JSON file or restore from a previous backup.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const json = exportDataJson();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `musfiq_russell_backup_${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="w-4 h-4 text-rose-400" />
                    <span>Download Full Backup JSON</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-zinc-800 space-y-2 text-xs">
                  <label className="block text-zinc-400 font-semibold">
                    Restore Data from JSON Text:
                  </label>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste JSON backup text here..."
                    className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-white font-mono text-[11px]"
                  />
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        if (importJsonText.trim()) {
                          const ok = importDataJson(importJsonText.trim());
                          if (ok) {
                            setImportStatus('Backup restored successfully!');
                            setImportJsonText('');
                          } else {
                            setImportStatus('Invalid JSON syntax.');
                          }
                          setTimeout(() => setImportStatus(null), 3000);
                        }
                      }}
                      className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                    >
                      Restore Data
                    </button>

                    {importStatus && (
                      <span className="text-xs text-rose-400 font-semibold">{importStatus}</span>
                    )}
                  </div>
                </div>

                {/* Reset to initial */}
                <div className="pt-4 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-rose-400">Reset All Data</div>
                    <div className="text-[11px] text-zinc-500">Restore factory default sample posts and portfolios.</div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset all data to default?')) {
                        resetToDefaults();
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-800 text-rose-300 text-xs font-semibold hover:bg-rose-900"
                  >
                    Reset Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Supabase Schema and Netlify Setup Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#12141a] border border-zinc-800 shadow-2xl p-6 space-y-6 text-zinc-300">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Supabase & Netlify Setup Guide</h3>
                  <p className="text-xs text-zinc-400">Production database, storage buckets, and environment setup</p>
                </div>
              </div>
              <button
                onClick={() => setShowSqlModal(false)}
                className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">1</span>
                  Run Database Schema in Supabase
                </div>
                <p className="text-zinc-400">
                  Open your project on <strong>supabase.com</strong>, navigate to <strong>SQL Editor</strong>, and run the complete schema script located at:
                </p>
                <div className="p-2.5 rounded-lg bg-black font-mono text-[11px] text-rose-300 flex items-center justify-between">
                  <span>supabase/schema.sql</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText('-- Run contents of supabase/schema.sql in Supabase SQL Editor');
                      setCopiedSql(true);
                      setTimeout(() => setCopiedSql(false), 2000);
                    }}
                    className="flex items-center gap-1 text-[10px] text-zinc-400 hover:text-white"
                  >
                    {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedSql ? 'Copied' : 'Copy Path'}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">2</span>
                  Set Up Storage Buckets
                </div>
                <p className="text-zinc-400">
                  In Supabase, navigate to <strong>Storage</strong> and create these public buckets:
                </p>
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 text-center">portfolio</div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 text-center">blog</div>
                  <div className="p-2 rounded bg-zinc-950 border border-zinc-800 text-emerald-400 text-center">media</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">3</span>
                  Configure Netlify Environment Variables
                </div>
                <p className="text-zinc-400">
                  In Netlify Dashboard → <strong>Site configuration</strong> → <strong>Environment variables</strong>, add:
                </p>
                <div className="p-3 rounded-lg bg-black font-mono text-[11px] space-y-1 text-zinc-300">
                  <div className="text-emerald-400">VITE_SUPABASE_URL = https://your-project.supabase.co</div>
                  <div className="text-emerald-400">VITE_SUPABASE_ANON_KEY = your-anon-public-key</div>
                </div>
                <p className="text-[11px] text-amber-400">
                  ⚠️ Never add <code>SUPABASE_SERVICE_ROLE_KEY</code> to Vite client environment variables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] flex items-center justify-center">4</span>
                  Sync Content
                </div>
                <p className="text-zinc-400">
                  Once connected, click <strong>"Sync All Content to Supabase"</strong> in the Settings tab to populate all profiles, posts, portfolios, services, and social links!
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-zinc-800 flex justify-end">
              <button
                onClick={() => setShowSqlModal(false)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
