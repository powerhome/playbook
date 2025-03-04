import React from "react"
import { Button, Body } from "playbook-ui"

const DrawerMenu = () => {
  return (
    <>
      <Body>
        The breakpoint prop determines when the Drawer is always visible. Above
        the specified breakpoint, the Drawer remains open on the page. Below it,
        only the trigger element is shown, allowing you to toggle the drawer
        open and closed. To see this in action, click the button below and
        resize your window.
      </Body>
      <Button
          link='https://8njdkc.csb.app/'
          marginTop='md' 
          newWindow 
      >
        Open Doc Example in New Tab
      </Button>
    </>
  )
}

export default DrawerMenu
