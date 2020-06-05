export function getRandomId(): number {
  return parseInt(
    Math.random()
      .toString()
      .substring(2, 12),
    10,
  );
}
