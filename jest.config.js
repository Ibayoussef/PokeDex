module.exports = {
  preset: "jest-puppeteer",
  globals: {
    URL: "http://localhost:8080",
  },
  testMatch: ["e2e.test.js"],
  verbose: true,
};
