import { Outlet, useLocation } from "react-router-dom"
import { useEffect, useRef } from "react"
import { useDarkMode } from "../contexts/DarkModeContext"

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
      <Outlet />
    </div>
  )
}
