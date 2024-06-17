import React, { useEffect, useState } from "react";

const dateFormatter = new Intl.DateTimeFormat("ko", {
  month: "2-digit",
  year: "numeric",
  day: "2-digit",
});
const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
});

export default function useTimeAndDate() {
  const [timeInfo, setTimeInfo] = useState("");
  const [dateInfo, setDateInfo] = useState("");

  useEffect(() => {
    const tid = setInterval(() => {
      const today = new Date();

      setDateInfo(dateFormatter.format(today));
      setTimeInfo(timeFormatter.format(today));
    }, 1000);

    return () => {
      clearInterval(tid);
    };
  }, []);

  return { timeInfo, dateInfo };
}

export function useDateAndTimeAndDayperiod() {
  const [timeInfo, setTimeInfo] = useState("");
  const [dateInfo, setDateInfo] = useState("");
  const [dayPeriod, setDayPeriod] = useState("");

  useEffect(() => {
    const tid = setInterval(() => {
      const today = new Date();

      setDateInfo(dateFormatter.format(today));
      const [time, dp] = timeFormatter.format(today).split(" ");

      setTimeInfo(time);
      setDayPeriod(dp);
    }, 1000);

    return () => {
      clearInterval(tid);
    };
  }, []);

  return { dateInfo, dayPeriod, timeInfo };
}
