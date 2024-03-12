import React from "react"

import Image from "../_image"
import {
  Badge,
  Card,
  IconCircle,
  Avatar,
  Nav,
  NavItem,
  Flex,
  Caption,
} from "../../"

const DefaultImage = () => {
  return (
    <>
      <br />

      <Flex marginBottom='lg'>
        <Caption
            paddingBottom='md'
            text='EXAMPLE 1 without tweaking Image kit:'
        />

        {/* Example 1 */}
        <Flex position='relative'>
          <Image
              alt='picture of a misty forest'
              size='xs'
              url='https://unsplash.it/500/400/?image=634'
          />
          <Badge
              position='absolute'
              right='xs'
              rounded
              text='1'
              top='xs'
              variant='notification'
          />
        </Flex>
      </Flex>

      <Flex marginBottom='lg'>
        <Caption
            paddingBottom='md'
            text='EXAMPLE 2 with no Flex, BUT requires expanding our Image kit itself:'
        />

        {/* Example 2 */}
        <Image
            alt='picture of a misty forest'
            position='relative'
            size='xs'
            url='https://unsplash.it/500/400/?image=634'
        >
          <Badge
              layerPosition='top-left'
              position='absolute'
              right='xs'
              text='+1'
              top='xs'
              variant='primary'
          />
        </Image>
      </Flex>

      <Caption
          paddingBottom='md'
          text='EXAMPLE 3 with Card with Badge (no kit changes needed):'
      />
      <Flex marginBottom='lg'>
        <Card position='relative'>
          A bunch of awesome content goes here. Yeah! It sure does! Okay!
          <Badge
              bottom='xs'
              left='xs'
              position='absolute'
              text='+1'
              variant='primary'
          />
        </Card>
      </Flex>

      <Caption
          paddingBottom='md'
          text='EXAMPLE 4 with Card with IconCircle (no kit changes needed):'
      />
      <Flex marginBottom='lg'>
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
            <IconCircle icon='rocket'
                size='sm'
                variant='orange'
            />
          </Card>
        </Card>
      </Flex>

      <Caption
          paddingBottom='md'
          text='EXAMPLE 5 with NavItem (no kit changes needed):'
      />
      <Flex marginBottom='lg'>
        <Nav link='#'
            orientation='horizontal'
        >
          <NavItem link='#'>
            <Flex position='relative'>
              First
              <Badge
                  position='absolute'
                  right='xs'
                  rounded
                  text='1'
                  top='md'
                  variant='notification'
              />
            </Flex>
          </NavItem>
          <NavItem active
              link='#'
              text='Second'
          />
          <NavItem link='#'
              text='Third'
          />
        </Nav>
      </Flex>

      <Flex marginBottom='lg'>
        <Caption paddingBottom='md'
            text='EXAMPLE 6: Avatar with a Badge'
        />
        {/* Example 6 */}
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

      <Flex marginBottom='lg'>
        <Caption
            paddingBottom='md'
            text='EXAMPLE 7: Avatar with a Card (with a Badge)'
        />
        {/* Example 7 */}
        <Flex justify='center'
            position='relative'
        >
          <Avatar
              imageAlt='Terry Johnson Standing'
              imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
              name='Terry Johnson'
              size='lg'
          />
          <Card
              borderNone
              borderRadius='rounded'
              bottom='none'
              padding='none'
              position='absolute'
          >
            <Badge rounded
                text='On Roadtrip'
                variant='neutral'
            />
          </Card>
        </Flex>
      </Flex>
    </>
  )
}

export default DefaultImage
