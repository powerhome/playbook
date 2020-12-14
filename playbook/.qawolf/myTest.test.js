const qawolf = require("qawolf");

let browser;
let context;

beforeAll(async () => {
  browser = await qawolf.launch();
  context = await browser.newContext();
  await qawolf.register(context);
});

afterAll(async () => {
  await qawolf.stopVideos();
  await browser.close();
});

test("myTest", async () => {
  const page = await context.newPage();
  await page.goto("http://todomvc.com/examples/react/", { waitUntil: "domcontentloaded" });
  await page.click(".new-todo");
  await page.fill(".new-todo", "hello world");
  await page.fill(".new-todo", "omg");
  await page.fill(".new-todo", "wow ");
  await page.fill(".new-todo", "this is amazing");
  await page.press(".new-todo", "Enter");
  await page.click("li:nth-of-type(3) .toggle");
  await page.click("li:nth-of-type(4) .toggle");
  await page.click("#toggle-all");
  await page.click("#toggle-all");
  await page.click("#toggle-all");
  await page.click("#toggle-all");
  await page.click("text=Active");
  await page.click("text=Completed");
  await page.click("text=Active");
  await page.click("text=All");
  await page.click("text=omg");
  await page.click("li:nth-of-type(2) .toggle");
  await page.click("li:nth-of-type(3) .toggle");
  await page.click("text=wow");
  await page.click("li:nth-of-type(4) .toggle");
  await page.click("li:nth-of-type(3) .toggle");
  await page.click("li:nth-of-type(2) .toggle");
  await page.click(".toggle");
  await page.click(".toggle");
});