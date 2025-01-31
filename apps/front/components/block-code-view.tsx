import { useState } from 'react';
import { RadioGroup, InputTab, CheckboxGroup, Icon } from '@repo/ui/components';
import { cn } from '@repo/commons/cn';
import {
  useTimer,
  useDate,
  type FormatTimeReturnType,
  type DateReturnType,
  type TimerProps,
  type TimerReturnType,
  useFormatTime,
} from '@repo/commons/hooks';
import { IconChangeProvider, useIconChange } from '@/contexts/icon.context';
import type { IconNames } from '@repo/ui/interface';

export const ViewComponent = () => {
  return (
    <>
      <div className="flex flex-col gap-y-4">
        <CheckboxGroup
          name="기본체크박스"
          className="flex gap-2"
          allSelect={{
            position: 'top',
            children: (
              <>
                <Icon name="Global" size="md" alt="인풋" />
                기본 체크박스 전체선택
              </>
            ),
          }}
        >
          <InputTab value="사과" checked>
            사과
          </InputTab>
          <InputTab value="배">배</InputTab>
          <InputTab value="바나나" checked>
            바나나
          </InputTab>
        </CheckboxGroup>
        <CheckboxGroup
          name="버튼체크박스"
          className="flex gap-2"
          allSelect={{
            position: 'top',
            children: (
              <>
                <Icon name="Global" size="md" alt="인풋" />
                버튼 체크박스 전체선택
              </>
            ),
            labelProps: {
              variant: 'primary',
            },
          }}
          labelProps={{
            variant: 'primary',
          }}
        >
          <InputTab value="사과">사과</InputTab>
          <InputTab value="배" checked>
            배
          </InputTab>
          <InputTab value="바나나">바나나</InputTab>
        </CheckboxGroup>
      </div>
      <div className="flex flex-col gap-y-4">
        <RadioGroup name="기본라디오" selectvalue="하트" className="flex gap-2">
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
        <RadioGroup
          name="버튼라디오"
          selectvalue="하트"
          className="flex gap-2"
          labelProps={{
            variant: 'disabled',
          }}
        >
          <InputTab value="하트">❤️ 하트</InputTab>
          <InputTab value="병아리">🐥 병아리</InputTab>
          <InputTab value="별">⭐️ 별</InputTab>
        </RadioGroup>
      </div>
    </>
  );
};

export const ViewTimer = () => {
  const [switchTimerMode, setSwitchTimerMode] =
    useState<TimerProps['timerMode']>('STOPWATCH');
  const { hours }: DateReturnType = useDate();
  const [itemData, setItemData] = useState<number>(hours);
  const { eighteenHours }: FormatTimeReturnType = useFormatTime(itemData);
  const { time, timerHandler }: TimerReturnType = useTimer({
    timerMode: switchTimerMode,
    timeValue: eighteenHours,
  });

  return (
    <div className="grid place-items-center gap-2">
      {switchTimerMode}
      <span className="p-2 border border-white rounded-md">{time}</span>
      <button
        type="button"
        className="py-1 px-2 rounded-md font-bold bg-black bg-opacity-80 hover:bg-opacity-100 transition-opacity duration-300"
        onClick={() => {
          setSwitchTimerMode(
            switchTimerMode === 'TIMER' ? 'STOPWATCH' : 'TIMER',
          );
          timerHandler(eighteenHours);
        }}
      >
        CHANGE AND START
      </button>
    </div>
  );
};

export const ViewContext = () => {
  return (
    <div className="grid place-items-center gap-4">
      <IconChangeProvider>
        <DisplayData />
      </IconChangeProvider>
    </div>
  );
};

const IconMap: Array<IconNames> = ['React', 'Vue', 'TypeScript', 'JavaScript'];
const DisplayData = () => {
  const { icon } = useIconChange();

  return (
    <>
      <div className="w-16 sm:w-20 h-16 sm:h-20 grid place-items-center bg-white bg-opacity-20 border border-white border-opacity-20 rounded-md">
        <Icon name={icon} size="xl" alt="인풋" />
      </div>
      <IconButtons iconMap={IconMap} />
    </>
  );
};

export const IconButtons = ({ iconMap }: { iconMap: Array<IconNames> }) => {
  const { icon, setIcon } = useIconChange();

  return (
    <ul className="flex gap-2">
      {iconMap.map(iconName => (
        <li key={iconName}>
          <button
            type="button"
            onClick={() => setIcon(iconName)}
            className={cn(
              'px-1.5 sm:px-2 py-0.5 sm:py-1 text-sm sm:text-base text-black rounded-md',
              icon === iconName ? '!bg-blue-300' : '!bg-gray-200',
            )}
          >
            {iconName}
          </button>
        </li>
      ))}
    </ul>
  );
};
