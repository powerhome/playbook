import React from "react";
import { Button, Pill } from "playbook-ui";

const ButtonBlockContent = (props) => (
  <div>
    <Button fixedWidth 
        {...props}
        tabIndex={0}
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
