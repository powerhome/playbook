import React from 'react'
import { RichTextEditor } from '../..'
import '@playbook-ui/rich-text-editor/dist/my-library.min.js'

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
