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

test("dialogTest", async () => {
  const page = await context.newPage();
  await page.goto("http://localhost:8089/kits/dialog/react", { waitUntil: "domcontentloaded" });
  await page.click('text="Trigger Dialog"');
  await page.click("trix-editor");
  await page.click('[aria-label="Minimal Modal Example"] .pb_button_content');
  await page.click("#sm");
  await page.click(".dialog_footer .pb_button_content");
  await page.click(".dialog_overlay");
  await page.click('text="Medium Dialog"');
  await page.click(".dialog_footer .pb_button_content");
  await page.click(".dialog_overlay");
  await page.click('text="Large Dialog"');
  await page.click(".dialog_footer .pb_button_content");
});