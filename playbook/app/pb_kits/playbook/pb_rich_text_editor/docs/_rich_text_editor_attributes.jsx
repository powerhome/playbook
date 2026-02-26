import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
import Trix from 'trix'

const RichTextEditorAttributes = (props) => (
  <div>
    <RichTextEditor
        TrixEditor={TrixEditor}
        aria={{ label: 'rich textarea' }}
        data={{ key: 'value', key2: 'value2' }}
        name="name-attribute"
        trixInstance={Trix}
        {...props}
    />
  </div>
)

export default RichTextEditorAttributes
