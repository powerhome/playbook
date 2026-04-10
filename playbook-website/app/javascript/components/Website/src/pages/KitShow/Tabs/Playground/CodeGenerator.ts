import { PropValue, PropDefinition, PlaygroundChildrenConfig } from "./types";

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
  defaults?: Record<string, any>;
  children?: string;
  childrenConfig?: PlaygroundChildrenConfig;
  includeImport?: boolean;
}

const formatPropValue = (
  name: string,
  value: any,
  definition: PropDefinition
): string | null => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const propType = definition.type.toLowerCase();

  // Handle arrays first (e.g., string[] or string | string[])
  if (Array.isArray(value)) {
    // For string arrays like icon={["far", "fa-star"]}
    return `${name}={${JSON.stringify(value)}}`;
  }

  // Check object types FIRST - before other type checks that might match substrings
  // E.g., "{ component: string }" contains "string" but is an object type
  if (propType.startsWith("{") || (typeof value === "object" && value !== null)) {
    if (typeof value === "object" && value !== null) {
      return `${name}={${JSON.stringify(value)}}`;
    }
    return null;
  }

  if (propType === "boolean") {
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
    if (typeof value === "object" && value !== null) {
      return `${name}={${JSON.stringify(value)}}`;
    }
    return null;
  }

  if (typeof value === "string") {
    return `${name}="${value}"`;
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
  defaults = {},
  children,
  childrenConfig,
  includeImport = true,
}: GenerateFromTemplateOptions): string => {
  // Group enabled props by their target marker
  const propsByTarget: Record<string, string[]> = {};
  
  Object.entries(propValues).forEach(([name, propValue]) => {
    if (!propValue.enabled) return;
    
    // Skip if this prop's value matches the default in the template
    if (defaults[name] !== undefined && defaults[name] === propValue.value) return;
    
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
      result = result.replace(new RegExp(`\\{\\{${marker.replace(".", "\\.")}\\}\\}`, "g"), propsString);
    }
  });
  
  // Convert empty component bodies to self-closing tags
  // Matches <Component ...>\n  \n</Component> or <Component ...></Component>
  result = result.replace(/<([A-Z][A-Za-z.]*)((?:\s+[^>]*)?)>\s*<\/\1>/g, "<$1$2 />");
  
  // Add import statement if needed
  if (includeImport) {
    // Extract all component names from the template for the import
    const componentMatches = result.match(/<([A-Z][A-Za-z]*)/g) || [];
    const components = [...new Set(componentMatches.map(m => m.slice(1)))];
    const importStatement = `import { ${components.join(", ")} } from 'playbook-ui'\n\n`;
    result = importStatement + result;
  }
  
  return result;
};

export const generateLiveFromTemplate = ({
  template,
  propValues,
  propDefinitions,
  propTargets = {},
  defaults = {},
  children,
  childrenConfig,
}: Omit<GenerateFromTemplateOptions, "includeImport">): string => {
  const code = generateFromTemplate({
    template,
    propValues,
    propDefinitions,
    propTargets,
    defaults,
    children,
    childrenConfig,
    includeImport: false,
  });
  
  // Wrap in render() for react-live
  // Check if it's a function component or direct JSX
  if (code.includes("const ") || code.includes("function ")) {
    // It's a component definition, need to render it
    const componentMatch = code.match(/(?:const|function)\s+(\w+)/);
    if (componentMatch) {
      return `${code}\nrender(<${componentMatch[1]} />)`;
    }
  }
  
  // Direct JSX, just wrap in render
  return `render(${code.trim()})`;
};
