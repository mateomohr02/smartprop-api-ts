export const nameFormatter = (str: string): string => {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/^./, (char) => char.toUpperCase());
};