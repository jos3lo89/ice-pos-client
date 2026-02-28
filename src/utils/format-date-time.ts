import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const PERU_TZ = "America/Lima";

type DateFormat = "full" | "date" | "time" | "short";

const FORMATS: Record<DateFormat, string> = {
  date: "DD/MM/YYYY",
  time: "hh:mm A",
  full: "DD/MM/YYYY hh:mm A",
  short: "DD/MM",
};

export const formatDateTime = (
  dateString: string | Date | null | undefined,
  format: DateFormat = "full",
): string => {
  if (!dateString) return "-";

  const date = dayjs(dateString).tz(PERU_TZ);

  if (!date.isValid()) return "Fecha inválida";

  return date.format(FORMATS[format]);
};
