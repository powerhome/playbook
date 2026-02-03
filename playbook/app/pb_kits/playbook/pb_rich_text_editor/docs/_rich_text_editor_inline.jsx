import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
import Trix from 'trix'

const RichTextEditorInline = (props) => (
  <div>
    <RichTextEditor
        TrixEditor={TrixEditor}
        id="inline"
        inline
        toolbarBottom
        trixInstance={Trix}
        value="Try hovering over this text. Then try modifying it or adding more of your own text."
        {...props}
    />
  </div>
)

export default RichTextEditorInline
