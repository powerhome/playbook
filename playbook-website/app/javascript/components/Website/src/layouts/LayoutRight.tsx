import { Outlet, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { useDarkMode } from "../contexts/DarkModeContext"
import { Background, Button, Flex } from "playbook-ui"

export default function LayoutRight({ dark }: { dark: string }) {
  const location = useLocation()
  const { darkMode } = useDarkMode();
  // Scroll to top when route changes
  useEffect(() => {
    // Scroll the main content area
    const mainContent = document.querySelector('.pb--page--content--main')
    if (mainContent) {
      mainContent.scrollTop = 0
    }
    // Also scroll window as fallback
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  
  return (
    <Background
        backgroundColor={dark ? "dark" : "white"}
        className="pb--page--content--main"
        dark={darkMode}
    >
      <Flex
          display={{ xs: "none", sm: "none", md: "none", default: "none", lg: "flex" }}
          spacing='between'
          vertical='center'
      >
        <Button
            icon='circle-left'
            link='/kits'
            marginBottom='none'
            marginLeft='md'
            marginY='xs'
            paddingBottom='none'
            paddingLeft='none'
            tag='h1'
            text='Back to Legacy View'
            variant='link'
            dark={darkMode}
        />
      </Flex>
      <Outlet />
    </Background>
  )
}
