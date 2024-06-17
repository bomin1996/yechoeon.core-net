import  { useEffect, useState } from "react";
import { Duration } from "luxon";

interface Props {
  className?: string;
  // hour: number;
  // min: number;
  // sec: number;
  duration: number;
  isEnable: boolean;
  onChange?: (duration: number) => void;
}

export default function TimeSelectBar({
  className,
  // hour,
  // min,
  // sec,
  duration,
  isEnable,
  onChange,
}: Props) {
  const [selectedHindex, setSelectedHindex] = useState(0);
  const [selectedMindex, setSelectedMindex] = useState(0);
  const [selectedSindex, setSelectedSindex] = useState(0);
  const hours = makeNumberList(24, "h");
  const mins = makeNumberList(60, "m");
  const secs = makeNumberList(60, "s");

  useEffect(() => {
    const dur = Duration.fromMillis(duration);

    const ret = dur.shiftTo("hours", "minutes", "seconds").toObject();

    const idxHours = ret.hours ?? 0;
    const idxMinutes = ret.minutes ?? 0;
    const idxSeconds = ret.seconds ?? 0;
    setSelectedHindex(Math.floor(idxHours));
    setSelectedMindex(Math.floor(idxMinutes));
    setSelectedSindex(Math.floor(idxSeconds));

    console.log("calc time duration", idxHours, idxMinutes, idxSeconds);
  }, [duration]);

  return (
    <div className={`${className} flex flex-row `}>
      {/* <p>Time:{duration}</p> */}
      <select
        disabled={!isEnable}
        className="w-full px-3 py-2  rounded-tl-md rounded-bl-md focus:shadow outline-green-500/50 focus:outline disabled:border disabled:bg-black/5 read-only:bg-black/5 scrollbar"
        onChange={(ev) => {
          const indexHour = hours.findIndex((it) => it === ev.target.value);
          const h = indexHour * 60 * 60 * 1000;
          const mins = selectedMindex * 60 * 1000;
          const seconds = selectedSindex * 1000;
          onChange?.(h + mins + seconds);
        }}
      >
        {hours.map((str, idx) => (
          <option
            className="p-1 text-lg"
            key={idx}
            selected={idx === selectedHindex}
          >
            <span className="px-4 py-2 bg-sky-500 ">{str}</span>
          </option>
        ))}
      </select>

      <select
        disabled={!isEnable}
        className="w-full px-3 py-2 mx-[1px]   focus:shadow outline-green-500/50 focus:outline disabled:border disabled:bg-black/5 read-only:bg-black/5 scrollbar"
        onChange={(ev) => {
          const indexMins = mins.findIndex((it) => it === ev.target.value);
          const h = selectedHindex * 60 * 60 * 1000;
          const minss = indexMins * 60 * 1000;
          const seconds = selectedSindex * 1000;
          onChange?.(h + minss + seconds);
        }}
      >
        {mins.map((str, idx) => (
          <option
            className="p-1 text-lg"
            key={idx}
            selected={idx === selectedMindex}
          >
            <span className="px-0 py-2 bg-sky-500 ">{str}</span>
          </option>
        ))}
      </select>

      <select
        disabled={!isEnable}
        className="w-full px-3 py-2 rounded-tr-md rounded-br-md focus:shadow outline-green-500/50 focus:outline disabled:border disabled:bg-black/5 read-only:bg-black/5 scrollbar"
        onChange={(ev) => {
          const indexSec = secs.findIndex((it) => it === ev.target.value);
          const h = selectedHindex * 60 * 60 * 1000;
          const minss = selectedMindex * 60 * 1000;
          const seconds = indexSec * 1000;
          onChange?.(h + minss + seconds);
        }}
      >
        {secs.map((str, idx) => (
          <option
            className="p-1 text-lg"
            key={idx}
            selected={idx === selectedSindex}
          >
            <span className="px-4 py-2 bg-sky-500 ">{str}</span>
          </option>
        ))}
      </select>
    </div>
  );
}
function makeNumberList(maxcount: number, tag: string) {
  const h = [];
  for (let i = 0; i < maxcount; i++) {
    h.push(i + tag);
  }
  return h;
}
