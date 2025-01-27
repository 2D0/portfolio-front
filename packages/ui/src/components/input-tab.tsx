'use client';
import { useId } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import type { InputBoxPorps } from '@repo/ui/interface';

const TypeVariants = cva('block w-5 h-5 border border-gray', {
  variants: {
    variant: {
      checkbox:
        "rounded-sm relative before:block before:content-[''] before:absolute before:w-[1.5px] before:h-[5.5px] before:bottom-[5.5px] before:left-[5.5px] before:-rotate-45 before:rounded-md after:content-[''] after:absolute after:w-[1.5px] after:h-[10px] after:bottom-[4.5px] after:right-[6px] after:rotate-45 after:rounded-md",
      radio:
        "grid place-content-center rounded-full before:content-[''] before:w-2.5 before:h-2.5 before:rounded-full before:bg-gray-300",
    },
    checked: {
      true: 'before:bg-white after:bg-white bg-purple-500',
      false: '',
    },
    defaultVariants: {
      variant: 'checkbox',
    },
  },
});

const LabelVariants = cva('border-2', {
  variants: {
    variant: {
      default: 'border-purple-500 hover:bg-purple-400',
      primary: 'border-blue-400 hover:bg-blue-300',
      destructive: 'border-red-500 hover:bg-red-400',
      disabled: 'border-gray-400 hover:bg-gray-300',
    },
    ghost: {
      true: 'bg-transparent',
      false: '',
    },
    size: {
      default: 'w-fit h-8 px-4',
      lgfit: 'w-fit h-10 px-5',
      sm: 'w-14 h-8',
      md: 'w-20 h-8',
      lg: 'w-36 h-10',
      xl: 'w-52 h-10',
      smfull: 'w-full h-8 min-w-14 px-4',
      lgfull: 'w-full h-10 min-w-20 px-5',
    },
    rounded: {
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
      none: 'rounded-none',
    },
    checked: {
      true: 'text-white imageWhite',
      false: '',
    },
  },
  compoundVariants: [
    {
      checked: true,
      variant: 'default',
      className: 'bg-purple-500',
    },
    {
      checked: true,
      variant: 'primary',
      className: 'bg-blue-500',
    },
    {
      checked: true,
      variant: 'destructive',
      className: 'bg-red-500',
    },
    {
      checked: true,
      variant: 'disabled',
      className: 'bg-gray-400',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'default',
    rounded: 'full',
  },
});

export const InputTab = (props: InputBoxPorps) => {
  const {
    children,
    className,
    labelProps,
    typeProps,
    checked,
    type = 'checkbox',
    ...rest
  } = props;

  const id = useId();

  return (
    <div className="group">
      <input
        {...rest}
        type={type}
        id={`${rest.name ?? id}-${rest.value}`}
        checked={checked}
        hidden
      />
      <label
        htmlFor={`${rest.name ?? id}-${rest.value}`}
        className={cn(
          'flex justify-center items-center gap-2 w-fit font-mideum leading-none text-white transition-colors duration-200 whitespace-nowrap cursor-pointer',
          labelProps && LabelVariants({ ...labelProps, checked }),
          className,
        )}
      >
        {!labelProps && (
          <i
            className={cn(
              TypeVariants({ ...typeProps, variant: type, checked }),
            )}
          />
        )}
        {children}
      </label>
    </div>
  );
};
