export function formatDate(date) {
  const offset = date.getTimezoneOffset();
  let correctDate = new Date(date.getTime() - offset * 60 * 1000);

  return correctDate.toISOString().split("T")[0];
}

export function displayDate(date) {
  const today = new Date();
  if (formatDate(today) === formatDate(date)) {
    return "Today";
  }

  const options = { weekday: "long", month: "long", day: "numeric" };
  let dateWithoutComma = date.toLocaleDateString(undefined, options);

  return `${dateWithoutComma} (${dateDiffInDays(today, date)}d)`;
}

export function changeDay(date, change) {
  const dateCopy = new Date(date);
  dateCopy.setDate(dateCopy.getDate() + change);

  return dateCopy;
}

export function dateDiffInDays(a, b) {
  // Taken from https://stackoverflow.com/a/15289883
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  const difference = Math.floor((utc2 - utc1) / _MS_PER_DAY);

  return difference > 0 ? `+${difference}` : difference.toString();
}
