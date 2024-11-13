/* eslint-disable flowtype/no-types-missing-file-annotation */

import {
  Card,
  Title,
} from 'playbook-ui'

import Example from '../Templates/Example'

const GroupHoverDescription = () => (
  <>
    You can hover over a kit and its children's hover effects will be applied. Check out <a href="https://playbook.powerapp.cloud/visual_guidelines/hover">{"our hover effects here."}</a>
  </>
)

const GroupHover = ({ example }: {example: string}) => (
  <Example
      backgroundClass='group-hover-class'
      description={<GroupHoverDescription />}
      example={example}
      title="Group Hover"
  >
    <Card 
      cursor="pointer"
      groupHover
    >
      <Title
          alignSelf="center"
          groupHover 
          hover={{ scale: "lg"}}
          text="If the card is hovered, I'm hovered too!"
      />
      <Title
          alignSelf="center"
          paddingY="lg"
          text="I don't have any hover effect on me"
      />
      <Title
          alignSelf="center"
          hover={{ scale: "lg"}}
          text="I need to be hovered over directly"
      />
    </Card>
  </Example>
)

export default GroupHover
