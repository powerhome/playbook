import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix'
import Trix from 'trix'

const RichTextEditorLabel = (props) => {
  const [value, setValue] = useState(''),
  handleOnChange = (html) => setValue(html)

  return (
    <div>
      <RichTextEditor
          TrixEditor={TrixEditor}
          id="example"
          label="Example Label"
          onChange={handleOnChange}
          trixInstance={Trix}
          value={value}
          {...props}
      />
      <br/>
      <RichTextEditor
          TrixEditor={TrixEditor}
          label="Example Label No ID"
          onChange={handleOnChange}
          trixInstance={Trix}
          value={value}
          {...props}
      />
    </div>
  )
}

export default RichTextEditorLabel
