import { calculatePoints } from "./calculatePoints";

test("calculates points correctly", () => {
  expect(calculatePoints(120)).toBe(90);
  expect(calculatePoints(75)).toBe(25);
  expect(calculatePoints(50)).toBe(0);
  expect(calculatePoints(100.2)).toBe(50);
  expect(calculatePoints(100.4)).toBe(50);
});

