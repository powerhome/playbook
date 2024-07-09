import React from 'react'
import { RichTextEditor } from 'playbook-ui'

const RichTextEditorToolbarBottom = (props) => (
  <div>
    <RichTextEditor
        id="bottom-toolbar"
        toolbarBottom
        {...props}
    />
  </div>
)

export default RichTextEditorToolbarBottom
