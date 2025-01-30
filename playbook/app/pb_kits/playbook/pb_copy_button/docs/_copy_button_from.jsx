import React, { useState } from 'react'
import { CopyButton, Body, TextInput, Textarea } from 'playbook-ui'

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
    />

    <Textarea
        {...props}
        placeholder="Copy and paste here"
    />
  </div>
  )
}

export default CopyButtonFrom
