import React from 'react'
import { Background } from '../../'
import { Body, Card, Flex, FlexItem, Title } from '../../'

const BackgroundDefault = () => (
  <div>
    <Background
        backgroundColor="gradient"
    >
      {'Background Kit Gradient Color'}
    </Background>
    <Background
        backgroundColor="dark"
    >
      <Flex
          horizontal="center"
          orientation="row"
      >
        <FlexItem>
          <Title
              dark
              size={2}
              text="Background Kit Dark"
          />
        </FlexItem>
      </Flex>
    </Background>
    <Background
        backgroundColor="light"
        padding="xl"
    >
      <Flex
          horizontal="right"
          orientation="row"
      >
        <FlexItem>
          <Body
              text="Background Kit Light"
          />
        </FlexItem>
      </Flex>
    </Background>
    <Background
        backgroundColor="white"
        padding="lg"
    >
      <Title
          size={3}
          text="Background Kit White"
      />
    </Background>
    <Background imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80">
      <Flex
          orientation="column"
          vertical="center"
      >
        <FlexItem>
          <Title
              dark
              padding="lg"
              size={1}
              text="Background Kit Image"
          />
        </FlexItem>
        <FlexItem padding="lg">
          <Card shadow="deepest">
            {'We cannot seek achievement for ourselves and forget about progress and prosperity for our community... Our ambitions must be broad enough to include the aspirations and needs of others, for their sakes and for our own. - Cesar Chavez'}
          </Card>
        </FlexItem>
      </Flex>
    </Background>
  </div>
)

export default BackgroundDefault
