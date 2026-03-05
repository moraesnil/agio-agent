import { Skill } from './skills';
import { loadContextDocs } from './context';

export function buildSystemPrompt(skills: Skill[], includeBody: boolean): string {
  const context = loadContextDocs();

  const lines: string[] = [
    'Você é um agente de automação de marketing da Agio Engenharia.',
  ];

  if (context) {
    lines.push('', '## Contexto da Agio', context, '');
  }

  lines.push(
    '## Skills disponíveis',
    'Use as skills abaixo como guia para executar a tarefa do usuário.\n',
  );

  for (const skill of skills) {
    lines.push(`## Skill: ${skill.name}`);
    lines.push(`**Quando usar:** ${skill.description}\n`);
    if (includeBody && skill.body) {
      lines.push(skill.body);
      lines.push('');
    }
  }

  return lines.join('\n');
}
