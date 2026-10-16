import {
  PropValue,
  PropDefinition,
} from "./types";
import { resolveSchemaDefaultForPlatform } from "./utils";
import {
  childrenToBlockLines,
  extractJsxText,
  formatBodyProps,
  formatFlexItemPropsFromPanel,
  looksLikeJsxChildren,
  looksLikeRailsChildren,
  parseJsxBodyChildren,
  wrapFlexOutput,
} from "./jsxChildrenToRails";

function formatRailsPropName(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
    .replace(/-/g, "_")
    .toLowerCase();
}

function getRawJsExpression(value: unknown): string | null {
  if (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    typeof (value as Record<string, unknown>).__playgroundCode === "string"
  ) {
    const expression = (value as Record<string, string>).__playgroundCode.trim();
    return expression.length > 0 ? expression : null;
  }

  return null;
}

function shouldSkipEmitWhenMatchesSchemaDefault(
  propDefinitions: Record<string, PropDefinition>,
  name: string,
  propValue: PropValue,
  platform: "react" | "rails"
): boolean {
  const schemaDefault = resolveSchemaDefaultForPlatform(propDefinitions[name], platform);
  if (schemaDefault === undefined) return false;
  if (propValue.value !== schemaDefault) return false;
  const value = propValue.value;
  if (value !== null && typeof value === "object") return false;
  return true;
}

function formatRubyHashKey(key: string): string {
  return /^[a-z_][a-z0-9_]*$/.test(key) ? key : JSON.stringify(key);
}

function formatRubyValue(value: unknown, depth = 0): string {
  const rawExpression = getRawJsExpression(value);
  if (rawExpression) {
    return `/* unsupported: ${rawExpression} */ nil`;
  }

  if (value === null) return "nil";
  if (value === undefined) return "nil";
  if (typeof value === "boolean" || typeof value === "number") {
    return String(value);
  }
  if (typeof value === "string") {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => formatRubyValue(item, depth + 1)).join(", ")}]`;
  }
  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const indent = "  ".repeat(depth + 1);
    const inner = entries
      .map(([key, nested]) => `${indent}${formatRubyHashKey(formatRailsPropName(key))}: ${formatRubyValue(nested, depth + 1)}`)
      .join(",\n");
    return `{\n${inner}\n${"  ".repeat(depth)}}`;
  }

  return JSON.stringify(value);
}

const formatRailsPropValue = (
  name: string,
  value: unknown,
  definition: PropDefinition
): string | null => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  const propType = String(definition.type ?? "any").toLowerCase();
  const rawExpression = getRawJsExpression(value);
  if (rawExpression) {
    return `${formatRailsPropName(name)}: /* unsupported: ${rawExpression} */ nil`;
  }

  if (Array.isArray(value)) {
    return `${formatRailsPropName(name)}: ${formatRubyValue(value)}`;
  }

  if (propType === "boolean") {
    return `${formatRailsPropName(name)}: ${value === true}`;
  }

  if (
    propType.includes("boolean") &&
    propType.includes("|") &&
    typeof value === "boolean"
  ) {
    return `${formatRailsPropName(name)}: ${value === true}`;
  }

  if (propType.includes("number") && typeof value === "number") {
    return `${formatRailsPropName(name)}: ${value}`;
  }

  if (
    propType.startsWith("{") ||
    (typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      !(value instanceof Date))
  ) {
    return `${formatRailsPropName(name)}: ${formatRubyValue(value)}`;
  }

  if (propType === "enum" || definition.values?.length) {
    if (typeof value === "string" && value.trim()) {
      return `${formatRailsPropName(name)}: ${JSON.stringify(value)}`;
    }
    return null;
  }

  if (propType === "string" || propType.includes("string")) {
    if (typeof value === "string" && value.trim()) {
      return `${formatRailsPropName(name)}: ${JSON.stringify(value)}`;
    }
    return null;
  }

  if (typeof value === "string") {
    return `${formatRailsPropName(name)}: ${JSON.stringify(value)}`;
  }

  if (typeof value === "object" && value !== null) {
    return `${formatRailsPropName(name)}: ${formatRubyValue(value)}`;
  }

  return `${formatRailsPropName(name)}: ${formatRubyValue(value)}`;
};

function buildPropsBlock(lines: string[]): string | null {
  if (lines.length === 0) return null;
  return `props: {\n${lines.join(",\n")}\n  }`;
}

function buildPbRailsBlock(
  kitName: string,
  propsBlock: string | null,
  childLines: string[]
): string {
  const opener = propsBlock
    ? `<%= pb_rails("${kitName}", ${propsBlock}) do %>`
    : `<%= pb_rails("${kitName}") do %>`;
  return [opener, ...childLines, `<% end %>`].join("\n");
}

interface GenerateRailsCodeOptions {
  kitName: string;
  propValues: Record<string, PropValue>;
  propDefinitions: Record<string, PropDefinition>;
  children?: string;
  structureMode?: string | null;
}

export const generateRailsCode = ({
  kitName,
  propValues,
  propDefinitions,
  children,
  structureMode,
}: GenerateRailsCodeOptions): string => {
  const enabledProps: string[] = [];

  Object.entries(propValues).forEach(([name, propValue]) => {
    if (!propValue.enabled) return;

    const definition = propDefinitions[name] || {
      type: "any",
      platforms: ["rails"] as const,
    };

    if (
      shouldSkipEmitWhenMatchesSchemaDefault(
        propDefinitions,
        name,
        propValue,
        "rails"
      )
    ) {
      return;
    }

    const formatted = formatRailsPropValue(name, propValue.value, definition);
    if (formatted) {
      enabledProps.push(`    ${formatted}`);
    }
  });

  const propsBlock = buildPropsBlock(enabledProps);

  const textPropEnabled =
    propValues.text?.enabled && Boolean(propValues.text?.value);
  const jsxBody = parseJsxBodyChildren(children);
  const cardUsesDarkSurface =
    kitName === "card" &&
    propValues.background?.enabled &&
    propValues.background?.value === "dark";
  const hasPlainChildren = Boolean(
    children && children.trim().length > 0 && !textPropEnabled && !jsxBody
  );

  const dialogId = "dialog-playground-example";
  const dialogPropsWithIds = () => {
    const props = [...enabledProps];
    if (!props.some((line) => line.includes("id:"))) {
      props.unshift(`    id: ${JSON.stringify(dialogId)}`);
    }
    if (
      propValues.confirmButton?.enabled &&
      propValues.confirmButton?.value &&
      !props.some((line) => line.includes("confirm_button_id:"))
    ) {
      props.push(`    confirm_button_id: ${JSON.stringify(`${dialogId}-confirm`)}`);
    }
    if (
      propValues.cancelButton?.enabled &&
      propValues.cancelButton?.value &&
      !props.some((line) => line.includes("cancel_button_id:"))
    ) {
      props.push(`    cancel_button_id: ${JSON.stringify(`${dialogId}-cancel`)}`);
    }
    return props;
  };

  const dialogTrigger = `<%= pb_rails("button", props: { text: "Open Dialog", data: { "open-dialog": ${JSON.stringify(dialogId)} } }) %>`;
  const dialogPropsBlock = () =>
    buildPropsBlock(dialogPropsWithIds()) ?? `props: { id: ${JSON.stringify(dialogId)} }`;

  const cardPropsWithoutHeader = () =>
    enabledProps.filter(
      (line) =>
        !line.includes("header_color:") &&
        !line.includes("header_color_striped:")
    );

  const formatCardHeaderProps = (): string[] => {
    const headerProps: string[] = ['    padding: "sm"'];

    const headerColor = propValues.headerColor;
    if (headerColor?.enabled && headerColor.value) {
      headerProps.push(
        `    header_color: ${JSON.stringify(String(headerColor.value))}`
      );
    }

    const headerColorStriped = propValues.headerColorStriped;
    if (headerColorStriped?.enabled && headerColorStriped.value === true) {
      headerProps.push("    header_color_striped: true");
    }

    return headerProps;
  };

  const flexPropsWithoutFlexItem = () =>
    enabledProps.filter(
      (line) =>
        !line.includes("flex_item_") &&
        !line.includes("flexItem")
    );

  if (kitName === "flex" && structureMode === "controlled_flex_item") {
    const flexPropsBlock = buildPropsBlock(flexPropsWithoutFlexItem());
    const flexItemPropsBlock = buildPropsBlock(formatFlexItemPropsFromPanel(propValues));
    const innerLines = childrenToBlockLines(children?.trim() || "1", "    ");

    const firstFlexItemLines = flexItemPropsBlock
      ? [`  <%= pb_rails("flex/flex_item", ${flexItemPropsBlock}) do %>`, ...innerLines, `  <% end %>`]
      : [`  <%= pb_rails("flex/flex_item") do %>`, ...innerLines, `  <% end %>`];

    return wrapFlexOutput(
      kitName,
      [
        flexPropsBlock
          ? `<%= pb_rails("flex", ${flexPropsBlock}) do %>`
          : `<%= pb_rails("flex") do %>`,
        ...firstFlexItemLines,
        `  <%= pb_rails("flex/flex_item") do %>`,
        `    2`,
        `  <% end %>`,
        `  <%= pb_rails("flex/flex_item") do %>`,
        `    3`,
        `  <% end %>`,
        `<% end %>`,
      ].join("\n")
    );
  }

  if (
    kitName === "card" &&
    (structureMode === "header_body" || structureMode === "full")
  ) {
    const cardProps = cardPropsWithoutHeader();
    if (!cardProps.some((line) => line.includes("padding:"))) {
      cardProps.unshift('    padding: "none"');
    }
    if (cardUsesDarkSurface && !cardProps.some((line) => line.includes("dark:"))) {
      cardProps.push("    dark: true");
    }

    const cardPropsBlock =
      buildPropsBlock(cardProps) ?? `props: { padding: "none" }`;

    const headerPropsBlock = `props: {\n${formatCardHeaderProps().join(",\n")}\n  }`;
    const bodyContent = children?.trim() || "Body content here";

    const bodyLines = jsxBody
      ? [`  <%= pb_rails("card/card_body", props: { padding: "md" }) do %>`, `    <%= pb_rails("body", props: ${formatBodyProps(jsxBody)}) %>`, `  <% end %>`]
      : [`  <%= pb_rails("card/card_body", props: { padding: "md" }) do %>`, `    ${bodyContent}`, `  <% end %>`];

    const footerLines =
      structureMode === "full"
        ? [
            `  <%= pb_rails("flex", props: { padding: "sm", justify: "end" }) do %>`,
            `    <%= pb_rails("button", props: { text: "Action" }) %>`,
            `  <% end %>`,
          ]
        : [];

    return [
      `<%= pb_rails("card", ${cardPropsBlock}) do %>`,
      `  <%= pb_rails("card/card_header", ${headerPropsBlock}) do %>`,
      `    Header title`,
      `  <% end %>`,
      ...bodyLines,
      ...footerLines,
      `<% end %>`,
    ].join("\n");
  }

  if (kitName === "dialog") {
    const propsBlock = dialogPropsBlock();

    if (structureMode === "subcomponents") {
      const bodyContent = children?.trim() || "Hello Body Text, Nice to meet ya.";

      return [
        dialogTrigger,
        "",
        `<%= pb_rails("dialog", ${propsBlock}) do %>`,
        `  <%= pb_rails("dialog/dialog_header", props: { id: ${JSON.stringify(dialogId)}, title: "Header Title inside Dialog.Header" }) %>`,
        `  <%= pb_rails("dialog/dialog_body") do %>`,
        `    ${bodyContent}`,
        `  <% end %>`,
        `  <%= pb_rails("dialog/dialog_footer", props: {`,
        `    cancel_button: "Cancel Button",`,
        `    confirm_button: "Okay",`,
        `    confirm_button_id: ${JSON.stringify(`${dialogId}-confirm`)},`,
        `    cancel_button_id: ${JSON.stringify(`${dialogId}-cancel`)},`,
        `    id: ${JSON.stringify(dialogId)},`,
        `  }) %>`,
        `<% end %>`,
      ].join("\n");
    }

    return [dialogTrigger, "", `<%= pb_rails("dialog", ${propsBlock}) %>`].join("\n");
  }

  if (jsxBody) {
    const blockProps = [...enabledProps];
    if (kitName === "card" && cardUsesDarkSurface && !blockProps.some((line) => line.includes("dark:"))) {
      blockProps.push("    dark: true");
    }

    const blockPropsBlock = buildPropsBlock(blockProps);
    const bodyLine = `  <%= pb_rails("body", props: ${formatBodyProps(jsxBody)}) %>`;

    return wrapFlexOutput(
      kitName,
      buildPbRailsBlock(kitName, blockPropsBlock, [bodyLine])
    );
  }

  if (hasPlainChildren) {
    const childLines = childrenToBlockLines(children!.trim(), "  ");
    const blockProps =
      kitName === "flex" ? flexPropsWithoutFlexItem() : enabledProps;
    const blockPropsBlock = buildPropsBlock(blockProps);

    return wrapFlexOutput(
      kitName,
      buildPbRailsBlock(kitName, blockPropsBlock, childLines)
    );
  }

  if (propsBlock) {
    return wrapFlexOutput(kitName, `<%= pb_rails("${kitName}", ${propsBlock}) %>`);
  }

  return wrapFlexOutput(kitName, `<%= pb_rails("${kitName}") %>`);
};
