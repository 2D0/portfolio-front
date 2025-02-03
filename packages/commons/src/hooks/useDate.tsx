export interface DateReturnType {
  fullDateValue: string;
  dateValue: string;
  timeAllValue: string;
  timeValue: string;
  year: number;
  month: number;
  date: number;
  day: number;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
}

export const useDate = (): DateReturnType => {
  const today = new Date();

  const timeStemp = today.toLocaleTimeString();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();

  const hours = today.getHours().toString().padStart(2, '0');
  const minutes = today.getMinutes().toString().padStart(2, '0');
  const seconds = today.getSeconds().toString().padStart(2, '0');
  const milliseconds = today.getMilliseconds().toString().padStart(2, '0');

  const dateValue = `${year}-${month}-${date}`;
  const timeAllValue = `${hours}:${minutes}:${seconds}`;
  const timeValue = `${hours}:${minutes}`;
  const fullDateValue = `${dateValue} ${timeValue}`;

  return {
    fullDateValue,
    dateValue,
    timeAllValue,
    timeValue,
    year,
    month,
    date,
    day,
    hours,
    minutes,
    seconds,
    milliseconds,
  };
};
