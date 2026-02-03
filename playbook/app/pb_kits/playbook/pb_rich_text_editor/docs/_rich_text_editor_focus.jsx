import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
// eslint-disable-next-line no-unused-vars
import Trix from 'trix'

const RichTextEditorFocus = (props) => (
  <>
    <RichTextEditor
        TrixEditor={TrixEditor}
        focus
        {...props}
    />
    <br />
    <RichTextEditor
        TrixEditor={TrixEditor}
        focus
        {...props}
    />
  </>
)
export default RichTextEditorFocus
