import React from 'react'
import { Background, Badge, Body, Button, Caption, Card, Flex, Icon, IconCircle, IconValue, Image, Layout, Nav, NavItem, Pill, SectionSeparator, TextInput, Title } from '../../../../pb_kits/playbook'
import FlexItem from '../../../../pb_kits/playbook/pb_flex/_flex_item.jsx'

const trendingStories = [
  {
    headerColor: 'category_1',
    headerText: 'Finance',
    imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/jkuYZ6rB/readit_image_1.png',
    cardText: 'IRS will allow employers to match their employees\' student loan...',
    icon: 'dollar-sign',
    variant: 'green',
    subReadit: 'r/PersonalFinance and more',
  },
  {
    headerColor: 'category_2',
    headerText: 'World News',
    imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/wbuK75AO/readit_image_2.png',
    cardText: 'Hong Kong democrat Ted Hui confirms he will go into exile...',
    icon: 'globe',
    variant: 'yellow',
    subReadit: 'r/WorldNews and more',
  },
  {
    headerColor: 'category_3',
    headerText: 'Space',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80',
    cardText: 'Relaxing Inside the Space Station\'s Window to the World...',
    icon: 'space-shuttle',
    variant: 'blue',
    subReadit: 'r/Space and more',
  },
  {
    headerColor: 'category_4',
    headerText: 'Tech',
    imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/WnulJpwd/readit_image_4.png',
    cardText: 'MIT programmed AI that can design its own robots...',
    icon: 'microchip',
    variant: 'royal',
    subReadit: 'r/Technology and more',
  },
]

const communities = [
  { subReadit: 'r/Fishing', variant: 'teal', icon: 'fish' },
  { subReadit: 'r/Outdoors', variant: 'green', icon: 'trees' },
  { subReadit: 'r/MostBeautiful', variant: 'yellow', icon: 'sun' },
  { subReadit: 'r/Camping', variant: 'red', icon: 'campfire' },
  { subReadit: 'r/Homestead', variant: 'blue', icon: 'farm' },
]

const trendingCommunities = [
  { subReadit: 'r/Food', variant: 'blue', icon: 'utensils', members: '1,239,257 members' },
  { subReadit: 'r/Gaming', variant: 'red', icon: 'gamepad', members: '4,125,270 members' },
  { subReadit: 'r/aww', variant: 'yellow', icon: 'paw', members: '2,037,816 members' },
  { subReadit: 'r/Movies', variant: 'royal', icon: 'camera-movie', members: '1,392,777 members' },
  { subReadit: 'r/GraphicDesign', variant: 'purple', icon: 'pencil-paintbrush', members: '28,270 members' },
]

const CrowdsourcedPosts = () => {
  window.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[class*="trending_image"]').forEach((element) => {
      element.style.width = '100%'
      element.style.height = '150px'
    })
  })

  return (
    <>
      <Background
          backgroundColor="white"
          paddingLeft="md"
          paddingY="xs"
      >
        <Flex
            classname="flex-container"
            spacing="between"
            vertical="center"
        >
          <FlexItem>
            <Flex vertical="center">
              <FlexItem>
                <IconCircle
                    icon="robot"
                    size="md"
                    variant="royal"
                />
              </FlexItem>
              <FlexItem>
                <Title
                    marginLeft="xs"
                    size={2}
                    text="readit"
                />
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem fixedSize="30%">
            <TextInput
                marginTop="sm"
                placeholder="Search"
            />
          </FlexItem>
          <FlexItem>
            <Button
                marginRight="sm"
                text="Log In"
                variant="secondary"
            />
            <Button
                marginRight="sm"
                text="Sign Up"
            />
            <Button
                marginRight="md"
                padding="none"
                variant="link"
            >
              <Icon icon="user" />
              <Icon icon="caret-down" />
            </Button>
          </FlexItem>
        </Flex>
      </Background>

      <Flex horizontal="center">
        <FlexItem fixedSize="65%">
          {/* Start trending today */}
          <Caption
              paddingBottom="xs"
              paddingTop="sm"
              text="Trending Today"
          />
          <Layout
              header
              layout="collection"
          >
            <Layout.Body>
              {trendingStories.map((story) => (
                <Card
                    key={story.headerText}
                    padding="none"
                >
                  <Card.Header
                      headerColor={story.headerColor}
                      padding="sm"
                  >
                    <Caption
                        dark
                        text={story.headerText}
                    />
                  </Card.Header>
                  <Card.Body padding="none">
                    <Image
                        className="trending_image"
                        url={story.imageUrl}
                    />
                    <Body
                        padding="xs"
                        paddingY="none"
                        text={story.cardText}
                    />
                    <Flex
                        classname="flex-container"
                        padding="xs"
                        vertical="center"
                    >
                      <FlexItem>
                        <IconCircle
                            icon={story.icon}
                            size="xs"
                            variant={story.variant}
                        />
                      </FlexItem>
                      <FlexItem marginLeft="xs">
                        <Caption
                            size="xs"
                            text={story.subReadit}
                        />
                      </FlexItem>
                    </Flex>
                  </Card.Body>
                </Card>
              ))}
            </Layout.Body>
          </Layout>

          <Caption
              paddingBottom="xs"
              paddingTop="sm"
              text="Popular Posts"
          />
          <Layout
              position="right"
              size="xl"
          >
            <Layout.Body>
              <Card padding="none">
                <Flex spacing="between">
                  <FlexItem>
                    <Flex>
                      <Nav orientation="horizontal">
                        <NavItem
                            active
                            iconLeft="rocket"
                            link="#"
                            text="Best"
                        />
                        <NavItem
                            iconLeft="fire"
                            link="#"
                            text="Hot"
                        />
                        <NavItem
                            iconLeft="star"
                            link="#"
                            text="New"
                        />
                        <NavItem
                            iconLeft="chart-line"
                            link="#"
                            text="Top"
                        />
                      </Nav>
                      <Button
                          marginTop="xs"
                          variant="link"
                      >
                        <Icon icon="ellipsis-h" />
                      </Button>
                    </Flex>
                  </FlexItem>
                  <FlexItem>
                    <Button
                        marginTop="xs"
                        paddingRight="md"
                        variant="link"
                    >
                      <Icon icon="th-large" />
                      <Icon icon="caret-down" />
                    </Button>
                  </FlexItem>
                </Flex>
              </Card>
              <Card
                marginTop="sm"
                padding="none"
              >
                <Flex>
                  <FlexItem
                      marginLeft="sm"
                      marginTop="sm"
                  >
                    <Icon
                        icon="arrow-alt-up"
                        marginLeft="none"
                        size="1x"
                    />
                    <Title
                      margin="xs"
                      marginLeft="none"
                      size={4}
                      text="66.2k"
                    />
                    <Icon
                        icon="arrow-alt-down"
                        marginLeft="none"
                        size="1x"
                    />
                  </FlexItem>
                  <FlexItem
                      paddingX="xs"
                      paddingY="sm"
                  >
                    <Flex vertical="center">
                      <IconCircle
                          icon="lightbulb-on"
                          size="xs"
                          variant="yellow"
                      />
                      <Title
                        marginLeft="xs"
                        size={4}
                        text="r/LifeProTips"
                      />
                      <Body
                          color="light"
                          marginLeft="xs"
                          text="• Posted by u/xhuljanomuca 1 month ago"
                      />
                    </Flex>
                    <Body
                        paddingRight="md"
                        paddingTop="xs"
                        text="LPT: If you ever need a program you want for free (for example a video/photo editor) don’t search for “free,” search for “open source” to avoid limited trial versions, adverts and malware"
                    />
                    <Pill
                        marginTop="sm"
                        text="Computers"
                        variant="primary"
                    />
                    <Flex paddingTop="sm">
                      <IconValue
                          icon="comment-alt"
                          text="1.4k Comments"
                      />
                      <IconValue
                          marginLeft="sm"
                          icon="share"
                          text="Share"
                      />
                      <IconValue
                          marginLeft="sm"
                          icon="folder-plus"
                          text="Save"
                      />
                      <IconValue
                          marginLeft="sm"
                          icon="ellipsis-h"
                          text=""
                      />
                    </Flex>
                  </FlexItem>
                </Flex>
              </Card>
            </Layout.Body>

            <Background backgroundColor="light">
              <Layout.Side marginLeft="md">
                <Card
                    header
                    padding="none"
                    shadow="deeper"
                >
                  <Card.Header
                      headerColor="category_1"
                      padding="xs"
                  >
                    <Flex vertical="center">
                      <Body
                          dark
                          padding="xs"
                          paddingRight="sm"
                      >
                        <Icon
                            icon="tree-large"
                            size="4x"
                        />
                      </Body>
                      <Body
                          dark
                          margin="xs"
                          marginRight="xs"
                          text="Outdoor communities — they're really out there"
                      />
                    </Flex>
                  </Card.Header>

                  {communities.map((community) => (
                    <>
                      <Flex
                          padding="xs"
                          paddingLeft="sm"
                          vertical="center"
                      >
                        <FlexItem>
                          <IconCircle
                              icon={community.icon}
                              size="sm"
                              variant={community.variant}
                          />
                        </FlexItem>
                        <FlexItem>
                          <Title
                              marginLeft="xs"
                              size={4}
                              text={community.subReadit}
                          />
                        </FlexItem>
                      </Flex>
                      <If condition={community !== communities[communities.length - 1]}>
                        <SectionSeparator />
                      </If>
                    </>
                  ))}

                  <Layout.Body paddingX="sm">
                    <Button
                        fullWidth
                        marginTop="xs"
                        text="VIEW ALL"
                    />
                    <Flex
                        paddingY="sm"
                        spacing="between"
                    >
                      <Badge
                          padding="xs"
                          text="Top"
                          variant="neutral"
                      />
                      <Badge
                          padding="xs"
                          text="Near You"
                          variant="neutral"
                      />
                      <Badge
                          padding="xs"
                          text="Aww"
                          variant="neutral"
                      />
                      <Badge
                          padding="xs"
                          text="Fitness"
                          variant="neutral"
                      />
                    </Flex>
                  </Layout.Body>
                </Card>
              </Layout.Side>
            </Background>
          </Layout>
        </FlexItem>
      </Flex>
    </>
  )
}

export default CrowdsourcedPosts
