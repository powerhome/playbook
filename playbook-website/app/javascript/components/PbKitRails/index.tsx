import React from 'react'

import { Title } from 'playbook-ui'

const PbKitRails = ({ kit }) => {
  return (
    <>
      <Title
          size={1}
          tag="h1"
          text={kit}
      />
    </>
  )
}

export default PbKitRails
