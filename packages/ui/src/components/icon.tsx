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
    GitHub: require('./../images/icons/ico-github.svg'),
    Notion: require('./../images/icons/ico-notion.svg'),
    // Youtube require('./../images/icons/ico-youtube.svg'),
    Moon: require('./../images/icons/ico-moon.svg'),
    JavaScript: require('./../images/icons/stacks/JavaScript.svg'),
    TypeScript: require('./../images/icons/stacks/TypeScript.svg'),
    jQuery: require('./../images/icons/stacks/jQuery.svg'),
    HTML: require('./../images/icons/stacks/HTML.svg'),
    CSS: require('./../images/icons/stacks/CSS.svg'),
    Figma: require('./../images/icons/stacks/Figma.svg'),
    Jira: require('./../images/icons/stacks/Jira.svg'),
    React: require('./../images/icons/stacks/React.svg'),
    SCSS: require('./../images/icons/stacks/SCSS.svg'),
    StyledComponents: require('./../images/icons/stacks/StyledComponents.png'),
    Supabase: require('./../images/icons/stacks/Supabase.svg'),
    TailwindCSS: require('./../images/icons/stacks/TailwindCSS.svg'),
    Turborepo: require('./../images/icons/stacks/Turborepo.svg'),
    Vue: require('./../images/icons/stacks/Vue.svg'),
    'Next.js14': require('./../images/icons/stacks/Next.js14.svg'),
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
