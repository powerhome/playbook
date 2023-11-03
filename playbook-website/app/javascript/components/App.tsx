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

import LayoutRight from "./LayoutRight"

function App(props) {
  const [kits, setKits] = useState([])
  const [dark, setDark] = useState(false)
  const [kit, setKit] = useState("")
  const [type, setType] = useState("")
  const [category, setCategory] = useState("")
  const [PBversion, setPBversion] = useState("")
  const [searchList, setSearchList] = useState([])
  const [samples, setSamples] = useState([])

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
// console.log('app', props)
  useEffect(() => {
    fetch("/beta/kits.json")
      .then((response) => response.json())
      .then((data) => {
        console.log('data',data)
        setKits(data.kits)
        setDark(data.dark)
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
              type={type}
              category={category}
              PBversion={PBversion}
              searchList={searchList}
              samples={samples}
            />
          </Layout.Side>
          <LayoutRight isMobile={isMobile} content={kits} dark={dark} />
        </Layout>
      )}
    </>
  )
}

export default App
