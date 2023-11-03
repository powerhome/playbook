import React, { useState, useEffect } from "react"
import { Layout, Icon } from "playbook-ui"
import Sidebar from "./Sidebar"
import LayoutRight from "./LayoutRight"

function App() {
  const [kits, setKits] = useState([])
  const [dark, setDark] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    fetch("/beta/kits.json")
      .then((response) => response.json())
      .then((data) => {
        setKits(data.kits)
        setDark(data.dark)
      })
      .catch((error) => {
        console.log(error)
      })

    window.addEventListener("resize", () => {
      setIsMobile(window.innerWidth < 768)
    })

    return () => {
      window.removeEventListener("resize", () => {
        setIsMobile(window.innerWidth < 768)
      })
    }
  }, [])

  return (
    <>{kits.length > 0 && <LayoutRight isMobile={isMobile} dark={dark} />}</>
  )
}

export default App
