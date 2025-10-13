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
import Shadows from "./Examples/Shadows";
import Titles from "./Examples/Titles";
import Transition from "./Examples/Transition";
import Typography from "./Examples/Typography";

const COMPONENT_MAP = {
  animation: Animation,
  border_radius: BorderRadius,
  display: Display,
  letter_spacing: LetterSpacing,
  line_height: LineHeight,
  opacity: Opacity,
  overflow: Overflow,
  position: Position,
  scale: Scale,
  screen_sizes: ScreenSizes,
  shadows: Shadows,
  text_align: TextAlign,
  titles: Titles,
  transition: Transition,
  typography: Typography,
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
