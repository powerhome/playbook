import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

const RichTextEditorInline = (props) => (
  <div>
    <RichTextEditor
        id="inline"
        inline
        toolbarBottom
        value="Try hovering over this text. Then try modifying it or adding more of your own text."
        {...props}
    />
  </div>
)

export default RichTextEditorInline
