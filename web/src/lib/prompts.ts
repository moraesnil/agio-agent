import { Skill } from './skills';
import { loadContextDocs } from './context';

export function buildSystemPrompt(skills: Skill[], includeBody: boolean): string {
  const context = loadContextDocs();

  const lines: string[] = [
    'Você é um agente de automação de marketing da Agio Engenharia.',
    '',
    '## Suas capacidades',
    'Você tem acesso a tools que permitem:',
    '- `get_skill_instructions` — consultar instruções detalhadas de uma skill',
    '- `run_skill_subtask` — delegar subtarefas a subagentes especializados em skills',
    '',
    'Para tarefas complexas:',
    '1. Analise quais skills são relevantes',
    '2. Delegue subtarefas aos subagentes quando apropriado',
    '3. Execute múltiplas subtarefas em paralelo quando possível',
    '4. Sintetize os resultados em uma resposta final coesa',
    '',
    'Sempre responda em português brasileiro.',
  ];

  if (context) {
    lines.push('', '## Contexto da Agio', context, '');
  }

  lines.push('## Skills disponíveis');
  for (const skill of skills) {
    lines.push(`- **${skill.name}** (${skill.department}): ${skill.description}`);
    if (includeBody && skill.body) {
      lines.push(skill.body);
      lines.push('');
    }
  }

  return lines.join('\n');
}
