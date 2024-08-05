import React from 'react'
import { Flex, Radio } from 'playbook-ui'

const RadioAlignment = (props) => {
  return (
    <Flex>
      <Radio
          alignment="vertical"
          label="Power"
          marginRight="sm"
          name="Group2"
          tabIndex={0}
          value="Power"
          {...props}
      />
      <br />
      <Radio
          alignment="vertical"
          defaultChecked={false}
          label="Nitro"
          marginRight="sm"
          name="Group2"
          value="Nitro"
          {...props}
      />
      <br />
      <Radio
          alignment="vertical"
          defaultChecked={false}
          label="Google"
          name="Group2"
          value="Google"
          {...props}
      />
    </Flex>
  )
}

export default RadioAlignment
