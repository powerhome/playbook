import React, { useState } from "react"

import Button from '../../pb_button/_button'
import Drawer from '../../pb_drawer/_drawer'
import Flex from '../../pb_flex/_flex'

const DrawerSizes = () => {
  // Individual state variables for each drawer size
  const [openedNoOverlayDrawer, setOpenedNoOverlayDrawer] = useState(false)
  const [openedOverlayDrawer, setOpenedOverlayDrawer] = useState(false)

  // Toggle functions for each drawer
  const toggleNoOverlayDrawer = () =>
    setOpenedNoOverlayDrawer(!openedNoOverlayDrawer)
  const toggleOverlayDrawer = () => setOpenedOverlayDrawer(!openedOverlayDrawer)

  return (
    <>
      <Flex wrap>
        <Button marginRight='md'
            onClick={toggleNoOverlayDrawer}
        >
          No Overlay Drawer
        </Button>
        <Button marginRight='md'
            onClick={toggleOverlayDrawer}
        >
          Overlay Drawer
        </Button>
      </Flex>

      {/* Drawers for each size */}
      <Drawer
          onClose={toggleNoOverlayDrawer}
          opened={openedNoOverlayDrawer}
          overlay={false}
          placement='right'
          size='lg'
      >
        This is a Drawer with no overlay
      </Drawer>
      <Drawer
          onClose={toggleOverlayDrawer}
          opened={openedOverlayDrawer}
          placement='right'
          size='lg'
      >
        This is a Drawer with an overlay
      </Drawer>
    </>
  )
}

export default DrawerSizes
