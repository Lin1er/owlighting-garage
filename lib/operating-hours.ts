/**
 * Operating-hours helper.
 *
 * Parses simple Indonesian working-hours strings like
 *   "Senin - Sabtu: 09.00 - 18.00"
 * and answers "is the workshop open right now?".
 *
 * Default config matches contactInfo.workingHours but we keep this pure
 * so it can also be unit-tested or fed from CMS settings later.
 */

const DAY_INDEX: Record<string, number> = {
  minggu: 0, ahad: 0, sun: 0,
  senin: 1, mon: 1,
  selasa: 2, tue: 2,
  rabu: 3, wed: 3,
  kamis: 4, thu: 4,
  jumat: 5, "jum'at": 5, fri: 5,
  sabtu: 6, sat: 6,
};

const DAY_NAMES_ID = [
  "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu",
];

export type Schedule = {
  /** Inclusive lower-bound day-of-week (0 = Sunday). */
  dayStart: number;
  /** Inclusive upper-bound day-of-week. */
  dayEnd: number;
  /** Minutes since midnight, 0 - 1440. */
  openMinute: number;
  /** Minutes since midnight, 0 - 1440. */
  closeMinute: number;
};

/** Parse "Senin - Sabtu: 09.00 - 18.00" into a structured schedule. */
export function parseSchedule(input: string): Schedule | null {
  const m = input
    .toLowerCase()
    .match(
      /([a-z']+)\s*[-–]\s*([a-z']+)\s*:\s*(\d{1,2})[\.:](\d{2})\s*[-–]\s*(\d{1,2})[\.:](\d{2})/,
    );
  if (!m) return null;
  const [, dStart, dEnd, h1, m1, h2, m2] = m;
  const start = DAY_INDEX[dStart];
  const end = DAY_INDEX[dEnd];
  if (start === undefined || end === undefined) return null;
  return {
    dayStart: start,
    dayEnd: end,
    openMinute: Number(h1) * 60 + Number(m1),
    closeMinute: Number(h2) * 60 + Number(m2),
  };
}

export type OpenStatus = {
  open: boolean;
  /** Human-readable next change, e.g. "tutup 18.00" or "buka besok 09.00". */
  nextChange: string;
};

function fmtTime(minute: number): string {
  const h = Math.floor(minute / 60).toString().padStart(2, "0");
  const m = (minute % 60).toString().padStart(2, "0");
  return `${h}.${m}`;
}

/** Returns whether the workshop is currently open per the given schedule. */
export function isOpenNow(
  schedule: Schedule,
  now: Date = new Date(),
): OpenStatus {
  const day = now.getDay();
  const minute = now.getHours() * 60 + now.getMinutes();
  const inDayRange = schedule.dayStart <= schedule.dayEnd
    ? day >= schedule.dayStart && day <= schedule.dayEnd
    : day >= schedule.dayStart || day <= schedule.dayEnd;

  if (inDayRange && minute >= schedule.openMinute && minute < schedule.closeMinute) {
    return {
      open: true,
      nextChange: `tutup ${fmtTime(schedule.closeMinute)}`,
    };
  }

  // Find the next open day
  for (let offset = 0; offset < 8; offset++) {
    const checkDay = (day + offset) % 7;
    const inRange = schedule.dayStart <= schedule.dayEnd
      ? checkDay >= schedule.dayStart && checkDay <= schedule.dayEnd
      : checkDay >= schedule.dayStart || checkDay <= schedule.dayEnd;
    if (!inRange) continue;
    if (offset === 0 && minute < schedule.openMinute) {
      return { open: false, nextChange: `buka ${fmtTime(schedule.openMinute)}` };
    }
    if (offset > 0) {
      const label =
        offset === 1
          ? "buka besok"
          : `buka ${DAY_NAMES_ID[checkDay]}`;
      return { open: false, nextChange: `${label} ${fmtTime(schedule.openMinute)}` };
    }
  }

  return { open: false, nextChange: "tutup hari ini" };
}

/** Convenience: parse + check. Returns sensible default if parse fails. */
export function getOpenStatus(input: string, now: Date = new Date()): OpenStatus {
  const schedule = parseSchedule(input);
  if (!schedule) return { open: false, nextChange: "" };
  return isOpenNow(schedule, now);
}
