import React, { useState } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  X,
  ExternalLink,
  Sparkles,
  Share2,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { SocialLink } from '../../types';
import { SocialIcon } from '../sections/social/SocialIcon';

interface AdminSocialManagerProps {
  language: 'bn' | 'en';
}

const AVAILABLE_ICONS = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'x', label: 'X / Twitter' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'tiktok', label: 'TikTok' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'messenger', label: 'Messenger' },
  { id: 'linktree', label: 'Linktree' },
  { id: 'behance', label: 'Behance' },
  { id: 'fiverr', label: 'Fiverr' },
  { id: 'imo', label: 'IMO' },
  { id: 'threads', label: 'Threads' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'pinterest', label: 'Pinterest' },
];

export const AdminSocialManager: React.FC<AdminSocialManagerProps> = ({ language }) => {
  const { socialLinks, updateSocialLink, addSocialLink, deleteSocialLink, reorderSocialLinks } = useData();

  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formData, setFormData] = useState<Partial<SocialLink>>({
    platform: '',
    username: '',
    url: '',
    icon: 'facebook',
    accent: '#1877F2',
    category: 'primary',
    ctaBn: 'যুক্ত হোন',
    ctaEn: 'Connect',
    description: '',
    descriptionBn: '',
    enabled: true,
    order: (socialLinks.length || 0) + 1,
    featured: false,
  });

  const sortedLinks = [...socialLinks].sort((a, b) => (a.order || 99) - (b.order || 99));

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingLink(null);
    setFormData({
      id: `s-${Date.now()}`,
      platform: '',
      username: '',
      url: 'https://',
      icon: 'facebook',
      accent: '#E11D48',
      category: 'primary',
      ctaBn: 'যুক্ত হোন',
      ctaEn: 'Connect',
      description: '',
      descriptionBn: '',
      enabled: true,
      order: sortedLinks.length + 1,
      featured: false,
    });
  };

  const handleStartEdit = (link: SocialLink) => {
    setEditingLink(link);
    setIsCreating(false);
    setFormData({ ...link });
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingLink(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.platform || !formData.url) return;

    if (isCreating) {
      const newLink: SocialLink = {
        id: formData.id || `s-${Date.now()}`,
        platform: formData.platform || 'Platform',
        username: formData.username || '',
        url: formData.url || '',
        icon: formData.icon || 'facebook',
        accent: formData.accent || '#E11D48',
        category: formData.category || 'primary',
        ctaBn: formData.ctaBn || 'যুক্ত হোন',
        ctaEn: formData.ctaEn || 'Connect',
        description: formData.description || '',
        descriptionBn: formData.descriptionBn || formData.description || '',
        enabled: formData.enabled !== false,
        order: formData.order || sortedLinks.length + 1,
        featured: Boolean(formData.featured),
      };
      addSocialLink(newLink);
      setIsCreating(false);
    } else if (editingLink) {
      const updated: SocialLink = {
        ...editingLink,
        ...formData,
      } as SocialLink;
      updateSocialLink(updated);
      setEditingLink(null);
    }
  };

  const handleToggleEnabled = (link: SocialLink) => {
    updateSocialLink({
      ...link,
      enabled: link.enabled === false ? true : false,
    });
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sortedLinks.length) return;

    const copy = [...sortedLinks];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);

    // Re-assign order numbers
    const updated = copy.map((item, idx) => ({
      ...item,
      order: idx + 1,
    }));
    reorderSocialLinks(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#11131a] p-5 rounded-2xl border border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-rose-500" />
            <h2 className="text-lg font-bold text-white">
              {language === 'bn' ? 'সোশ্যাল মিডিয়া হাব ব্যবস্থাপনা' : 'Social Media Hub Manager'}
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              {socialLinks.length} Platforms
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            {language === 'bn'
              ? 'অফিশিয়াল ব্র্যান্ড লোগো, হ্যান্ডেল, অ্যাকসেন্ট কালার, বাটন টেক্সট ও ডিসপ্লে অর্ডার পরিবর্তন করুন।'
              : 'Configure official brand icons, handles, profile URLs, accents, and custom display order.'}
          </p>
        </div>

        {!isCreating && !editingLink && (
          <button
            onClick={handleStartCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{language === 'bn' ? 'নতুন প্ল্যাটফর্ম যোগ করুন' : 'Add Platform'}</span>
          </button>
        )}
      </div>

      {/* Create / Edit Form Modal */}
      {(isCreating || editingLink) && (
        <form
          onSubmit={handleSave}
          className="bg-[#11131a] border border-rose-500/40 p-6 rounded-2xl space-y-4 shadow-xl shadow-black/50"
        >
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span>
                {isCreating
                  ? language === 'bn'
                    ? 'নতুন সোশ্যাল প্ল্যাটফর্ম যুক্ত করুন'
                    : 'Add New Social Platform'
                  : language === 'bn'
                  ? `প্ল্যাটফর্ম সম্পাদন: ${editingLink?.platform}`
                  : `Edit Platform: ${editingLink?.platform}`}
              </span>
            </h3>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            {/* Platform Name */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'প্ল্যাটফর্মের নাম *' : 'Platform Name *'}
              </label>
              <input
                type="text"
                required
                value={formData.platform || ''}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder="e.g. Instagram, Behance"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Username / Handle */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'ইউজারনেম / হ্যান্ডেল *' : 'Username / Handle *'}
              </label>
              <input
                type="text"
                required
                value={formData.username || ''}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="e.g. @musfiq_russell"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            {/* Profile URL */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'প্রোফাইল লিংক (URL) *' : 'Profile URL *'}
              </label>
              <input
                type="url"
                required
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500 font-mono"
              />
            </div>

            {/* Brand Icon */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'অফিশিয়াল আইকন' : 'Official Brand Icon'}
              </label>
              <select
                value={formData.icon || 'facebook'}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              >
                {AVAILABLE_ICONS.map((icon) => (
                  <option key={icon.id} value={icon.id}>
                    {icon.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Accent Color */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'ব্র্যান্ড কালার (Hex)' : 'Brand Accent Color'}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.accent || '#E11D48'}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                  className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={formData.accent || '#E11D48'}
                  onChange={(e) => setFormData({ ...formData, accent: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white font-mono focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'ক্যাটাগরি' : 'Category'}
              </label>
              <select
                value={formData.category || 'primary'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as SocialLink['category'],
                  })
                }
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              >
                <option value="primary">Primary (প্রধান)</option>
                <option value="direct">Direct Chat (সরাসরি যোগাযোগ)</option>
                <option value="creative">Creative / Media (ক্রিয়েটিভ)</option>
                <option value="professional">Professional (পেশাগত)</option>
              </select>
            </div>

            {/* CTA text Bengali */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'বাটন টেক্সট (বাংলা)' : 'CTA Text (Bangla)'}
              </label>
              <input
                type="text"
                value={formData.ctaBn || ''}
                onChange={(e) => setFormData({ ...formData, ctaBn: e.target.value })}
                placeholder="e.g. যুক্ত হোন, ফলো করুন"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* CTA text English */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'বাটন টেক্সট (English)' : 'CTA Text (English)'}
              </label>
              <input
                type="text"
                value={formData.ctaEn || ''}
                onChange={(e) => setFormData({ ...formData, ctaEn: e.target.value })}
                placeholder="e.g. Connect, Follow Me"
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'ডিসপ্লে অর্ডার' : 'Display Order'}
              </label>
              <input
                type="number"
                min="1"
                value={formData.order || 1}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'সংক্ষিপ্ত বিবরণ (বাংলা)' : 'Description (Bangla)'}
              </label>
              <input
                type="text"
                value={formData.descriptionBn || ''}
                onChange={(e) => setFormData({ ...formData, descriptionBn: e.target.value })}
                placeholder="সংক্ষিপ্ত ভূমিকা বা উদ্দেশ্য..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
            <div>
              <label className="block text-zinc-400 font-semibold mb-1">
                {language === 'bn' ? 'সংক্ষিপ্ত বিবরণ (English)' : 'Description (English)'}
              </label>
              <input
                type="text"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short purpose or audience..."
                className="w-full px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center gap-6 pt-2 text-xs">
            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.enabled !== false}
                onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                className="rounded text-rose-600 bg-zinc-900 border-zinc-700 focus:ring-rose-500"
              />
              <span>{language === 'bn' ? 'সাইটে সক্রিয় রাখুন (Enabled)' : 'Show on live website (Enabled)'}</span>
            </label>

            <label className="flex items-center gap-2 text-zinc-300 cursor-pointer">
              <input
                type="checkbox"
                checked={Boolean(formData.featured)}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="rounded text-rose-600 bg-zinc-900 border-zinc-700 focus:ring-rose-500"
              />
              <span>{language === 'bn' ? 'প্রাইমারি হাইলাইট (Featured)' : 'Featured badge'}</span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold"
            >
              {language === 'bn' ? 'বাতিল' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'bn' ? 'সংরক্ষণ করুন' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Platforms Table / Cards */}
      <div className="bg-[#11131a] rounded-2xl border border-zinc-800 overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-[#151822] text-zinc-400 uppercase tracking-wider font-semibold border-b border-zinc-800 text-[11px]">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Platform & Icon</th>
                <th className="py-3 px-4">Username / Handle</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">CTA Button</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {sortedLinks.map((item, index) => {
                const isEnabled = item.enabled !== false;
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-zinc-900/50 transition-colors ${
                      !isEnabled ? 'opacity-50' : ''
                    }`}
                  >
                    {/* Order & Move buttons */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-zinc-500 w-5 text-center font-bold">
                          {item.order || index + 1}
                        </span>
                        <div className="flex flex-col">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMove(index, 'up')}
                            className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === sortedLinks.length - 1}
                            onClick={() => handleMove(index, 'down')}
                            className="p-0.5 text-zinc-500 hover:text-white disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Platform & Icon */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center border shadow-xs"
                          style={{
                            backgroundColor: `${item.accent}15`,
                            borderColor: `${item.accent}40`,
                            color: item.accent,
                          }}
                        >
                          <SocialIcon name={item.icon || item.platform} className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-white flex items-center gap-1.5">
                            <span>{item.platform}</span>
                            {item.featured && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-400 font-semibold">
                                Primary
                              </span>
                            )}
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-zinc-500 hover:text-rose-400 flex items-center gap-1 truncate max-w-xs font-mono"
                          >
                            <span className="truncate">{item.url}</span>
                            <ExternalLink className="w-2.5 h-2.5 shrink-0" />
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Username */}
                    <td className="py-3.5 px-4 font-mono font-medium text-zinc-300">
                      {item.username}
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-400 border border-zinc-700 capitalize">
                        {item.category}
                      </span>
                    </td>

                    {/* CTA */}
                    <td className="py-3.5 px-4 text-[11px]">
                      <span className="text-zinc-300 font-medium">{item.ctaBn}</span>
                      <span className="text-zinc-500 block text-[10px]">{item.ctaEn}</span>
                    </td>

                    {/* Status toggle */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleToggleEnabled(item)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                          isEnabled
                            ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800'
                            : 'bg-zinc-800 text-zinc-500 border-zinc-700'
                        }`}
                        title={isEnabled ? 'Click to Disable' : 'Click to Enable'}
                      >
                        {isEnabled ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Hidden</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                          title="Edit Platform"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete ${item.platform}?`)) {
                              deleteSocialLink(item.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-950/50 hover:bg-rose-900 border border-rose-800/60 text-rose-400 hover:text-rose-200 transition-colors"
                          title="Delete Platform"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
