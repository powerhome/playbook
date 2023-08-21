import { Spacing } from "../types";

export type SpacingObject = {
  padding?: Spacing;
  paddingBottom?: Spacing;
  paddingTop?: Spacing;
  paddingRight?: Spacing;
  paddingLeft?: Spacing;
  paddingX?: Spacing;
  paddingY?: Spacing;
  margin?: Spacing;
  marginBottom?: Spacing;
  marginTop?: Spacing;
  marginRight?: Spacing;
  marginLeft?: Spacing;
  margingX?: Spacing;
  marginY?: Spacing;
};

export type NavChildProps = {
    orientation?: "vertical" | "horizontal";
    variant?: "normal" | "subtle";
    itemSpacing?: SpacingObject
  };
  
