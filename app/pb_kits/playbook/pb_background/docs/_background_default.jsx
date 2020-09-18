import React from 'react'
import { Background } from '../../'
import { Body, Title, Flex, FlexItem } from '../../'

const BackgroundDefault = () => (
  <div>
    <Background backgroundColor="gradient" padding="xl">
      <Flex
            horizontal="center"
            orientation="row"
        >
          <FlexItem>
            <Title dark size={1} text="Background Kit"></Title>
          </FlexItem>
      </Flex>
    </Background>

    <Background backgroundColor="dark" padding= "xl">
      <Title dark size={4} text="hello"></Title>
    </Background>

    <Background backgroundColor="light"> Background Kit </Background>

    <Background backgroundColor="" padding="lg"> Background Kit </Background>
    <Background imageUrl='https://www.proflowers.com/blog/wp-content/uploads/2016/04/hero-blue-flowers.jpg'>
      <Body text= "Background Kit"></Body>
    </Background>
  </div>
)

export default BackgroundDefault
