import React from "react"
import { Outlet } from "react-router-dom"
import DarkModeToggle from "../components/DarkModeToggle.jsx"

import { FlexItem, Flex, Button } from "playbook-ui"

export default function LayoutRight({ dark }) {
  return (
    <div className={`pb--page--content--main ${dark}`}>
      <Flex
        spacing='between'
        vertical='center'
        display={{ xs: "none", sm: "none", md: "none", default: "none", lg: "flex" }}
      >
        <Button
          text='Back to Legacy View'
          variant='link'
          icon='circle-left'
          tag='h1'
          marginY='xs'
          paddingLeft='none'
          marginBottom='none'
          paddingBottom='none'
          link='/kits'
          marginLeft='md'
        />
        <FlexItem
          marginRight='md'
          className='pb--page--dark-mode-toggle-desktop'
        >
          <DarkModeToggle initMode={dark} />
        </FlexItem>
      </Flex>
      <Outlet />
    </div>
  )
}
