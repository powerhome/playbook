import React from 'react'
import { Background } from '../../'
import { Body, Card, Flex, FlexItem, Title } from '../../'

const BackgroundDefault = () => (
  <div>
    <Background
        backgroundColor="bg_gradient"
        padding="md"
    >
      <Flex
          horizontal="center"
          orientation="row"
      >
        <FlexItem>
          <Title
              dark
              size={1}
              text="Background Kit Gradient"
          />
        </FlexItem>
      </Flex>
    </Background>

    <Background
        backgroundColor="bg_dark"
    >
      <Flex
          horizontal="left"
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
        backgroundColor="bg_light"
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

    <Background imageUrl="https://www.proflowers.com/blog/wp-content/uploads/2016/04/hero-blue-flowers.jpg">
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
          <Card>
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis, risus a fringilla luctus, sapien eros sodales ex, quis molestie est nulla non turpis. Vestibulum aliquet at ipsum eget posuere. Morbi sed laoreet erat. Sed commodo posuere lectus, at porta nulla ornare a. Suspendisse quam est, sollicitudin ut enim sit amet, commodo placerat enim. Donec laoreet metus ac mauris pellentesque mattis. Pellentesque luctus vel mauris non aliquam. Mauris hendrerit mattis porttitor. Curabitur vehicula justo non ex consectetur commodo. Quisque posuere aliquet quam. Maecenas malesuada magna mauris, ac tempor metus euismod at.'}
          </Card>
        </FlexItem>
      </Flex>
    </Background>

  </div>
)

export default BackgroundDefault
