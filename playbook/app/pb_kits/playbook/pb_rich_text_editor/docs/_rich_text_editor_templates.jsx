import React, { useState } from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import Select from '../../pb_select/_select'
import { changelog, release } from './templates.js'
import { TrixEditor } from 'react-trix'
// eslint-disable-next-line no-unused-vars
import Trix from 'trix'

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
          TrixEditor={TrixEditor}
          id="template"
          template={editorContent}
          {...props}
      />
    </div>
  )
}

export default RichTextEditorTemplates
