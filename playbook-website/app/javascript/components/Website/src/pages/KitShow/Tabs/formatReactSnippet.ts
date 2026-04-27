const CHART_COMPONENTS = ["PbBarGraph", "PbCircleChart", "PbGaugeChart", "PbLineGraph"];

export function formatReactSnippet(source: string, darkMode: boolean): string {
  let formatted = source
    .replace(/"\.\.\/\.\."/g, '"playbook-ui"')
    .replace(/"\.\.\/\.\.\/"/g, '"playbook-ui"')
    .replace(/'\.\.\/\.\.\/'/g, "'playbook-ui'")
    .replace(/'\.\.\/\.\.'/g, "'playbook-ui'")
    .replace(/from "..\/.*$/gm, "from 'playbook-ui'")
    .replace(/from '\.\.\/.*$/gm, "from 'playbook-ui'")
    .replace(
      /'\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/playbook-website\/app\/javascript\/scripts\/custom-icons'/g,
      "'your-directory/custom-icons.js'",
    );

  formatted = formatted.replace(
    /import\s+(\w+)\s+from\s+['"]playbook-ui['"]/g,
    "import { $1 } from 'playbook-ui'",
  );
  formatted = formatted.replace("import { FormattedDate }", "import { Date as FormattedDate }");

  const imports = [...formatted.matchAll(/^\s*import\s+{([^}]+)}\s+from\s+['"]playbook-ui['"]/gm)];
  const allComponents = Array.from(
    new Set(
      imports
        .flatMap((match) => match[1].split(","))
        .map((component) => component.trim())
        .filter(Boolean),
    ),
  );

  const chartImports = allComponents.filter((component) => CHART_COMPONENTS.includes(component));
  const regularImports = allComponents.filter((component) => !CHART_COMPONENTS.includes(component));

  if (allComponents.length > 0) {
    formatted = formatted.replace(/^\s*import\s+{([^}]+)}\s+from\s+['"]playbook-ui['"]\s*$/gm, "");

    const newImports = [];
    if (regularImports.length > 0) {
      newImports.push(`import { ${regularImports.join(", ")} } from 'playbook-ui'`);
    }
    if (chartImports.length > 0) {
      newImports.push(`import { ${chartImports.join(", ")} } from 'playbook-ui/charts'`);
    }

    formatted = formatted.replace(
      /import\s+React[\s\S]+?\n/,
      (reactImport) => `${reactImport}\n${newImports.join("\n")}`,
    );
  }

  formatted = formatted.replace(/\n\s*\n{2,}/g, "\n\n");

  if (darkMode) {
    formatted = formatted.replace(/{\.\.\.props}/g, "dark");
  } else {
    formatted = formatted.replace(/\s*{\.\.\.props}\s*\n/g, "\n");
  }

  formatted = formatted.replace(/ \{\.\.\.props\}/g, "");

  return formatted.trim();
}
