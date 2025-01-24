import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const DrawerBorders = () => {
  // Individual state variables for each drawer size
  const [openedBRightDrawer, setOpenedBRightDrawer] = useState(false);
  const [openedBLeftDrawer, setOpenedBLeftDrawer] = useState(false);
  const [openedBFullDrawer, setOpenedBFullDrawer] = useState(false);

  // Toggle functions for each drawer
  const toggleBRightDrawer = () => setOpenedBRightDrawer(!openedBRightDrawer);
  const toggleBLeftDrawer = () => setOpenedBLeftDrawer(!openedBLeftDrawer);
  const toggleBFullDrawer = () => setOpenedBFullDrawer(!openedBFullDrawer);

  return (
    <>
      <Flex 
          wrap
      >
        <Button marginRight="md"
            onClick={toggleBRightDrawer}
        >
         Drawer with border right
        </Button>
        <Button marginRight="md"
            onClick={toggleBLeftDrawer}
        >
         Drawer with border left
        </Button>
        <Button marginRight="md"
            onClick={toggleBFullDrawer}
        >
          Drawer with border full
        </Button>
      </Flex>

      {/* Drawers for each size */}
      <Drawer
          behavior="float"
          border="right"
          onClose={toggleBRightDrawer}
          opened={openedBRightDrawer}
          overlay={false}
          placement="left"
          size="lg"
      >
        This is a Drawer with border right  
      </Drawer>
      <Drawer
          behavior="float"
          border="left"
          onClose={toggleBLeftDrawer}
          opened={openedBLeftDrawer}
          overlay={false}
          placement="left"
          size="lg"
      >
        This is a Drawer with border left
      </Drawer>
      <Drawer
          behavior="float"
          border="full"
          onClose={toggleBFullDrawer}
          opened={openedBFullDrawer}
          overlay={false}
          placement="left"
          size="lg"
      >
        This is a Drawer with border full
      </Drawer>
    </>
  );
};

export default DrawerBorders;
