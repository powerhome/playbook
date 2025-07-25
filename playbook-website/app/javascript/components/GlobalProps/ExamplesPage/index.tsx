import React, { useEffect } from "react";
import { Background } from "playbook-ui";
import HtmlOptions from "./Examples/HtmlOptions";
import Margin from "./Examples/Margin";

const COMPONENT_MAP = {
  html_options: HtmlOptions,
  margin: Margin,
};

const GlobalPropsExamples = () => {
  // extract the global props example needed from the URL path
  function getGlobalPropsExample(pathname: string): string | null {
    const parts: string[] = pathname.split("/").filter(Boolean);
    return parts[0] === "global_props" ? parts[1] : null;
  }

  const key = getGlobalPropsExample(window.location.pathname);
  type ComponentKey = keyof typeof COMPONENT_MAP;

  const isValidKey =
    key &&
    (Object.keys(COMPONENT_MAP) as ComponentKey[]).includes(
      key as ComponentKey
    );
  const ExampleComponent = isValidKey
    ? COMPONENT_MAP[key as ComponentKey]
    : null;

  // Redirect to the global props page if the url is invalid
  useEffect(() => {
    if (key && !isValidKey) {
      window.location.replace("/global_props");
    }
  }, [key, isValidKey]);

  return (
    <Background backgroundColor="white">
      {ExampleComponent ? <ExampleComponent /> : null}
    </Background>
  );
};

export default GlobalPropsExamples;
