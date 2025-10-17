import React from "react";
import { Background } from "playbook-ui";
import HtmlOptions from "./Examples/HtmlOptions";
import Margin from "./Examples/Margin";
import Cursor from "./Examples/Cursor";
import Hover from "./Examples/Hover";
import Dark from "./Examples/Dark";
import LineHeight from "./Examples/LineHeightGlobalProps";
import FlexBox from "./Examples/FlexBoxGlobalProps";
import FlexBoxOrder from "./Examples/FlexBoxOrderGlobalProps";
import FlexBoxGap from "./Examples/FlexBoxGap";
import Display from "./Examples/DisplayGlobalProps";
import MaxWidth from "./Examples/MaxWidth";
import MinWidth from "./Examples/MinWidth";
import Position from "./Examples/PositionGlobalProps";
import TextAlign from "./Examples/TextAlignGlobalProps";
import Width from "./Examples/Width";
import ZIndex from "./Examples/Z-IndexGlobalProps";
import Overflow from "./Examples/OverflowGlobalProps";
import Truncate from "./Examples/Truncate";
import VerticalAlign from "./Examples/VerticalAlignGlobalProps";

const COMPONENT_MAP = {
  cursor: Cursor,
  dark: Dark,
  flex_box: FlexBox,
  flex_box_order: FlexBoxOrder,
  flex_box_gap: FlexBoxGap,
  hover: Hover,
  html_options: HtmlOptions,
  margin: Margin,
  line_height: LineHeight,
  display: Display,
  max_width: MaxWidth,
  min_width: MinWidth,
  position: Position,
  text_align: TextAlign,
  overflow: Overflow,
  truncate: Truncate,
  vertical_align: VerticalAlign,
  width: Width,
  z_index: ZIndex,
};

const GlobalPropsExamples = () => {
  // extract the global props example needed from the URL path
  function getGlobalPropsExample(pathname: string): string | null {
    const parts: string[] = pathname.split("/").filter(Boolean);
    return parts[0] === "global_props" ? parts[1] : null;
  }

  const key = getGlobalPropsExample(window.location.pathname);
  type ComponentKey = keyof typeof COMPONENT_MAP;

  const ExampleComponent = COMPONENT_MAP[key as ComponentKey] || null;

  return (
    <Background backgroundColor="white">
      {ExampleComponent ? <ExampleComponent /> : null}
    </Background>
  );
};

export default GlobalPropsExamples;
