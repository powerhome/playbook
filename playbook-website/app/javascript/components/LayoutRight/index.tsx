import React from "react"
import { Outlet } from "react-router-dom"
import DarkModeToggle from "../DarkModeToggle"
import HeaderMobile from "../../images/pb_generic_header.jpg"
import HeaderDesktop from "../../images/pb_generic_header_desktop.jpg"

import {
  Layout,
  FlexItem,
  Flex,
  Background,
  Button,
  Title,
  Body,
} from "playbook-ui"

export default function LayoutRight({ isMobile, dark }) {
  return (
    <Layout.Body>
      <div className={`pb--page--content--main ${dark}`}>
        {!isMobile && (
          <Flex spacing='between' vertical='center'>
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
        )}
        <Background
          alt='background with blue colors fading to darker blue'
          margin={{
            xs: "none",
            sm: "none",
            md: "md",
            lg: "md",
            xl: "md",
          }}
          marginTop={{ md: "none", lg: "none", xl: "none" }}
          padding={{ md: "xl", default: "xl" }}
          paddingTop={{ xs: "lg" }}
          paddingBottom={{ xs: "xs" }}
          paddingX={{ xs: "xs" }}
          textAlign={isMobile ? "center" : "left"}
          borderRadius={isMobile ? "none" : "lg"}
          backgroundSize={{
            default: "1105px 243px",
            xs: "80%",
            sm: "80%",
            md: "1105px 243px",
          }}
          backgroundPosition={{
            default: "right bottom",
            xs: "center top",
            sm: "center top",
            md: "right bottom",
          }}
          backgroundColor='dark'
          backgroundRepeat='no-repeat'
          imageUrl={{
            default: HeaderDesktop,
            xs: HeaderMobile,
            sm: HeaderMobile,
            md: HeaderDesktop,
          }}
        >
          <Title
            size={{ xs: 3, sm: 3, md: 2, lg: 2, xl: 2 }}
            paddingTop={{ xs: "xl", sm: "xl", md: "none" }}
            paddingBottom={{ default: "sm" }}
            text='Components'
            marginBottom={{ xs: "sm", md: "xs" }}
            dark
          />
          {!isMobile && (
            <Body
              maxWidth='sm'
              lineHeight='loose'
              paddingBottom='xl'
              dark
              text='Components are the reusable building blocks of our design system. Each component meets a specific interaction or UI need, and has been specifically created to work together to create patterns and intuitive user experiences.'
            />
          )}
        </Background>

        <Outlet />
      </div>
    </Layout.Body>
  )
}
