type Scope = '프론트 개발' | '퍼블리싱' | 'UI/UX 디자인';
type Stack =
  | 'Next.js14'
  | 'React'
  | 'Vue'
  | 'Supabase'
  | 'Turborepo'
  | 'JavaScript'
  | 'TypeScript'
  | 'StyledComponents'
  | 'SCSS'
  | 'TailwindCSS'
  | 'Figma'
  | 'PHP'
  | 'HTML'
  | 'CSS'
  | 'jQuery'
  | 'GitHub'
  | 'Jira'
  | 'Nuxt.js';

export interface CareerMap {
  name: string;
  href: string;
  position: string;
  scope: Scope[];
  startDate: string;
  endDate: string;
  stack: Stack[];
  work: string[];
}

export interface StackMap {
  name: Stack;
  title: string;
  desc: string;
}
