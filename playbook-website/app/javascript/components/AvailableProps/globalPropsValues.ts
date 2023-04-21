const globalPropsValues = [
  {
    key: 1,
    prop: "alignment",
    type: "union",
    values: '"start" | "end" | "center"'
  },
  {
    key: 2,
    prop: "alignContent",
    type: "union",
    values: '"start" | "end" | "center" | "spaceBetween"'
  },
  {
    key: 3,
    prop: "alignItems",
    type: "union",
    values:
      '"start" | "end" | "center" | "flexStart" | "flexEnd" | "stretch" | "baseline"'
  },
  {
    key: 4,
    prop: "alignSelf",
    type: "union",
    values: '"start" | "end" | "center" | "auto" | "stretch" | "baseline"'
  },
  {
    key: 5,
    prop: "allSizes",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 5,
    prop: "aria",
    type: "string",
    values: []
  },
  {
    key: 6,
    prop: "borderRadius",
    type: "union",
    values: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "rounded"'
  },
  {
    key: 7,
    prop: "className",
    type: "string",
    values: []
  },
  {
    key: 8,
    prop: "cursor",
    type: "union",
    values:
      '"auto" | "default" | "none" | "contextMenu" | "help" | "pointer" | "progress" | "wait" | "cell" | crosshair" | "text" | "verticalText" | "alias" | "copy" | "move" | "noDrop" | "notAllowed" | "grab" | "grabbing" | "eResize" | "nResize" | "neResize" |"nwResize" | "sResize" | "seResize" | "swResize" | "wResize" | "ewResize" | "nsResize" | "neswResize" | "nwseResize" | "colResize" | "rowResize" | "allScroll" | "zoomIn" | "zoomOut"'
  },
  {
    key: 9,
    prop: "dark",
    type: "boolean",
    values: []
  },
  {
    key: 10,
    prop: "flex",
    type: "union",
    values:
      '"auto" | "initial" | "0" | "1" | "2" | 3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none"'
  },
  {
    key: 11,
    prop: "flexDirection",
    type: "union",
    values: '"row" | "column" | "column" | "columnReverse"'
  },
  {
    key: 12,
    prop: "flexGrow",
    type: "number",
    values: "0 | 1"
  },
  {
    key: 13,
    prop: "flexShrink",
    type: "number",
    values: "0 | 1"
  },
  {
    key: 14,
    prop: "flexWrap",
    type: "union",
    values: '"wrap" | "nowrap" | "wrapReverse"'
  },
  {
    key: 15,
    prop: "id",
    type: "string",
    values: []
  },
  {
    key: 16,
    prop: "justifyContent",
    type: "union",
    values:
      '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"'
  },
  {
    key: 17,
    prop: "justifySelf",
    type: "union",
    values: '"start" | "end" | "center" | "auto" | "stretch"'
  },
  {
    key: 18,
    prop: "lineHeight",
    type: "union",
    values:
      '| "loosest" | "looser" | "loose" | "normal" | "tight" | "tighter" | "tightest"'
  },
  {
    key: 19,
    prop: "marginRight",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 20,
    prop: "marginLeft",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 21,
    prop: "marginTop",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 22,
    prop: "marginBottom",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 23,
    prop: "marginX",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 24,
    prop: "marginY",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 25,
    prop: "margin",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 26,
    prop: "maxWidth",
    type: "union",
    values: '| "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 27,
    prop: "numberSpacing",
    type: "union",
    values: "tabular"
  },
  {
    key: 28,
    prop: "order",
    type: "union",
    values:
      '"none" | "first" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12'
  },
  {
    key: 29,
    prop: "paddingRight",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 30,
    prop: "paddingLeft",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 31,
    prop: "paddingTop",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 32,
    prop: "paddingBottom",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 33,
    prop: "paddingX",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 35,
    prop: "paddingY",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 36,
    prop: "padding",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    key: 37,
    prop: "position",
    type: "union",
    values: '"relative" | "absolute" | "fixed" | "sticky" | "static"'
  },
  {
    key: 38,
    prop: "shadow",
    type: "union",
    values: '"none" | "deep" | "deeper" | "deepest"'
  },
  {
    key: 39,
    prop: "space",
    type: "union",
    values: '"spaceBetween" | "spaceAround" | "spaceEvenly"'
  },
  {
    key: 40,
    prop: "zIndex",
    type: "number",
    values: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10"
  }
];
export default globalPropsValues
