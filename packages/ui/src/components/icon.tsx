import Image from 'next/image';
import type { IconProps } from '@repo/ui/interface';

const IconSizeMap = {
  sm: 12,
  md: 16,
  lg: 20,
  xl: 40,
  '2xl': 50,
};

export const Icon = (props: IconProps) => {
  const { name, size, width, height, ...ohterProps } = props;
  const iconSize = IconSizeMap[size ?? 'lg'];
  const IconSourceMap: Record<IconProps['name'], string> = {
    GITGUB: require('./../images/icons/ico-github.svg').default,
    NOTION: require('./../images/icons/ico-notion.svg').default,
    YOUTUBE: require('./../images/icons/ico-youtube.svg').default,
    MOON: require('./../images/icons/ico-moon.svg').default,
  };

  return (
    <Image
      src={IconSourceMap[name]}
      {...(size
        ? {
            width: iconSize,
            height: iconSize,
          }
        : { width, height })}
      {...ohterProps}
      style={{
        width: size ? iconSize : width,
        height: size ? iconSize : height,
      }}
    />
  );
};
