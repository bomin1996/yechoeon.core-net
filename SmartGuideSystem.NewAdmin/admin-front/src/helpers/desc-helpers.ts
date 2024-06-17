import { LoginUserRoleType } from "@shares/LoginUserRoleType";
import { DateTime, Duration } from "luxon";

export function descForRole(role?: LoginUserRoleType) {
  switch (role) {
    case "Admin":
      return "전체관리자";
    case "DepartManager":
      return "부서관리자";
    case "SystemAdmin":
      return "시스템관리자";
  }
  return "";
}

const koDtf = new Intl.DateTimeFormat("ko", {
  dateStyle: "long",
  timeStyle: "short",
});

const koDtf2 = new Intl.DateTimeFormat("ko", {
  dateStyle: "long",
  timeStyle: "short",
  hourCycle: "h24",
});

const koDate = new Intl.DateTimeFormat("ko", {
  dateStyle: "long",
});
//const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });

//   function parseTime(time?: string) {
//     if (time) {
//       const dt = new Date(Date.parse(time));
//       // const now = new Date();
//       // return rtf.format(now.getHours() - dt.getHours(), "hours");
//       //return timeago.format(dt, "ko_KR");
//       return koDtf.format(dt);
//     }
//   }

export function descTime(time?: string) {
  if (time) {
    const dt = new Date(Date.parse(time));
    return koDtf.format(dt);
  }
}

export function descTime24(time?: string) {
  if (time) {
    try {
      const dt = new Date(Date.parse(time));
      return koDtf2.format(dt);
    } catch {
      return "-";
    }
  }
}

export function descDate(time?: string) {
  if (time) {
    try {
      const dt = new Date(Date.parse(time));
      return koDate.format(dt);
    } catch {
      return "-";
    }
  }
}

export function convertInputControlDate(time: Date): string {
  const fullYear = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDay();

  const yearStr = fullYear.toLocaleString("", {
    minimumIntegerDigits: 4,
    useGrouping: false,
  });

  const monthStr = fullYear.toLocaleString("", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  const dayStr = fullYear.toLocaleString("", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  // YYYY-MM-DD

  return "";
}

const timeOnlyFormat = new Intl.DateTimeFormat("ko", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h24",
});

export function descTimeOnly(time?: string) {
  if (time) {
    const dt = new Date(Date.parse(time));
    return timeOnlyFormat.format(dt);
  }
}

export function selectString(
  first?: string,
  second?: string,
  placeHolder = ""
) {
  if (first !== undefined && first !== null && first !== "") {
    return first;
  } else if (second !== undefined && second !== null && second !== "") {
    return second;
  } else {
    return placeHolder;
  }
}

export function getPlayTimeDesc(milliseconds: number) {
  const duration = Duration.fromMillis(milliseconds);

  // return {
  //   hours: duration.hours,
  //   minus: duration.minus,
  //   seconds: duration.seconds,
  // };
  // const hours = `${duration.hours}`;
  // const minutes = `${duration.minutes}`;
  // const seconds = `${duration.seconds}`;
  // return `${hours}:${minutes}:${seconds}`;

  return duration.toFormat("hh:mm:ss");
}
