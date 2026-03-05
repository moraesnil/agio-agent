import fs from 'fs';
import path from 'path';

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

/**
 * Parses YAML frontmatter manually to avoid js-yaml strict parsing issues
 * with description values that contain colons (e.g. "ação: conteúdo").
 */
function extractFrontmatter(content: string): { data: Record<string, unknown>; body: string } {
  if (!content.startsWith('---')) {
    return { data: {}, body: content };
  }

  const endIndex = content.indexOf('\n---', 3);
  if (endIndex === -1) {
    return { data: {}, body: content };
  }

  const fmText = content.slice(4, endIndex); // between first --- and second ---
  const body = content.slice(endIndex + 4).trim(); // after second ---

  const data: Record<string, unknown> = {};
  let currentKey: string | null = null;
  let currentIndent = 0;
  const metadataObj: Record<string, unknown> = {};
  let inMetadata = false;

  for (const rawLine of fmText.split('\n')) {
    const line = rawLine.replace(/\r$/, '');
    if (!line.trim()) continue;

    const indent = line.length - line.trimStart().length;

    if (inMetadata && indent > currentIndent) {
      // sub-key inside metadata block
      const subMatch = line.trim().match(/^([^:]+):\s*"?([^"]*)"?\s*$/);
      if (subMatch) {
        metadataObj[subMatch[1].trim()] = subMatch[2].trim();
      }
      continue;
    }

    inMetadata = false;

    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    const rest = line.slice(colonIdx + 1);
    const value = rest.trimStart();

    if (key === 'metadata' && !value.trim()) {
      inMetadata = true;
      currentIndent = indent;
      data.metadata = metadataObj;
      currentKey = key;
      continue;
    }

    // Strip surrounding quotes if present
    const stripped = value.replace(/^["']|["']$/g, '').trim();
    data[key] = stripped || value.trim();
    currentKey = key;
  }

  if (Object.keys(metadataObj).length > 0) {
    data.metadata = metadataObj;
  }

  return { data, body };
}

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
    const { data, body } = extractFrontmatter(content);

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
