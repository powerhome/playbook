import React from 'react'

import { Title, Flex, FlexItem, Card } from 'playbook-ui'
import Roofing from 'playbook-icons/icons/roofing.svg'
import Powergon from 'playbook-icons/icons/powergon.svg'
import Nitro from 'playbook-icons/icons/nitro.svg'
import ChevronDown from 'playbook-icons/icons/chevron-down.svg'
import Times from 'playbook-icons/icons/times.svg'
import Bars from 'playbook-icons/icons/bars.svg'
import Calendar from 'playbook-icons/icons/calendar.svg'
import Filter from 'playbook-icons/icons/filter.svg'
import Edit from 'playbook-icons/icons/edit.svg'
import Trash from 'playbook-icons/icons/trash.svg'
import Check from 'playbook-icons/icons/check.svg'
import Plus from 'playbook-icons/icons/plus.svg'
import Search from 'playbook-icons/icons/search.svg'

const Icons = () => {

  return (
    <>
      <Flex justify="center" >
        <FlexItem alignSelf="stretch" maxWidth="xxl" flexGrow={1}>
          <Title
            size={1}
            tag="h1"
            text="Playbook Icons"
          />
        </FlexItem>
      </Flex>
      <Flex justify="center" >
        <FlexItem alignSelf="stretch" maxWidth="xxl" flexGrow={1}>
          <Title
            size={3}
            tag="h3"
            text="Power Icons"
          />
        </FlexItem>
      </Flex>
      <Flex justify="center" >
        <FlexItem alignSelf="stretch" maxWidth="xxl" flexGrow={1}>
          <Flex>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Roofing}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Powergon}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Nitro}/>
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
      <Flex justify="center" >
        <FlexItem alignSelf="stretch" maxWidth="xxl" flexGrow={1}>
          <Title
            size={3}
            tag="h3"
            text="Interface Core Icons"
          />
        </FlexItem>
      </Flex>
      <Flex justify="center" >
        <FlexItem alignSelf="stretch" maxWidth="xxl" flexGrow={1}>
          <Flex>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={ChevronDown}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Times}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Bars}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Times}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Calendar}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Filter}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Edit}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Trash}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Check}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Plus}/>
            </Card>
            <Card marginRight="sm" hover={{ shadow: "deeper" }} cursor="pointer">
              <img src={Search}/>
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  )
}

export default Icons