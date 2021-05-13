import React from 'react'
import { RichTextEditor } from '../../'

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
