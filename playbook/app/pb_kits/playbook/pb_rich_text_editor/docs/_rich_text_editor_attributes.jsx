import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

const RichTextEditorAttributes = (props) => (
  <div>
    <RichTextEditor
        aria={{ label: 'rich textarea' }}
        data={{ key: 'value', key2: 'value2' }}
        name="name-attribute"
        {...props}
    />
  </div>
)

export default RichTextEditorAttributes
