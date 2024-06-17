export interface ICalendarDateInfo {
  weeks: Array<Array<IDateInfo>>;
}

export interface IDateInfo {
  date: Date;
  desc: string;
  dayIndex?: number;
}

const ALL_WEEKS_ROW_COUNT: number = 6;

export function getAllWeekRowsInMonth(
  year: number,
  month: number
): Array<Array<IDateInfo>> {
  let weeks: Array<Array<IDateInfo>> = [];

  //   //월 첫날
  let firstDateOfMonth: Date = new Date(year, month - 1, 1);

  //   //칼렌다 첫날
  let firstDateOfCalendar: Date =
    firstDateOfMonth.getDay() === 0
      ? firstDateOfMonth
      : new Date(year, month - 1, 1 - firstDateOfMonth.getDay());

  // console.log("firstDateOfCalendar", firstDateOfCalendar);

  let currentDate: Date = firstDateOfCalendar;
  for (let i = 0; i < ALL_WEEKS_ROW_COUNT; i++) {
    let newDate = currentDate.setDate(
      //인덱스이므로
      i === 0 ? currentDate.getDate() : currentDate.getDate() + 6 // 일주일 더한다.
    );

    currentDate = new Date(newDate);

    const week: Array<IDateInfo> = genOneWeek(currentDate);
    weeks.push(week);
  }

  return weeks;
}

export function getFirstDateInMonCal(year: number, month: number): Date {
  //   //월 첫날
  let firstDateOfMonth: Date = new Date(year, month - 1, 1);

  // console.log("firstDateOfMonth", firstDateOfMonth);
  //   //칼렌다 첫날
  let firstDateOfCalendar: Date =
    firstDateOfMonth.getDay() === 0
      ? firstDateOfMonth
      : new Date(year, month - 1, 1 - firstDateOfMonth.getDay());

  return firstDateOfCalendar;
}

const genOneWeek = (startDate: Date) => {
  let daysOfWeek: Array<IDateInfo> = [];

  let currentDate = startDate;
  for (let i = 0; i < 7; i++) {
    let makeCurrentDate = new Date(currentDate);

    daysOfWeek.push({
      date: makeCurrentDate,
      desc: makeCurrentDate.getDate().toString(),
    });

    let newDate = currentDate.setDate(currentDate.getDate() + 1);
    currentDate = new Date(newDate);
  }
  return daysOfWeek;
};

export function getAllDaysInOnePageCalendar(
  year: number,
  month: number
): Array<IDateInfo> {
  let daysOfOnePage: Array<IDateInfo> = [];

  //   //월 첫날
  let firstDateOfMonth: Date = new Date(year, month - 1, 1);

  //   //칼렌다 첫날
  let firstDateOfCalendar: Date =
    firstDateOfMonth.getDay() === 0
      ? firstDateOfMonth
      : new Date(year, month - 1, 1 - firstDateOfMonth.getDay());

  let currentDate: Date = firstDateOfCalendar;
  for (let i = 0; i < ALL_WEEKS_ROW_COUNT; i++) {
    let newDate = currentDate.setDate(
      //인덱스이므로
      i === 0 ? currentDate.getDate() : currentDate.getDate() + 6 // 일주일 더한다.
    );

    currentDate = new Date(newDate);
    const week: Array<IDateInfo> = genOneWeek(currentDate);

    let dayIndex = 0;
    week.forEach((day) => {
      day.dayIndex = dayIndex;
      daysOfOnePage.push(day);
      dayIndex++;
    });
  }

  return daysOfOnePage;
}

export function getStartEndDateInOnePageCalendar(year: number, month: number) {
  //   //월 첫날
  const oneDayMSTimes = 24 * 60 * 60 * 1000;
  const firstDateOfMonth: Date = new Date(year, month - 1, 1);
  const firstDateOfCalendar: Date = new Date(
    year,
    month - 1,
    1 - firstDateOfMonth.getDay()
  );
  const sixWeekMSTimes = 6 * 7 * oneDayMSTimes;
  const ednDateOfCalendar: Date = new Date(
    firstDateOfCalendar.getTime() + sixWeekMSTimes
  );
  return { start: firstDateOfCalendar, end: ednDateOfCalendar };
}
