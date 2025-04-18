import React from "react"

import {
  Avatar,
  Badge,
  Caption,
  Card,
  Flex,
  IconCircle,
  Image,
  Nav,
  NavItem,
} from "playbook-ui"

const GlobalPositioning = () => {
  return (
    <Flex orientation='column'>
      <Flex marginBottom='lg' orientation='column'>
        <Caption
          paddingBottom='md'
          text='EXAMPLE 1: Image kit with Badge'
        />

        {/* Example 1 */}
        <Flex position='relative'>
          <Image
            alt='picture of a misty forest'
            size='xs'
            url='https://unsplash.it/500/400/?image=634'
          />
          <Card
            borderNone
            padding='none'
            position='absolute'
            right='xs'
            top='xs'
          >
            <Badge rounded text='1' variant='notification' />
          </Card>
        </Flex>
      </Flex>

      <Flex marginBottom='lg' orientation='column'>
        <Caption
          paddingBottom='md'
          text='EXAMPLE 2: Card kit with Badge'
        />
        {/* Example 2 */}
        <Card position='relative'>
          A bunch of awesome content goes here. Yeah! It sure does! Okay!
          <Card
            borderNone
            bottom='xs'
            left='xs'
            padding='none'
            position='absolute'
          >
            <Badge text='+1' variant='primary' />
          </Card>
        </Card>
      </Flex>

      <Flex marginBottom='lg' orientation='column'>
        <Caption
          paddingBottom='md'
          text='EXAMPLE 3: Card kit with IconCircle'
        />
        {/* Example 3 */}
        <Card position='relative'>
          A bunch of awesome content goes here. Yeah! It sure does! Okay!
          <Card
            borderNone
            borderRadius='rounded'
            bottom='sm'
            left='sm'
            padding='none'
            position='absolute'
          >
            <IconCircle icon='rocket' size='sm' variant='orange' />
          </Card>
        </Card>
      </Flex>

      <Flex marginBottom='lg' orientation='column'>
        <Caption
          paddingBottom='md'
          text='EXAMPLE 4: NavItem with a Badge'
        />
        {/* Example 4 */}
        <Nav link='#' orientation='horizontal'>
          <NavItem link='#'>
            <Flex position='relative'>
              First
              <Badge
                position='absolute'
                right='sm'
                rounded
                text='1'
                top='xs'
                variant='notification'
              />
            </Flex>
          </NavItem>
          <NavItem active link='#' text='Second' />
          <NavItem link='#' text='Third' />
        </Nav>
      </Flex>

      <Flex marginBottom='lg' orientation='column'>
        <Caption paddingBottom='md' text='EXAMPLE 5: Avatar kit with a Badge' />
        {/* Example 5 */}
        <Flex position='relative'>
          <Avatar
            imageAlt='Terry Johnson Standing'
            imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
            name='Terry Johnson'
            size='lg'
          />
          <Badge
            position='absolute'
            right='none'
            rounded
            text='5'
            top='none'
            variant='notification'
          />
        </Flex>
      </Flex>

      <Flex marginBottom='lg' orientation='column'>
        <Caption
          paddingBottom='md'
          text='EXAMPLE 6: Avatar kit with a Card and Badge'
        />
        {/* Example 6 */}
        <Flex justify='center' position='relative'>
          <Avatar
            imageAlt='Terry Johnson Standing'
            imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
            name='Terry Johnson'
            size='lg'
          />
          <Card
            borderNone
            borderRadius='rounded'
            padding='none'

            // ✨ global positioning ✨
            position='absolute'
            bottom='0'
          >
            <Badge rounded text='On Roadtrip' variant='neutral' />
          </Card>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default GlobalPositioning
