import React, { useState, useEffect } from "react"
import { Button, Drawer, Icon, Nav, NavItem } from "playbook-ui"

const DrawerMenu = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)")
    setIsSmallScreen(mediaQuery.matches)
    const handler = (e) => setIsSmallScreen(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return (
    <div>
      <Button id='menuButton'
          padding='xs'
      >
        <Icon icon='bars'
            size='2x'
        />
      </Button>
      <Drawer
          // behavior='push'
          breakpoint='md'
          menuButtonID='menuButton'
          placement='bottom'
          size='full'
          withinElement
      >
        <Nav 
            highlight={false}
            link='#'
            orientation={isSmallScreen ? 'vertical' : 'horizontal'} 
            padding={isSmallScreen ? 'none' : 'sm'}
        >
          <NavItem link='#'
              text='About'
          />
          <NavItem active
              link='#'
              text='Case Studies'
          />
          <NavItem link='#'
              text='Service'
          />
          <NavItem link='#'
              text='Contacts'
          />
        </Nav>
      </Drawer>
    </div>
  )
}

export default DrawerMenu
