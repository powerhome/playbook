import React from 'react'
import { RichTextEditor } from 'playbook-ui'

const RichTextEditorFocus = (props) => (
  <>
    <RichTextEditor
        focus
        {...props}
    />
    <br />
    <RichTextEditor
        focus
        {...props}
    />
  </>
)
export default RichTextEditorFocus
