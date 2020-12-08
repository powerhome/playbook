import React from 'react'
import { useState, useEffect } from 'react'
import { Icon, Toggle, Caption, LoadingInline } from '../'

const DarkModeToggle = (props) => {
  const { initMode } = props
  const [darkMode, toggleDarkMode] = useState(false)
  const [loading, toggleLoading] = useState(false)

  const toggleHook = () => {
    toggleLoading(true)
    toggleDarkMode(!darkMode)
    window.location = !darkMode ? "/enable_dark_mode" : "/disable_dark_mode"
  }

  useEffect(()=> {
    toggleDarkMode(JSON.parse(initMode))
  }, [])

  return (
    <div style={{cursor: "pointer", maxWidth: "170px"}}>
      <Toggle
        checked={true}
      >
        <input
          checked={darkMode}
          onChange={toggleHook}
          type="checkbox"
        />
      </Toggle>
    </div>
  )
}

export default DarkModeToggle