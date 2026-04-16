import {
  PropValue,
  PropDefinition,
  PlaygroundChildrenConfig,
} from "./types";
import { resolveSchemaDefault } from "./utils";

/**
 * Omit emitting a prop when it matches the **schema** default only. Playground `defaults` in
 * `_playground.json` seed implicit UI state but are not necessarily the component’s runtime default
 * (e.g. Contact has no default for `contactType`); skipping against playground defaults would drop
 * required-looking props from the preview and break rendering.
 */
function shouldSkipEmitWhenMatchesSchemaDefault(
  propDefinitions: Record<string, PropDefinition>,
  name: string,
  propValue: PropValue
): boolean {
  const schemaDefault = resolveSchemaDefault(propDefinitions[name]);
  if (schemaDefault === undefined) return false;
  if (propValue.value !== schemaDefault) return false;
  const v = propValue.value;
  if (v !== null && typeof v === "object") return false;
  return true;
}

interface GenerateCodeOptions {
  componentName: string;
  propValues: Record<string, PropValue>;
  propDefinitions: Record<string, PropDefinition>;
  children?: string;
  includeImport?: boolean;
}

interface GenerateFromTemplateOptions {
  template: string;
  propValues: Record<string, PropValue>;
  propDefinitions: Record<string, PropDefinition>;
  propTargets?: Record<string, string>;
  children?: string;
  childrenConfig?: PlaygroundChildrenConfig;
  includeImport?: boolean;
  customImports?: string[];
  wrapper?: string;
  requiredProps?: Record<string, any>;
}

/** Unquoted key when valid JS identifier; otherwise JSON-stringify the key. */
function formatJsObjectKey(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
}

/** Values inside JSX object literals / nested objects (not JSON.stringify for keys). */
function formatJsExpressionValue(value: unknown): string {
  if (value === null) {
    return "null";
  }
  if (value === undefined) {
    return "undefined";
  }
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => formatJsExpressionValue(item)).join(", ")}]`;
  }
  if (typeof value === "object") {
    const o = value as Record<string, unknown>;
    const keys = Object.keys(o);
    if (keys.length === 0) {
      return "{}";
    }
    const inner = Object.entries(o)
      .map(([k, v]) => `${formatJsObjectKey(k)}: ${formatJsExpressionValue(v)}`)
      .join(", ");
    return `{ ${inner} }`;
  }
  return JSON.stringify(value);
}

/**
 * JSX `name={{ default: true }}` style — avoids JSON `{"default":true}` quoted keys in snippets.
 */
function formatJsxObjectProp(name: string, value: object): string {
  const o = value as Record<string, unknown>;
  const keys = Object.keys(o);
  if (keys.length === 0) {
    return `${name}={{}}`;
  }
  const inner = Object.entries(o)
    .map(([k, v]) => `${formatJsObjectKey(k)}: ${formatJsExpressionValue(v)}`)
    .join(", ");
  return `${name}={{${inner}}}`;
}

const formatPropValue = (
  name: string,
  value: any,
  definition: PropDefinition
): string | null => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const propType = String(definition.type ?? "any").toLowerCase();

  // Handle arrays first (e.g., string[] or string | string[])
  if (Array.isArray(value)) {
    // For string arrays like icon={["far", "fa-star"]}
    return `${name}={${JSON.stringify(value)}}`;
  }

  // kit.schema `Date`: JSON presets are strings; emit `new Date(...)` so kits receive Date instances
  if (propType === "date") {
    if (value instanceof Date) {
      return `${name}={new Date(${JSON.stringify(value.toISOString())})}`;
    }
    if (typeof value === "string" && value.trim()) {
      return `${name}={new Date(${JSON.stringify(value)})}`;
    }
    return null;
  }

  // Check object types FIRST - before other type checks that might match substrings
  // E.g., "{ component: string }" contains "string" but is an object type
  // Exclude Date: typeof "object" but must not serialize as JSX object literal
  if (
    propType.startsWith("{") ||
    (typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date))
  ) {
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date)
    ) {
      return formatJsxObjectProp(name, value);
    }
    return null;
  }

  if (propType === "boolean") {
    if (value === true) {
      return name;
    }
    return `${name}={false}`;
  }

  // e.g. "boolean | string" — must not fall through to string-only handling (boolean true would emit nothing)
  if (
    propType.includes("boolean") &&
    propType.includes("|") &&
    typeof value === "boolean"
  ) {
    if (value === true) {
      return name;
    }
    return `${name}={false}`;
  }

  if (propType === "string" || propType.includes("string")) {
    if (typeof value === "string" && value.trim()) {
      return `${name}="${value}"`;
    }
    return null;
  }

  if (propType === "number") {
    return `${name}={${value}}`;
  }

  // Check if value looks like a function expression (contains => or is "function")
  const looksLikeFunction = typeof value === "string" && (value.includes("=>") || value.trim().startsWith("function"));
  
  if (propType === "function" || propType.includes("=>") || looksLikeFunction) {
    if (typeof value === "string" && value.trim()) {
      return `${name}={${value}}`;
    }
    return null;
  }

  if (propType === "reactnode" || propType.includes("reactnode") || propType.includes("node")) {
    if (typeof value === "string" && value.trim()) {
      return `${name}={<>${value}</>}`;
    }
    return null;
  }

  if (propType === "enum" || definition.values?.length) {
    if (typeof value === "string" && value.trim()) {
      return `${name}="${value}"`;
    }
    return null;
  }

  if (propType === "object" || propType.includes("object")) {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return formatJsxObjectProp(name, value);
    }
    return null;
  }

  if (typeof value === "string") {
    return `${name}="${value}"`;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date)
  ) {
    return formatJsxObjectProp(name, value);
  }

  if (value instanceof Date) {
    return `${name}={new Date(${JSON.stringify(value.toISOString())})}`;
  }

  return `${name}={${JSON.stringify(value)}}`;
};

const formatComponentName = (kitName: string): string => {
  return kitName
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
};

export const generateCode = ({
  componentName,
  propValues,
  propDefinitions,
  children,
  includeImport = true,
}: GenerateCodeOptions): string => {
  const formattedName = formatComponentName(componentName);
  const enabledProps: string[] = [];

  Object.entries(propValues).forEach(([name, propValue]) => {
    if (!propValue.enabled) return;

    const definition = propDefinitions[name] || { type: "any", platforms: ["react"] as const };

    const formatted = formatPropValue(name, propValue.value, definition);
    if (formatted) {
      enabledProps.push(formatted);
    }
  });

  let importStatement = "";
  if (includeImport) {
    importStatement = `import { ${formattedName} } from 'playbook-ui'\n\n`;
  }

  const hasChildren = children && children.trim().length > 0;
  const propsString = enabledProps.length > 0 ? "\n  " + enabledProps.join("\n  ") + "\n" : "";

  if (hasChildren) {
    if (enabledProps.length > 0) {
      return `${importStatement}<${formattedName}${propsString}>\n  ${children}\n</${formattedName}>`;
    }
    return `${importStatement}<${formattedName}>\n  ${children}\n</${formattedName}>`;
  }

  if (enabledProps.length > 0) {
    return `${importStatement}<${formattedName}${propsString}/>`;
  }

  return `${importStatement}<${formattedName} />`;
};

export const generateLiveCode = ({
  componentName,
  propValues,
  propDefinitions,
  children,
}: Omit<GenerateCodeOptions, "includeImport">): string => {
  const formattedName = formatComponentName(componentName);
  const enabledProps: string[] = [];

  Object.entries(propValues).forEach(([name, propValue]) => {
    if (!propValue.enabled) return;

    const definition = propDefinitions[name] || { type: "any", platforms: ["react"] as const };

    const formatted = formatPropValue(name, propValue.value, definition);
    if (formatted) {
      enabledProps.push(formatted);
    }
  });

  const hasChildren = children && children.trim().length > 0;
  const propsString = enabledProps.length > 0 ? " " + enabledProps.join(" ") : "";

  // react-live with noInline mode requires explicit render() call
  if (hasChildren) {
    return `render(<${formattedName}${propsString}>${children}</${formattedName}>)`;
  }

  return `render(<${formattedName}${propsString} />)`;
};

export const getDefaultChildren = (componentName: string): string => {
  const name = componentName.toLowerCase();
  
  const childrenDefaults: Record<string, string> = {
    button: "Click Me",
    badge: "",
    card: "Card content here",
    body: "Body text",
    title: "",
    caption: "",
    flex: "",
    dialog: "Dialog content",
    popover: "Popover content",
    tooltip: "Tooltip content",
  };

  return childrenDefaults[name] ?? "";
};

export const needsChildren = (componentName: string): boolean => {
  const name = componentName.toLowerCase();
  const componentsWithChildren = [
    "button",
    "card",
    "body",
    "dialog",
    "popover",
    "tooltip",
    "flex",
    "flexitem",
    "nav",
    "navitem",
  ];
  
  return componentsWithChildren.includes(name);
};

export const generateFromTemplate = ({
  template,
  propValues,
  propDefinitions,
  propTargets = {},
  children,
  childrenConfig,
  includeImport = true,
  customImports = [],
  wrapper,
  requiredProps = {},
}: GenerateFromTemplateOptions): string => {
  // Group enabled props by their target marker
  const propsByTarget: Record<string, string[]> = {};
  
  Object.entries(propValues).forEach(([name, propValue]) => {
    if (!propValue.enabled) return;
    
    // Skip required props - they're handled separately as variable definitions
    if (requiredProps[name] !== undefined) return;
    
    // Skip only when value matches kit schema default (not playground-only defaults)
    if (shouldSkipEmitWhenMatchesSchemaDefault(propDefinitions, name, propValue)) return;
    
    const definition = propDefinitions[name] || { type: "any", platforms: ["react"] as const };
    
    const formatted = formatPropValue(name, propValue.value, definition);
    if (!formatted) return;
    
    // Determine which marker this prop belongs to
    const target = propTargets[name] || "props";
    
    if (!propsByTarget[target]) {
      propsByTarget[target] = [];
    }
    propsByTarget[target].push(formatted);
  });
  
  // Replace all markers in the template
  let result = template;
  
  // Find all markers like {{props}}, {{NavItem.props}}, {{children}}, etc.
  const markerRegex = /\{\{([^}]+)\}\}/g;
  const markers = new Set<string>();
  let match;
  while ((match = markerRegex.exec(template)) !== null) {
    markers.add(match[1]);
  }
  
  // Check if children should be hidden based on hideWhenPropSet
  const shouldHideChildren = childrenConfig?.hideWhenPropSet?.some(
    (propName) => propValues[propName]?.enabled && propValues[propName]?.value
  ) ?? false;

  // Replace each marker with its props (or empty string if no props)
  markers.forEach((marker) => {
    if (marker === "children") {
      // Handle children marker - hide if a hideWhenPropSet prop is enabled
      const childrenValue = shouldHideChildren ? "" : (children ?? childrenConfig?.default ?? "");
      result = result.replace(/\{\{children\}\}/g, childrenValue);
    } else {
      const props = propsByTarget[marker] || [];
      const propsString = props.length > 0 ? " " + props.join(" ") : "";
      const escapedMarker = marker.replace(/\./g, "\\.");
      result = result.replace(new RegExp(`\\{\\{${escapedMarker}\\}\\}`, "g"), propsString);
    }
  });
  
  // Convert empty component bodies to self-closing tags
  // Matches <Component ...>\n  \n</Component> or <Component ...></Component>
  result = result.replace(/<([A-Z][A-Za-z.]*)((?:\s+[^>]*)?)>\s*<\/\1>/g, "<$1$2 />");
  
  // Apply wrapper if provided (for hook patterns, etc.)
  if (wrapper) {
    result = wrapper.replace(/\{\{component\}\}/g, result);
  }
  
  // Generate variable definitions for required props
  let variableDefinitions = "";
  if (Object.keys(requiredProps).length > 0) {
    Object.entries(requiredProps).forEach(([name, defaultValue]) => {
      // Use current value from propValues if available
      const currentValue = propValues[name]?.value ?? defaultValue;
      variableDefinitions += `const ${name} = ${JSON.stringify(currentValue, null, 2)};\n\n`;
    });
  }
  
  // Add import statement if needed
  if (includeImport) {
    // Extract all component names from the template for the import
    const componentMatches = result.match(/<([A-Z][A-Za-z]*)/g) || [];
    const components = [...new Set(componentMatches.map(m => m.slice(1)))];
    // playbook-ui exports `Date`; alias matches docs / PlaygroundPreview (avoids shadowing global Date)
    const importItemsFromComponents = components.map((c) =>
      c === "FormattedDate" ? "Date as FormattedDate" : c
    );

    // Build import statement with custom imports (hooks, etc.)
    let importItems = [...importItemsFromComponents];
    if (customImports.length > 0) {
      importItems = [...importItems, ...customImports];
    }
    const importStatement = `import { ${importItems.join(", ")} } from 'playbook-ui'\n\n`;
    result = importStatement + variableDefinitions + result;
  } else {
    result = variableDefinitions + result;
  }
  
  return result;
};

export const generateLiveFromTemplate = ({
  template,
  propValues,
  propDefinitions,
  propTargets = {},
  children,
  childrenConfig,
  customImports = [],
  wrapper,
}: Omit<GenerateFromTemplateOptions, "includeImport">): string => {
  const code = generateFromTemplate({
    template,
    propValues,
    propDefinitions,
    propTargets,
    children,
    childrenConfig,
    includeImport: false,
    customImports,
    wrapper,
  });

  let body = code.trimEnd();

  // Wrapper strings sometimes end with <MyComponent /> for display/copy snippets; react-live
  // needs a single render(<MyComponent />). Strip the trailing tag so we do not duplicate.
  const trailingInvocation = /\n<([A-Za-z_][\w.]*)\s*\/>\s*$/;
  const trailing = body.match(trailingInvocation);
  if (trailing) {
    body = body.slice(0, -trailing[0].length).trimEnd();
    return `${body}\nrender(<${trailing[1]} />)`;
  }

  // Wrap in render() for react-live (noInline). Prefer the last `const Name = (` / `function Name(`
  // so requiredProps `const data = [...]` at the top does not steal the render target.
  if (body.includes("const ") || body.includes("function ")) {
    const arrowNames = [...body.matchAll(/\bconst\s+(\w+)\s*=\s*\(/g)].map((m) => m[1]);
    const fnNames = [...body.matchAll(/\bfunction\s+(\w+)\s*\(/g)].map((m) => m[1]);
    const componentName =
      (arrowNames.length ? arrowNames[arrowNames.length - 1] : null) ??
      (fnNames.length ? fnNames[fnNames.length - 1] : null);
    if (componentName) {
      return `${body}\nrender(<${componentName} />)`;
    }
  }

  return `render(${body.trim()})`;
};
