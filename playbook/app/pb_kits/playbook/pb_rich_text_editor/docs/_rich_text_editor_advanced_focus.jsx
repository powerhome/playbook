import React from 'react'
import RichTextEditor from '../../pb_rich_text_editor/_rich_text_editor'
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from '@tiptap/extension-link'


const RichTextEditorAdvancedFocus = (props) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Link
        ],
        content:"Click inside to see the toolbar. Click outside to hide it."
    })

    if (!editor) {
        return null
    } 

  return (
    <div>
      <RichTextEditor
          advancedEditor={editor}
          focus
          {...props}
      >
        <EditorContent editor={editor}/>
      </RichTextEditor>
    </div>
  )
}

export default RichTextEditorAdvancedFocus