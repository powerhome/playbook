import React from 'react'
import { CopyButton, Textarea } from 'playbook-ui'

const CopyButtonIcon = (props) => (
  <div>
    <CopyButton
        tooltipPlacement="right"
        tooltipText="Text copied!"
        value="Playbook makes it easy to support bleeding edge, or legacy systems. Use Playbook's 200+ components and end-to-end design language to create simple, intuitive and beautiful experiences with ease."
        variant="icon"
    />

    <Textarea
        {...props}
        placeholder="Copy and paste here"
    />
  </div>
)

export default CopyButtonIcon