import React from "react"

import { linkFormat } from "../../../../../utilities/website_sidebar_helper"

require("!file-loader!@powerhome/playbook-icons/icons/roofing.svg")
require("!file-loader!@powerhome/playbook-icons/icons/powergon.svg")
require("!file-loader!@powerhome/playbook-icons/icons/nitro.svg")

import { Hero } from "../../components/Hero"
import { Icon, Title, Flex, FlexItem, Card } from "playbook-ui"
import Roofing from "@powerhome/playbook-icons/icons/roofing.svg"
import Powergon from "@powerhome/playbook-icons/icons/powergon.svg"
import Nitro from "@powerhome/playbook-icons/icons/nitro.svg"
import ChevronDown from "!file-loader!@powerhome/playbook-icons/icons/chevron-down.svg"
import Times from "!file-loader!@powerhome/playbook-icons/icons/times.svg"
import Bars from "!file-loader!@powerhome/playbook-icons/icons/bars.svg"
import Calendar from "!file-loader!@powerhome/playbook-icons/icons/calendar.svg"
import Filter from "!file-loader!@powerhome/playbook-icons/icons/filter.svg"
import Edit from "!file-loader!@powerhome/playbook-icons/icons/edit.svg"
import Trash from "!file-loader!@powerhome/playbook-icons/icons/trash.svg"
import Check from "!file-loader!@powerhome/playbook-icons/icons/check.svg"
import Plus from "!file-loader!@powerhome/playbook-icons/icons/plus.svg"
import Search from "!file-loader!@powerhome/playbook-icons/icons/search.svg"

export default function IconList() {

  return (
    <>
      <Hero description={"Powerhome Icons"} title={linkFormat("Playbook Icons")} />

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
              <Icon icon={<Roofing />} fixedWidth={false} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Powergon />} fixedWidth={false} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />} fixedWidth={false} />
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
