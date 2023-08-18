export type SpacingObject = {
  padding?: string;
  paddingBottom?: string;
  paddingTop?: string;
  paddingRight?: string;
  paddingLeft?: string;
  paddingX?: string;
  paddingY?: string;
};

export type NavChildProps = {
    orientation?: "vertical" | "horizontal";
    variant?: "normal" | "subtle";
    itemPadding?: SpacingObject
  };
  
