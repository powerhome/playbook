const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const kitDir = __dirname;
const installedImages = path.join(
  kitDir,
  "../../../../../node_modules/intl-tel-input/build/img"
);
const imageNames = ["flags.webp", "flags@2x.webp", "globe.webp", "globe@2x.webp"];

const sha256 = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");

describe("phone number input flag assets", () => {
  test("does not load sprites from a CDN", () => {
    ["_phone_number_input.scss", "intlTelInput.scss"].forEach((name) => {
      const source = fs.readFileSync(path.join(kitDir, name), "utf8");
      expect(source).not.toMatch(/unpkg\.com/);
      expect(source).not.toMatch(/https?:\/\//);
    });
  });

  test("ships the sprites from the installed intl-tel-input package", () => {
    imageNames.forEach((name) => {
      expect(sha256(path.join(kitDir, "img", name))).toBe(
        sha256(path.join(installedImages, name))
      );
    });
  });
});
