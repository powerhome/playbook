import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

const RichTextEditorRequiredIndicator = (props) => {
  const [value, setValue] = useState('Add your text here. You can format your text, add links, quotes, and bullets.'),
  handleOnChange = (html) => setValue(html)

  return (
    <div>
      <RichTextEditor
          inputOptions = {{ id: "required" }}
          label="Label"
          onChange={handleOnChange}
          requiredIndicator
          value={value}
          {...props}
      />
    </div>
  )
}

export default RichTextEditorRequiredIndicator
