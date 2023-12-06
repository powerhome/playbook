import React, { ReactElement } from "react";

import "./styles.scss";

type KitGridProps = {
  children: ReactElement | ReactElement[];
};

export const KitGrid = ({ children }: KitGridProps) => {
  return <div className="kit-container">{children}</div>;
};
