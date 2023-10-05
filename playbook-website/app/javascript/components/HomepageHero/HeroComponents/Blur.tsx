import React from "react";

const Blur = ({
  width,
  height,
  flexShrink,
  borderRadius,
  background,
  filter,
  children,
}) => {
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
