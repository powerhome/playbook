import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const useDrawer = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DrawerDefault = () => {
  const [headerSeparatorDrawerOpened, toggleHeaderSeparatorDrawer] = useDrawer();
  const [bothSeparatorsDrawerOpened, toggleBothSeparatorsDrawer] = useDrawer();

  return (
    <>
      <Flex wrap>
        <Button
            id="sm"
            marginRight="md"
            onClick={toggleHeaderSeparatorDrawer}
        >
          {"Left Drawer"}
        </Button>
        <Button
            marginRight="xl"
            onClick={toggleBothSeparatorsDrawer}
        >
          {"Right Drawer"}
        </Button>
      </Flex>
      <Flex>
        {/* Left Drawer */}
        <Drawer
            behavior={"push"}
            fullHeight
            onClose={toggleHeaderSeparatorDrawer}
            opened={headerSeparatorDrawerOpened}
            overlay
            placement={"left"}
            size={"lg"}
        >
          Test me (Left Drawer)
        </Drawer>

        {/* Right Drawer */}
        <Drawer
            behavior={"push"}
            fullHeight
            onClose={toggleBothSeparatorsDrawer}
            opened={bothSeparatorsDrawerOpened}
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
