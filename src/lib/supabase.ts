import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Project credentials provided for direct fallback
export const FALLBACK_SUPABASE_URL = 'https://vzkpetdgnhufjiosanmj.supabase.co';
export const FALLBACK_SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6a3BldGRnbmh1Zmppb3Nhbm1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0ODIzNTIsImV4cCI6MjEwNTA1ODM1Mn0.CbwA6WHVKhZKn3rlDGo-dPJg87l4eVtJc0trY3loGTo';
export const FALLBACK_STORAGE_MEDIA_URL =
  'https://vzkpetdgnhufjiosanmj.supabase.co/storage/v1/object/public/media';

// Read client-side public environment variables with whitespace trimming
const envUrl = (
  import.meta.env.VITE_SUPABASE_URL ||
  (import.meta.env as any).NEXT_PUBLIC_SUPABASE_URL ||
  (import.meta.env as any).REACT_APP_SUPABASE_URL ||
  ''
).trim();

const envAnonKey = (
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  (import.meta.env as any).NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  (import.meta.env as any).REACT_APP_SUPABASE_ANON_KEY ||
  ''
).trim();

const isValidUrl = (url: string) =>
  Boolean(url && url.startsWith('https://') && !url.includes('placeholder') && !url.includes('your-project'));

const isValidKey = (key: string) =>
  Boolean(key && key.length > 30 && !key.includes('placeholder') && !key.includes('your-anon-key'));

// Resolved credentials: Prefer environment variables, fall back immediately to provided project credentials
export const resolvedSupabaseUrl = isValidUrl(envUrl) ? envUrl : FALLBACK_SUPABASE_URL;
export const resolvedSupabaseAnonKey = isValidKey(envAnonKey) ? envAnonKey : FALLBACK_SUPABASE_ANON_KEY;

/**
 * Validates that Supabase credentials are active.
 */
export const isSupabaseConfigured = (): boolean => {
  return isValidUrl(resolvedSupabaseUrl) && isValidKey(resolvedSupabaseAnonKey);
};

/**
 * Safe Supabase client instantiation.
 * Never requests or exposes SUPABASE_SERVICE_ROLE_KEY on the client.
 */
export const supabase: SupabaseClient = createClient(
  resolvedSupabaseUrl,
  resolvedSupabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);

// Named alias for interoperability
export const supabaseClient = supabase;

/**
 * Upload a media file (image, logo, document) to a Supabase Storage bucket.
 * Bucket name defaults to 'media', but can also be 'portfolio' or 'avatars'.
 * Returns public URL of the uploaded file, or null on failure.
 */
export const uploadMediaToStorage = async (
  file: File,
  bucket = 'media',
  folder = 'uploads'
): Promise<{ url: string | null; error: string | null }> => {
  if (!isSupabaseConfigured()) {
    return {
      url: null,
      error: 'Supabase credentials are not active. Using local fallback.',
    };
  }

  try {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    const filePath = `${folder}/${Date.now()}_${cleanFileName}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.warn(`[Supabase Storage] Upload error to bucket '${bucket}':`, uploadError.message);
      return { url: null, error: uploadError.message };
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return { url: publicUrlData.publicUrl, error: null };
  } catch (err: any) {
    console.error('[Supabase Storage] Exception during upload:', err);
    return { url: null, error: err?.message || 'Failed to upload media' };
  }
};

