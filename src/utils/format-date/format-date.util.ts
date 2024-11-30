export function formatDate(date: Date) {
  const newDateObject = new Date(date);
  const formattedDay = newDateObject.getDate().toString().padStart(2, '0');
  const formattedMonth = (newDateObject.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const formattedYear = newDateObject.getFullYear().toString().slice(-2);
  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}
