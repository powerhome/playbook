import React from "react"

import { Title, Flex, FlexItem, Card } from "playbook-ui"

import {
  Roofing,
  Powergon,
  Nitro,
  ChevronDown,
  Times,
  Bars,
  Calendar,
  Filter,
  Edit,
  Trash,
  Check,
  Plus,
  Search,
} from "@powerhome/playbook-icons-react"

const ReactPartial = () => {
  return (
    <>
      <Flex justify='center' marginTop='xl'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={1} tag='h1' text='Playbook Icons' />
        </FlexItem>
      </Flex>
      <Flex justify='center' marginTop='xl'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={3} tag='h3' text='Power Icons' />
        </FlexItem>
      </Flex>
      <Flex justify='center' marginTop='xl'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Flex>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Roofing />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Powergon />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Nitro />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
      <Flex justify='center' marginTop='xl'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title size={3} tag='h3' text='Interface Core Icons' />
        </FlexItem>
      </Flex>
      <Flex justify='center' marginTop='xl'>
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Flex>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <ChevronDown />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Times />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Bars />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Calendar />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Filter />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Edit />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Trash />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Check />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Plus />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Search />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Search />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  )
}

export default ReactPartial
