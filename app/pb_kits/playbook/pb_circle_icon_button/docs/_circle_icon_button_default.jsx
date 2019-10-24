import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDefault = () => (
  <div>
    <CircleIconButton icon="plus"
        link="https://www.google.com"
    />
    <br />
    <br />
    <CircleIconButton
        icon="plus"
        link="https://www.google.com"
        variant="secondary"
    />
  </div>
);

export default CircleIconButtonDefault;
