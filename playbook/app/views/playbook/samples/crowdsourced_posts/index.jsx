import React from 'react'
import FlexItem from '../../../../pb_kits/playbook/pb_flex/_flex_item.jsx'
import {
  Background,
  Badge,
  Body,
  Button,
  Caption,
  Card,
  Flex, Icon,
  IconCircle,
  IconValue,
  Image,
  Layout,
  Nav,
  NavItem,
  Pill,
  SectionSeparator,
  TextInput,
  Title,
} from '../../../../pb_kits/playbook'

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
    imageUrl: 'https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/geuooly9/readit_image_3.png',
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
    const desktopOnly = document.querySelectorAll('.desktop-only')
    const mobileOnly = document.querySelectorAll('.mobile-only')
    const textInput = document.querySelector('.text-input-flex-item')
    const trendingImages = document.querySelectorAll('.trending-image')
    const postImageDesktop = document.querySelector('.post-image-desktop')
    const postImageMobile = document.querySelector('.post-image-mobile')
    const bodyContainer = document.querySelector('.body-container')

    const viewSize = () => {
      if (window.innerWidth < 1385) {
        desktopOnly.forEach((element) => element.style.display = 'none')
        mobileOnly.forEach((element) => element.style.display = '')
        bodyContainer.style.flexBasis = ''
        textInput.style.flexBasis = '60%'
        bodyContainer.style.marginRight = '8px'
        bodyContainer.style.marginLeft = '8px'
        postImageMobile.style.width = '100%'
      } else {
        mobileOnly.forEach((element) => element.style.display = 'none')
        desktopOnly.forEach((element) => element.style.display = '')
        bodyContainer.style.flexBasis = '65%'
        postImageDesktop.style.width = '75%'
        postImageDesktop.style.display = 'block'
        postImageDesktop.style.margin = 'auto'
      }
      trendingImages.forEach((element) => element.style.width = '100%')
    }
    viewSize()

    window.addEventListener('resize', () => viewSize())
  })

  return (
    <>
      {/* Start header bar */}
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
                    className="desktop-only"
                    marginLeft="xs"
                    size={2}
                    text="readit"
                />
              </FlexItem>
            </Flex>
          </FlexItem>
          <FlexItem
              className="text-input-flex-item"
              fixedSize="30%"
          >
            <TextInput
                marginTop="sm"
                placeholder="Search"
            />
          </FlexItem>
          <FlexItem>
            <Button
                className="desktop-only"
                marginRight="sm"
                text="Log In"
                variant="secondary"
            />
            <Button
                className="desktop-only"
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
      {/* End header bar */}

      <Flex horizontal="center">
        <FlexItem className="body-container">
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
                        className="trending-image"
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
          {/* End trending today */}

          {/* Start popular posts */}
          <Caption
              paddingBottom="xs"
              paddingTop="sm"
              text="Popular Posts"
          />

          <div className="mobile-only">
            {/* Mobile nav */}
            <Card padding="none">
              <Nav
                  className="mobile-only"
                  orientation="vertical"
              >
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
            </Card>

            {/* Mobile post 1 */}
            <Card
                marginTop="sm"
                padding="none"
            >
              <Flex>
                <FlexItem
                    padding="sm"
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
                        text="• Posted by u/xhuljanomuca"
                    />
                  </Flex>
                  <Body
                      paddingTop="xs"
                      text="LPT: If you ever need a program you want for free (for example a video/photo editor) don’t search \
                            for “free,” search for “open source” to avoid limited trial versions, adverts and malware"
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
                        icon="share"
                        marginLeft="sm"
                        text="Share"
                    />
                    <IconValue
                        icon="folder-plus"
                        marginLeft="sm"
                        text="Save"
                    />
                    <IconValue
                        icon="ellipsis-h"
                        marginLeft="sm"
                        text=""
                    />
                  </Flex>
                </FlexItem>
              </Flex>
            </Card>

            {/* Mobile post 2 */}
            <Card
                marginTop="sm"
                padding="none"
            >
              <Flex>
                <FlexItem
                    fixedSize="100%"
                    padding="sm"
                >
                  <Flex vertical="center">
                    <IconCircle
                        icon="camera"
                        size="xs"
                        variant="blue"
                    />
                    <Title
                        marginLeft="xs"
                        size={4}
                        text="r/Pics"
                    />
                    <Body
                        color="light"
                        marginLeft="xs"
                        text="• Posted by u/stephenmckeon"
                    />
                  </Flex>
                  <FlexItem>
                    <Flex
                        paddingBottom="sm"
                        paddingTop="xs"
                        vertical="center"
                    >
                      <FlexItem>
                        <Body text="Foggy morning." />
                      </FlexItem>
                      <FlexItem marginLeft="xs">
                        <Pill
                            text="OC"
                            variant="success"
                        />
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                  <Image
                      className="post-image-mobile"
                      url="https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/d5uPEJbY/readit_image_5.png"
                  />
                  <Flex paddingTop="sm">
                    <IconValue
                        icon="comment-alt"
                        text="1.4k Comments"
                    />
                    <IconValue
                        icon="share"
                        marginLeft="sm"
                        text="Share"
                    />
                    <IconValue
                        icon="folder-plus"
                        marginLeft="sm"
                        text="Save"
                    />
                    <IconValue
                        icon="ellipsis-h"
                        marginLeft="sm"
                        text=""
                    />
                  </Flex>
                </FlexItem>
              </Flex>
            </Card>

            {/* Mobile post 3 */}
            <Card
                marginTop="sm"
                padding="none"
            >
              <Flex>
                <FlexItem
                    padding="sm"
                >
                  <Flex vertical="center">
                    <IconCircle
                        icon="browser"
                        size="xs"
                        variant="purple"
                    />
                    <Title
                        marginLeft="xs"
                        size={4}
                        text="r/WebDesign"
                    />
                    <Body
                        color="light"
                        marginLeft="xs"
                        text="• Posted by u/creativebloq"
                    />
                  </Flex>
                  <Title
                      paddingRight="md"
                      paddingTop="xs"
                      size="4"
                      text="Use white space!"
                  />
                  <Body
                      paddingTop="sm"
                      text="It seems to be the hardest concept for developers to grasp: the biggest benefit to having the proper amount of \
                            white space is giving the user a break. Breaks are important for processing information, especially when there's \
                            a fair amount to process. It's why we have paragraphs and sentences instead of just a single, long block of running text."
                  />
                  <Body
                      paddingTop="sm"
                      text="The key is to ensure that white space has a relationship with other objects on the page, including the other space. \
                            If you have a single column of white space, make sure there's another single column of white space around to balance it."
                  />
                  <Body
                      color="light"
                      paddingTop="sm"
                      text="For vertical space, just use fractions of the body font size. I tend to keep things simple and use a scale of .25, \
                            but there are several other scales that you can use."
                  />
                  <Body
                      color="light"
                      paddingTop="sm"
                      text="For example, if the body font size is 16px(1em): 4, 8, 12, 16, 20, 24, 28, 32, 40, 48. \
                            This allows for choosing font sizes by simply moving up and down the scale as I want larger or smaller type..."
                  />
                  <Flex paddingTop="sm">
                    <IconValue
                        icon="comment-alt"
                        text="1.4k Comments"
                    />
                    <IconValue
                        icon="share"
                        marginLeft="sm"
                        text="Share"
                    />
                    <IconValue
                        icon="folder-plus"
                        marginLeft="sm"
                        text="Save"
                    />
                    <IconValue
                        icon="ellipsis-h"
                        marginLeft="sm"
                        text=""
                    />
                  </Flex>
                </FlexItem>
              </Flex>
            </Card>
          </div>

          <div className="desktop-only">
            <Layout
                position="right"
                size="xl"
            >
              <Layout.Body>
                {/* Desktop nav bar */}
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

                {/* Desktop post 1 */}
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
                          text="LPT: If you ever need a program you want for free (for example a video/photo editor) don’t search \
                                for “free,” search for “open source” to avoid limited trial versions, adverts and malware"
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
                            icon="share"
                            marginLeft="sm"
                            text="Share"
                        />
                        <IconValue
                            icon="folder-plus"
                            marginLeft="sm"
                            text="Save"
                        />
                        <IconValue
                            icon="ellipsis-h"
                            marginLeft="sm"
                            text=""
                        />
                      </Flex>
                    </FlexItem>
                  </Flex>
                </Card>

                {/* Desktop post 2 */}
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
                          text="8297"
                      />
                      <Icon
                          icon="arrow-alt-down"
                          marginLeft="none"
                          size="1x"
                      />
                    </FlexItem>
                    <FlexItem
                        fixedSize="85%"
                        paddingX="xs"
                        paddingY="sm"
                    >
                      <Flex vertical="center">
                        <IconCircle
                            icon="camera"
                            size="xs"
                            variant="blue"
                        />
                        <Title
                            marginLeft="xs"
                            size={4}
                            text="r/Pics"
                        />
                        <Body
                            color="light"
                            marginLeft="xs"
                            text="• Posted by u/stephenmckeon 13 hours ago"
                        />
                      </Flex>
                      <FlexItem>
                        <Flex
                            paddingTop="xs"
                            vertical="center"
                        >
                          <FlexItem>
                            <Body text="Foggy morning." />
                          </FlexItem>
                          <FlexItem marginLeft="xs">
                            <Pill
                                text="OC"
                                variant="success"
                            />
                          </FlexItem>
                        </Flex>
                      </FlexItem>
                      <Flex marginTop="sm">
                        <Image
                            className="post-image-desktop"
                            url="https://p-a6fbdk.t4.n0.cdn.getcloudapp.com/items/d5uPEJbY/readit_image_5.png"
                        />
                      </Flex>
                      <Flex paddingTop="sm">
                        <IconValue
                            icon="comment-alt"
                            text="1.4k Comments"
                        />
                        <IconValue
                            icon="share"
                            marginLeft="sm"
                            text="Share"
                        />
                        <IconValue
                            icon="folder-plus"
                            marginLeft="sm"
                            text="Save"
                        />
                        <IconValue
                            icon="ellipsis-h"
                            marginLeft="sm"
                            text=""
                        />
                      </Flex>
                    </FlexItem>
                  </Flex>
                </Card>

                {/* Desktop post 3 */}
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
                          text="467"
                      />
                      <Icon
                          icon="arrow-alt-down"
                          marginLeft="none"
                          size="1x"
                      />
                    </FlexItem>
                    <FlexItem
                        paddingLeft="xs"
                        paddingRight="xl"
                        paddingY="sm"
                    >
                      <Flex vertical="center">
                        <IconCircle
                            icon="browser"
                            size="xs"
                            variant="purple"
                        />
                        <Title
                            marginLeft="xs"
                            size={4}
                            text="r/WebDesign"
                        />
                        <Body
                            color="light"
                            marginLeft="xs"
                            text="• Posted by u/creativebloq 1 week ago"
                        />
                      </Flex>
                      <Title
                          paddingRight="md"
                          paddingTop="xs"
                          size="4"
                          text="Use white space!"
                      />
                      <Body
                          paddingTop="sm"
                          text="It seems to be the hardest concept for developers to grasp: the biggest benefit to having the proper amount of \
                                white space is giving the user a break. Breaks are important for processing information, especially when there's \
                                a fair amount to process. It's why we have paragraphs and sentences instead of just a single, long block of running text."
                      />
                      <Body
                          paddingTop="sm"
                          text="The key is to ensure that white space has a relationship with other objects on the page, including the other space. \
                                If you have a single column of white space, make sure there's another single column of white space around to balance it."
                      />
                      <Body
                          color="light"
                          paddingTop="sm"
                          text="For vertical space, just use fractions of the body font size. I tend to keep things simple and use a scale of .25, \
                                but there are several other scales that you can use."
                      />
                      <Body
                          color="light"
                          paddingTop="sm"
                          text="For example, if the body font size is 16px(1em): 4, 8, 12, 16, 20, 24, 28, 32, 40, 48. \
                                This allows for choosing font sizes by simply moving up and down the scale as I want larger or smaller type..."
                      />
                      <Flex paddingTop="sm">
                        <IconValue
                            icon="comment-alt"
                            text="1.4k Comments"
                        />
                        <IconValue
                            icon="share"
                            marginLeft="sm"
                            text="Share"
                        />
                        <IconValue
                            icon="folder-plus"
                            marginLeft="sm"
                            text="Save"
                        />
                        <IconValue
                            icon="ellipsis-h"
                            marginLeft="sm"
                            text=""
                        />
                      </Flex>
                    </FlexItem>
                  </Flex>
                </Card>
              </Layout.Body>

              {/* Start side bar (desktop only) */}
              <Background backgroundColor="light">
                <Layout.Side marginLeft="md">
                  {/* Communities card */}
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

                  {/* Readit premium card */}
                  <Card
                      marginTop="sm"
                      padding="xs"
                      shadow="deeper"
                  >
                    <Flex
                        margin="xs"
                        spacing="between"
                        vertical="center"
                    >
                      <FlexItem>
                        <Icon
                            icon="shield-alt"
                            marginRight="sm"
                            size="2x"
                        />
                      </FlexItem>
                      <FlexItem>
                        <Title
                            size={4}
                            text="Readit Premium"
                        />
                        <Caption
                            size="xs"
                            text="The best Readit experience, with monthly Coins"
                        />
                      </FlexItem>
                      <FlexItem>
                        <Button
                            paddingX="sm"
                            text="TRY NOW"
                            variant="secondary"
                        />
                      </FlexItem>
                    </Flex>
                  </Card>

                  {/* Trending communities card */}
                  <Card
                      marginTop="sm"
                      padding="sm"
                      shadow="deeper"
                  >
                    <Title
                        padding="xs"
                        size={4}
                        text="Trending Communities"
                    />

                    {trendingCommunities.map((community) => (
                      <Flex
                          key={community.subReadit}
                          marginY="xs"
                          spacing="between"
                          vertical="center"
                      >
                        <FlexItem>
                          <Flex>
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
                              <Body
                                  color="light"
                                  marginLeft="xs"
                                  text={community.members}
                              />
                            </FlexItem>
                          </Flex>
                        </FlexItem>
                        <FlexItem>
                          <Button
                              text="Join"
                              variant="secondary"
                          />
                        </FlexItem>
                      </Flex>
                    ))}
                  </Card>
                </Layout.Side>
              </Background>
              {/* End side bar (desktop only) */}
            </Layout>
          </div>
          {/* End popular posts */}
        </FlexItem>
      </Flex>
    </>
  )
}

export default CrowdsourcedPosts
