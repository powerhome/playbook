import React, { useState } from "react";

import Button from '../../pb_button/_button'
import Drawer from '../../pb_drawer/_drawer'
import Flex from '../../pb_flex/_flex'

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
            onClose={toggleDrawerLeftOpen}
            opened={drawerLeftOpen}
            size={"lg"}
        >
          Test me (Left Drawer)
        </Drawer>

        {/* Right Drawer */}
        <Drawer
            onClose={toggleDrawerRightOpen}
            opened={drawerRightOpen}
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