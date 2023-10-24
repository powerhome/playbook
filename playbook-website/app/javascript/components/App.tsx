import React, { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"
import ReactSidebar from "./ReactSidebar"
import {
  Layout,
  Background,
  Icon,
  Title,
  Body,
  Button,
  Flex,
  FlexItem,
} from "playbook-ui"
import HeaderMobile from "../images/pb_generic_header.jpg"
import HeaderDesktop from "../images/pb_generic_header_desktop.jpg"
import DarkModeToggle from "./DarkModeToggle"

function App() {
  const [kits, setKits] = useState([])
  const [dark, setDark] = useState(false)
  const [kit, setKit] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [PBversion, setPBversion] = useState("")
  const [searchList, setSearchList] = useState([])
  const [samples, setSamples] = useState([])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    fetch("/beta/kits.json")
      .then((response) => response.json())
      .then((data) => {
        setKits(data.kits)
        setDark(data.dark)
        setKit(data.kit)
        setType(data.type)
        setCategory(data.category)
        setPBversion(data.PBversion)
        setSearchList(data.search_list)
        setSamples(data.samples)
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
    <>
      {kits.length > 0 && (
        <Layout
          className='pb--page--content'
          collapse='md'
          position='left'
          size='lg'
        >
          <Icon icon='bars' className='pb--page--hamburger'></Icon>
          <input type='checkbox' className='pb--page--checkbox' />
          <Layout.Side className='pb--page--sideNav'>
            <ReactSidebar
              kits={kits}
              kit={kit}
              type={type}
              category={category}
              PBversion={PBversion}
              searchList={searchList}
              samples={samples}
            />
          </Layout.Side>
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
        </Layout>
      )}
    </>
  )
}

export default App
