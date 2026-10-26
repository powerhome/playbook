import React from 'react'
import Icon from '../../pb_icon/_icon'
import Pill from '../_pill'
import Flex from '../../pb_flex/_flex'
import Title from '../../pb_title/_title'

const PillChildren = (props) => {
  return (
    <div>
      <Pill
          marginRight="xs"
          variant="success"
          {...props}
      >
        <Flex alignItems="center">
          <Title color="success" 
              size={4} 
              tag="div" 
              text="Complete" 
          />
          <Icon
              color="success"
              icon="check"
              size="sm"
          />
        </Flex>
      </Pill>


      <Pill
          marginRight="xs"
          variant="warning"
          {...props}
      >
        <Icon
            color="warning"
            icon="exclamation-triangle"
            size="sm"
        />
      </Pill>
    </div>
  )
}

export default PillChildren
