export const randomItem = (...items: string[]): string =>
  items[Math.floor(Math.random() * items.length)];
