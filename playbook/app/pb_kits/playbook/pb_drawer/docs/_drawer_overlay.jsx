import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const DrawerSizes = () => {
  // Individual state variables for each drawer size
  const [openedNoOverlayDrawer, setOpenedNoOverlayDrawer] = useState(false);
  const [openedOverlayDrawer, setOpenedOverlayDrawer] = useState(false);

  // Toggle functions for each drawer
  const toggleNoOverlayDrawer = () => setOpenedNoOverlayDrawer(!openedNoOverlayDrawer);
  const toggleOverlayDrawer = () => setOpenedOverlayDrawer(!openedOverlayDrawer);

  return (
    <>
      <Flex wrap>
        <Button marginRight="md"
            onClick={toggleNoOverlayDrawer}
        >
          No Overlay Drawer
        </Button>
        <Button marginRight="md"
            onClick={toggleOverlayDrawer}
        >
          Overlay Drawer
        </Button>
      </Flex>

      {/* Drawers for each size */}
      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleNoOverlayDrawer}
          opened={openedNoOverlayDrawer}
          overlay={false}
          placement="right"
          size="lg"
      >
        This is a Drawer with no overlay
      </Drawer>
      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleOverlayDrawer}
          opened={openedOverlayDrawer}
          overlay
          placement="right"
          size="lg"
      >
        This is a Drawer with an overlay 
      </Drawer>
    </>
  );
};

export default DrawerSizes;
