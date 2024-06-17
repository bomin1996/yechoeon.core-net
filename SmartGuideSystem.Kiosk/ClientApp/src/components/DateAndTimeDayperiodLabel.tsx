import { useDateAndTimeAndDayperiod } from "src/hooks/useTimeAndDate";
interface Props {
  className?: string;
}
export default function DateAndTimeDayperiodLabel({ className }: Props) {
  const { dateInfo, timeInfo, dayPeriod } = useDateAndTimeAndDayperiod();

  return (
    <div
      className={`flex flex-row items-baseline ${className} text-white font-normal `}
    >
      <p className="text-[21px]">{dateInfo}</p>
      <p className="text-[21px] ml-[19px]">{dayPeriod}</p>
      <p className="text-[43px] ml-[7px]">{timeInfo}</p>
    </div>
  );
}
