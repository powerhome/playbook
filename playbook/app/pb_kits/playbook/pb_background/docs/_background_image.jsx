import React from 'react'
import { Background } from '../..'
import { Card, Flex, FlexItem, Title } from '../..'

const BackgroundImage = (props) => (
  <Background
      imageUrl="https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
      transition="fade"
  >
    <Flex
        orientation="column"
        vertical="center"
        {...props}
    >
      <FlexItem>
        <Title
            dark
            padding="lg"
            size={1}
            text="Background Kit Image"
            {...props}
        />
      </FlexItem>
      <FlexItem
          padding="lg"
          {...props}
      >
        <Card
            shadow="deepest"
            {...props}
        >
          {'We cannot seek achievement for ourselves and forget about progress and prosperity for our community... Our ambitions must be broad enough to include the aspirations and needs of others, for their sakes and for our own. - Cesar Chavez'}
        </Card>
      </FlexItem>
    </Flex>
  </Background>
)

export default BackgroundImage
