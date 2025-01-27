'use client';
import { useState } from 'react';
import {
  useTimer,
  useDate,
  type FormatTimeReturnType,
  type DateReturnType,
  type TimerProps,
  type TimerReturnType,
  useFormatTime,
} from '@repo/commons/hooks';

export default function Page(): JSX.Element {
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
    <main>
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
    </main>
  );
}
