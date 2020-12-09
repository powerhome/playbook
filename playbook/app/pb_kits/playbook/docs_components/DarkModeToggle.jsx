import React from 'react'
import { useState, useEffect } from 'react'
import { Flex, FlexItem, Icon, Toggle } from '../'

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
    <Flex
        spacing="between"
        vertical="center"
    >
      <If condition={loading}>
        <FlexItem>
          <Icon
              className="toggle-icon"
              fixedWidth
              icon="spinner"
              marginRight="xs"
              marginLeft="sm"
              pulse
          />
        </FlexItem>
      </If>
      <If condition={!loading}>
        <FlexItem>
          <Icon
              className="toggle-icon"
              fixedWidth
              icon="moon"
              marginRight="xs"
              marginLeft="sm"
          />
        </FlexItem>
      </If>
      <FlexItem>
        <Toggle
            checked={true}
        >
          <input
              checked={darkMode}
              onChange={toggleHook}
              type="checkbox"
          />
        </Toggle>
      </FlexItem>
    </Flex>
  )
}

export default DarkModeToggle