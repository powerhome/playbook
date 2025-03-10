import React, { useState } from "react"

import Button from '../../pb_button/_button'
import Drawer from '../../pb_drawer/_drawer'
import Flex from '../../pb_flex/_flex'

const useDrawer = (visible = false) => {
  const [opened, setOpened] = useState(visible)
  const toggle = () => setOpened(!opened)

  return [opened, toggle]
}

const DrawerBehavior = () => {
  const [drawerOpen, toggleDrawerOpen] = useDrawer()

  return (
    <>
      <Flex wrap>
        <Button id='sm'
            marginRight='md'
            onClick={toggleDrawerOpen}
        >
          {"Push Behavior"}
        </Button>
      </Flex>
      <Flex>
        <Drawer
            behavior={"push"}      
            onClose={toggleDrawerOpen}
            opened={drawerOpen}
            size={"lg"}
        >
          Test me (Push Behavior)
        </Drawer>
      </Flex>
    </>
  )
}

export default DrawerBehavior
