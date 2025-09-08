import { Outlet } from "react-router-dom"
import DarkModeToggle from "../components/DarkModeToggle.js"

import { Background, Button, FlexItem, Flex } from "playbook-ui"

export default function LayoutRight({ dark }: { dark: string }) {
  return (
    <Background
        backgroundColor={dark ? "dark" : "white"}
        className="pb--page--content--main"
    >
      <Flex
          display={{ xs: "none", sm: "none", md: "none", default: "none", lg: "flex" }}
          spacing='between'
          vertical='center'
      >
        <Button
            icon='circle-left'
            link='/kits'
            marginBottom='none'
            marginLeft='md'
            marginY='xs'
            paddingBottom='none'
            paddingLeft='none'
            tag='h1'
            text='Back to Legacy View'
            variant='link'
        />
        <FlexItem
            className='pb--page--dark-mode-toggle-desktop'
            marginRight='md'
        >
          <DarkModeToggle initMode={dark} />
        </FlexItem>
      </Flex>
      <Outlet />
    </Background>
  )
}
