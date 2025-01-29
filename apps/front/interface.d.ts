import type { Stack, IconStack, PostType, IconNames } from '@repo/ui/interface';

export type NavNames =
  | 'HOME'
  | 'IT’S ME'
  | 'WORK HISTORY'
  | 'STACK'
  | 'PROJECT'
  | 'CODE LOGIC'
  | 'PICK ME';
type Scope = '프론트 개발' | '백엔드 개발' | '퍼블리싱' | 'UI/UX 디자인';
type ProjectScope = Exclude<Scope, '퍼블리싱'> | '기획 및 총괄' | '백엔드 개발';

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
  name: IconStack | 'PHP' | Exclude<Scope, '백엔드 개발'>;
  title: string;
  desc: string;
}

export interface ProjectMap {
  name: string;
  company: string;
  href: string;
  site?: string;
  startDate: string;
  endDate: string;
  period: string;
  desc: string;
  stack: Stack[];
  imageUrl: string;
  imageName: string;
  scope: ProjectScope[];
}

export type CodeName =
  | 'Component'
  | 'Next.js14'
  | 'Atomic System'
  | 'Custom Hook'
  | 'Context';

interface CodeType {
  name: string;
  code: string;
}
interface CodeList {
  codeMap: CodeType[];
  stack: Stack[];
  view?: boolean;
}

export type CodeListType = Record<CodeName, CodeList>;

export interface PostFetchReturnType {
  posts: PostType[];
  total: number;
}

export interface ContactMapType {
  info: Array<{ name: string; content: string }>;
  sns: Array<{ name: IconNames; href: string }>;
  resumeUrl: string;
}
