import React from "react"
import LayoutRight from "./src/layouts/LayoutRight"
import { useLoaderData } from "react-router-dom"
import { useMediaQuery } from "./src/hooks/useMediaQuery"

function App() {
  const { kits, dark } = useLoaderData()
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <>{kits.length > 0 && <LayoutRight isMobile={isMobile} dark={dark} />}</>
  )
}

export default App
