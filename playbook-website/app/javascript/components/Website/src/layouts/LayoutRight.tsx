import { Outlet, useLocation, useNavigation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useDarkMode } from "../contexts/DarkModeContext"
import { LoadingInline, Flex } from "playbook-ui"

export default function LayoutRight() {
  const location = useLocation()
  const navigation = useNavigation()
  const { darkMode } = useDarkMode()
  const mainRef = useRef<HTMLDivElement>(null)
  const isLoading = navigation.state === "loading"

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0 })
  }, [location.pathname])

  return (
    <div
      ref={mainRef}
      className={`layout_body pb--page--content--main ${darkMode ? "dark" : ""}`.trim()}
    >
      {isLoading ? (
        <Flex alignItems="center" justifyContent="center" height="100%">
          <LoadingInline dark={darkMode} />
        </Flex>
      ) : (
        <Outlet />
      )}
    </div>
  )
}
