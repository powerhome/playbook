import React, { useState } from 'react'
import { RichTextEditor, Select } from '../../'
import { changelog, release } from './templates.js'

const RichTextEditorTemplates = () => {
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
      />
      <RichTextEditor
          id="template"
          template={editorContent}
      />
    </div>
  )
}

export default RichTextEditorTemplates
