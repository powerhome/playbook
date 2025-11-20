import React from 'react'

import CopyButton from '../../pb_copy_button/_copy_button'
import Textarea from '../../pb_textarea/_textarea'

const CopyButtonDefault = (props) => (
  <div>
    <CopyButton
        {...props}
        tooltipPlacement="right"
        tooltipText="Text copied!"
        value="Playbook makes it easy to support bleeding edge, or legacy systems. Use Playbook’s 200+ components and end-to-end design language to create simple, intuitive and beautiful experiences with ease."
    />

    <Textarea
        {...props}
        placeholder="Click the icon above to copy and paste here"
    />
  </div>
)

export default CopyButtonDefault
