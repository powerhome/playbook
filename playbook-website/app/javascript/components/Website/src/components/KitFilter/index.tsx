import React, { ChangeEvent, useEffect, useState } from "react";
import { Flex, Icon, Nav, NavItem, TextInput } from "playbook-ui"
import { ReactSVG } from "./ReactSVG"
import { RailsSVG } from "./RailsSVG"
import { SwiftSVG } from "./SwiftSVG"
import { Kit, Kits } from "../../pages/ComponentList";

import "./styles.scss"

type KitFilterProps = {
  kits: Kits,
  setFilteredKits: (filteredKits: Kits) => void,
  setPlatform: (platform: string) => void,
}

export const KitFilter = ({ kits, setFilteredKits, setPlatform }: KitFilterProps) => {
  const [search, setSearch] = useState('')
  const [platform, setSelectedPlatform] = useState('react')

  const handleOnChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target
    setSearch(value)
  }

  const selectPlatform = (platform: string) => {
    setPlatform(platform)
    setSelectedPlatform(platform)
    const filteredKits = searchKit(kits, search, platform)
    setFilteredKits(filteredKits)
  }

  const searchKit = (kitList: Kits | Kit[], search: string, platform: string) => {
    const kits = JSON.parse(JSON.stringify(kitList))

    return kits.filter((kit: Kit) => {
      if (kit.components) {
        kit.components = kit.components.filter(component => {
          return component.platforms.includes(platform) &&
            component.name &&
            component.name.toLowerCase().includes(search.toLowerCase())
        })

        return kit.components.length > 0

      } else if (!kit.components && kit.name) {
        return kit.platforms.includes(platform) &&
          kit.name &&
          kit.name.toLowerCase().includes(search.toLowerCase())
      }

      return false
    })
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const filteredKits = searchKit(kits, search, platform)
      setFilteredKits(filteredKits)
    }, 200)

    return () => clearTimeout(timer)
  }, [search])

  return (
    <>
      <Nav
        link="#"
        orientation="horizontal"
        paddingBottom="lg"
        variant="subtle"
      >
        <NavItem
          active={platform === 'react'}
          link="#"
          onClick={() => selectPlatform('react')}
        >
          <Flex align="center">
            <Icon
              customIcon={<ReactSVG active={platform === 'react'} />}
            />
            <span className="pb_nav_list_item_text">React</span>
          </Flex>
        </NavItem>
        <NavItem
          active={platform === 'rails'}
          link="#"
          onClick={() => selectPlatform('rails')}
        >
          <Flex align="center">
            <Icon
              customIcon={<RailsSVG active={platform === 'rails'} />}
            />
            <span className="pb_nav_list_item_text">Rails</span>
          </Flex>
        </NavItem>
        <NavItem
          active={platform === 'swift'}
          link="#"
          onClick={() => selectPlatform('swift')}
        >
          <Flex align="center">
            <Icon
              customIcon={<SwiftSVG active={platform === 'swift'} />}
            />
            <span className="pb_nav_list_item_text">Swift</span>
          </Flex>
        </NavItem>
      </Nav>

      <TextInput
        addOn={{ icon: 'search', alignment: 'left' }}
        className="kit-filter"
        name="search"
        maxWidth="sm"
        onChange={handleOnChange}
        paddingLeft={{ xs: "sm" }}
        paddingRight={{ xs: "sm" }}
        placeholder="Filter Components by Name"
        value={search}
      />
    </>
  )
}
