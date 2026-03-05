export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { streamText } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import { MODELS } from '@/lib/providers';
import { discoverSkills } from '@/lib/skills';
import { buildSystemPrompt } from '@/lib/prompts';

export async function POST(req: Request) {
  const { task, messages, skillName, modelId } = await req.json() as {
    task?: string;
    messages?: Array<{ role: 'user' | 'assistant'; content: string }>;
    skillName?: string;
    modelId?: string;
  };

  if (!task && (!messages || messages.length === 0)) {
    return new Response('task ou messages é obrigatório', { status: 400 });
  }

  const modelConfig = MODELS.find((m) => m.id === modelId) ?? MODELS[0];
  const apiKey = process.env[modelConfig.envKey];
  if (!apiKey) {
    return new Response(
      `Chave ${modelConfig.envKey} não configurada no servidor.`,
      { status: 500 },
    );
  }

  let model;
  if (modelConfig.provider === 'anthropic') {
    model = createAnthropic({ apiKey })(modelConfig.id);
  } else if (modelConfig.provider === 'google') {
    model = createGoogleGenerativeAI({ apiKey })(modelConfig.id);
  } else {
    model = createOpenAI({
      apiKey,
      baseURL: 'https://openrouter.ai/api/v1',
    })(modelConfig.id);
  }

  const allSkills = discoverSkills();
  const skills = skillName ? allSkills.filter((s) => s.name === skillName) : allSkills;
  const system = buildSystemPrompt(skills, Boolean(skillName));

  const apiMessages = task
    ? [{ role: 'user' as const, content: task }]
    : (messages as Array<{ role: 'user' | 'assistant'; content: string }>);

  const result = streamText({ model, system, messages: apiMessages, maxOutputTokens: 4096 });
  return result.toTextStreamResponse();
}
