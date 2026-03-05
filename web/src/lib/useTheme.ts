'use client';

import { useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

const STORAGE_KEY = 'agio-theme';

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    const t: Theme = saved === 'light' ? 'light' : 'dark';
    setTheme(t);
    document.documentElement.setAttribute('data-theme', t);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return [theme, toggle];
}
