import React from "react"

import { linkFormat } from "../../../../../utilities/website_sidebar_helper"
import { Hero } from "../../components/Hero"
import { Roofing, Powergon, Nitro, ChevronDown, Times, Bars, Calendar, Filter, Edit, Trash, Check, Plus, Search} from '@powerhome/playbook-icons-react'
import { Body, Icon, Title, Flex, FlexItem, Card } from "playbook-ui"

const pbIcons = {
  roofing: Roofing,
  nitro: Nitro,
  powergon: Powergon,
  chevrondown: ChevronDown,
  times: Times,
  bars: Bars,
  calendar: Calendar,
  filter: Filter,
  edit: Edit,
  trash: Trash,
  check: Check,
  plus: Plus,
  search: Search
}

window.PB_ICONS = pbIcons

export default function IconList() {

  return (
    <>
      <Hero description={"Power Icons"} title={linkFormat("Playbook Icons")} />

      <Flex
        justify='center'
        marginX={{ lg: "sm", xl: "sm" }}
        paddingLeft="xs"
      >
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Flex>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Roofing} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Powergon} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Nitro} />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
      <Flex
        justify='center'
        marginX={{ lg: "sm", xl: "sm" }}
        paddingLeft="xs"
      >
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={3} tag='h3' text='Interface Core Icons' />
        </FlexItem>
      </Flex>
      <Flex
        justify='center'
        marginX={{ lg: "sm", xl: "sm" }}
        paddingLeft="xs"
      >
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Flex>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={ChevronDown} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Times} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Bars} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Times} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Calendar} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Filter} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Edit} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Trash} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Check} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Plus} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <img src={Search} />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  )
}

