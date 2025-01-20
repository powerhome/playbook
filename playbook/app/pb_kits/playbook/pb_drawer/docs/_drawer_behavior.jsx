import React, { useState } from "react"
import { Button, Drawer, Flex } from "playbook-ui"

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
            fullHeight
            onClose={toggleDrawerOpen}
            opened={drawerOpen}
            overlay
            placement={"left"}
            size={"lg"}
        >
          Test me (Push Behavior)
        </Drawer>
      </Flex>
    </>
  )
}

export default DrawerBehavior
