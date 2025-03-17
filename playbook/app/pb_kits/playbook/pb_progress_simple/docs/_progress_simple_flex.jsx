import React from 'react'

import Flex from '../../pb_flex/_flex'
import ProgressSimple from '../../pb_progress_simple/_progress_simple'

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
