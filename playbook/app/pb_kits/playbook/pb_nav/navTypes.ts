import { Spacing } from "../types";

export type SpacingObject = {
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
    itemPadding?: SpacingObject
  };
  
