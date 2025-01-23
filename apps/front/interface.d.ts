type Scope = '프론트 개발' | '퍼블리싱' | 'UI/UX 디자인';
type Stack =
  | 'Next.js14'
  | 'React'
  | 'Vue'
  | 'Supabase'
  | 'JavaScript'
  | 'TypeScript'
  | 'Styled Components'
  | 'SCSS'
  | 'Tailwind CSS'
  | 'Figma'
  | 'PHP'
  | 'HTML'
  | 'CSS'
  | 'jQuery'
  | 'Nuxt';

export interface CareerMap {
  name: string;
  position: string;
  scope: Scope[];
  startDate: string;
  endDate: string;
  stack: Stack[];
  work: string[];
}
