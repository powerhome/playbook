import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
// eslint-disable-next-line no-unused-vars
import Trix from 'trix'

const RichTextEditorSimple = (props) => (
  <div>
    <RichTextEditor
        TrixEditor={TrixEditor}
        simple
        {...props}
    />
  </div>
)

export default RichTextEditorSimple
