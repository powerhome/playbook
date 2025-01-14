import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const useDrawer = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DrawerDefault = () => {
  const [drawerOpen, toggleDrawerOpened] = useDrawer();

  return (
    <>
      <Flex wrap>
        <Button
            id="sm"
            marginRight="md"
            onClick={toggleDrawerOpened}
        >
          {"Left Drawer"}
        </Button>
      </Flex>
      <Flex>
        {/* Left Drawer */}
        <Drawer
            // behavior={"push"}
            fullHeight
            onClose={toggleDrawerOpened}
            opened={drawerOpen}
            placement={"left"}
            size={"lg"}
        >
          Test me (Left Drawer)
        </Drawer>


      </Flex>
    </>
  );
};

export default DrawerDefault;
