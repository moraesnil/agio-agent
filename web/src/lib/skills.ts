import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface SkillMeta {
  name: string;
  description: string;
  department: string;
  metadata: Record<string, unknown>;
}

export interface Skill extends SkillMeta {
  body: string;
}

const SKILLS_DIR = path.resolve(process.cwd(), 'src/skills-data');

export function discoverSkills(): Skill[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];

  const entries = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });
  const folders = entries
    .filter((d) => d.isDirectory())
    .sort((a, b) => a.name.localeCompare(b.name));

  const skills: Skill[] = [];

  for (const folder of folders) {
    const skillMdPath = path.join(SKILLS_DIR, folder.name, 'SKILL.md');
    if (!fs.existsSync(skillMdPath)) continue;

    const content = fs.readFileSync(skillMdPath, 'utf-8');
    const { data, content: body } = matter(content);

    skills.push({
      name: (data.name as string) || folder.name,
      description: (data.description as string) || '',
      department: (data.department as string) || 'Geral',
      metadata: (data.metadata as Record<string, unknown>) || {},
      body: body.trim(),
    });
  }

  return skills;
}
