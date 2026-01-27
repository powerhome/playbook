import React from 'react'
import { useState } from 'react'
import { Body, Flex, FlexItem, Icon, Toggle } from 'playbook-ui'

type ToggleProps = {
  initMode: string,
}
const DarkModeToggle = ({ initMode }: ToggleProps) => {
  const [darkMode, toggleDarkMode] = useState(initMode ? JSON.parse(initMode) : false)
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
      {loading && (
        <FlexItem>
          <Body
              color={darkMode ? 'lighter' : ''}
              dark={!darkMode}
          >
            <Icon
                className="toggle-icon"
                fixedWidth
                icon="spinner"
                marginRight="xs"
                pulse
            />
          </Body>
        </FlexItem>
      )}
      {!loading && (
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
                  fixedWidth
                  icon="moon"
                  marginRight="xs"
              />
            </Body>
          </FlexItem>
        </a>
      )}
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
