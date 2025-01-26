import type { CodeListType } from '@/interface';

export const CodeList = {
  input: [
    {
      name: 'Rander',
      code: `'use client';
import { useState } from 'react';
import { RadioGroup, InputTab } from '@repo/ui/components';

export default function Page(): JSX.Element {
const [radioValue, setRadioValue] = useState<string>('체크라디오');
const [buttonRadioValue, setButtonRadioValue] =
    useState<string>('버튼라디오');

return (
    <main>
      <div className="flex flex-col space-y-4">
        <RadioGroup name="기본라디오" selectvalue="전체" className="flex gap-2">
          <InputTab value="전체">전체</InputTab>
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
        <RadioGroup
          name="버튼라디오"
          selectvalue="전체"
          className="flex gap-2"
          labelProps={{
            variant: 'disabled',
          }}
        >
          <InputTab value="전체">전체</InputTab>
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
      </div>
    </main>
  );
}`,
    },
    {
      name: 'RadioGroup',
      code: `'use client';
import { Children, cloneElement, ReactElement, useState } from 'react';
import type { InputBoxPorps } from '@repo/ui/interface';

interface RadioProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  selectvalue: string;
  children: ReactElement[];
}
type RadioGroupProps = RadioProps &
  Pick<InputBoxPorps, 'labelProps' | 'typeProps'>;

export const RadioGroup = (props: RadioGroupProps) => {
  const {
    children,
    name,
    selectvalue,
    labelProps,
    typeProps,
    onChange,
    ...rest
  } = props;
  const [radioValue, setRadioValue] =
    useState<RadioGroupProps['selectvalue']>(selectvalue);

  const renderChild = (child: ReactElement) => {
    const childValue = child.props.value;

    return cloneElement(child, {
      type: 'radio',
      name,
      labelProps,
      typeProps,
      checked: radioValue === childValue,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(childValue);
        onChange?.(event);
      },
    });
  };

  return <div {...rest}>{Children.map(children, renderChild)}</div>;
};`,
    },
    {
      name: 'InputTab',
      code: `'use client';
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
      true: 'before:bg-white after:bg-white bg-blue-500',
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
      default: 'border-blue-400 hover:bg-blue-300',
      primary: 'border-purple-500 hover:bg-purple-400',
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
      className: 'bg-blue-500',
    },
    {
      checked: true,
      variant: 'primary',
      className: 'bg-purple-500',
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
        id={'{rest.name ?? id}-{rest.value}'}
        checked={checked}
        hidden
      />
      <label
        htmlFor={'{rest.name ?? id}-{rest.value}'}
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
};`,
    },
    {
      name: 'Type',
      code: `export interface InputProps
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
`,
    },
  ],
  test: [{ name: 'Rander', code: `` }],
} as CodeListType;
