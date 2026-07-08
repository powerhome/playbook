export const EXCLUDED_PROPS = [
  "children",
  "className",
  "id",
  "data",
  "aria",
  "htmlOptions",
  "reference",
];

// Add global prop groups here as needed, otherwise will show up as 'Other' group.
export const GLOBAL_PROP_GROUPS: Array<{ name: string; props: string[] }> = [
  {
    name: "Padding",
    props: [
      "padding",
      "paddingX",
      "paddingY",
      "paddingTop",
      "paddingBottom",
      "paddingLeft",
      "paddingRight",
    ],
  },
  {
    name: "Margin",
    props: [
      "margin",
      "marginX",
      "marginY",
      "marginTop",
      "marginBottom",
      "marginLeft",
      "marginRight",
    ],
  },
  {
    name: "Flexbox",
    props: [
      "flex",
      "flexDirection",
      "flexWrap",
      "justifyContent",
      "alignItems",
      "alignContent",
      "gap",
      "columnGap",
      "rowGap",
      "order",
    ],
  },
  {
    name: "Height & Width",
    props: [
      "height",
      "width",
      "minHeight",
      "maxHeight",
      "minWidth",
      "maxWidth",
    ],
  },
  {
    name: "Position",
    props: ["position", "top", "bottom", "left", "right", "inset"],
  },
  {
    name: "Overflow & Stacking",
    props: ["overflow", "overflowX", "overflowY", "zIndex"],
  },
  {
    name: "Text Alignment",
    props: [
      "textAlign",
      "lineHeight",
      "truncate",
      "verticalAlign",
      "numberSpacing",
    ],
  },
  {
    name: "Border",
    props: [
      "borderRadius",
      "border",
      "borderTop",
      "borderBottom",
      "borderLeft",
      "borderRight",
      "borderX",
      "borderY",
    ],
  },
  {
    name: "Shadows",
    props: ["shadow"],
  },
  {
    name: "Cursor",
    props: ["cursor"],
  },
  {
    name: "Hover",
    props: ["hover", "groupHover"],
  },
];
