import { calculatePoints, calculateRewardPoints } from "../utils/calculatePoints";

test("calculates points correctly", () => {
  expect(calculatePoints(120)).toBe(90);
  expect(calculatePoints(75)).toBe(25);
  expect(calculatePoints(50)).toBe(0);
  expect(calculatePoints(100.2)).toBe(50);
  expect(calculatePoints(100.4)).toBe(50);
});

test("handles fractional prices correctly", () => {
  expect(calculateRewardPoints(100.2)).toBe(50);
  expect(calculateRewardPoints(100.4)).toBe(50);
  expect(calculateRewardPoints(100.6)).toBe(51);
});

test("returns 0 for invalid or missing prices", () => {
  expect(calculateRewardPoints(null)).toBe(0);
  expect(calculateRewardPoints(undefined)).toBe(0);
});

