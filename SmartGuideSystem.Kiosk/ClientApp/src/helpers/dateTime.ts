const koDtf = new Intl.DateTimeFormat("ko", {
  dateStyle: "long",
  timeStyle: "short",
});

const koDtfDate = new Intl.DateTimeFormat("ko", {
  month: "2-digit",
  year: "numeric",
  day: "2-digit",
});

const koDtfDate2 = new Intl.DateTimeFormat("ko", {
  month: "2-digit",
  day: "2-digit",
});

const timeOnlyFormat = new Intl.DateTimeFormat("ko", {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h24",
});

const monthDayOnlyFormat = new Intl.DateTimeFormat("ko", {
  month: "2-digit",
  day: "2-digit",
});

export function descTime(time?: string) {
  if (time) {
    const dt = new Date(Date.parse(time));
    return koDtf.format(dt);
  }
}

export function descDate(time?: string | Date) {
  if (typeof time === "string") {
    if (time) {
      const dt = new Date(Date.parse(time));
      return koDtfDate.format(dt);
    }
  } else if (time instanceof Date) {
    return koDtfDate.format(time);
  }
}

export function descDate2(time?: string | Date) {
  if (typeof time === "string") {
    if (time) {
      const dt = new Date(Date.parse(time));
      return koDtfDate2.format(dt);
    }
  } else if (time instanceof Date) {
    return koDtfDate2.format(time);
  }
}

export function descTimeOnly(time?: string) {
  if (time) {
    const dt = new Date(Date.parse(time));
    return timeOnlyFormat.format(dt);
  }
}

export function descMonthDayOnly(time?: string | Date) {
  if (typeof time === "string") {
    if (time) {
      const dt = new Date(Date.parse(time));
      return monthDayOnlyFormat.format(dt);
    }
  } else if (time instanceof Date) {
    return monthDayOnlyFormat.format(time);
  }
}
