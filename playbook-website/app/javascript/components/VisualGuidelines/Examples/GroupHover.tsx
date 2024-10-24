/* eslint-disable flowtype/no-types-missing-file-annotation */

import React from 'react'

import {
  Body,
  Card
} from 'playbook-ui'

import Example from '../Templates/Example'

const GroupHoverDescription = () => (
  <>
    You can hover over a kit and its children's hover affects will be applied
  </>
)

const GroupHover = ({ example }: {example: string}) => (
  <Example
      backgroundClass='group-hover-class'
      description={<GroupHoverDescription />}
      example={example}
      title="Group Hover"
  >
    <Card groupHover>
      <Body
          groupHover 
          hover={{ scale: "lg"}}
          text="If the card is hovered, I'm hovered too!"
      />
      <Body
          paddingY="lg"
          text="I don't have any hover effect on me"
      />
      <Body
          hover={{ scale: "lg"}}
          text="I need to be hovered over directly"
      />
    </Card>
  </Example>
)

export default GroupHover
