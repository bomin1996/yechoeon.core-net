// import React from "react";
import { getAllDaysInOnePageCalendar } from "./MonCalendarUtils";
import MCCell from "./MonCalendarCell";

const weekDescList = ["일", "월", "화", "수", "목", "금", "토"];

export interface IMonCalenderEvent {
  id: string;
  time: Date;
  title: string;
}

interface Props {
  className?: string;
  year: number;
  month: number;
  events: Array<IMonCalenderEvent>;
  onClickEvent: (event: IMonCalenderEvent) => void;
  onClickMoreEvent?: (events: IMonCalenderEvent[]) => void;
}

export default function MonCalender({
  className,
  year,
  month,
  events,
  onClickEvent,
  onClickMoreEvent,
}: Props) {
  let daysInOnePage = getAllDaysInOnePageCalendar(year, month);

  const eventMap = new Map();

  events.forEach((event, index) => {
    const key = event.time.toLocaleDateString();
    if (!eventMap.has(key)) {
      eventMap.set(key, [event]);
    } else {
      let eventList: Array<IMonCalenderEvent> = eventMap.get(key);
      eventMap.set(key, [...eventList, event]);
    }
  });

  return (
    <div className={`text-lg ${className} flex flex-col `}>
      <div className="flex flex-row  w-full">
        {weekDescList.map((ev, index) => (
          <p
            key={index}
            className="border  flex-1 py-1 bg-gray-100 font-bold text-black text-center "
          >
            {ev}
          </p>
        ))}
      </div>

      <div className="flex-1 h-0 w-full grid grid-cols-7 grid-rows-6 bg-green-300 ">
        {daysInOnePage.map((item, index) => (
          <MCCell
            key={index}
            cellDate={item}
            inMonthDay={item.date.getMonth() + 1 === month}
            className=" "
            dayIndex={index % 7}
            items={eventMap.get(item.date.toLocaleDateString())}
            onClick={(a: IMonCalenderEvent) => {
              onClickEvent(a);
            }}
            onClickMore={(events2) => {
              onClickMoreEvent?.(events2);
            }}
            maxItemViewCount={5}
          />
        ))}
      </div>
    </div>
  );
}
