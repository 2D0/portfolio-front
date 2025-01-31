export interface DateReturnType {
  fullDateValue: string;
  dateValue: string;
  timeValue: string;
  year: number;
  month: number;
  date: number;
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export const useDate = (): DateReturnType => {
  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  const dateValue = `${year}-${month}-${date}`;
  const timeValue = `${hours}:${minutes}:${seconds}`;
  const fullDateValue = `${dateValue} ${timeValue}`;

  return {
    fullDateValue,
    dateValue,
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
