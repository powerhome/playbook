import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'

const RichTextEditorLabel = (props) => {
  const [value, setValue] = useState(''),
  handleOnChange = (html) => setValue(html)

  return (
    <div>
      <RichTextEditor
          inputOptions = {{ id: "example" }}
          label="Example Label"
          onChange={handleOnChange}
          value={value}
          {...props}
      />
      <br/>
      <RichTextEditor
          label="Example Label No ID"
          onChange={handleOnChange}
          value={value}
          {...props}
      />
    </div>
  )
}

export default RichTextEditorLabel
