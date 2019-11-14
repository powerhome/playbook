import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDark = () => (
  <div>
    <CircleIconButton
      button={{dark: true}}
      icon="plus"
    />

    <br/>

    <CircleIconButton
      button={{variant: "secondary", dark: true}}
      icon="pen"
    />

    <br/>

    <CircleIconButton
      button={{disabled: true, dark: true}}
      icon="times"
    />

    <br/>

    <CircleIconButton
      button={{variant: "link", dark: true}}
      icon="user"
    />
  </div>
);

export default CircleIconButtonDark;
