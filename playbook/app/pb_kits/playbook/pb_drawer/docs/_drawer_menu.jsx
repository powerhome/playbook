import React from "react";
import { Button, Drawer, Icon, Title } from "playbook-ui";

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
          placement="left"
          size="lg"
          withinElement
      >
        <Title paddingBottom="md">A really neat menu</Title>
        <Button text="This Button does nothing" />
      </Drawer>
    </>
  );
};

export default DrawerMenu;
