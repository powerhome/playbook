import React from 'react'
import { Flex, Radio } from '../../'

const RadioAlignment = () => {
  return (
    <Flex>
      <Radio
          label="Power"
          name="Group2"
          tabIndex={0}
          value="Power"
      />
      <br />
      <Radio
          defaultChecked={false}
          label="Nitro"
          name="Group2"
          value="Nitro"
      />
      <br />
      <Radio
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
      />
    </Flex>
  )
}

export default RadioAlignment
