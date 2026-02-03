import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { TrixEditor } from 'react-trix' 
// eslint-disable-next-line no-unused-vars
import Trix from 'trix'

const RichTextEditorDefault = (props) => {
  const [value, setValue] = useState('Add your text here. You can format your text, add links, quotes, and bullets.'),
  handleOnChange = (html) => setValue(html)

  return (
    <div>
      <RichTextEditor
          TrixEditor={TrixEditor}
          onChange={handleOnChange}
          value={value}
          {...props}
      />
    </div>
  )
}

export default RichTextEditorDefault
