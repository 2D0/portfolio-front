'use client';
import { useState } from 'react';
import { cn } from '@repo/commons/cn';

interface SelectBoxProps<T> {
  textMap: string[];
  name: string;
  setName: React.Dispatch<React.SetStateAction<T>>;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<boolean>>;
  height?: string;
}

export const SelectBox = <T extends string>({
  textMap,
  name,
  setName,
  selected,
  setSelected,
  height = 'h-60',
}: SelectBoxProps<T>) => {
  return (
    <div>
      <button
        type="button"
        className="flex justify-between items-center w-40 h-8 px-2 rounded-md !bg-white !bg-opacity-20 border border-white border-opacity-20"
        onClick={() => setSelected(!selected)}
      >
        {name}
        <i className="block w-2.5 h-[1.5px] relative before:block before:content-[''] before:w-full before:h-full before:absolute before:left-[3px] before:rounded-full before:rotate-[-45deg] before:bg-[#EBEBEB] after:block after:content-[''] after:w-full after:h-full after:absolute after:right-[3px] after:rounded-full after:rotate-[45deg] after:bg-[#EBEBEB]" />
      </button>
      <ul
        className={cn(
          selected ? `${height} mt-1` : 'h-0',
          'flex flex-col gap-1 w-40 overflow-y-auto absolute z-10 rounded-md transition-All Stacks duration-200 bg-black bg-opacity-80',
        )}
      >
        {textMap.map(selectName => (
          <li key={selectName} value={selectName}>
            <button
              type="button"
              onClick={() => {
                setName(selectName as T);
                setSelected(false);
              }}
              className="w-full h-7 px-2 text-left hover:bg-blue-200 hover:text-black"
            >
              {selectName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
