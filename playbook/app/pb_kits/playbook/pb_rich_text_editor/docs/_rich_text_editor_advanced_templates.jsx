import React, {useState, useEffect} from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'

import Select from '../../pb_select/_select'
import { changelog, release } from './templates.js'

const RichTextEditorAdvancedTemplates = (props) => {

const [editorContent, setEditorContent] = useState('')
    
const handleChange = (event) => {
        setEditorContent(event.target.value)
}
  const templatesOptions = [
    {
      value: release,
      text: 'Playbook Release',
    },
    {
      value: changelog,
      text: 'Changelog',
    },
  ]

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link
        ],
        content: editorContent
    })

    // Update editor content when editorContent state changes
    useEffect(() => {
        if (editor && editorContent) {
            editor.commands.setContent(editorContent)
        }
    }, [editor, editorContent])

      if (!editor) {
        return null
      } 

      


  return (
    <div>
        <Select
            blankSelection="Select a template..."
            label="Template"
            onChange={handleChange}
            options={templatesOptions}
            {...props}
        />
        <RichTextEditor
            advancedEditor={editor}
            {...props}
        >
        <EditorContent editor={editor}/>
        </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedTemplates