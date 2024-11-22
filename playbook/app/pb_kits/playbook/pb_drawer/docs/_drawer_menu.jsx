import React from "react";
import { Button, Drawer, Icon } from "playbook-ui";

const DrawerMenu = () => {

  return (
    <>
      <Button id="menuButton"
          padding="sm"
      >
        <Icon icon="bars"
            size="3x"
        />
      </Button>
      <Drawer
          behavior="push"
          closeBreakpoint="md"
          menuButtonID="menuButton"
          overlay={false}
          placement="right"
      >
        <p>Your drawer content here</p>
        <Button text="Close" />
      </Drawer>
    </>
  );
};

export default DrawerMenu;
