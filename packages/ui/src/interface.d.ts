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

export type Stack = IconStack | 'PHP' | 'Nuxt.js' | 'Cafe24Module';
export type IconNames = 'Youtube' | 'Notion' | 'Moon' | 'Global' | IconStack;

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

export type IconProps = {
  name: IconNames;
} & Omit<ImageProps, 'src' | 'width' | 'height'> &
  IconSizeOptions;

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
