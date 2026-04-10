import { PropValue, PropCondition } from "./types";

export const prepareExampleCode = (source: string): string => {
  let code = source
    .split("\n")
    .filter((l) => !l.trim().startsWith("import "))
    .join("\n");

  const defaultExportRegex = /export\s+default\s+([A-Za-z0-9_]+)/;
  if (defaultExportRegex.test(code)) {
    code = code.replace(defaultExportRegex, "const __Exported = $1");
    code += `\nrender(<__Exported />)`;
  }

  return code;
};

export const checkCondition = (
  condition: PropCondition["requires"] | PropCondition["showWhen"],
  propValues: Record<string, PropValue>
): boolean => {
  if (!condition) return true;

  if (typeof condition === "string") {
    const propVal = propValues[condition];
    return propVal?.enabled && Boolean(propVal?.value);
  }

  if (typeof condition === "object") {
    return Object.entries(condition).every(([propName, expectedValue]) => {
      const propVal = propValues[propName];
      if (!propVal?.enabled) return false;
      return propVal.value === expectedValue;
    });
  }

  return true;
};

export const checkHintCondition = (
  when: Record<string, any>,
  propValues: Record<string, PropValue>
): boolean => {
  return Object.entries(when).every(([propName, expectedValue]) => {
    const propVal = propValues[propName];

    if (expectedValue === null) {
      return !propVal?.enabled || !propVal?.value;
    }

    if (expectedValue === true) {
      return propVal?.enabled && propVal?.value === true;
    }

    if (expectedValue === false) {
      return propVal?.enabled && propVal?.value === false;
    }

    if (propVal?.enabled) {
      return propVal.value === expectedValue;
    }

    return false;
  });
};
