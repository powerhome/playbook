import React from 'react'

import { Title } from 'playbook-ui'

const PbKitReact = ({ kit, rawHTML }) => {

  return (
    <>
      <Title
          size={4}
          tag="h1"
          text={kit}
      />
      <span dangerouslySetInnerHTML={{__html: rawHTML}} />
    </>
  )
}

export default PbKitReact
