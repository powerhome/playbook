import React from "react"
import { Icon, Flex } from "../../"

const IconCustom = (props) => {
  return (
    <div>
    <Flex align="center">
      <Icon size="5x" icon='powergon' {...props} marginRight="lg" />
      <Icon size="5x" icon='greensky' {...props} marginRight="lg" color="#228722" />
      <Icon size="3x" icon='nitro' {...props} />
    </Flex>
      
    </div>
  )
}

export default IconCustom
