import React from "react"
import { Avatar, Badge, Flex } from "../../"

const AvatarDefault = (props) => {
  return (
    <div>
      <Flex columnGap="md">
        <Avatar
          imageAlt='Terry Johnson Standing'
          imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
          name='Terry Johnson'
          size='xl'
        >
          <Badge
            text='12'
            variant='number'
            position='absolute'
            top='4px'
            left='8px'
          />
        </Avatar>

        <Avatar
          imageAlt='Terry Johnson Standing'
          imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
          name='Terry Johnson'
          size='xl'
        >
          <Badge
            text='12'
            variant='number'
            position='absolute'
            top='4px'
            left='8px'
          />
        </Avatar>
        <Avatar
          imageAlt='Terry Johnson Standing'
          imageUrl='https://randomuser.me/api/portraits/men/44.jpg'
          name='Terry Johnson'
          size='xl'
        >
          <Badge
            text='12'
            variant='number'
            position='absolute'
            top='4px'
            left='8px'
          />
        </Avatar>
      </Flex>
    </div>
  )
}

export default AvatarDefault
