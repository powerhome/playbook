import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDefault = () => (
  <div>
    <CircleIconButton
      button={{variant: "primary"}}
      icon="plus"
    />

    <br/>

    <CircleIconButton
      button={{variant: "secondary"}}
      icon="pen"
    />

    <br/>

    <CircleIconButton
      button={{disabled: true}}
      icon="times"
    />

    <br/>

    <CircleIconButton
      button={{variant: "link"}}
      icon="user"
    />
  </div>
);

export default CircleIconButtonDefault;
