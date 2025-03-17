import React, { useState } from "react";

import Button from '../../pb_button/_button'
import Drawer from '../../pb_drawer/_drawer'
import Flex from '../../pb_flex/_flex'

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
        <Button 
            marginRight="md"
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
          onClose={toggleXsDrawer}
          opened={openedXsDrawer}
          placement="right"
          size="xs"
      >
        XS 
      </Drawer>

      <Drawer
          onClose={toggleSmDrawer}
          opened={openedSmDrawer}
          size="sm"
      >
        This is an SM Drawer
      </Drawer>

      <Drawer
          onClose={toggleMdDrawer}
          opened={openedMdDrawer}
          placement="right"
      >
        This is an MD Drawer
      </Drawer>

      <Drawer
          onClose={toggleLgDrawer}
          opened={openedLgDrawer}
          size="lg"
      >
        This is an LG Drawer
      </Drawer>

      <Drawer
          onClose={toggleXlDrawer}
          opened={openedXlDrawer}
          placement="right"
          size="xl"
      >
        This is an XL Drawer
      </Drawer>
    </>
  );
};

export default DrawerSizes;
