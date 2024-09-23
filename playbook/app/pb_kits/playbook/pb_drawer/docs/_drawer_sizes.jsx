import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const DrawerSizes = () => {
  // Individual state variables for each drawer size
  const [openedXsDrawer, setOpenedXsDrawer] = useState(false);
  const [openedSmDrawer, setOpenedSmDrawer] = useState(false);
  const [openedMdDrawer, setOpenedMdDrawer] = useState(false);
  const [openedLgDrawer, setOpenedLgDrawer] = useState(false);
  const [openedXlDrawer, setOpenedXlDrawer] = useState(false);

  // Toggle functions for each drawer
  const toggleXsDrawer = () => setOpenedXsDrawer(!openedXsDrawer);
  const toggleSmDrawer = () => setOpenedSmDrawer(!openedSmDrawer);
  const toggleMdDrawer = () => setOpenedMdDrawer(!openedMdDrawer);
  const toggleLgDrawer = () => setOpenedLgDrawer(!openedLgDrawer);
  const toggleXlDrawer = () => setOpenedXlDrawer(!openedXlDrawer);

  return (
    <>
      <Flex wrap>
        <Button marginRight="md"
            onClick={toggleXsDrawer}
        >
          XS Drawer
        </Button>
        <Button marginRight="md"
            onClick={toggleSmDrawer}
        >
          SM Drawer
        </Button>
        <Button marginRight="md"
            onClick={toggleMdDrawer}
        >
          MD Drawer
        </Button>
        <Button marginRight="md"
            onClick={toggleLgDrawer}
        >
          LG Drawer
        </Button>
        <Button marginRight="md"
            onClick={toggleXlDrawer}
        >
          XL Drawer
        </Button>
      </Flex>

      {/* Drawers for each size */}
      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleXsDrawer}
          opened={openedXsDrawer}
          overlay
          placement="right"
          size="xs"
      >
        XS 
      </Drawer>

      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleSmDrawer}
          opened={openedSmDrawer}
          overlay
          placement="right"
          size="sm"
      >
        This is an SM Drawer
      </Drawer>

      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleMdDrawer}
          opened={openedMdDrawer}
          overlay
          placement="right"
          size="md"
      >
        This is an MD Drawer
      </Drawer>

      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleLgDrawer}
          opened={openedLgDrawer}
          overlay
          placement="right"
          size="lg"
      >
        This is an LG Drawer
      </Drawer>

      <Drawer
          behavior="push"
          fullHeight
          onClose={toggleXlDrawer}
          opened={openedXlDrawer}
          overlay
          placement="right"
          size="xl"
      >
        This is an XL Drawer
      </Drawer>
    </>
  );
};

export default DrawerSizes;
