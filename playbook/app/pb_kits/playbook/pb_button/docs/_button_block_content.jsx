import React from "react";
import { Button, Pill } from "../../";

const ButtonBlockContent = (props) => (
  <div>
    <Button fixedWidth 
        {...props}
    >
      <Pill marginRight="xs"
          text="5"
          variant="info"
      />
      <span>Button with Block Content</span>
    </Button>
  </div>
);

export default ButtonBlockContent;
