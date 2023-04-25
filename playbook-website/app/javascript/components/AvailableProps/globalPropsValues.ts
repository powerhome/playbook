const globalPropsValues = [
  {
    prop: "alignment",
    type: "union",
    values: '"start" | "end" | "center"'
  },
  {
    prop: "alignContent",
    type: "union",
    values: '"start" | "end" | "center" | "spaceBetween"'
  },
  {
    prop: "alignItems",
    type: "union",
    values:
      '"start" | "end" | "center" | "flexStart" | "flexEnd" | "stretch" | "baseline"'
  },
  {
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
    prop: "aria",
    type: "string",
    values: []
  },
  {
    prop: "borderRadius",
    type: "union",
    values: '"none" | "xs" | "sm" | "md" | "lg" | "xl" | "rounded"'
  },
  {
    prop: "className",
    type: "string",
    values: []
  },
  {
    prop: "cursor",
    type: "union",
    values:
      '"auto" | "default" | "none" | "contextMenu" | "help" | "pointer" | "progress" | "wait" | "cell" | crosshair" | "text" | "verticalText" | "alias" | "copy" | "move" | "noDrop" | "notAllowed" | "grab" | "grabbing" | "eResize" | "nResize" | "neResize" |"nwResize" | "sResize" | "seResize" | "swResize" | "wResize" | "ewResize" | "nsResize" | "neswResize" | "nwseResize" | "colResize" | "rowResize" | "allScroll" | "zoomIn" | "zoomOut"'
  },
  {
    prop: "dark",
    type: "boolean",
    values: []
  },
  {
    prop: "flex",
    type: "union",
    values:
      '"auto" | "initial" | "0" | "1" | "2" | 3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "none"'
  },
  {
    prop: "flexDirection",
    type: "union",
    values: '"row" | "column" | "column" | "columnReverse"'
  },
  {
    prop: "flexGrow",
    type: "number",
    values: "0 | 1"
  },
  {
    prop: "flexShrink",
    type: "number",
    values: "0 | 1"
  },
  {
    prop: "flexWrap",
    type: "union",
    values: '"wrap" | "nowrap" | "wrapReverse"'
  },
  {
    prop: "id",
    type: "string",
    values: []
  },
  {
    prop: "justifyContent",
    type: "union",
    values:
      '"start" | "end" | "center" | "spaceBetween" | "spaceAround" | "spaceEvenly"'
  },
  {
    prop: "justifySelf",
    type: "union",
    values: '"start" | "end" | "center" | "auto" | "stretch"'
  },
  {
    prop: "lineHeight",
    type: "union",
    values:
      '| "loosest" | "looser" | "loose" | "normal" | "tight" | "tighter" | "tightest"'
  },
  {
    prop: "marginRight",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "marginLeft",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "marginTop",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "marginBottom",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "marginX",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "marginY",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "margin",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "maxWidth",
    type: "union",
    values: '| "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "numberSpacing",
    type: "union",
    values: "tabular"
  },
  {
    prop: "order",
    type: "union",
    values:
      '"none" | "first" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12'
  },
  {
    prop: "paddingRight",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "paddingLeft",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "paddingTop",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "paddingBottom",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "paddingX",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "paddingY",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "padding",
    type: "union",
    values: '"none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl"'
  },
  {
    prop: "position",
    type: "union",
    values: '"relative" | "absolute" | "fixed" | "sticky" | "static"'
  },
  {
    prop: "shadow",
    type: "union",
    values: '"none" | "deep" | "deeper" | "deepest"'
  },
  {
    prop: "space",
    type: "union",
    values: '"spaceBetween" | "spaceAround" | "spaceEvenly"'
  },
  {
    prop: "zIndex",
    type: "number",
    values: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10"
  }
];
export default globalPropsValues
