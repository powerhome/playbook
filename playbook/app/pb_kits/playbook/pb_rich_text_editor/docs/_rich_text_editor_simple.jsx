import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

const RichTextEditorSimple = (props) => (
  <div>
    <RichTextEditor
        simple
        {...props}
    />
  </div>
)

export default RichTextEditorSimple
