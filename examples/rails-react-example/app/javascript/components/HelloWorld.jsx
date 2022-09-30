import React from 'react'
import '@fortawesome/fontawesome-free/css/all.css'
import 'playbook-ui/dist/playbook.css'
import { CircleIconButton, Title } from 'playbook-ui'

const HelloWorld = () => {
  return (
    <div>
      <CircleIconButton
          icon="plus"
          variant="primary"
      />
      <Title text="Welcome to Playbook" />
    </div>
  )
}

export default HelloWorld
