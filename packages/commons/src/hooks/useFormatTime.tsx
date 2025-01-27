export interface FormatTimeReturnType {
  seconds: number;
  minutes: number;
  hours: number;
  formattedTime: string;
  eighteenSeconds: number;
  eighteenMinutes: number;
  eighteenHours: number;
}

export const useFormatTime = (time: number): FormatTimeReturnType => {
  const seconds = Math.floor(time / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const eighteenSeconds = time * 1000;
  const eighteenMinutes = time * 60 * 1000;
  const eighteenHours = time * 60 ** 2 * 1000;

  const displaySeconds = seconds % 60;
  const displayMinutes = minutes % 60;

  let formattedTime =
    displayMinutes.toString().padStart(2, '0') +
    ':' +
    displaySeconds.toString().padStart(2, '0');

  if (hours > 0) {
    formattedTime = hours.toString().padStart(2, '0') + ':' + formattedTime;
  }

  return {
    seconds,
    minutes,
    hours,
    formattedTime,
    eighteenSeconds,
    eighteenMinutes,
    eighteenHours,
  };
};
