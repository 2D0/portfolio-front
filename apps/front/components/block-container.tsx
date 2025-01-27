import { useMemo, type HTMLAttributes, type PropsWithChildren } from 'react';
import Link, { type LinkProps } from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';

interface BlockContainerProps extends PropsWithChildren {
  variants?: VariantProps<typeof containerVariants>;
  className?: string;
}

interface DivContainerProps
  extends BlockContainerProps,
    Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
  href?: never;
}

interface LinkContainerProps
  extends BlockContainerProps,
    Omit<LinkProps, 'className'> {
  target?: string;
}

const containerVariants = cva('w-full border', {
  variants: {
    variant: {
      default: 'bg-white bg-opacity-20',
      black: 'bg-black bg-opacity-80',
    },
    border: {
      default: 'border-white border-opacity-20',
      none: 'border-none',
    },
    padding: {
      default: 'p-4',
      sm: 'p-2',
      md: 'p-3',
    },
    height: {
      default: 'h-full',
      fit: 'h-fit',
    },
    rounded: {
      default: 'rounded-xl',
      md: 'rounded-md',
      none: 'rounded-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    padding: 'default',
    border: 'default',
    height: 'default',
    rounded: 'default',
  },
});

export const BlockContainer = ({
  className,
  variants,
  ...props
}: DivContainerProps | LinkContainerProps) => {
  const styles = useMemo(
    () => cn(containerVariants({ ...variants }), className),
    [variants, className],
  );

  if ('href' in props)
    return (
      <LinkContainer {...(props as LinkContainerProps)} className={styles} />
    );

  return <DivContainer {...(props as DivContainerProps)} className={styles} />;
};

const LinkContainer = ({ children, ...props }: LinkContainerProps) => {
  return <Link {...(props as LinkProps)}>{children}</Link>;
};
const DivContainer = ({ children, ...props }: DivContainerProps) => {
  return <div {...(props as HTMLAttributes<HTMLDivElement>)}>{children}</div>;
};
