export function arrayToBase64(array: number[]): string {
  let str = '';
  array.forEach(num => {
    str += String.fromCharCode(num);
  });
  return str;
}
