import React from 'react'
import { Title, Flex, FlexItem } from '../../../../pb_kits/playbook'

// const UserCard = () => (
//   <Card padding="xl">
//     {'Card content'}
//   </Card>
// )

const CardDashboard = () => (
  <div>
    <Title
        marginTop="xl"
        size={1}
        text="Test"
    />
    <Flex
        className="bg_light"
        wrap
    >
      <FlexItem fixedSize="300px">
        {/* <UserCard/> */}
        {'test'}
      </FlexItem>
    </Flex>
  </div>
)

export default CardDashboard
