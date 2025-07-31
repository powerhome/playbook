import React from "react";
import { Background } from "playbook-ui";
import Display from "./Examples/Display";

const COMPONENT_MAP = {
  display: Display,
};

const TokensExamples = () => {
  // extract the tokens example needed from the URL path
  function getTokensExample(pathname: string): string | null {
    const parts: string[] = pathname.split("/").filter(Boolean);
    return parts[0] === "tokens" ? parts[1] : null;
  }

  const key = getTokensExample(window.location.pathname);
  type ComponentKey = keyof typeof COMPONENT_MAP;

  const ExampleComponent = COMPONENT_MAP[key as ComponentKey] || null;

  return (
    <Background backgroundColor="white">
      {ExampleComponent ? <ExampleComponent /> : null}
    </Background>
  );
};

export default TokensExamples;
