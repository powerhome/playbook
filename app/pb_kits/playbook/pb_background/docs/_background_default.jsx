import React from 'react'
import { Background } from '../../'
import { Body, Flex, FlexItem, Title } from '../../'

const BackgroundDefault = () => (
  <div>
    <Background
        backgroundColor="gradient"
        padding="xl"
    >
      <Flex
          horizontal="center"
          orientation="row"
      >
        <FlexItem>
          <Title
              dark
              size={1}
              text="Background Kit"
          />
        </FlexItem>
      </Flex>
    </Background>

    <Background
        backgroundColor="dark"
        padding="xl"
    >
      <Title
          dark
          size={4}
          text="hello"
      />
    </Background>

    <Background backgroundColor="light">
      <Body text="Background Kit" />
    </Background>

    <Background
        backgroundColor=""
        padding="lg"
    >
      <Body text="Background Kit" />
    </Background>

    <Background imageUrl="https://www.proflowers.com/blog/wp-content/uploads/2016/04/hero-blue-flowers.jpg">
      <Title
          dark
          size={1}
          text="Background 4 Kit"
      />
    </Background>

  </div>
)

export default BackgroundDefault
