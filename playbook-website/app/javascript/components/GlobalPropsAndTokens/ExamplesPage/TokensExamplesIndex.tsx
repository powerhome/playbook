import { Background } from "playbook-ui";
import Display from "./Examples/Display";
import Animation from "./Examples/Animation";
import BorderRadius from "./Examples/BorderRadius";
import LineHeight from "./Examples/LineHeight";
import Overflow from "./Examples/Overflow";
import VerticalAlign from "./Examples/VerticalAlign";
import Opacity from "./Examples/Opacity";
import ScreenSizes from "./Examples/ScreenSizes";
import TextAlign from "./Examples/TextAlign";


const COMPONENT_MAP = {
  animation: Animation,
  border_radius: BorderRadius,
  display: Display,
  line_height: LineHeight,
  overflow: Overflow,
  vertical_align: VerticalAlign,
  opacity: Opacity,
  screen_sizes: ScreenSizes,
  text_align: TextAlign,
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
