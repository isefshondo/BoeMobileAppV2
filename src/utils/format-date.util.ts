export function formatDate(date: Date) {
  const currentDate = new Date(date);
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear().toString().slice(-2);
  return `${day}/${month}/${year}`;
}