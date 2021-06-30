import React from 'react'
import { Flex, Radio } from '../../'

const RadioAlignment = () => {
  return (
    <Flex>
      <Radio
          alignment="vertical"
          label="Power"
          marginRight="sm"
          name="Group2"
          tabIndex={0}
          value="Power"
      />
      <br />
      <Radio
          alignment="vertical"
          defaultChecked={false}
          label="Nitro"
          marginRight="sm"
          name="Group2"
          value="Nitro"
      />
      <br />
      <Radio
          alignment="vertical"
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
      />
    </Flex>
  )
}

export default RadioAlignment
