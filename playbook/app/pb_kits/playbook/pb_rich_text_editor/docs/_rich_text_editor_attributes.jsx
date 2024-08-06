import React from 'react'
import { RichTextEditor } from 'playbook-ui'

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
