import React from 'react'
import { Background, Badge, Body, Button, Caption, Card, Flex, Icon, Image, IconCircle, IconValue, Layout, Nav, Pill, SectionSeparator, TextInput, Title } from '../../../../pb_kits/playbook'
import FlexItem from '../../../../pb_kits/playbook/pb_flex/_flex_item.jsx'

const trending_stories = [
  {
    header_color: "category_1",
    header_text: "Finance",
    url: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1266&q=80",
    card_text: "IRS will allow employers to match their employees' student loan...",
    icon: "dollar-sign",
    variant: "green",
    sub_readit: "r/PersonalFinance and more"
  },
  {
    header_color: "category_2",
    header_text: "World News",
    url: "https://images.unsplash.com/photo-1500202352583-7b2fc394ed15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    card_text: "Hong Kong democrat Ted Hui confirms he will go into exile...",
    icon: "globe",
    variant: "yellow",
    sub_readit: "r/WorldNews and more"
  },
  {
    header_color: "category_3",
    header_text: "Space",
    url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
    card_text: "Relaxing Inside the Space Station's Window to the World...",
    icon: "space-shuttle",
    variant: "blue",
    sub_readit: "r/Space and more"
  },
  {
    header_color: "category_4",
    header_text: "Tech",
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    card_text: "MIT programmed AI that can design its own robots...",
    icon: "microchip",
    variant: "royal",
    sub_readit: "r/Technology and more"
  }
]

const communities = [
  { sub_readit: "r/Fishing", variant: "teal", icon: "fish" },
  { sub_readit: "r/Outdoors", variant: "green", icon: "trees" },
  { sub_readit: "r/MostBeautiful", variant: "yellow", icon: "sun" },
  { sub_readit: "r/Camping", variant: "red", icon: "campfire" },
  { sub_readit: "r/Homestead", variant: "blue", icon: "farm" },
]

const trending_communities = [
  { sub_readit: "r/Food", variant: "blue", icon: "utensils", members: "1,239,257 members" },
  { sub_readit: "r/Gaming", variant: "red", icon: "gamepad", members: "4,125,270 members" },
  { sub_readit: "r/aww", variant: "yellow", icon: "paw", members: "2,037,816 members" },
  { sub_readit: "r/Movies", variant: "royal", icon: "camera-movie", members: "1,392,777 members" },
  { sub_readit: "r/GraphicDesign", variant: "purple", icon: "pencil-paintbrush", members: "28,270 members" },
]

const ReaditForum = () => (
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
                variant="royal"
                size="md"
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
          <Icon icon="user"/>
          <Icon icon="caret-down"/>
        </Button>
      </FlexItem>
    </Flex>
  </Background>
)

export default ReaditForum
