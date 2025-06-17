import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

try {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const packageJsonUrl = new URL("../../node_modules/@powerhome/playbook-icons/package.json", import.meta.url);
  const packageJsonPath = fileURLToPath(packageJsonUrl);
  const packageRoot = path.dirname(packageJsonPath);

  const ICONS_PATH = path.join(packageRoot, "icons");
  const OUTPUT_PATH = path.resolve(__dirname, "../app/assets/icons.json");

  const result = [];

  fs.readdirSync(ICONS_PATH).forEach(category => {
    const categoryPath = path.join(ICONS_PATH, category);

    if (fs.statSync(categoryPath).isDirectory()) {
      const icons = fs.readdirSync(categoryPath)
        .filter(file => file.endsWith(".svg"))
        .map(file => ({
          name: file.replace(".svg", ""),
          category: category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())
        }));
      result.push(...icons);
    }
  });

  const outputDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
  console.log(`✅ icons.json generated with ${result.length} icons`);
} catch (error) {
  console.error("❌ Failed to generate icons.json:", error);
  process.exit(1);
}
