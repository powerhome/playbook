import { Spacing } from "../types";

export type SpacingObject = {
  margin?: Spacing;
  marginBottom?: Spacing;
  marginTop?: Spacing;
  marginRight?: Spacing;
  marginLeft?: Spacing;
  margingX?: Spacing;
  marginY?: Spacing;
  padding?: Spacing;
  paddingBottom?: Spacing;
  paddingTop?: Spacing;
  paddingRight?: Spacing;
  paddingLeft?: Spacing;
  paddingX?: Spacing;
  paddingY?: Spacing;
};

export type NavChildProps = {
    orientation?: "vertical" | "horizontal";
    variant?: "normal" | "subtle";
    itemSpacing?: SpacingObject
    disabled?: boolean
  };
  
