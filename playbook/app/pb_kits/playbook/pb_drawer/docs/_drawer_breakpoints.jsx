import React, { useState, useEffect } from "react"
import { Button, Drawer, Icon, Nav, NavItem } from "playbook-ui"

const DrawerMenu = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const navItems = ["Overview", "Albums", "Similar Artists"]

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 992px)")
    const updateScreen = (e) => setIsSmallScreen(e.matches)
    updateScreen(mediaQuery)
    mediaQuery.addEventListener('change', updateScreen)
    return () => mediaQuery.removeEventListener('change', updateScreen)
  }, [])

  return (
    <div>
      <Button id='sidebar'
          padding='xs'
      >
        <Icon icon='bars'
            size='2x'
        />
      </Button>
      <Drawer
          behavior={"push"}
          breakpoint='md'
          overlay={isSmallScreen ? true : false}
          placement='left'
          size='md'
          triggerId='sidebar'
      >
        <Nav
            link='#'
            orientation='vertical'
            padding={isSmallScreen ? "none" : "sm"}
            variant='bold'
        >
          {navItems.map((text, index) => {
            return (
              <NavItem
                  collapsible
                  collapsibleTrail
                  fontWeight='bolder'
                  iconLeft='city'
                  iconRight={["plus", "minus"]}
                  key={index}
                  link='#'
                  text={text}
              >
                <NavItem fontSize='small'
                    link='#'
                    marginY='none'
                    text='City'
                />
                <NavItem
                    fontSize='small'
                    link='#'
                    marginY='none'
                    text='People'
                />
                <NavItem
                    fontSize='small'
                    link='#'
                    marginY='none'
                    text='Business'
                />
              </NavItem>
            )
          })}
        </Nav>
      </Drawer>
    </div>
  )
}

export default DrawerMenu
