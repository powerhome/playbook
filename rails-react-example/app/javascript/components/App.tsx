import React from "react"

import { CircleIconButton, Title } from "playbook-ui"

import WebpackerReact from 'webpacker-react'

const App = () => {
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

WebpackerReact.setup({App})

export default App
