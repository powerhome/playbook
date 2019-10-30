import React from "react";
import { CircleIconButton } from "../../";

const CircleIconButtonDefault = () => (
  <div>
    <CircleIconButton icon="plus"   
    />
  <br/>
    <CircleIconButton icon="pen"
      button={{variant: "secondary"}}
    />
  <br/>
    <CircleIconButton icon="pen"
      button={{disabled: true}}
    />
  <br/>
    <CircleIconButton icon="pen"
      button={{variant: "link"}}
    />
  </div>
);

export default CircleIconButtonDefault;
