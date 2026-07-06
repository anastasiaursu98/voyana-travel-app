/** @type {import("jest").Config} */
module.exports = {
  clearMocks: true,
  moduleFileExtensions: ["ts", "js", "json"],
  restoreMocks: true,
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.test.ts",
    "<rootDir>/tests/**/*.test.ts",
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  testTimeout: 30000,
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
};
