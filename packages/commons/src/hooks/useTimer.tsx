import { useState, useEffect } from 'react';
import { useFormatTime } from '@repo/commons/hooks';

export interface TimerProps {
  timerMode: 'STOPWATCH' | 'TIMER';
  timeValue: number;
}
export interface TimerReturnType {
  time: string;
  timerHandler: (timeState: number) => void;
}

export const useTimer = ({
  timerMode,
  timeValue,
}: TimerProps): TimerReturnType => {
  const [countTime, setCountTime] = useState<number>(timeValue ?? 0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { formattedTime: time } = useFormatTime(countTime);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout> | undefined = undefined;

    if (isActive && timerMode === 'TIMER' && (countTime ?? 0) > 0) {
      interval = setInterval(() => {
        setCountTime(countTime => (countTime ?? 0) - 1000);
      }, 1000);
    } else if (isActive && timerMode === 'STOPWATCH') {
      interval = setInterval(() => {
        setCountTime(countTime => (countTime ?? 0) + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, countTime, timerMode]);

  const timerHandler = (timeState: number) => {
    setIsActive(!!timeState);
  };

  return { time, timerHandler };
};
