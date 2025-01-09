import React from "react"
import { Button, Drawer, Icon, Nav, NavItem } from "playbook-ui"

const DrawerMenu = () => {
  return (
    <>
      <Button 
          id='menuButton' 
          padding='sm'
      >
        <Icon 
            icon='bars' 
            size='3x' 
        />
      </Button>
      <Drawer
          behavior='push'
          breakpoint='md'
          menuButtonID='menuButton'
          overlay={false}
          placement="bottom"
          size="full"
          withinElement
      >
        <Nav 
            link='#' 
            orientation='horizontal'
        >
          <NavItem 
              link='#' 
              text='About' 
          />
          <NavItem 
              active 
              link='#' 
              text='Case Studies' 
          />
          <NavItem 
              link='#' 
              text='Service' 
          />
          <NavItem 
              link='#' 
              text='Contacts' 
          />
        </Nav>
      </Drawer>
    </>
  )
}

export default DrawerMenu
