import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDefault = () => (
  <div>
    <CircleIconButton
      variant="primary"
      icon="plus"
    />

    <br/>

    <CircleIconButton
      variant="secondary"
      icon="pen"
    />

    <br/>

    <CircleIconButton
      disabled={true}
      icon="times"
    />

    <br/>

    <CircleIconButton
      variant="link"
      icon="user"
    />
  </div>
);

export default CircleIconButtonDefault;