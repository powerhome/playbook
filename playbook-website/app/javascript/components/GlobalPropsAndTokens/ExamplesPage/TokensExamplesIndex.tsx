import { Background } from "playbook-ui";
import Display from "./Examples/Display";
import Animation from "./Examples/Animation";
import Position from "./Examples/Position";
import Scale from "./Examples/Scale";
import VerticalAlign from "./Examples/VerticalAlign";
import ZIndex from "./Examples/Z-Index";


const COMPONENT_MAP = {
  animation: Animation,
  display: Display,
  position: Position,
  scale: Scale,
  vertical_align: VerticalAlign,
  z_index: ZIndex,
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
