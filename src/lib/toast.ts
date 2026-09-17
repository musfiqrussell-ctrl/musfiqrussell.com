export type ToastType = 'success' | 'error' | 'info';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

const TOAST_EVENT = 'musfiq:toast';

export const showToast = (message: string, type: ToastType = 'info', duration = 4000) => {
  if (typeof window === 'undefined') return;
  const detail: ToastItem = {
    id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    message,
    type,
    duration,
  };
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail }));
};

export const subscribeToToasts = (callback: (toast: ToastItem) => void) => {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<ToastItem>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    }
  };
  window.addEventListener(TOAST_EVENT, handler);
  return () => window.removeEventListener(TOAST_EVENT, handler);
};
