import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeMode = 'day' | 'night';

interface ThemeContextType {
  theme: ThemeMode;
  isDay: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('musfiq_theme') as ThemeMode | null;
      if (savedTheme === 'day' || savedTheme === 'night') {
        return savedTheme;
      }
    }
    // Default to night mode as per user requirement: "Night Mode (same as recent preview)"
    return 'night';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'day') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'day');
      document.body.style.backgroundColor = '#fafafa';
      document.body.style.color = '#18181b';
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'night');
      document.body.style.backgroundColor = '#09090b';
      document.body.style.color = '#f4f4f5';
    }
    localStorage.setItem('musfiq_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const isDay = theme === 'day';

  return (
    <ThemeContext.Provider value={{ theme, isDay, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
