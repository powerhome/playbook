/* eslint-disable flowtype/no-types-missing-file-annotation */

// React Pure component - do not use state!
import React from "react";

import Colors from "../VisualGuidelines/Colors";
import MaxWidth from "../VisualGuidelines/Examples/MaxWidth";
import ZIndex from "../VisualGuidelines/Examples/ZIndex";
import LineHeight from "../VisualGuidelines/Examples/LineHeight";
import NumberSpacing from "../VisualGuidelines/Examples/NumberSpacing";
import Shadows from "../VisualGuidelines/Examples/Shadows";
import Spacing from "../VisualGuidelines/Examples/Spacing";
import BorderRadius from "../VisualGuidelines/Examples/BorderRadius";
import Typography from "../VisualGuidelines/Examples/Typography";
import Display from "../VisualGuidelines/Examples/Display";
import Cursor from "../VisualGuidelines/Examples/Cursor";
import FlexBox from "../VisualGuidelines/Examples/FlexBox";
import Position from "../VisualGuidelines/Examples/Position";
import Hover from "../VisualGuidelines/Examples/Hover";
import TextAlign from "../VisualGuidelines/Examples/TextAlign";

const VisualGuidelines = ({
  examples,
}: {
  examples: { [key: string]: string };
}): React.ReactElement => {
  const urlPath = window.location.pathname;
  const regex = /(?:(?:[^/]*\/){2})(.*)/;
  const result = urlPath.match(regex)[1];


  function getComponent(result) {
    switch (result) {
      case "colors":
        return <Colors />;
      case "max_width":
        return <MaxWidth example={examples.width_jsx}/>;
      case "z_index":
        return <ZIndex example={examples.z_index_jsx}
                  tokensExample={examples.z_index_token}
                />;
      case "line_height":
        return <LineHeight example={examples.line_height_code_jsx}
                    tokensExample={examples.line_height_jsx}
                />;
      case "number_spacing":
        return <NumberSpacing example={examples.number_spacing_jsx} />;
      case "shadows":
        return <Shadows example={examples.shadow_in_use_jsx}
                   tokensExample={examples.shadow_erb}
               />;
      case "spacing":
        return <Spacing
                  example={examples.spacing_global_props_jsx}
                  tokensExample={examples.spacing_tokens_jsx}
               />;
      case "typography":
        return <Typography example={examples.typography_tokens}/>;
      case "border_radius":
        return <BorderRadius tokensExample={examples.border_radius_tokens}/>;
      case "display":
        return <Display example={examples.display_in_use_jsx}/>;
      case "cursor":
        return <Cursor example={examples.cursor_jsx}/>;
      case "flex_box":
        return <FlexBox example={examples.justify_self_jsx}/>;
      case "position":
        return <Position example={examples.position_jsx}
                   tokensExample={examples.position_token}
               />;
      case "hover":
        return <Hover example={examples.hover_jsx}/>;
      case "text_align":
        return <TextAlign example={examples.text_align_jsx} />

      default:
        return <Colors/>;
    }
  }
  return <div className="visual_guidelines_individual">{getComponent(result)}</div>;
};

export default VisualGuidelines;
