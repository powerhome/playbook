import React from 'react'
import { Flex, Icon } from '../../'

const IconCustom = (props) => {
  return (
    <div>
      <Flex align="center">
        <Icon
            icon="powergon"
            size="5x"
            {...props}
            marginRight="lg"
        />
        <Icon
            icon="greensky"
            size="5x"
            {...props}
            color="#228722"
            marginRight="lg"
        />
        <Icon
            icon="nitro"
            size="3x"
            {...props}
        />
      </Flex>

    </div>
  )
}

export default IconCustom
