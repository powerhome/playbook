import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
import Trix from 'trix'

const RichTextEditorFocus = (props) => (
  <>
    <RichTextEditor
        TrixEditor={TrixEditor}
        focus
        trixInstance={Trix}
        {...props}
    />
    <br />
    <RichTextEditor
        TrixEditor={TrixEditor}
        focus
        trixInstance={Trix}
        {...props}
    />
  </>
)
export default RichTextEditorFocus
