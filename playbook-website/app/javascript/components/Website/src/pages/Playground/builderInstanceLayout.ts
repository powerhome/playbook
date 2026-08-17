import type { CSSProperties } from "react";

const SCREEN_SIZES = new Set(["xs", "sm", "md", "lg", "xl"]);

const camelToSnakeCase = (value: string) =>
  value.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

const toClassToken = (value: string | number) =>
  typeof value === "string" ? camelToSnakeCase(value) : String(value);

/**
 * Global / kit props that only affect layout when set on the flex/grid *item*
 * (direct child of the flex/grid container). Playground wraps each kit in
 * `.builder-instance`, so these must be mirrored onto that wrapper.
 */
const isUnsetUtilityValue = (value: unknown, allowNone: boolean) =>
  value === undefined ||
  value === null ||
  value === "" ||
  (!allowNone && value === "none");

const responsiveUtilityClass = (
  value: unknown,
  classPrefix: string,
  { allowNone = false }: { allowNone?: boolean } = {},
): string => {
  if (isUnsetUtilityValue(value, allowNone)) {
    return "";
  }

  if (typeof value === "object" && !Array.isArray(value)) {
    const entries = value as Record<string, string | number>;
    const classes: string[] = [];

    if (!isUnsetUtilityValue(entries.default, allowNone)) {
      classes.push(`${classPrefix}_${toClassToken(entries.default)}`);
    }

    Object.entries(entries).forEach(([key, entryValue]) => {
      if (!SCREEN_SIZES.has(key) || isUnsetUtilityValue(entryValue, allowNone)) {
        return;
      }
      classes.push(`${classPrefix}_${key}_${toClassToken(entryValue)}`);
    });

    return classes.join(" ");
  }

  return `${classPrefix}_${toClassToken(value as string | number)}`;
};

const binaryUtilityClass = (value: unknown, classPrefix: string): string => {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return responsiveUtilityClass(value, classPrefix);
  }
  if (value === 0 || value === 1 || value === "0" || value === "1") {
    return `${classPrefix}_${value}`;
  }
  return "";
};

export const getBuilderInstanceLayout = (
  props: Record<string, unknown>,
): { className: string; style: CSSProperties } => {
  const classes: string[] = [
    responsiveUtilityClass(props.alignSelf, "align_self"),
    responsiveUtilityClass(props.justifySelf, "justify_self"),
    responsiveUtilityClass(props.order, "flex_order"),
    // `none` is a real flex value (`flex_none` → flex: none).
    responsiveUtilityClass(props.flex, "flex", { allowNone: true }),
    binaryUtilityClass(props.flexGrow, "flex_grow"),
    binaryUtilityClass(props.flexShrink, "flex_shrink"),
  ];

  // FlexItem kit props (also used if a nested FlexItem instance is present).
  if (props.grow === true) classes.push("pb_flex_item_kit_grow");
  if (props.shrink === true) classes.push("pb_flex_item_kit_shrink");
  if (props.order === "first") classes.push("pb_flex_item_kit_order_first");

  const style: CSSProperties = {};

  if (typeof props.gridColumn === "string" && props.gridColumn) {
    style.gridColumn = props.gridColumn;
  }
  if (typeof props.gridRow === "string" && props.gridRow) {
    style.gridRow = props.gridRow;
  }
  if (typeof props.gridArea === "string" && props.gridArea) {
    style.gridArea = props.gridArea;
  }
  if (typeof props.fixedSize === "string" && props.fixedSize) {
    style.flexBasis = props.fixedSize;
    style.flexGrow = 0;
    style.flexShrink = 0;
  }

  return {
    className: classes.filter(Boolean).join(" "),
    style,
  };
};
