/* eslint-disable flowtype/no-types-missing-file-annotation */

import {
  Card,
  Title,
  User,
  Flex,
  Avatar,
  Icon,
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
        background="neutral_subtle"
        cursor="pointer"
        groupHover
        hover={{ background: "info_subtle" }}
        padding="sm"
    >
      <Flex align="center" justify="between">
        <Flex align="center">
          {/* Individual hover effects show when hovered over directly */}
          <Avatar
              hover={{ scale: "lg" }}
              imageAlt="Anna Black"
              imageUrl="https://randomuser.me/api/portraits/women/44.jpg"
              marginRight="xs"
              name="Anna Black"
              size="md"
          />
          <User
              align="center"
              name="Anna Black"
              orientation="horizontal"
              size="md"
              title="Remodeling Consultant"
          />
        </Flex>
        
        {/* Group hover effects show when the outside card is hovered over */}
        <Card
            background="product_4_highlight"
            borderRadius="rounded"
            borderNone
            hover={{ visible: true }}
            padding="xs"
            groupHover
        >
          <Flex align="center">
            <Title dark size={4} marginRight="xs">Promote</Title>
            <Icon icon="trophy" color="text_dk_default" fixedWidth />
            <Icon icon="chevron-right" color="text_dk_default" fixedWidth />
          </Flex>
        </Card>
      </Flex>
    </Card>
  </Example>
)

export default GroupHover
