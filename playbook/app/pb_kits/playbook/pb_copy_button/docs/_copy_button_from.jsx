import React, { useState } from 'react'

import CopyButton from '../../pb_copy_button/_copy_button'
import Body from '../../pb_body/_body'
import TextInput from '../../pb_text_input/_text_input'
import Textarea from '../../pb_textarea/_textarea'

const CopyButtonFrom = (props) => {
  const [text, setText] = useState("Copy this text input text")

  const handleChange = (event) => {
    setText(event.target.value);
  }

  return (<div>
    <Body id="body">Copy this body text!</Body>
    <CopyButton
        {...props}
        from="body"
        marginBottom="sm"
        text="Copy Body text"
        tooltipPlacement="right"
        tooltipText="Body text copied!"
        variant="button"
    />

    <TextInput
        {...props}
        id="textinput"
        onChange={handleChange}
        value={text}
    />
    <CopyButton
        {...props}
        from="textinput"
        marginBottom="sm"
        text="Copy Text Input"
        tooltipPlacement="right"
        tooltipText="Text input copied!"
        variant="button"
    />

    <Textarea
        {...props}
        placeholder="Copy and paste here"
    />
  </div>
  )
}

export default CopyButtonFrom
