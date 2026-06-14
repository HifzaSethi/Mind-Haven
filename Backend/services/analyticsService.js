export const getMostFrequent = (arr) => {
  if (!arr.length) return null;

  const count = {};

  arr.forEach((item) => {
    count[item] = (count[item] || 0) + 1;
  });

  return Object.keys(count).reduce((a, b) => (count[a] > count[b] ? a : b));
};
