import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
import Trix from 'trix'

const RichTextEditorSimple = (props) => (
  <div>
    <RichTextEditor
        TrixEditor={TrixEditor}
        simple
        trixInstance={Trix}
        {...props}
    />
  </div>
)

export default RichTextEditorSimple
