import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { subscribeToToasts, ToastItem } from '../../lib/toast';

export const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const unsubscribe = subscribeToToasts((newToast) => {
      setToasts((prev) => [...prev.slice(-4), newToast]); // keep max 5 toasts

      const timer = setTimeout(() => {
        setToasts((current) => current.filter((t) => t.id !== newToast.id));
      }, newToast.duration || 4000);

      return () => clearTimeout(timer);
    });

    return () => unsubscribe();
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  if (toasts.length === 0) return null;

  return (
    <aside
      aria-label="Notifications"
      className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md text-sm font-medium ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 dark:bg-emerald-950/95 border-emerald-700/60 text-emerald-100'
                : toast.type === 'error'
                ? 'bg-rose-950/90 dark:bg-rose-950/95 border-rose-700/60 text-rose-100'
                : 'bg-zinc-900/90 dark:bg-zinc-900/95 border-zinc-700/60 text-zinc-100'
            }`}
          >
            <div className="shrink-0 mt-0.5">
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400" />}
            </div>
            <div className="flex-1 leading-snug break-words pr-1">{toast.message}</div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 -mr-1 -mt-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </aside>
  );
};
