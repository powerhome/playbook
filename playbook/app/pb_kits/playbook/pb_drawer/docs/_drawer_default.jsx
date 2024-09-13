import React, { useState } from "react";
import {
  Button,
  Drawer,
  Flex,
} from "playbook-ui";

const useDrawer = (visible = false) => {
  const [opened, setOpened] = useState(visible);
  const toggle = () => setOpened(!opened);

  return [opened, toggle];
};

const DrawerDefault = () => {
  const [headerSeparatorDrawerOpened, toggleHeaderSeparatorDrawer] =
    useDrawer();
  const [bothSeparatorsDrawerOpened, toggleBothSeparatorsDrawer] = useDrawer();

  const drawers = [
    {
      toggle: toggleHeaderSeparatorDrawer,
      visible: headerSeparatorDrawerOpened,
      placement: "left",
    },
    {
      toggle: toggleBothSeparatorsDrawer,
      visible: bothSeparatorsDrawerOpened,
      placement: "right",
    },
  ];

  return (
    <>
      <Flex wrap>
        <Button id="sm"
            marginRight="md"
            onClick={toggleHeaderSeparatorDrawer}
        >
          {"Left Drawer"}
        </Button>
        <Button marginRight="xl"
            onClick={toggleBothSeparatorsDrawer}
        >
          {"Right Drawer"}
        </Button>
      </Flex>
      <Flex>
        {drawers.map(({toggle, visible, placement }, index) => (
          <Drawer
              behavior={"push"}
              fullHeight
              key={index}
              onClose={toggle}
              opened={visible}
              overlay={false}
              placement={placement}
              size={"lg"}
          >
          Test me 
          </Drawer>
        ))}
      </Flex>
    </>
  );
};

export default DrawerDefault
