import React from 'react'

import CopyButton from '../_copy_button'
import Textarea from '../../pb_textarea/_textarea'

const CopyButtonVariant = (props) => (
  <div>
    <CopyButton
        {...props}
        text="Copy Text"
        tooltipPlacement="right"
        tooltipText="Text copied!"
        value="Playbook makes it easy to support bleeding edge, or legacy systems. Use Playbook’s 200+ components and end-to-end design language to create simple, intuitive and beautiful experiences with ease."
        variant="button"
    />

    <Textarea
        {...props}
        placeholder="Copy and paste here"
    />
  </div>
)

export default CopyButtonVariant
