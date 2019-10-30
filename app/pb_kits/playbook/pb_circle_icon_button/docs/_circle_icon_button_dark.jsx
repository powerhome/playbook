import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDark = () => (
  <div>
    <CircleIconButton icon="plus"
      button={{dark: true}}   
    />
  <br/>
    <CircleIconButton icon="pen"
      button={{variant: "secondary", dark: true}}
    />
  <br/>
    <CircleIconButton icon="pen"
      button={{disabled: true, dark: true}}
    />
  <br/>
    <CircleIconButton icon="pen"
      button={{variant: "link", dark: true}}
    />
  </div>
);

export default CircleIconButtonDark;