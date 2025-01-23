import type { ImageProps } from 'next/image';

export type RoundSizes = 'full' | 'lg' | 'md' | 'none';
export type IconSizes = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type IconNames = 'GITGUB' | 'NOTION' | 'YOUTUBE' | 'MOON';

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
