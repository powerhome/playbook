import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

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
