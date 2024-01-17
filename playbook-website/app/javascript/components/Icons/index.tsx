import React from "react"

import { Title, Flex, FlexItem, Card } from "playbook-ui"
import Roofing from "@powerhome/playbook-icons/icons/roofing.svg"
import Powergon from "@powerhome/playbook-icons/icons/powergon.svg"
import Nitro from "@powerhome/playbook-icons/icons/nitro.svg"
import ChevronDown from "@powerhome/playbook-icons/icons/chevron-down.svg"
import Times from "@powerhome/playbook-icons/icons/times.svg"
import Bars from "@powerhome/playbook-icons/icons/bars.svg"
import Calendar from "@powerhome/playbook-icons/icons/calendar.svg"
import Filter from "@powerhome/playbook-icons/icons/filter.svg"
import Edit from "@powerhome/playbook-icons/icons/edit.svg"
import Trash from "@powerhome/playbook-icons/icons/trash.svg"
import Check from "@powerhome/playbook-icons/icons/check.svg"
import Plus from "@powerhome/playbook-icons/icons/plus.svg"
import Search from "@powerhome/playbook-icons/icons/search.svg"


const Icons = () => {
  return (
    <>
      <Flex justify='center'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={1} tag='h1' text='Playbook Icons' />
        </FlexItem>
      </Flex>
      <Flex justify='center'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={3} tag='h3' text='Power Icons' />
        </FlexItem>
      </Flex>
      <Flex justify='center'>
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
      <Flex justify='center'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={3} tag='h3' text='Interface Core Icons' />
        </FlexItem>
      </Flex>
      <Flex justify='center'>
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

export default Icons
