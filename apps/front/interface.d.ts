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
  scope: Array<Scope>;
  startDate: string;
  endDate: string;
  stack: Array<Stack>;
  work: Array<string>;
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
  stack: Array<Stack>;
  imageName: string;
  scope: Array<ProjectScope>;
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
  codeMap: Array<CodeType>;
  stack: Array<Stack>;
  view?: boolean;
}

export type CodeListType = Record<CodeName, CodeList>;

export interface PostFetchReturnType {
  posts: Array<PostType>;
  total: number;
}

export interface ContactMapType {
  info: Array<{ name: string; content: string }>;
  sns: Array<{ name: IconNames; href: string }>;
  resumeUrl: string;
}

export interface UseGetPageItems<T> {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  getPageItems: Array<T>;
  unit: number;
  handleDragPage: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number; y: number } },
  ) => void;
}

type Visitor = 'career' | 'watch' | 'curious' | '';
type Thought = 'cool' | 'beautiful' | 'interest' | '';
type Score = 'yes' | 'ofcourse' | 'hum' | '';

export interface SelectMapType {
  visitor: Visitor;
  thought: Thought;
  score: Score;
}

interface ContentList<T> {
  type: 'text' | 'input' | 'select' | 'name';
  content?: string;
  selectName?: T;
  selectList?: Array<{ id: SelectMapType[T]; content: string }>;
  selectMap?: Partial<Record<SelectMapType[T], string>>;
  nextStep?: number;
}

export interface ModalList<
  T extends keyof SelectMapType = keyof SelectMapType,
> {
  id: number | string;
  senderId: string;
  receiverId: string;
  contentList: Array<ContentList<T>>;
}

export type ModalListType = Record<number, Array<ModalList>>;
