import fs from 'fs';
import path from 'path';

const CONTEXT_DIR = path.resolve(process.cwd(), 'src/context-docs');

export function loadContextDocs(): string {
  if (!fs.existsSync(CONTEXT_DIR)) return '';
  const files = fs.readdirSync(CONTEXT_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) return '';
  return files
    .sort()
    .map((f) => fs.readFileSync(path.join(CONTEXT_DIR, f), 'utf-8'))
    .join('\n\n---\n\n');
}
