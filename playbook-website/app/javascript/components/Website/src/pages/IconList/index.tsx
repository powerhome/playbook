import React from "react"

import { linkFormat } from "../../../../../utilities/website_sidebar_helper"

import { Hero } from "../../components/Hero"
import { Body, Icon, Title, Flex, FlexItem, Card } from "playbook-ui"
import { Roofing, Powergon, Nitro, ChevronDown, Times, Bars, Calendar, Filter, Edit, Trash, Check, Plus, Search} from '@powerhome/playbook-icons-react'

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
          <Title paddingBottom="sm" size={3} tag='h3' text='Power Icons' />
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
              <Icon icon={<Roofing />}  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Powergon />}  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />}  />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>


      <Flex
        justify='center'
        marginX={{ lg: "sm", xl: "sm" }}
        paddingLeft="xs"
        paddingTop="sm"
      >
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title paddingBottom="sm" size={3} tag='h3' text='Interface Core Icons' />
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
              <Icon icon={<ChevronDown />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Times />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Bars />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Times />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Calendar />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Filter />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Edit />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Trash />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Check />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Plus />} />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Search />} />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>



      <Flex
        justify='center'
        marginX={{ lg: "sm", xl: "sm" }}
        paddingLeft="xs"
        paddingTop="sm"
      >
        <FlexItem alignSelf='stretch' maxWidth='xxl' flexGrow={1}>
          <Title paddingBottom="sm" size={3} tag='h3' text='Sizes' />
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
              <Icon icon={<Roofing />} size="xs"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="sm"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="lg"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="1x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="2x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="3x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="4x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="5x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Roofing />} size="6x"  />
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
          <Title paddingBottom="sm" size={3} tag='h3' text='Color' />
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
              className="blue_color"
            >
              <Body color="error">
                <Icon icon={<Powergon />} size="3x" />
              </Body>
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
              className="red_color"
            >
              <Body color="link">
                <Icon icon={<Powergon />} size="3x" />
              </Body>
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
              className="green_color"
            >
              <Body color="success">
                <Icon icon={<Powergon />} size="3x" />
              </Body>
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
          <Title paddingBottom="sm" paddingTop="sm" size={3} tag='h3' text='Animation & Transformation' />
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
              <Icon icon={<Nitro />} size="6x" spin  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />} size="3x" pulse  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />} size="3x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />} size="3x" rotation={90}  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />} size="3x" rotation={180}  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon={<Nitro />} size="3x" rotation={270}  />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  )
}
