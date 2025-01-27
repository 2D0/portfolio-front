import type { Stack, IconStack, PostType } from '@repo/ui/interface';

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
  | 'Custom Hook1'
  | 'Custom Hook2';
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
