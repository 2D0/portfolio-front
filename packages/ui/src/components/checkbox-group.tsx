'use client';
import { Children, cloneElement, ReactElement, useState } from 'react';
import { InputTab } from '@repo/ui/components';
import type { InputBoxPorps } from '@repo/ui/interface';

interface CheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  children: ReactElement[];
  allSelect?: {
    position: 'top' | 'bottom';
    children: ReactElement;
  } & Pick<InputBoxPorps, 'typeProps' | 'labelProps'>;
}
type CheckboxGroupProps = CheckboxProps &
  Pick<InputBoxPorps, 'typeProps' | 'labelProps'>;

export const CheckboxGroup = (props: CheckboxGroupProps) => {
  const { children, name, allSelect, labelProps, typeProps, ...rest } = props;
  const initialState = children.reduce(
    (acc: Record<string, boolean>, child) => {
      acc[child.props.value] = !!child.props.checked;
      return acc;
    },
    {},
  );
  const [checkboxState, setCheckboxState] =
    useState<Record<string, boolean>>(initialState);

  const totalValues = Object.values(checkboxState);
  const isAllChecked = totalValues.every(Boolean);

  const toggleAllCheckboxes = () => {
    const newState = Object.keys(checkboxState).reduce(
      (acc, key) => {
        acc[key] = !isAllChecked;
        return acc;
      },
      {} as Record<string, boolean>,
    );
    setCheckboxState(newState);
  };

  const toggleCheckbox = (value: string) =>
    setCheckboxState(prev => ({ ...prev, [value]: !prev[value] }));

  const {
    position,
    children: allChildren,
    ...allSelectProps
  } = allSelect || {};

  const AllSelect = (
    <InputTab
      id={`all-select-${name}`}
      value={`all-select-${name}`}
      type="checkbox"
      checked={isAllChecked}
      onChange={toggleAllCheckboxes}
      {...allSelectProps}
    >
      {allChildren}
    </InputTab>
  );

  const renderChild = (child: ReactElement) => {
    const childValue = child.props.value;
    return cloneElement(child, {
      name,
      type: 'checkbox',
      labelProps,
      typeProps,
      checked: checkboxState[childValue],
      onChange: () => toggleCheckbox(childValue),
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {position === 'top' && AllSelect}
      <div {...rest}>{Children.map(children, renderChild)}</div>
      {position === 'bottom' && AllSelect}
    </div>
  );
};
