import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import MainSidebar from "./MainSidebar"
import { Layout, Background, Flex } from "playbook-ui"

function App() {
  const [kits, setKits] = useState([])
  const [dark, setDark] = useState(false)

  useEffect(() => {
    // Fetch JSON data from the server
    fetch("/beta/kits.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setKits(data.kits) // Set 'kits' to the 'kits' property of 'data'
        setDark(data.dark_mode)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    kits.length > 0 && (
      <Layout
        className='pb--page--content'
        dark={dark}
        collapse='md'
        position='left'
        size='lg'
      >
        <Layout.Side>
          {/* todo: convert to React------ >    <%= render 'layouts/mobile_hamburger' %></Layout> */}
          <MainSidebar kits={kits} />
        </Layout.Side>
        <Layout.Body>
          <div className={`pb--page--content--main ${dark}`}>
            <Flex gap='md' justify='center' wrap>
              <Background backgroundColor='success' padding='xl' />
              <br />
              <Background backgroundColor='success_secondary' padding='xl' />
              <br />
              <Background
                alt='colorful background'
                padding="xl"
                backgroundSize={{
                  xs: "sm",
                  sm: "md",
                  md: "xxl",
                }}
                backgroundPosition={{
                  default: "center center",
                  xs: "center top",
                  sm: "left top",
                  md: "right top",
                }}
                backgroundRepeat={{
                  xs: "no-repeat",
                  sm: "repeat-x",
                  md: "repeat-y",
                }}
                backgroundColor={{
                  xs: "primary",
                  sm: "success",
                  md: "warning",
                  default: "error"
                }}
                // imageUrl={{
                //   xs: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
                //   sm: "https://images.unsplash.com/photo-1682685797208-c741d58c2eff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
                //   md: "https://images.unsplash.com/photo-1696161812499-e17695da6056?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
                // }}
              />
              {/* {children go here} */}
              {/* todo: convert to React------ >    <%= render 'layouts/footer'%> */}
            </Flex>
          </div>
        </Layout.Body>
      </Layout>
    )
  )
}

export default App
