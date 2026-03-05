import { discoverSkills } from '@/lib/skills';
import SkillGrid from '@/components/SkillGrid';

export default function HomePage() {
  const skills = discoverSkills();
  return <SkillGrid skills={skills} />;
}
