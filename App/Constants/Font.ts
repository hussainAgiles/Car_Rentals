export const lineHeight: { [key: number]: number } = {
  10: 18,
  12: 20,
  14: 22,
  16: 24,
  18: 26,
  20: 28,
  30: 38,
};

export const getLineHeight = (fontSize: number): number => {
  const lineHeight: { [key: number]: number } = {
    10: 18,
    12: 20,
    14: 22,
    16: 24,
    18: 26,
    20: 28,
    30: 38,
  };

  return lineHeight[fontSize] ?? fontSize * 1.5;
};
