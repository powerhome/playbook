import React, { useState } from 'react'
import { RichTextEditor, Select } from 'playbook-ui'
import { changelog, release } from './templates.js'

const RichTextEditorTemplates = (props) => {
  const [editorContent, setEditorContent] = useState('')

  const handleChange = (event) => {
    setEditorContent(event.target.value)
  }

  const options = [
    {
      value: release,
      text: 'Playbook Release',
    },
    {
      value: changelog,
      text: 'Changelog',
    },
  ]

  return (
    <div>
      <Select
          blankSelection="Select a template..."
          label="Template"
          onChange={handleChange}
          options={options}
          {...props}
      />
      <RichTextEditor
          id="template"
          template={editorContent}
          {...props}
      />
    </div>
  )
}

export default RichTextEditorTemplates
