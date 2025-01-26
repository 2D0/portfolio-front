'use client';
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
};
