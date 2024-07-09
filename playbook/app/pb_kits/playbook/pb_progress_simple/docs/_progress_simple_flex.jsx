import React from 'react'
import { Flex, ProgressSimple } from 'playbook-ui'

const ProgressSimpleFlex = () => {
  return (
    <Flex>
      <ProgressSimple
          align="left"
          flex="1"
          percent={68}
      />
    </Flex>
  )
}

export default ProgressSimpleFlex
