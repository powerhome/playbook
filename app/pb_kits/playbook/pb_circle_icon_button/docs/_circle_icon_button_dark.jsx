import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDark = () => (
  <div>
    <CircleIconButton 
        icon="plus"
        link="https://www.google.com"
        dark
    />
    <br />
    <br />
    <CircleIconButton
        icon="pen"
        link="https://www.google.com"
        variant="secondary"
        dark
    />
  </div>
);

export default CircleIconButtonDark;