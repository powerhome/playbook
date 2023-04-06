import React from 'react'
import { RichTextEditor } from '../..'

const RichTextEditorTipTap = (props) => {
  return (
    <div>
      <RichTextEditor
          advanced
          {...props}
      />
    </div>
  )
}

export default RichTextEditorTipTap
