import React, { useState } from "react"
import { RichTextEditor, Select } from "../../"
import { release, changelog } from "./templates.js"

const RichTextEditorTemplates = () => {
  const [editorContent, setEditorContent] = useState("")

  function handleChange(event) {
    setEditorContent(event.target.value)
  }

  const options = [
    {
      value: release,
      text: "Playbook Release",
    },
    {
      value: changelog,
      text: "Changelog",
    },
  ]

  return (
    <div>
      <Select
        onChange={handleChange}
        label='Template'
        blankSelection='Select a template...'
        options={options}
      />
      <RichTextEditor id='template' template={editorContent} />
    </div>
  )
}

export default RichTextEditorTemplates
