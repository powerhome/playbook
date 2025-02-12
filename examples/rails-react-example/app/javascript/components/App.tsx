import React from "react"

import { CircleIconButton, Title } from "playbook-ui"

import WebpackerReact from 'webpacker-react'

// This is the main component that will be rendered in the Rails view if you choose to use React
// This example showcases how to import and use Playbook components
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
