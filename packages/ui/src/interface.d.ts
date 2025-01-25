import type { ImageProps } from 'next/image';

export type RoundSizes = 'full' | 'lg' | 'md' | 'none';
export type IconSizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconStack =
  | 'Next.js14'
  | 'React'
  | 'Vue'
  | 'Supabase'
  | 'Turborepo'
  | 'TypeScript'
  | 'JavaScript'
  | 'HTML'
  | 'CSS'
  | 'StyledComponents'
  | 'TailwindCSS'
  | 'SCSS'
  | 'Figma'
  | 'jQuery'
  | 'GitHub'
  | 'Jira';

export type Stack = Stack | 'PHP' | 'Nuxt.js' | 'Cafe24Module';
export type IconNames = 'Youtube' | 'Notion' | 'Moon' | IconStack;

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
