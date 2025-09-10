import React from "react";
import { Background } from "playbook-ui";
import HtmlOptions from "./Examples/HtmlOptions";
import Margin from "./Examples/Margin";
import Cursor from "./Examples/Cursor";
import Hover from "./Examples/Hover";
import Dark from "./Examples/Dark";
import LineHeight from "./Examples/LineHeight";
import Display from "./Examples/Display";
import MaxWidth from "./Examples/MaxWidth";
import MinWidth from "./Examples/MinWidth";
import Width from "./Examples/Width";

const COMPONENT_MAP = {
  cursor: Cursor,
  dark: Dark,
  hover: Hover,
  html_options: HtmlOptions,
  margin: Margin,
  line_height: LineHeight,
  display: Display,
  max_width: MaxWidth,
  min_width: MinWidth,
  width: Width,
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
