import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const useDrawer = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DrawerDefault = () => {
  const [drawerLeftOpen, toggleDrawerLeftOpen] = useDrawer();
  const [drawerRightOpen, toggleDrawerRightOpen ] = useDrawer();

  return (
    <>
      <Flex wrap>
        <Button
            id="sm"
            marginRight="md"
            onClick={toggleDrawerLeftOpen}
        >
          {"Left Drawer"}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleDrawerRightOpen}
        >
          {"Right Drawer"}
        </Button>
      </Flex>
      <Flex>
        {/* Left Drawer */}
        <Drawer
            fullHeight
            onClose={toggleDrawerLeftOpen}
            opened={drawerLeftOpen}
            overlay
            placement={"left"}
            size={"lg"}
        >
          Test me (Left Drawer)
        </Drawer>

        {/* Right Drawer */}
        <Drawer
            fullHeight
            onClose={toggleDrawerRightOpen}
            opened={drawerRightOpen}
            overlay
            placement={"right"}
            size={"lg"}
        >
          Test me (Right Drawer)
        </Drawer>
      </Flex>
    </>
  );
};

export default DrawerDefault;