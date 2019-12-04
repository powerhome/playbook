import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDark = () => (
  <div>
    <CircleIconButton
      variant="primary"
      icon="plus"
      dark
    />

    <br/>

    <CircleIconButton
      variant="secondary"
      icon="pen"
      dark
    />

    <br/>

    <CircleIconButton
      disabled={true}
      icon="times"
      dark
    />

    <br/>

    <CircleIconButton
      variant="link"
      icon="user"
      dark
    />
  </div>
);

export default CircleIconButtonDark;