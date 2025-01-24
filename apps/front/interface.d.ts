import { VariantProps } from 'class-variance-authority';
import { InputHTMLAttributes, PropsWithChildren } from 'react';

type Scope = '프론트 개발' | '퍼블리싱' | 'UI/UX 디자인';
type Stack =
  | 'Next.js14'
  | 'React'
  | 'Vue'
  | 'Supabase'
  | 'Turborepo'
  | 'JavaScript'
  | 'TypeScript'
  | 'Styled Components'
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
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'id'>,
    PropsWithChildren {
  type?: 'checkbox' | 'radio';
  value: string;
  className?: string;
}
export type LabelProps = InputProps & {
  labelProps: VariantProps<typeof LabelVariants>;
  typeProps?: never;
};
export type TypeProps = InputProps & {
  typeProps?: VariantProps<typeof TypeVariants>;
  labelProps?: never;
};
export type InputBoxPorps = TypeProps | LabelProps;
