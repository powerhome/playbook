import React, { useState } from "react";
import { Button, Drawer, Flex } from "playbook-ui";

const DrawerBorders = () => {
  // Individual state variables for each drawer size
  const [openedBRightDrawer, setOpenedBRightDrawer] = useState(false);
  const [openedBLeftDrawer, setOpenedBLeftDrawer] = useState(false);
  const [openedBFullDrawer, setOpenedBFullDrawer] = useState(false);
  const [openedBDefaultDrawer, setOpenedBDefaultDrawer] = useState(false);
  const [openedBRoundedDrawer, setOpenedBRoundedDrawer] = useState(false);

  // Toggle functions for each drawer
  const toggleBRightDrawer = () => setOpenedBRightDrawer(!openedBRightDrawer);
  const toggleBLeftDrawer = () => setOpenedBLeftDrawer(!openedBLeftDrawer);
  const toggleBFullDrawer = () => setOpenedBFullDrawer(!openedBFullDrawer);
  const toggleBDefaultDrawer = () => setOpenedBDefaultDrawer(!openedBDefaultDrawer);
  const toggleBRoundedDrawer = () => setOpenedBRoundedDrawer(!openedBRoundedDrawer);

  return (
    <>
      <Flex padding="md"
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
        <Button marginRight="md"    
            onClick={toggleBDefaultDrawer}
        >
          Default Drawer
        </Button>
        <Button marginRight="md"
            onClick={toggleBRoundedDrawer}
        > 
          Rounded Drawer
        </Button>
      </Flex>

      {/* Drawers for each size */}
      <Drawer
          behavior="float"
          border="right"
          fullHeight
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
          fullHeight
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
          fullHeight
          onClose={toggleBFullDrawer}
          opened={openedBFullDrawer}
          overlay={false}
          placement="left"
          size="lg"
      >
        This is a Drawer with border full
      </Drawer>
      <Drawer
          behavior="float"
          fullHeight
          onClose={toggleBDefaultDrawer}
          opened={openedBDefaultDrawer}
          overlay={false}
          placement="left"
          size="lg"
      >   
        This is a Default Drawer
      </Drawer>
    </>
  );
};

export default DrawerBorders;
