// Defining the timeout for the test
const timeout = process.env.SLOWMO ? 6000 : 4000;
const fs = require("fs");

// Go to the specified path and wait for the domcontent to load before running the tests
beforeAll(async () => {
  await page.goto("http://localhost:3000");
});

describe("Title of the page", () => {
  test(
    "Title of the page",
    async () => {
      // Gets page title
      const title = await page.title();
      // Compares it with the intended behaviour
      expect(title).toBe("<title-of-the-page>");
    },
    timeout
  );
});
