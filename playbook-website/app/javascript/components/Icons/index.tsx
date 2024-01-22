import React from "react"

import { Icon, Title, Flex, FlexItem, Card } from "playbook-ui"
import Roofing from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/roofing.svg"
import Powergon from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/powergon.svg"
import Nitro from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/nitro.svg"
import ChevronDown from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/chevron-down.svg"
import Times from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/times.svg"
import Bars from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/bars.svg"
import Calendar from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/calendar.svg"
import Filter from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/filter.svg"
import Edit from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/edit.svg"
import Trash from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/trash.svg"
import Check from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/check.svg"
import Plus from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/plus.svg"
import Search from "!babel-loader!react-svg-loader!@powerhome/playbook-icons/icons/search.svg"

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
              <Icon icon={Roofing}/>
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Powergon}/>
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Nitro} />
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
              <Icon icon={ChevronDown} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Times} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Bars} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Times} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Calendar} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Filter} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Edit} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Trash} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Check} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Plus} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={Search} />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  )
}

export default Icons
