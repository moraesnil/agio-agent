'use client';

import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_MODEL } from './providers';

const STORAGE_KEY = 'agio-model';

export function useModel(): [string, (id: string) => void] {
  const [modelId, setModelId] = useState(DEFAULT_MODEL.id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setModelId(saved);
    setMounted(true);
  }, []);

  const setModel = useCallback((id: string) => {
    setModelId(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  if (!mounted) return [DEFAULT_MODEL.id, () => {}];

  return [modelId, setModel];
}
