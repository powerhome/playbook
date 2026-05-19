import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useDarkMode } from "../contexts/DarkModeContext"
import { Button, Flex } from "playbook-ui"

export default function LayoutRight() {
  const location = useLocation()
  const { darkMode } = useDarkMode()
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div
      ref={mainRef}
      className={`layout_body pb--page--content--main ${darkMode ? "dark" : ""}`.trim()}
    >
      <Flex
          display={{ xs: "none", sm: "none", md: "none", default: "none" }}
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
    </div>
  )
}
