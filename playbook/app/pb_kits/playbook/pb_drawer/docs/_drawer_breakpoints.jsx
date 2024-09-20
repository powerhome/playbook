import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const useDrawer = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DrawerBreakpoints = () => {
  const [smallDrawerOpened, toggleSmallDrawer] = useDrawer();

  return (
    <>
      <Flex wrap>
        <Button
            id="sm"
            marginRight="md"
            onClick={toggleSmallDrawer}
        >
          {"Will open at small breakpoint"}
        </Button>
      </Flex>
      <Flex>
        <Drawer
            behavior={"push"}
            breakpoint="sm"
            fullHeight
            onClose={toggleSmallDrawer}
            opened={smallDrawerOpened}
            overlay
            placement={"right"}
            size={"lg"}
        >
          Open because small breakpoint 
        </Drawer>
      </Flex>
    </>
  );
};

export default DrawerBreakpoints;
