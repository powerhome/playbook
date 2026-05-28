import React from "react";

type BlurProps = {
  width?: string,
  height?: string,
  flexShrink?: string,
  borderRadius?: string,
  background?: string,
  filter?: string,
  children?: React.ReactNode

}
const Blur = ({
  width,
  height,
  flexShrink,
  borderRadius,
  background,
  filter,
  children,
}:BlurProps) => {
  return (
    <div
      style={{
        width,
        height,
        flexShrink,
        borderRadius,
        background,
        filter,
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default Blur;
