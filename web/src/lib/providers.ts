export interface ModelOption {
  id: string;
  label: string;
  provider: 'anthropic' | 'google' | 'openrouter';
  envKey: string;
}

export const MODELS: ModelOption[] = [
  // Anthropic
  { id: 'claude-sonnet-4-6', label: 'Claude Sonnet 4.6', provider: 'anthropic', envKey: 'ANTHROPIC_API_KEY' },
  { id: 'claude-opus-4-6',   label: 'Claude Opus 4.6',   provider: 'anthropic', envKey: 'ANTHROPIC_API_KEY' },
  { id: 'claude-haiku-4-5',  label: 'Claude Haiku 4.5',  provider: 'anthropic', envKey: 'ANTHROPIC_API_KEY' },
  // Google Gemini
  { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', provider: 'google', envKey: 'GOOGLE_GENERATIVE_AI_API_KEY' },
  { id: 'gemini-2.5-pro',   label: 'Gemini 2.5 Pro',   provider: 'google', envKey: 'GOOGLE_GENERATIVE_AI_API_KEY' },
  { id: 'gemini-2.0-flash-001', label: 'Gemini 2.0 Flash', provider: 'google', envKey: 'GOOGLE_GENERATIVE_AI_API_KEY' },
  // OpenRouter
  { id: 'meta-llama/llama-3.3-70b-instruct', label: 'Llama 3.3 70B',    provider: 'openrouter', envKey: 'OPENROUTER_API_KEY' },
  { id: 'mistralai/mistral-large-2411',      label: 'Mistral Large',    provider: 'openrouter', envKey: 'OPENROUTER_API_KEY' },
  { id: 'google/gemini-2.0-flash-001',       label: 'Gemini 2.0 (OR)', provider: 'openrouter', envKey: 'OPENROUTER_API_KEY' },
];

export const DEFAULT_MODEL = MODELS.find((m) => m.id === 'gemini-2.5-flash')!;
