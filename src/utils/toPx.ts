export function toPx(value: number) {
  if (value || value === 0) {
    return value + (value !== 0 ? "px" : "");
  }

  return undefined;
}
