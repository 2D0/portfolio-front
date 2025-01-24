import type { ImageProps } from 'next/image';

export type RoundSizes = 'full' | 'lg' | 'md' | 'none';
export type IconSizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
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
export type IconNames = 'GitHub' | 'Notion' | 'Moon' | Stack;

export type IconSizeOptions =
  | { size: IconSizes; width?: never; height?: never }
  | {
      size?: never;
      width?: ImageProps['width'];
      height?: ImageProps['height'];
    };

export type IconProps = {
  name: IconNames;
} & Omit<ImageProps, 'src' | 'width' | 'height'> &
  IconSizeOptions;
