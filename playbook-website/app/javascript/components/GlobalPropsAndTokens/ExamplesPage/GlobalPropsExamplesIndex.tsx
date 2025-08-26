import React from "react";
import { Background } from "playbook-ui";
import HtmlOptions from "./Examples/HtmlOptions";
import Margin from "./Examples/Margin";
import Cursor from "./Examples/Cursor";

const COMPONENT_MAP = {
  html_options: HtmlOptions,
  margin: Margin,
  cursor: Cursor,
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
