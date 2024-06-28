import React from "react"
import LayoutRight from "./src/layouts/LayoutRight"
import { useLoaderData } from "react-router-dom"


function App() {
  const { kits, dark }: any = useLoaderData()

  return (
    <>{kits.length > 0 && <LayoutRight dark={dark} />}</>
  )
}

export default App
