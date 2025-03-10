import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

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
