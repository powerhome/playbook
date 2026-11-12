const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const kitDir = __dirname;
const installedImages = path.join(
  kitDir,
  "../../../../../node_modules/intl-tel-input/build/img"
);
const imageNames = ["flags.webp", "flags@2x.webp", "globe.webp", "globe@2x.webp"];
const scssFiles = ["_phone_number_input.scss", "intlTelInput.scss"];

const sha256 = (buffer) => crypto.createHash("sha256").update(buffer).digest("hex");
const readScss = (name) => fs.readFileSync(path.join(kitDir, name), "utf8");

describe("phone number input flag assets", () => {
  test("does not load sprites from a CDN", () => {
    scssFiles.forEach((name) => {
      const source = readScss(name);
      expect(source).not.toMatch(/unpkg\.com/);
      expect(source).not.toMatch(/https?:\/\//);
    });
  });

  test("ships the sprites from the installed intl-tel-input package", () => {
    imageNames.forEach((name) => {
      expect(sha256(fs.readFileSync(path.join(kitDir, "img", name)))).toBe(
        sha256(fs.readFileSync(path.join(installedImages, name)))
      );
    });
  });

  test("inlines the sprites as data URIs instead of a relative file path", () => {
    // A relative url("./img/...") only resolves when this CSS and the img folder stay
    // side by side, which breaks once a consumer (e.g. Nitro's Sprockets pipeline)
    // compiles this SCSS source directly instead of Playbook's own built dist output.
    scssFiles.forEach((name) => {
      expect(readScss(name)).not.toMatch(/url\(["']?\.\/img/);
    });

    const variables = {
      "iti-flags-1x-data": "flags.webp",
      "iti-flags-2x-data": "flags@2x.webp",
      "iti-globe-1x-data": "globe.webp",
      "iti-globe-2x-data": "globe@2x.webp",
    };
    const source = readScss("intlTelInput.scss");

    Object.entries(variables).forEach(([variable, imageName]) => {
      const match = source.match(
        new RegExp(`\\$${variable}:\\s*"data:image/webp;base64,([^"]+)"`)
      );
      expect(match).not.toBeNull();

      const decoded = Buffer.from(match[1], "base64");
      expect(sha256(decoded)).toBe(
        sha256(fs.readFileSync(path.join(kitDir, "img", imageName)))
      );
    });
  });
});
