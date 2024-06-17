import { DateTime } from "luxon";
import  { useMemo } from "react";

interface Props {
  className?: string;
  time: Date | string;
  timeStyle: "hour00" | "hour30" | "hour15" | "hour10";
  isEnable: boolean;
  onChange?: (value: string) => void;
}

const hours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];
const mins30 = [0, 30];
const mins15 = [0, 15, 30, 45];
const mins10 = [0, 10, 20, 30, 40, 50];
//const numberF = new Intl.NumberFormat('ko', {})
export default function SGTimePicker({
  className,
  time,
  timeStyle,
  isEnable,
  onChange,
}: Props) {
  // const indexTime = 3;
  let inputTime: Date = new Date();
  if (typeof time === "string") {
    const dt = DateTime.fromFormat(time, "HH:mm");

    inputTime = dt.toJSDate();
  } else if (time instanceof Date) {
    inputTime = time;
  }

  let value = "";
  switch (timeStyle) {
    case "hour00":
      value = inputTime.getHours().toString().padStart(2, "0") + ":00";
      break;
    case "hour10":
      value =
        inputTime.getHours().toString().padStart(2, "0") +
        ":" +
        (Math.floor(inputTime.getMinutes() / 10) * 10)
          .toString()
          .padStart(2, "0");
      break;
    case "hour15":
      value =
        inputTime.getHours().toString().padStart(2, "0") +
        ":" +
        (Math.floor(inputTime.getMinutes() / 15) * 15)
          .toString()
          .padStart(2, "0");
      break;
    case "hour30":
      value =
        inputTime.getHours().toString().padStart(2, "0") +
        ":" +
        (Math.floor(inputTime.getMinutes() / 30) * 30)
          .toString()
          .padStart(2, "0");
      break;
  }

  const items = useMemo(() => {
    const hourMinItems: string[] = [];

    let minItems;
    switch (timeStyle) {
      case "hour00":
        break;
      case "hour10":
        minItems = mins10;
        break;
      case "hour15":
        minItems = mins15;
        break;
      case "hour30":
        minItems = mins30;
        break;
    }

    for (let i = 0; i < hours.length; i++) {
      const hour = hours[i];
      if (minItems) {
        for (let j = 0; j < minItems.length; j++) {
          const min = minItems[j];
          hourMinItems.push(
            `${hour.toString().padStart(2, "0")}:${min
              .toString()
              .padStart(2, "0")}`
          );
        }
      } else {
        const str = `${hour}:00`;
        str.padStart(5, "0");
        hourMinItems.push(`${hour}:00`);
      }
    }

    return hourMinItems;
  }, [timeStyle]);

  let index = items.findIndex((it) => it === value);
  if (index === -1) {
    index = 0;
  }

  return (
    <div className={`${className} flex `}>
      <select
        disabled={!isEnable}
        className="w-full px-3 py-2 rounded-md focus:shadow outline-green-500/50 focus:outline disabled:border disabled:bg-black/5 read-only:bg-black/5 scrollbar"
        onChange={(ev) => {
          onChange?.(ev.target.value);
        }}
      >
        {items.map((str, idx) => (
          <option className="p-1 text-lg" key={idx} selected={idx === index}>
            <span className="px-4 py-2 bg-sky-500 ">{str}</span>
          </option>
        ))}
      </select>
    </div>
  );
}
