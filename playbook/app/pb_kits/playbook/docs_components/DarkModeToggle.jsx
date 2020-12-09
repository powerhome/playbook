/* @flow */

import React from 'react'
import { useState } from 'react'
import { Flex, FlexItem, Icon, Toggle } from '../'

type ToggleProps = {
  initMode: String,
}
const DarkModeToggle = (props: ToggleProps) => {
  const { initMode } = props
  const [darkMode, toggleDarkMode] = useState(JSON.parse(initMode) || false)
  const [loading, toggleLoading] = useState(false)

  const toggleHook = () => {
    toggleLoading(true)
    toggleDarkMode(!darkMode)
    window.location = !darkMode ? '/enable_dark_mode' : '/disable_dark_mode'
  }

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
              marginLeft="sm"
              marginRight="xs"
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
              marginLeft="sm"
              marginRight="xs"
          />
        </FlexItem>
      </If>
      <FlexItem>
        <Toggle>
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
