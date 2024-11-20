import React from "react";
import { Button, Drawer } from "playbook-ui";

const DrawerMenu = () => {

  return (
    <>
      <Button id="menuButton">Toggle Drawer</Button>
      <Drawer
          behavior="push"
          breakpoint="sm"
          menuButtonID="menuButton"
          overlay={false}
          placement="right"
      >
        <p>Your drawer content here</p>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
