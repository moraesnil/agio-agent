import { tool, generateText, type ToolSet, type LanguageModel } from 'ai';
import { z } from 'zod';
import type { Skill } from './skills';

export function buildAgentTools(skills: Skill[], model: LanguageModel): ToolSet | undefined {
  if (skills.length === 0) return undefined;

  const skillNames = skills.map((s) => s.name) as [string, ...string[]];

  const tools: ToolSet = {
    get_skill_instructions: tool({
      description:
        'Obter instruções detalhadas de uma skill específica. Use para entender como executar uma tarefa com essa skill.',
      inputSchema: z.object({
        skillName: z.enum(skillNames),
      }),
      execute: async ({ skillName }: { skillName: string }) => {
        const skill = skills.find((s) => s.name === skillName);
        if (!skill) return { error: `Skill "${skillName}" não encontrada` };
        return {
          name: skill.name,
          department: skill.department,
          description: skill.description,
          instructions: skill.body,
        };
      },
    }),

    run_skill_subtask: tool({
      description:
        'Delegar uma subtarefa a um subagente especializado em uma skill. O subagente executa a tarefa usando as instruções da skill e retorna o resultado. Use para execução paralela de múltiplas tarefas.',
      inputSchema: z.object({
        skillName: z.enum(skillNames),
        subtask: z.string().describe('A subtarefa específica a executar'),
      }),
      execute: async ({ skillName, subtask }: { skillName: string; subtask: string }) => {
        const skill = skills.find((s) => s.name === skillName);
        if (!skill) return { error: `Skill "${skillName}" não encontrada` };

        const result = await generateText({
          model,
          system: [
            `Você é um subagente especializado na skill "${skill.name}" da Agio Engenharia.`,
            '',
            '## Instruções da Skill',
            skill.body,
          ].join('\n'),
          messages: [{ role: 'user', content: subtask }],
          maxOutputTokens: 4096,
        });

        return {
          skillName: skill.name,
          subtask,
          result: result.text,
        };
      },
    }),
  };

  return tools;
}
