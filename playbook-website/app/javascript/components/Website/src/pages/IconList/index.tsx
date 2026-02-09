import { linkFormat } from "../../../../../utilities/website_sidebar_helper"
import { Hero } from "../../components/Hero"
import { Body, Icon, Title, Flex, FlexItem, Card } from "playbook-ui"


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
              <Icon icon="circle-arrow-right"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="arrow-circle-right"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="nitro"  />
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
              <Icon icon="chevrondown" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="times" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="bars" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="times" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="calendar" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="filter" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="edit" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="trash" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="check" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="plus" />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="search" />
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
              <Icon icon="roofing" size="xs"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="sm"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="lg"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="1x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="2x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="3x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="4x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="5x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="6x"  />
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
          <Title paddingBottom="sm" size={3} tag='h3' text='Other Props' />
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
              <Icon icon="roofing" size="2x" pull="left"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="2x" pull="right"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="roofing" size="2x" fixedWidth  />
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
                <Icon icon="powergon" size="3x" />
              </Body>
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
              className="red_color"
            >
              <Body color="link">
                <Icon icon="powergon" size="3x" />
              </Body>
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
              className="green_color"
            >
              <Body color="success">
                <Icon icon="powergon" size="3x" />
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
              <Icon icon="nitro" size="6x" spin  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="nitro" size="3x" pulse  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="nitro" size="3x"  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="nitro" size="3x" rotation={90}  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="nitro" size="3x" rotation={180}  />
            </Card>
            <Card
              marginRight='sm'
              hover={{ shadow: "deeper" }}
              cursor='pointer'
            >
              <Icon icon="nitro" size="3x" rotation={270}  />
            </Card>
          </Flex>
        </FlexItem>
      </Flex>
    </>
  )
}
