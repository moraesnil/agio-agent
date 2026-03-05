'use client';

import { useState, useEffect } from 'react';
import { DEFAULT_MODEL } from './providers';

const STORAGE_KEY = 'agio-model';

export function useModel(): [string, (id: string) => void] {
  const [modelId, setModelId] = useState(DEFAULT_MODEL.id);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setModelId(saved);
  }, []);

  const setModel = (id: string) => {
    setModelId(id);
    localStorage.setItem(STORAGE_KEY, id);
  };

  return [modelId, setModel];
}
