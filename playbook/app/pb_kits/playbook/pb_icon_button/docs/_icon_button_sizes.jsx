import React from 'react'
import { IconButton, Flex } from 'playbook-ui'

const IconButtonSizes = (props) => (
  <div>
    <Flex align="center">
      <IconButton
          {...props}
          size="lg"
      />
      <span>Large</span>
    </Flex>
    <Flex align="center">
      <IconButton
          {...props}
          size="sm"
      />
      <span>Small</span>
    </Flex>
    <Flex align="center">
      <IconButton
          {...props}
          size="xs"
      />
      <span>XSmall</span>
    </Flex>
    <Flex
        align="center"
        marginTop="md"
    >
      <IconButton
          {...props}
          size="1x"
      />
      <span>1x</span>
    </Flex>
    <Flex align="center">
      <IconButton
          {...props}
          size="2x"
      />
      <span>2x</span>
    </Flex>
    <Flex align="center">
      <IconButton
          {...props}
          size="3x"
      />
      <span>3x</span>
    </Flex>
    <Flex align="center">
      <IconButton
          {...props}
          size="4x"
      />
      <span>4x</span>
    </Flex>
  </div>
)

export default IconButtonSizes
