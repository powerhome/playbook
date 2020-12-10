/* @flow */

import React from 'react'
import { useState } from 'react'
import { Body, Flex, FlexItem, Icon, Toggle } from '../'

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

  const iconClickHandler = () => {
    toggleHook()
  }

  return (
    <Flex
        spacing="between"
        vertical="center"
    >
      <If condition={loading}>
        <FlexItem>
          <Body
              color={darkMode ? 'lighter' : ''}
              dark={!darkMode}
          >
            <Icon
                className="toggle-icon"
                dark
                fixedWidth
                icon="spinner"
                marginRight="xs"
                pulse
            />
          </Body>
        </FlexItem>
      </If>
      <If condition={!loading}>
        <a
            onClick={iconClickHandler}
            style={{ cursor: 'pointer' }}
        >
          <FlexItem>
            <Body
                color={darkMode ? '' : 'lighter'}
                dark={darkMode}
            >
              <Icon
                  className="toggle-icon"
                  dark
                  fixedWidth
                  icon="moon"
                  marginRight="xs"
              />
            </Body>
          </FlexItem>
        </a>
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
