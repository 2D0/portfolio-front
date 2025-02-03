export interface DateReturnType {
  fullDateValue: string;
  dateValue: string;
  timeAllValue: string;
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

  const timeStemp = today.toLocaleTimeString();

  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const day = today.getDay();

  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const milliseconds = today.getMilliseconds();

  const hoursString = hours.toString().padStart(2, '0');
  const minutesSting = minutes.toString().padStart(2, '0');
  const secondsSting = seconds.toString().padStart(2, '0');
  const millisecondsSting = milliseconds.toString().padStart(2, '0');

  const dateValue = `${year}-${month}-${date}`;
  const timeAllValue = `${hoursString}:${minutesSting}:${secondsSting}`;
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
