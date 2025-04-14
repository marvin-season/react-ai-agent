export function randomID() {
  return Math.random().toString(36).substring(2, 15);
}

export function randomColorHex() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
