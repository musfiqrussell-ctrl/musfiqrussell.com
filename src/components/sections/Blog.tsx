import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { BlogPost } from '../../types';
import {
  Newspaper,
  Calendar,
  User,
  Heart,
  MessageSquare,
  Share2,
  ArrowRight,
  Sparkles,
  X,
  Youtube,
  Send,
  Check,
} from 'lucide-react';

export const Blog: React.FC = () => {
  const { language, t } = useLanguage();
  const { posts, likePost, addCommentToPost } = useData();
  const { isDay } = useTheme();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const publishedPosts = posts.filter((p) => p.status === 'published');

  const handleShare = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = window.location.origin + '#blog';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${post.titleBn} - ${url}`);
      setCopiedPostId(post.id);
      setTimeout(() => setCopiedPostId(null), 2000);
    }
  };

  const handleLike = (postId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    likePost(postId);
  };

  const handleSubmitComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim()) return;
    addCommentToPost(postId, newCommentAuthor.trim(), newCommentText.trim());
    setNewCommentAuthor('');
    setNewCommentText('');
  };

  return (
    <section
      id="blog"
      className={`py-20 relative transition-colors duration-300 scroll-mt-24 ${
        isDay ? 'bg-zinc-100/60' : 'bg-zinc-950'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${
              isDay
                ? 'bg-white border-slate-200 text-rose-600 shadow-xs'
                : 'bg-zinc-900 border-zinc-800 text-rose-400'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>{t('ব্লগ ও আপডেট', 'Blog & Knowledge Hub')}</span>
          </div>
          <h2
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${
              isDay ? 'text-slate-900' : 'text-white'
            }`}
          >
            {language === 'bn' ? 'সাম্প্রতিক চিন্তাভাবনা ও আর্টিকেল' : 'Insights & Industry Updates'}
          </h2>
          <p
            className={`mt-3 text-base ${
              isDay ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            {t(
              'ডিজিটাল মার্কেটিং, গ্রাফিক্স ডিজাইন এবং ডকুমেন্ট প্রসেসিং সংক্রান্ত বাস্তব অভিজ্ঞতা ও গাইডলাইন।',
              'Expert perspectives on digital advertising ROI, creative design, and official documentation.'
            )}
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post) => {
            const title = language === 'bn' ? post.titleBn : post.titleEn;
            const excerpt = language === 'bn' ? post.excerptBn : post.excerptEn;

            return (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`cursor-pointer rounded-2xl border transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group hover:-translate-y-1 ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-rose-400 hover:shadow-2xl'
                    : 'bg-[#12141a] border-zinc-800/90 hover:border-rose-900/60'
                }`}
              >
                <div>
                  {/* Optional Featured Image */}
                  {post.featuredImage && (
                    <div className="relative h-44 w-full overflow-hidden bg-zinc-900 border-b border-zinc-800/60">
                      <img
                        src={post.featuredImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.parentElement?.classList.add('hidden');
                        }}
                      />
                    </div>
                  )}

                  {/* Category & Date Header */}
                  <div
                    className={`p-5 pb-3 flex items-center justify-between text-xs border-b ${
                      isDay
                        ? 'border-slate-100 text-slate-500'
                        : 'border-zinc-800/60 text-zinc-400'
                    }`}
                  >
                    <span
                      className={`px-2.5 py-0.5 rounded font-semibold border ${
                        isDay
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-zinc-900 text-rose-400 border-zinc-800'
                      }`}
                    >
                      {post.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 opacity-60" />
                      <span>{post.date}</span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-5 space-y-3">
                    <h3
                      className={`text-lg font-bold tracking-tight transition-colors line-clamp-2 ${
                        isDay
                          ? 'text-slate-900 group-hover:text-rose-600'
                          : 'text-white group-hover:text-rose-400'
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`text-xs line-clamp-3 leading-relaxed ${
                        isDay ? 'text-slate-600' : 'text-zinc-400'
                      }`}
                    >
                      {excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] px-2 py-0.5 rounded border ${
                            isDay
                              ? 'bg-slate-100 text-slate-600 border-slate-200'
                              : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Stats & Actions */}
                <div
                  className={`p-5 pt-3 border-t flex items-center justify-between text-xs ${
                    isDay
                      ? 'border-slate-100 text-slate-500'
                      : 'border-zinc-800/80 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={(e) => handleLike(post.id, e)}
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>{post.likes}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4 opacity-60" />
                      <span>{post.comments.length}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleShare(post, e)}
                      className={`p-1 rounded transition-colors ${
                        isDay ? 'hover:text-slate-900' : 'hover:text-white'
                      }`}
                      title="Share link"
                    >
                      {copiedPostId === post.id ? (
                        <span className="text-emerald-600 flex items-center gap-1 text-[11px]">
                          <Check className="w-3.5 h-3.5" />
                          <span>{t('কপি হয়েছে', 'Copied')}</span>
                        </span>
                      ) : (
                        <Share2 className="w-4 h-4" />
                      )}
                    </button>

                    <span className="font-semibold text-rose-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>{t('পড়ুন', 'Read')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Read Full Article Modal */}
        {selectedPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
            <div
              className={`relative w-full max-w-3xl rounded-2xl border shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-[#12141a] border-zinc-700 text-white'
              }`}
            >
              <button
                onClick={() => setSelectedPost(null)}
                className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                  isDay
                    ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                }`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div
                  className={`flex items-center gap-3 text-xs ${
                    isDay ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  <span
                    className={`px-2.5 py-1 rounded font-bold border ${
                      isDay
                        ? 'bg-rose-50 border-rose-200 text-rose-700'
                        : 'bg-rose-950/70 border-rose-800/60 text-rose-300'
                    }`}
                  >
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                  <span>•</span>
                  <span>{selectedPost.author}</span>
                </div>

                <h3
                  className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {language === 'bn' ? selectedPost.titleBn : selectedPost.titleEn}
                </h3>

                {selectedPost.featuredImage && !selectedPost.youtubeUrl && (
                  <div className="w-full max-h-80 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                    <img
                      src={selectedPost.featuredImage}
                      alt={language === 'bn' ? selectedPost.titleBn : selectedPost.titleEn}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.parentElement?.classList.add('hidden');
                      }}
                    />
                  </div>
                )}

                {selectedPost.youtubeUrl && (
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
                    <iframe
                      src={selectedPost.youtubeUrl.replace('watch?v=', 'embed/')}
                      title="YouTube video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <div
                  className={`text-sm leading-relaxed space-y-4 pt-2 border-t ${
                    isDay
                      ? 'border-slate-200 text-slate-700'
                      : 'border-zinc-800/80 text-zinc-300'
                  }`}
                >
                  <p className="whitespace-pre-line text-base leading-relaxed">
                    {language === 'bn' ? selectedPost.contentBn : selectedPost.contentEn}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedPost.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2.5 py-1 rounded-lg border ${
                        isDay
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Comments Section */}
                <div
                  className={`pt-6 border-t space-y-4 ${
                    isDay ? 'border-slate-200' : 'border-zinc-800'
                  }`}
                >
                  <h4
                    className={`text-base font-bold flex items-center gap-2 ${
                      isDay ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-rose-500" />
                    <span>
                      {t('মন্তব্যসমূহ', 'Comments')} ({selectedPost.comments.length})
                    </span>
                  </h4>

                  {selectedPost.comments.length > 0 ? (
                    <div className="space-y-2">
                      {selectedPost.comments.map((cmt) => (
                        <div
                          key={cmt.id}
                          className={`p-3 rounded-xl border ${
                            isDay
                              ? 'bg-slate-50 border-slate-200'
                              : 'bg-zinc-900/80 border-zinc-800'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span
                              className={`font-bold ${
                                isDay ? 'text-slate-900' : 'text-zinc-200'
                              }`}
                            >
                              {cmt.author}
                            </span>
                            <span className={isDay ? 'text-slate-400' : 'text-zinc-500'}>
                              {cmt.date}
                            </span>
                          </div>
                          <p
                            className={`text-xs ${
                              isDay ? 'text-slate-700' : 'text-zinc-300'
                            }`}
                          >
                            {cmt.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className={`text-xs italic ${
                        isDay ? 'text-slate-400' : 'text-zinc-500'
                      }`}
                    >
                      {t('এখনও কোনো মন্তব্য নেই। প্রথম মন্তব্যটি আপনিই করুন!', 'No comments yet. Be the first to share your thoughts!')}
                    </p>
                  )}

                  {/* Add Comment Form */}
                  <form onSubmit={(e) => handleSubmitComment(e, selectedPost.id)} className="space-y-2 pt-2">
                    <input
                      type="text"
                      placeholder={t('আপনার নাম', 'Your Name')}
                      value={newCommentAuthor}
                      onChange={(e) => setNewCommentAuthor(e.target.value)}
                      required
                      className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-rose-500 ${
                        isDay
                          ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                          : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500'
                      }`}
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={t('আপনার মন্তব্য লিখুন...', 'Write a comment...')}
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        required
                        className={`flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:border-rose-500 ${
                          isDay
                            ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                            : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500'
                        }`}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{t('পাঠান', 'Post')}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
