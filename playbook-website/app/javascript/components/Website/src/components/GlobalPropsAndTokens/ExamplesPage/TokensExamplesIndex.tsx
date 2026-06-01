import { Background } from "playbook-ui";
import Display from "./Examples/Display";
import Animation from "./Examples/Animation";
import BorderRadius from "./Examples/BorderRadius";
import LineHeight from "./Examples/LineHeight";
import Opacity from "./Examples/Opacity";
import Overflow from "./Examples/Overflow";
import Position from "./Examples/Position";
import Scale from "./Examples/Scale";
import ScreenSizes from "./Examples/ScreenSizes";
import TextAlign from "./Examples/TextAlign";
import VerticalAlign from "./Examples/VerticalAlign";
import ZIndex from "./Examples/Z-Index";
import LetterSpacing from "./Examples/LetterSpacing";
import Shadow from "./Examples/Shadow";
import Titles from "./Examples/Titles";
import Transition from "./Examples/Transition";
import Typography from "./Examples/Typography";
import Colors from "./Examples/Colors";
import Spacing from "./Examples/Spacing";

const COMPONENT_MAP = {
  animation: Animation,
  border_radius: BorderRadius,
  colors: Colors,
  display: Display,
  letter_spacing: LetterSpacing,
  line_height: LineHeight,
  opacity: Opacity,
  overflow: Overflow,
  position: Position,
  scale: Scale,
  screen_sizes: ScreenSizes,
  shadow: Shadow,
  spacing: Spacing,
  text_align: TextAlign,
  titles: Titles,
  transition: Transition,
  typography: Typography,
  vertical_align: VerticalAlign,
  z_index: ZIndex,
};

type TokensExamplesProps = {
  routeParamName?: string,
}

const TokensExamples = ({ routeParamName }: TokensExamplesProps = {}) => {
  function getTokensExample(pathname: string): string | null {
    const parts: string[] = pathname.split("/").filter(Boolean);
    const idx = parts.indexOf("tokens");
    return idx >= 0 ? parts[idx + 1] ?? null : null;
  }

  const key = routeParamName ?? getTokensExample(window.location.pathname);
  type ComponentKey = keyof typeof COMPONENT_MAP;

  const ExampleComponent = COMPONENT_MAP[key as ComponentKey] || null;

  return (
    <Background backgroundColor="white">
      {ExampleComponent ? <ExampleComponent /> : null}
    </Background>
  );
};

export default TokensExamples;
