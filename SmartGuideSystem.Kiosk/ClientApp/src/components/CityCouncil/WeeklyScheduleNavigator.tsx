import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ISGMeetingInfo } from "@shares/*";
import { useMemo } from "react";

export const oneDayTimes = 24 * 60 * 60 * 1000;
export const oneWeekTimes = 7 * oneDayTimes;

interface Props {
  startDate: Date;
  className?: string;
  meetingInfos: Array<ISGMeetingInfo>;
  onPrevClick?: () => void;
  onNextClick?: () => void;
  onClickInfo?: (meetings?: Array<ISGMeetingInfo>, date?: Date) => void;
}

export default function WeeklyScheduleNavigator({
  startDate,
  className,
  meetingInfos,
  onPrevClick,
  onNextClick,
  onClickInfo,
}: Props) {
  const eventMap = useMemo(() => {
    const map = new Map<String, Array<ISGMeetingInfo>>();
    meetingInfos.forEach((event, index) => {
      const startTime = new Date(event.startTime);
      const key = startTime.toDateString();
      if (map.has(key)) {
        map.set(key, [...map.get(key)!, event]);
      } else {
        map.set(key, [event]);
      }
    });
    return map;
  }, [meetingInfos]);

  const days = [];
  for (let i = 0; i < 7; i++) {
    const time = startDate.getTime();
    const day = new Date(time + oneDayTimes * i);
    days.push(day);
  }

  return (
    <div
      className={`flex justify-center items-center flex-row space-x-[2px] ${className}`}
    >
      <ChevronLeftIcon
        className="h-[32px] w-[32px] stroke-white"
        onClick={onPrevClick}
      />

      {days.map((dt, idx) => (
        // <span
        //   key={dt.getTime()}
        //   className={`min-w-[24px] font-[500] text-[20px] ${
        //     isToday(dt) ? "text-red-500" : ""
        //   }`}
        // >
        //   {dt.getDate()}
        // </span>
        <DayItem
          key={dt.getTime()}
          dt={dt}
          meetingInfos={eventMap.get(dt.toDateString())}
          onClick={() => {
            //onClickInfo?.(eventMap.get(dt.toDateString())
            onClickInfo?.(eventMap.get(dt.toDateString()), dt);
          }}
        />
      ))}

      <ChevronRightIcon
        className="h-[32px] w-[32px] stroke-white"
        onClick={onNextClick}
      />
    </div>
  );
}

export function isToday(date: Date) {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

interface DayItemProps {
  dt: Date;
  meetingInfos?: Array<ISGMeetingInfo>;
  onClick?: () => void;
  hasSchedule?: boolean;
}

function DayItem({
  dt,
  onClick,
  meetingInfos,
  hasSchedule = false,
}: DayItemProps) {
  let cn = "text-white";

  const hasEvent = meetingInfos && meetingInfos.length > 0;

  if (isToday(dt)) {
    cn = "text-[]";
  } else if (dt.getDay() === 0) {
    cn = "text-[#DB90B7]";
  } else if (dt.getDay() === 6) {
    cn = "text-[#B0E5FC]";
  }

  return (
    <div
      onClick={onClick}
      className={`relative flex w-[37px] h-[37px] text-center font-[500] text-[20px] rounded-full
      ${cn}
       ${
         hasEvent
           ? "bg-[#E5004F] active:scale-95 active:bg-[#E5004F]/80 text-white font-[300]"
           : ""
       }

       

      `}
    >
      <span className="m-auto">{dt.getDate()}</span>
      {hasEvent && (
        <div className="absolute left-[50%] bottom-[-50%] translate-x-[-50%] bg-[#E5004F] w-[8px] h-[8px] rounded-full"></div>
      )}
    </div>
  );
}
