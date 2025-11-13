module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  transformIgnorePatterns: [
    "node_modules/(?!axios|@mui|dayjs)"
  ],
  moduleFileExtensions: ["js", "jsx"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.js",
    "src/utils/**/*.js"
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
};
